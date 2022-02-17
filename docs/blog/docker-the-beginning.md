---
sidebarDepth: 2
---

# Docker Basic Command

## Installation / Initialization

For demo, we will try to make a React app, and run it on docker. We use ```npx create-react-app my-app```, to create the project.

First we have to make a file name Dockerfile with D capital. Here is a basic react app docker file.

```sh
FROM node:latest

RUN mkdir -p /app/src

WORKDIR /app/src

COPY package.json .

RUN npm install

COPY . .

ENV REACT_APP_NAME=DefaultName

EXPOSE 3000

CMD ["npm", "start"]
```

## .dockerignore
This will ignore those files' folder that we do not want to copy into our container.
```git
node_modules
Dockerfile
.git
.dockerignore
```
These files and folder will not be copied into the container.

| command                                                       |                                                                                                                                     explaination                                                                                                                                     |
|---------------------------------------------------------------|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
| ```docker ps```                                               |                                                                                                                          showing all the running containers                                                                                                                          |
| ```docker image ls```                                         |                                                                                                                              list of all docker images                                                                                                                               |
| ```docker build -t react-image .```                           |                                                                                                 create a image with react-image tag name, ```.``` is the location of the Dockerfile                                                                                                  |
| ```docker run -d -p 3000:3000 --name react-app react-image``` | this will create a docker container, ```-d``` flag will detached the console and ```--name``` will name the container, in this case the name is react-app, ```-p``` defines the port number. before ```:``` is the local machine port and after ```:``` is the docker container port |
| ```docker rm react-app -f```                                  |                                                                                                                              stop the running container                                                                                                                              |
| ```docker exec -it react-app bash```                          |                                                                                                               this will open the cmd inside the container of react-app                                                                                                               |


## Bind mounts to sync source code
At this stage if we make a change in the local code that will not be shown in the localhost because the app is running in the container and our local code is not sync with the container. In this case we have to bind the code with the container.


We have to use the ```-v localDirectory:containerDirectory``` tag in the run command. For the local directory we mast give the absolute path of the local directory. For using git bash / mac we can use the ```$(pwd)```, this will refer to the current directory of the bash running on local.

Therefore, the final command of the run command will be something like this:

```docker run -d -v $(pwd)\src:app/src -p 3000:3000 --name react-app react-image``` this is for windows.(Need to verify)

```docker run -v $(pwd)/src:/app/src -d -p 3000:3000 --name react-app react-image``` this is for mac. (verified)

> In the `-v` tag we are sync the localhost `src` folder to the container `app/src` folder
> if this two does not match then the app will not work

We can bind the container READ Only mode, so that from the container end no change can be made. To do that we have to pass a flag.

```docker run -v $(pwd)/src:/app/src:ro -p 3000:3000 --name react-app react-image```

Here `$(pwd)/src:/app/src:ro`, the `:ro` making it read only.

In the command line we can pass the env variable. Example given below:

```docker run -e REACT_APP_NAME=ROY -v $(pwd)/src:/app/src:ro -d -p 3000:3000 --name react-app react-image```

We can also pass the env from a .env file. Below is the example:

```docker run --env-file ./.env -v $(pwd)/src:/app/src:ro -d -p 3000:3000 --name react-app react-image```

Here `./.env` is the path of the `.env` file.


## Docker Compose

So far we are building the dev environment and passing different parameter using the command line. However, it is not visible when it comes to multiple container. It will be really difficult to maintain and remember the cmd instructions for an application which has database. server and many other services which works together.

For this kind docker has a simple solution. And that is ```docker-compose.yml```.

A simple example of docker-composer.yml for our project is given below.

```bh
version: "3"
services:
  react-app:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - ./src:/app/src:ro
    # environment:
    #   - REACT_APP_NAME=ROY
    #   - ANOTHER_VAR=Dummy
    env_file:
      - ./.env
```

Now we have to run this command to create the container. ```docker-compose up -d```.

We have our container up and running with the config we describe in the yml file. It will also create a default network for the container.

```docker-compose down``` with this command we can stop, terminate the container and the default network.

This docker-composer file also create a image with this config.

## Important note
> If we make any changes to the Dockerfile then we must pass ```--build``` flag, because as after the first time of building the image, it will not build the image if we do not say it explicitly.
> It will find the same image from the local docker list and run it.

To solve this issue will use this command: ```docker-compose up -d --build```.

This is all good for the dev environment, but things are a little different in production server. We have to build the React app and run it on the server (not react build in server) to serve it. We can use `nginx SERVER`.

To accomplish this, we have to crate multiple stage of build.

