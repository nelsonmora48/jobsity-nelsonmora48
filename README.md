# jobsity Chat and Bot Tech Challenge, Backend Javascript Node App

Application with simple Multiuser Chat that response /stock command... this calls a Bot that obtains a Stock Quote from stoq.com

This project is developed by Nelson Mora <nelsonmora48@gmail.com> at Jobsityt Challenge

To start the project must have docker installed and docker-compse

1) Run Init Script: docker-compose up
2) Wait until start process finish and containers may finish to load and start
3) Browse to http://localhost:1337
4) Use:
   - Register an user throwgh email. (No verification needed)
   - Create/Join a chatroom
   - Chat with other users
   - if you type the command: /stock=appl.us the bot query the quote for you and response in your -private chat.

Bonus completed:
- Multi Chat Rooms
- Unit Test: (At bot folder. Run yarn test)
- Handle Messages: For error in conection, invalid stock_code, etc the bot send a message indicating the error.

Thechnical Description:
- The backend app (Node.JS with Sails Framework) hadles the signUp, logIn, logout and user's security 
- The backend app handles the rooms and chat logic through realtime websocker connections.
- The backend app saves a history chats for each room in a mongodb named chatnbot
- The backend app listen to /stock command a send a message through rabbitMQ queue 
- The decoupled bot runs as a separate server app (folder bot), it is made in a lightwieght node app, listen to the rabbitMQ and handles the http query to stoq.com and broadcast the quote result through the same way (rabbitMQ)
- The frontend webchat apps (folder frontend) is made as simple React (Create-React-App) app and its build is merged in the serve webapp (folder ./assets/static in the /backend folder)
