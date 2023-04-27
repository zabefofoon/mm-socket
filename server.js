// server.js
const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const socket = require('socket.io')
const io = socket(server)

let clickCount = 0

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res, next) => {
  res.sendFile(__dirname + '/public/index.html')
})

io.on('connection', (client) => {
  //when the server receives clicked message, do this
  client.on('clicked', (data) => {
    clickCount++
    //send a message to ALL connected clients
    io.emit('buttonUpdate', clickCount)
  })
})

//start our web server and socket.io server listening
server.listen(3001, function () {
  console.log('listening on *:3001')
})