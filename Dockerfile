FROM node:latest

MAINTAINER Shakira Ndagire

ENV PORT=8000

WORKDIR /app/con
COPY . /app/con

RUN apt-get update && npm install

EXPOSE $PORT

ENTRYPOINT ["npm", "start"]