const expect = require('expect')

const {generateMessage, generateLocationMessage} = require('./message')

describe('generateMessage', () => {
	it('Should generate correct message object', (done) => {
		const testFrom = 'MisterMeisel'
		const testText = 'Whatsamata wit u?'

		const message = generateMessage(testFrom, testText)	
		expect(message.from).toBe(testFrom)
		expect(message.text).toBe(testText)
		expect(typeof message.createdAt).toBe('number')
		done()
	})	
})

describe('generateLocationMessage', () => {
	it('Should generate correct location object', () => {
		const from = 'Admin'
		const latitude = 118
		const longitude = 110
		url = `https://www.google.com/maps?q=${latitude},${longitude}`

		const message = generateLocationMessage(from, latitude, longitude)
		console.log('Location message: ', message)	
		expect(message.from).toBe(from)
		expect(message.url).toBe(url)
		expect(typeof message.createdAt).toBe('number')

	})	
})