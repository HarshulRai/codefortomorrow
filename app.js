const express = require('express')
const http = require('http')
const cors = require('cors')
const bodyParser = require('body-parser')
const socketIO  = require('socket.io')
const jwt = require('jsonwebtoken')

const app = express();
const server = http.createServer(app);
const io = socketIO(server)

// database connection

const db = mysql.createConnection({
    host: 'localhost',
    user: '',
    password: '',
    database: '',
});


app.use(express.json());

// JWT 

const secretKey = '12345';

const authenticate = (req, res, next) => {
    const token = req.header('Authorization');
    if(!token){
        return res.sendStatus(401);
    }

    jwt.verify(token, secretKey, (err, user) => {
        if(err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    })
}

app.use(bodyParser.json());


const authRoutes = require('./routes/auth');
const messageRoutes = require('./routes/message');

app.use('/api/auth', authRoutes)
app.use('/api/messages', authenticate, messageRoutes)

// // socket.io

// io.on('connection', (socket) => {
//     console.log('User Connnected', socket.id);

//     socket.on('chat message', (data) => {
//         const { content } = data;
//         const userId = socket.userId;

//         db.query('INSERT INTO messsages (user_id, content) VALUES (?, ?)', [userid, content], (err) => {
//             if(err){
//                 throw err;
//             }
//         })

//         io.emit = ('chat message', { content, userId });
//     });

//     socket.on('login', (data) => {
//         const { username } = data;

//         const userId = username;

//         socket.userId = userId;

//         socket.emit('welcome', { userId });

//         io.emit('user joined', { userId });
//     });

//     socket.on('disconnect', () => {
//         const userId = socket.userId;
//         io.emit('user left', { userId });
//     })
// })


const PORT = 3000;
server.listen(PORT, () => {
    console.log('Server is running on port ${PORT}');
});


