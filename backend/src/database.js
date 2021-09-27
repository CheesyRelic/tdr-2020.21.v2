const { createPool } = require('mysql')

const pool = createPool({
    host: 'localhost',
    user: 'tdr-aa',
    password: 'dgKeSd4E',
    database: 'tdr-aa'
})

pool.getConnection((err) => {
    if(err){
        console.log(err);
        return;
    }
    console.log('DB is connected');
})

module.exports = pool;