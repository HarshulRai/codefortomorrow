const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secretKey = '12345';

exports.login = (req, res) => {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username);

    if(!user || !bcrypt.compareSync(password, user.password)){
        return res.status(401).json({ message: 'Invalid Information'})
    }

    const token = jwt.sign({ id: user.id, username: user.username}, secretKey, { expiresIn: '1h' });

    res.json({ token });
};


