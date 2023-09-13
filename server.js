require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require("body-parser");
const ObjectId = require('mongodb').ObjectId
const useRoute = require('./routes/index.js');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors({
    credentials: true,
    origin:["http://localhost:4200"]
}));

const options = {useNewUrlParser: true, useUnifiedTopology: true};

mongoose.connect(process.env.MONGODB_URL, options);

mongoose.connection.on('connected', () => {
    console.log("Mongoose connection is connected to the database");
});

mongoose.connection.on('error', (error) => {
    console.log("Mongoose connection has occured " + error + ' error');
});

mongoose.connection.on('disconnected', () => {
    console.log("Mongoose connection is disconnected due to application termination");
});

process.on("SIGINT", () => {
    mongoose.connection.close(() => {
        console.log("Mongoose connection is disconnected due to application termination");
    });
});

app.use(useRoute);

const http = require("http").createServer(app);
const io = require("socket.io")(http, {
    cors: {
        origin: 'http://localhost:****',
        methods: ['GET', 'POST'],
        allowedHeaders: ['Authorization'],
        credential: true
    }
});

io.on('connection',(socket) => {
    console.log('A user connected');

    socket.on('userjoin', (data) => {
        console.log(data.name);
        socket.join(`${data.id}`);
        console.log(`Client ${data.name} joined the room: ${data.id}`);
        socket.to(data.id).emit('userjoin',{name: data.name});
    });

    socket.on('agentuserjoin', (agentnamedata) => {
        console.log( agentnamedata. clientname)
        console.log(agentnamedata.agentname)
            socket.join(`${ agentnamedata.clientname}`);
            console.log(`Agent ${agentnamedata.agentname} joined the room: ${ agentnamedata.clientname}`);
            socket.to( agentnamedata.clientname).emit('userjoin',{name:agentnamedata.agentname,onlinestatusage:agentnamedata.onlinestatusage});
      });
    
      socket.on('message', (message) => {
        console.log('Received message:', message.message);
        console.log(message.id)
        socket.to(message.id).emit('message', {name:message.name,message:message.message})
      });
    
      socket.on('typing', (roomId) => {
        
        socket.to(roomId).emit('userTyping', {roomId})
        
      });
      socket.on('stopTyping', (roomId) => {
       
        socket.to(roomId).emit('userStoppedTyping',{roomId})
        
      });
      
      socket.on('disconnect', () => {
        console.log('A user disconnected');
      });
});

const port = 3000;
http.listen(port, () => {
  console.log(`listening on *:${port}`);
});
app.listen(4000,() => {
  console.log(`listening on 4000`);
});
   
    