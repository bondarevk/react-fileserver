const shortid = require('shortid');
const dns = require('dns');

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

  static checkPermissionLevel(socket, level) {
    if (socket.ulevel) {
      return socket.ulevel >= level;
    }
  }

  static init(io) {
    this.io = io;
    this.commands = {
      ['/username']: (socket, body) => {
        if (body) {
          this.say(socket.username + ' изменил имя на "' + body + '"');
          socket.username = body;
        }
      },
      ['/mute']: (socket, body) => {
        if (this.checkPermissionLevel(socket, 5)) {
          if (body) {
            this.say(socket.username + ' запретил писать в чат ' + body + '!');
            this.mutes[body] = true;
          }
        }
      },
      ['/unmute']: (socket, body) => {
        if (this.checkPermissionLevel(socket, 5)) {
          if (body) {
            this.say(socket.username + ' разрешил писать в чат ' + body + '!');
            if (this.mutes.hasOwnProperty(body)) {
              delete this.mutes[body];
            }
          }
        }
      },
      ['/clear']: (socket, body) => {
        if (this.checkPermissionLevel(socket, 4)) {
          this.messagesHistory = [];
          this.io.emit('clear');
        }
      },
      ['/ban']: (socket, body) => {
        if (this.checkPermissionLevel(socket, 5)) {
          if (body) {
            this.say(socket.username + ' забанил ' + body + '!');
            global.bans[body] = true;
          }
        }
      },
      ['/unban']: (socket, body) => {
        if (this.checkPermissionLevel(socket, 5)) {
          if (body) {
            this.say(socket.username + ' разбанил ' + body + '!');
            delete global.bans[body];
          }
        }
      }
    };
    this.mutes = {};

    this.messagesHistory = [];

    io.on('connection', (socket) => {

      let ip = socket.client.conn.remoteAddress;
      if (ip.length > 7 && ip.startsWith('::ffff:')) {
        ip = ip.substring(7);
      }
      socket.ip = ip;
      socket.username = ip;

      if (ip === '::1') {
        socket.ulevel = 5;
      }

      dns.reverse(ip, function (err, domains) {
        if (err) {
          return;
        }

        if (domains.length > 0) {
          let host = domains[0].replace(/\s*\.itstep\.lan\s*/g, '');
          if (socket.username === socket.ip) {
            socket.username = host;
          }
        }
      });

      socket.emit('clear');
      socket.emit('new', this.generateMessagesHistory());

      socket.on('create message', (message) => {
        if (this.mutes.hasOwnProperty(socket.ip)) {
          if (this.mutes[socket.ip] === true) {
            return;
          }
        }

        if (message.text) {
          let messageParse = message.text.split(' ');
          if (messageParse.length > 0) {
            let command = messageParse[0].toLowerCase();
            if (this.commands.hasOwnProperty(command)) {
              let body = null;
              if (messageParse.length > 1) {
                body = message.text.substr(message.text.indexOf(' ') + 1);
              }
              this.commands[command](socket, body);
              return;
            }
          }

          let receivedMessage = new Message(message.text, socket.username + ' (' + socket.ip + ')');
          this.messagesHistory.push(receivedMessage);
          io.emit('new', receivedMessage.ToDataObject());
        }
      });

      socket.on('disconnect', function () {
        console.log('user disconnected');
      });
    });
  }

  static say(text) {
    let newMessage = new Message(text, 'Server');
    this.messagesHistory.push(newMessage);
    this.io.emit('new', newMessage.ToDataObject());
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