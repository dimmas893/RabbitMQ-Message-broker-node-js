const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (err, connection) => {
  if (err) {
    throw err;
  }
  connection.createChannel((err, channel) => {
    if (err) {
      throw err;
    }
    const queue = 'task_queue';

    channel.assertQueue(queue, { durable: true });
    console.log(`Waiting for messages in ${queue}`);

    channel.consume(queue, (msg) => {
      console.log(`Received message: ${msg.content.toString()}`);
      channel.ack(msg);
    });
  });
});
