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

	// socket.emit from admin to the user who joined: welcome to the chat app
	socket.emit('newMessage', {
		from: 'Admin',
		text: 'Welcome to the Chat App',
		createdAt: new Date().getTime()
	})

	// socket.broadcast.emit from admin text New user joined
	socket.broadcast.emit('newMessage', {
		from: 'Admin',
		text: 'New user joined',
		createdAt: new Date().getTime()
	})

	socket.on('createMessage', message => {
		console.log('createMessage: ', message)
		io.emit('newMessage', {
			from: message.from,
			text: message.text,
			createdAt: new Date().getTime()
		})

		// socket.broadcast.emit('newMessage', {
		// 	from: message.from,
		// 	text: message.text,
		// 	createdAt: new Date().getTime()
		// })
	})

	socket.on('disconnect', () => {
		console.log('Client Disconnected from the server')
	})
})

server.listen(port, () => {
	console.log(`Server is up on port ${port}`)
})