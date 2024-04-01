# Project Code: voi

This is submission project for technical test, a fully functional live chat web based application. Consists of backend and frontend with below spesification:
- Frontend: 
  - VueJS (typescript)
  - Pinia for State management
  - Axios for HTTP request
- Backend: 
  - NodeJS (typescript)
  - ExpressJS
  - Prisma (DB ORM)
  - MongoDB
- Websocket: socket.io

## Submission Date
01 April 2024

## How to setup
Git clone this project:
- Backend:
  1. Go to folder be
  2. copy paste .env.example into .env
  3. Install & run docker desktop
  4. run docker-compose up -d or docker-compose up --build
  5. run: npx prisma generate
  6. run: npm install
  7. run: npm run dev 
- Frontend:
  1. Go to folder fe
  2. run: npm install
  3. run: npm run dev
  4. On different terminal instance, go to folder fe again and then run the websocket: node server.js

*Other optional run can be found on package.json script
Time Spent: 2d

## Background
This live chat apps has a join room page as a homepage, which user can free to enter the room. They required to input their username
and the room id. If they enter the room that not initialized before, then the new room will be created and they automatically
enter that room. If 2nd user and so on (room doesn't have member limitation) also enter that room, they can make a conversation together. 
All the member listed on 'room' database. If someone tried to enter the room that already have that username, they can't enter the room.
If someone leave the room, they listed out from 'room' database. This way, the member of the group can freely in/out the room, without getting
blocked by the validation.
And after they succesfully join the room, they will go to the chat page and it will loaded the chat history on that room sorted by timestamp ascending.
Initially, the chat page automatically scroll to the bottom which is the latest message. Here they can send the message, the message then appear instantly
to all member chat page. There is a validation if they send an empty message chat, actually don't do anything.

## Improvement
This live chat could be better in many areas, including the performance improvement. Because of my limitation to work on this project, there are some known
lacking issues that i missed out:
Backend:
1. The websocket can be move to backend part and build inside container using docker compose. 
2. The backend node js server can be build along with dockerfile script
3. Should added unit test
4. Implement authentication upon hitting the API

Frontend:
1. Added on enter key event at send chat message textbox
2. Reduce fetching API, by sending chat message to the backend API every x number of new chat message.
3. CSS management could be better, by implementing scss/sass
4. Template modularity and library can be better using storybook
5. Added limit on load chat history by maybe 50 back conversation.

API documentation using swagger/postman API

## Feedback
My limitation on this coding challenge is due to the lack of time to do it. Because it's a complex fully functional chat application, that consist of
backend, frontend, database, websocket into one. My feedback is maybe can reduce the coding challeng scope with more straightforward test. 
Thank you.
