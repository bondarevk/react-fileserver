const shortid = require('shortid');

class Message {
  constructor(text, sender, timestamp) {
    this.id = shortid.generate();
    this.text = text;
    this.sender = sender || 'Guest';
    this.timestapm = timestamp || new Date();
  }

  ToDataObject() {
    return {
      id: this.id,
      text: this.text,
      sender: this.sender,
      timestamp: this.timestapm.toLocaleString()
    }
  }
}

class IOSocket {

  static init(io) {
    this.messagesHistory = [];

    io.on('connection', (socket) => {

      socket.emit('clear');
      socket.emit('new', this.generateMessagesHistory());

      socket.on('create message', (message) => {
        if (message.text) {
          let receivedMessage = new Message(message.text);
          this.messagesHistory.push(receivedMessage);
          io.emit('new', receivedMessage.ToDataObject());
        }
      });

      socket.on('disconnect', function () {
        console.log('user disconnected');
      });
    });
  }

  static generateMessagesHistory() {
    let messages = [];
    this.messagesHistory.forEach((message) => {
      messages.push(message.ToDataObject());
    });
    return messages;
  }
}


module.exports = IOSocket;