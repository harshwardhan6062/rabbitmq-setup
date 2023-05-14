
const amqp = require('amqplib')

const message = `Hello, RabbitMQ!`

const establishPublisher = async () => {
    try {
        const connection = await amqp.connect(`amqp://127.0.0.1`)
        console.log(`Connection established successfully`)
        const channel = await connection.createChannel()
        const queue = 'hello'
        
        await channel.assertQueue(queue, { durable: true })
        await channel.sendToQueue(queue, Buffer.from(message))

        console.log(`Sent ${message} to ${queue} queue`)

        await channel.close()
        await connection.close()
    }  catch(e) {
        console.log(`Something went wrong ${e.message}`)
    }
}

establishPublisher()

