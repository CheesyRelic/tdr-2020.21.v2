const { createPool } = require('mysql')

const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tdr-2020-21'
})

pool.getConnection((err) => {
    if(err){
        console.log(err);
        return;
    }
    console.log('DB is connected');
})

module.exports = pool;