// database connection

const db = mysql.createConnection({
    host: 'localhost',
    user: '',
    password: '',
    database: '',
});

db.connect(err => {
    if(err) {
        console.error("Database connection failed:", err);
    } else {
        console.log('Connected to the database');
    }
});

module.exports = db;