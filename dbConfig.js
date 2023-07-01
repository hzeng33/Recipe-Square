const Pool = require("pg").Pool;

const pool = new Pool({
    user: "ctp_user",
    password: "ctp_pass",
    host: "127.0.0.1",
    port: 5432,
    database: "ctp_appdb_development"
});


module.exports = pool;