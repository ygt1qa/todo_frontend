FROM node:13.10.1-alpine3.10

RUN apk --no-cache add g++ gcc libgcc libstdc++ linux-headers make python
RUN npm install --quiet node-gyp -g

COPY . /usr/src/app/todo_frontend

WORKDIR /usr/src/app/todo_frontend/