const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const {generateMessage, generateLocationMessage} = require('./utils/message')
const publicPath = path.join(__dirname, '../public/')
const port = process.env.PORT || 3000
const app = express()
const server = http.createServer(app)
const io = socketIO(server)

app.use(express.static(publicPath))

io.on('connection', socket => {
	console.log('New Client connected to the server')
	console.log('PublicPath', publicPath)
	socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Chat App'))

	socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'))

	socket.on('createMessage', (message, callback) => {
		console.log('createMessage: ', message)
		io.emit('newMessage', generateMessage(message.from, message.text))
		callback()
	})

	socket.on('createLocationMessage', (coords) => {
		io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
	})

	socket.on('disconnect', () => {
		console.log('Client Disconnected from the server')
	})
})

server.listen(port, () => {
	console.log(`Server is up on port ${port}`)
})