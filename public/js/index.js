
const socket = io();

socket.on('connect', function () {
	console.log('Connected to the server')

	socket.emit('createMessage', {
		from: 'jen@example.com',
		text: 'Hey, this is booby.'
	})
})

socket.on('disconnect', function () {
	console.log('Disconnected from the server')
})

socket.on('newMessage', function (message) {
	console.log('new Message', message)
}) 