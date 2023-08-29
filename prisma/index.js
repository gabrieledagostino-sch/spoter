import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()
const main = async () => {
    await prisma.$executeRaw`CREATE OR REPLACE FUNCTION delete_outdated_tracks()
    RETURNS TRIGGER AS $$
    BEGIN
        DELETE FROM "Track"
        WHERE "updatedAt" < NOW() - INTERVAL '7 days' AND "discoveryId" IS NULL
        ;
        RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;`

    await prisma.$executeRaw`CREATE OR REPLACE TRIGGER outdate_tracks_trigger
    AFTER UPDATE ON "Track"
    EXECUTE FUNCTION delete_outdated_tracks();`

    await prisma.$executeRaw`CREATE OR REPLACE FUNCTION delete_empty_discoveries()
    RETURNS TRIGGER AS $$
    BEGIN
        DELETE FROM "Discovery"
        WHERE "id" = OLD."discoveryId" AND NOT EXISTS (SELECT 1 FROM "Track" WHERE "discoveryId" = OLD."discoveryId");
    
        RETURN OLD;
    END;
    $$ LANGUAGE plpgsql;`

    await prisma.$executeRaw`CREATE OR REPLACE TRIGGER empty_discoveries_trigger
    AFTER DELETE ON  "Track"
    FOR EACH ROW
    EXECUTE FUNCTION delete_empty_discoveries();`
}

main()
.then(async () => {
    await prisma.$disconnect()
})
.catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})