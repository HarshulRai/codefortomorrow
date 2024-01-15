const db = require('../db');


exports.getMessages = (req, res) => {
    db.query('SELECT * FROM messages', (err, res) => {
        if(err) {
            console.log(err);
            res.status(500).json({ message: 'Internal Server Error'});
        } else {
            res.json(res);
        }
    });
};


exports.postMessage = (req, res) => {
    const { content, broadcast = true, recipientUserId  } = req.body;
    const senderUserId = req.user.Id;

    db.query('INSERT INTO messages (user_id, content) VALUES (?, ?)', [userId, content], (err) => {
        if(err) {
            res.status(500).json({ message: 'Internal Sever Error '});
        } else {
            const senderUsername = `user${senderUserId.split('user')[1]}`;

            if(broadcast){
                io.emit('chat message', { content, username: senderUsername });
            } else if(recipientUserId) {
                io.to(recipientUserId).emit('chat message', { content, username: senderUsername });
            }
            
            res.json({ message: 'Message sent successfully' });
        }
    })
};