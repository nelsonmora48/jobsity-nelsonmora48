# jobsity Chat and Bot Tech Challenge, Backend Javascript Node App

Application with simple Multiuser Chat that response /stock command... this calls a Bot that obtains a Stock Quote from stoq.com

This project is developed by Nelson Mora <nelsonmora48@gmail.com> at Jobsity Challenge

The project must have docker pre-installed and docker-compose to run database and RabbitMq Services 
The backend, frontend and bot apps must run in a pre-installed local NodeJS version >=14.1.0

1) Run ./start-services.sh to start services
2) Run scripts: ./start-bot.sh, ./start-backend.sh and ./start-frontend.sh
3) Browse to http://localhost:1337 to land in the main Frontend App (sails)
4) Use:
   - Register an user through email. (No verification needed)
   - Create/Join a chatroom
   - Chat with other users
   - if you type the command: /stock=appl.us the bot query the quote for you and response in your -private chat.

Bonus completed:
- Multi Chat Rooms
- Unit Test: (At bot folder. Run yarn test)
- Handle Messages: For error in conection, invalid stock_code, etc the bot send a message indicating the error.

Technical Description:
- The backend app (Node.JS with Sails Framework) handles the signUp, logIn, logout and user's security 
- The backend app handles the rooms and chat logic through realtime websocker connections.
- The backend app saves a history chats for each room in a mongodb named chatnbot
- The backend app listen to /stock command a send a message through rabbitMQ queue 
- The decoupled bot runs as a separate server app (folder bot), it is made in a lightweight node app, listen to the rabbitMQ and handles the http query to stoq.com and broadcast the quote result through the same way (rabbitMQ)
- The frontend webchat apps (folder frontend) is made as simple React (Create-React-App) app runs in port 3000. After login at http://localhost:1337 follow the "Go to Chat Rooms" Linkm this is the frontend app (http://localhost:3000).

The frontend app (and the bot and backends) runs better from preinstalled node running locally than inside docker containers.

Nelson D. Mora


