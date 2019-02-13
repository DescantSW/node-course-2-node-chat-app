const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000
const app = express()
const server = http.createServer(app)
const io = socketIO(server)

app.use(express.static(publicPath))

io.on('connection', socket => {
	console.log('New Client connected to the server')

	socket.emit('newMessage', {
		from: 'John',
		text: 'See you then',
		createdAt: 123123
	})

	socket.emit('createMessage', {
		from: 'mike@example.com',
		text: 'HEY. What is going on.',
		createdAt: 123
	})

	socket.on('createMessage', Message => {
		console.log('createMessage: ', Message)
	})

	socket.on('disconnect', () => {
		console.log('Client Disconnected from the server')
	})
})

server.listen(port, () => {
	console.log(`Server is up on port ${port}`)
})