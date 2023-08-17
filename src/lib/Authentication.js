import { compareSync, hash } from "bcryptjs";
import prisma from "./prisma";
import { decode, sign, verify } from 'jsonwebtoken'
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "$env/static/private";
import { emailValidation, passwordValidation, usernameValidation } from "./Validation";

const createAccessToken = (username, email) => sign({ username, email}, ACCESS_TOKEN_SECRET, {expiresIn:'15 minutes'})
const createRefreshToken = (id, cAt) => sign({id, cAt}, REFRESH_TOKEN_SECRET, {expiresIn:"7 days"})


const computeError = async ( err ) => {
    console.log(err)
    console.error('fail be4')
    switch(err.code) {
        case "P2002": return {msg:`Account with that ${err.meta.target.toString()} already exists`, name:err.meta.target.toString()}
    }
}

export const register = async ({ username, email, password }) => {
        if(!username) return { msg:"Username required", name:"username" }
        if(!email) return { msg:"Email required", name:"email" }
        if(!password) return { msg:"Password required", name:"password" }

        const {msg: eMsg} = emailValidation(email)
        if(eMsg) return {msg:eMsg, name:"email"}
        const {msg: uMsg} = usernameValidation(username)
        if(uMsg) return {msg:uMsg, name:"username"}
        const {msg: pMsg} = passwordValidation(password)
        if(pMsg) return {msg:pMsg, name:"password"}
        
        try {
            const _ = await prisma.user.create({
                data:{
                    username,
                    email,
                    password:await hash(password, 12)
                }
            })
        } catch (err) {
            return computeError(err)
        }
        return {}
}

export const login = async ({ username, password }) => {
    if(!username) return { msg:"Username required", name:"username"}
    if(!password) return { msg:"Password required", name:"password"}

    const { msg:uMsg } = usernameValidation(username)
    if(uMsg) return {msg:"wrong username", name:"username"}
    const { msg:pMsg } = passwordValidation(password)
    if(pMsg) return {msg:"wrong password", name:"password"}
    
    try {
        const user = await prisma.user.findUnique({
            where:{
                username
            }
        });
        if(! user) return { msg : `No account with username : ${username} exists`, name:'username'}

        const valid = compareSync(password, user.password);
        if(! valid) return { msg : 'Wrong password', name:'password'}

        await prisma.session.updateMany({
            where:{userId:user.id},
            data:{
                valid:false
            },
        })
        const id = crypto.randomUUID()
        const session = await prisma.session.create({
            data: {
                id,
                token: createAccessToken(username, user.email),
                refreshToken : createRefreshToken(id, Date.now()),
                userId : user.id
        }})
        return { token : session.token, refreshToken:session.refreshToken }
    } catch (err) {
        return computeError(err)
    }
}

export const authenticate = async({ accessToken }) => {
    let decodedToken = undefined
    try {
        decodedToken = verify(accessToken, ACCESS_TOKEN_SECRET)
    
    } catch (err) {
        return {msg:err.message, name:err.name}
    }
    console.log(decodedToken)
    const session = await prisma.user.findUnique({
        where:{username:decodedToken.username},
        select:{id:true}
    }).then(user => prisma.session.findFirst({
        where:{userId:user.id},
        orderBy:{refreshedAt:"desc"}
    }))
    if(accessToken !== session.token) return {msg:"token no longer valid", name:"InvalidSessionError"}
    if(!session.valid) return {msg:"session no longer valid", name:"InvalidSessionError"}
    return {msg:"success"}
}

export const refresh = async ({ refreshToken }) => {
    let decodedToken = undefined

    try {
        decodedToken=verify(refreshToken, REFRESH_TOKEN_SECRET)
    } catch (err) {
        return {msg:err.message, name:err.name}
    }
    const session = await prisma.session.findUnique({
        where:{id:decodedToken.id},
        include:{
            user:{
                select:{
                    username:true,
                    email:true,
                },
            },
        },
    })
    if(session.refreshToken !== refreshToken) return {msg:"invalid token", name:"differentToken"}
    if(!session.valid) return {msg:"session no longer valid", name:"sessionValidFalse"}

    const freshAccessToken = createAccessToken(session.user.username, session.user.email)
    const freshRefreshToken = createRefreshToken(session.id, Date.now())

    prisma.session.update({
        where:{id:session.id},
        data:{
            refreshToken:freshRefreshToken,
            token:freshAccessToken,
        },
    })

    return {msg:"success", name:"success", accessToken:freshAccessToken, refreshToken:freshRefreshToken}
}

export const logout = async ({ accessToken }) => {
    const jwtPayload = decode(accessToken)
    console.log(jwtPayload)
    await prisma.user.findUnique({
        where:{username:jwtPayload.username},
        select:{id:true}
    })
    .then(user => prisma.session.updateMany({
        where:{userId:user.id},
        data:{valid:false}
    }))
}

export const setTokenCookie = ({ cookies, token }) => cookies.set(
    'AccessToken', 
    `Bearer ${token}`, 
    {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7,
        path: '/'
})
export const setRefreshCookie = ({ cookies, token }, remember) => cookies.set(
    'RefreshToken', 
    `Bearer ${token}`, 
    {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: (remember?60*60*24*7:null),
        path: '/'
})
