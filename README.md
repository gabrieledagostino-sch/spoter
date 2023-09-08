DISCLAIMER: This project integrates with Spotify APIs for functionality. However, the author of this project does not guarantee compliance with Spotify's terms of service. Users of this project are responsible for ensuring their use of the software aligns with Spotify's terms of service and any applicable legal regulations. This project is provided for educational and non-commercial purposes and is not intended for direct commercialization or profit.

# Spoter <img src="./static/favicon-32x32.png">

Spoter is a web app that makes discovering new music easy and straigthforward. Just search for a track, an autor or a genre that you like and it will use spotify APIs to make suggestions. It will show a preview and just by swiping left or right you tell your interest. You can then go in your profile and make a playlist out of those interests.

Jest  testing is alredy setup and watching on \_\_test__ folder.

# Enviroment variables

```sh
#public
PUBLIC_GHLink=https://github.com/yourGithubProfile
PUBLIC_URL= #url

# private static
SP_CLIENT_ID= #spotify app client id
SP_SECRET_KEY= #spotify app secret key
COOKIE_SIGNER= #jwt key to sign session cookie
DATABASE_URL="postgresql://postgres:postgres@postgres:5432/spoter?schema=public" 
# this can stay as is if you want to use the containers
DIRECT_URL="postgresql://postgres:postgres@postgres:5432/spoter?schema=public" 
# this can stay as is if you want to use the containers
```

# Local docker execution

To execute in local there's already setup a Dockerfile and a Docker-Compose.yml file

so to execute

Obtain a valid certificate for localhost, with mkcert
> mkcert localhost

> Uncomment the https propery in vite.config.js

> Docker-compose up

## Containers

- spoter
  - postgres
        The database container, entirely setup via prisma 
  - pgadmin
        Container that sets up pgadmin on localhost:5555 by default
  - spoter-ws
       Container with the actual sveltekit app, entrypoint has a shell command that makes prisma initialize the database, starting with generate and a migration, then it creates the triggers and at last runs ```npm run preview```, it will be on https://localhost:4173

Setting up the containers as a dev enviroment instead is quite simple, delete from the dockerfile the ```Run npm run build``` line and in entrypoint.sh modify the last line to ```npm run dev``` (will run on port 5173 instead)
## Pages

- __/__
  Homepage, only visible if not logged with a description of the webapp a logo and the login button.
- __/profile__
  Profile page, with the interests songs, a few stats of the user and the possibility to create playlists. 
- __/discover__
  Form used to start a queue, homepage if logged. Navigate via Logo button.
- __/discoverQueue__
  The discovery queue with cards that can be dragged in a similar to tinder fashion (left = dislike, right = like).

## Server endpoints

The enpoints aren't really REST APIs because most of the client state is stored in cookies, and that makes it not stateless.

- /api
  - /delete
  - /discover
    - /interest
    - /suggestions
  - /search
  - /searchGenres
  - /spotify
    - /callbacck
    - /login
    - /logout
    - /refresh
    - /tracks

