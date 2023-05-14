
const amqp = require('amqplib')

const establishSubscriber = async () => {
    try {
        const connection = await amqp.connect('amqp://127.0.0.1')
        const channel = await connection.createChannel()

        const queue = 'hello'

        await channel.assertQueue(queue, { durable: true });
        console.log(`Waiting for messages in ${queue} queue...`)

        channel.consume(queue, message => {
            console.log(`Receiver '${message.content.toString()}' from ${queue}`)
        }, { noAck: true })

        process.on('SIGINT', () => {
            channel.close()
            connection.close()
        })
    } catch(e) {
        console.log(`Something went wrong ${e}`)
    }
}

establishSubscriber()

