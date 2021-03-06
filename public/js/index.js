
const socket = io();

socket.on('connect', function () {
	console.log('Connected to the server')
})

socket.on('disconnect', function () {
	console.log('Disconnected from the server')
})

socket.on('newMessage', function (message) {
	console.log('new Message', message)
	const li = jQuery('<li></li>')
	li.text(`${message.from}: ${message.text}`)
	jQuery('#messages').append(li)
}) 

socket.on('newLocationMessage', function (message) {
	console.log('new Location Messagen ', message)
	const li = jQuery('<li></li>')
	const a = jQuery('<a target="_blank">My Current Location</a>')
	li.text(`${message.from}: `)
	a.attr('href', message.url)
	li.append(a)
	jQuery('#messages').append(li)
})

jQuery('#message-form').on('submit', function (e) {
	e.preventDefault();

	const messageTextbox = jQuery('[name=message]')

	socket.emit('createMessage', {
		from: 'User',
		text: messageTextbox.val()
	}, function () {
		messageTextbox.val('')
	})
})

const locationButton = jQuery('#send-location')
locationButton.on('click', function () {
	if (!navigator.geolocation) {
		return alert('Geolocation is not supported by your browser ;-(')
	}

	locationButton.attr('disabled','disabled').text('Sending location...')

	navigator.geolocation.getCurrentPosition(function (position) {
		locationButton.removeAttr('disabled').text('Send location')
		socket.emit('createLocationMessage', {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude			
		})
	}, function () {
		locationButton.removeAttr('disabled').text('Send location')
		alert('Unable to fetch location.')
	})
})