### step 1
We will rename the Dockerfile to `Dockerfile.dev` (just making a different name). We will also create a `Dockerfile.prod` for the production server.

To build the image we will use this command now, as we changed the Dockerfile name.
```docker build -f Dockerfile.dev .```

The `-f` flag is for the filename.

### step 2
We have to make changes in the `docker-compose.yml` file as it will look for the default `Dockerfile` to build the image. Here is the change we make in the file:

```sh
version: "3"
services:
  react-app:
    build:
      -context: .
      dockerfile: Dockerfile.dev
    ports:
      - "3000:3000"
    volumes:
      - ./src:/app/src:ro
    # environment:
    #   - REACT_APP_NAME=ROY
    #   - ANOTHER_VAR=Dummy
    env_file:
      - ./.env
```


### Step 3
We have to make a Dockerfile.prod for the production build.
Dockerfile.prod will be like this:
```sh
FROM node as react-build
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
ENV REACT_APP_NAME=DefaultName
RUN npm run build

FROM nginx
# we are coping files from build dir to /usr/share/nginx/html
# for using the nginx we have to save the files to that dir (default)
COPY --from=react-build /app/build /usr/share/nginx/html
```
First we are building the React app prod using the node, and then we will move the build folder into the nginx server folder in order to run the app on the server.

To build the image we will use this command

`docker build -f Dockerfile.prod -t react-image-prod .`


### Step 4
Now we will make a container from that `react-image-prod` image.
To create the container we will run this command

`docker run -d -p 8080:80 --name react-app-prod react-image-prod`

>`nginx` default port number is 80, and after running this container the react app will be run from nginx server


## Setup the docker-composer for the production environment

The last change we make in the docker-composer.yml was for the dev environment.

Now we have to create a docker-composer file for the prod env. The `docker-compose-prod.` file be like this:

```
version: "3"
services:
  react-app:
    build:
      # -context: .
      dockerfile: Dockerfile.prod
    ports:
      - "8080:80"
    environment:
      - REACT_APP_NAME=ROY-prod
```

and to run the container we will run this command.
`docker-compose -f docker-compose-prod.yml up -d --build`

The `--build` flag will ensure that it build the image before creating the container.

> If we want to run multiple docker-compose file then we have to pass those files name in correct order
> something like this `docker-compose -f docker-compose.yml -f docker-compose-prod.yml up -d --build`

## How to pass env variables into the nginx server

If we run the docker-compose-prod.yml and build the container, we will not see the reflection of environment variable.
In order to work on it, we need another approach:

We have to change in two files. One is the `docker-compose-prod.yml`. It will be like this:
```sh
version: "3"
services:
  react-app:
    build:
      # -context: .
      dockerfile: Dockerfile.prod
      args:
        - REACT_APP_NAME=ROY-prod
    ports:
      - "8080:80"
```
The change is we add `args:` below the `build` section.

```sh
args:
  - REACT_APP_NAME=ROY-prod
```

And we have to change in the `Dockerfile.prod`. It will be like this:

```sh
FROM node as build
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
ARG REACT_APP_NAME
ENV REACT_APP_NAME=$REACT_APP_NAME
RUN npm run build

FROM nginx
# we are coping files from build dir to /usr/share/nginx/html
# for using the nginx we have to save the files to that dir (default)
COPY --from=build /app/build /usr/share/nginx/html
```
The change is in these two lines:

```sh
ARG REACT_APP_NAME
ENV REACT_APP_NAME=$REACT_APP_NAME
```

After doing this the change will be visible to prod environment.

That is all for now !!!

## Tips
While working with MySql, it creates volumes to presist data. We can use the following command to remove the container and its associated anonymous volume.
`docker rm -v mysql_db_1`

If we don’t remove the anonymous volume and the container together, it becomes a dangling volume.

We can list and remove all the dangling volumes using the following commands.

```sh
docker volume ls -qf dangling=true
docker volume rm $(docker volume ls -qf dangling=true)
```

A basic setup for MySql database and `phpMyAdmin` is given below. The `docker-compose.yml` file be like this:

```sh
version: '3.1'
services:
  db:
    image: mysql
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: myDatabase
    ports:
      - "3306:3306"
    # volumes:
    #   - ./:/myDatabase.sql
  phpmyadmin:
    image: phpmyadmin
    restart: always
    ports:
      - 8081:80
    environment:
      - PMA_ARBITRARY=1
```

> this will presist data even if we do not set the volume, as mysql image create it by default in the local

You can access the database from the browser `localhost:8081` as we set the port in the config.
