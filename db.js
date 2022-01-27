const Pool = require('pg').Pool

const pool = new Pool({
    user: "postgres",
    password: "781227",
    host: "localhost",
    port:   5432,
    database: "details"
})



module.exports = pool;