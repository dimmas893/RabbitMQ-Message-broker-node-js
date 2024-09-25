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
    const msg = 'dimmas!';

    channel.assertQueue(queue, { durable: true });
    channel.sendToQueue(queue, Buffer.from(msg), { persistent: true });

    console.log(`Message sent to queue: ${msg}`);
  });

  setTimeout(() => {
    connection.close();
  }, 500);
});
