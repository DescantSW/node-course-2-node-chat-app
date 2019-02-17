const expect = require('expect')

const {generateMessage} = require('./message')

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