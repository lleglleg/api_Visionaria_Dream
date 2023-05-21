var mysql = require('mssql');
let config = {
    server: '192.168.2.63',
    user: 'app_termo',
    password: 'pr4d1ppsrv',
    database: 'VRLand',
    options: {
        enableArithAbort: false,
        encrypt: false
    }
};
// Local Connection
const pool = new mysql.ConnectionPool(config);


pool.connect()
    .then(function() { console.log(`Conected with the Database: ${config.database} in ${config.server} `) }).catch(
        function(err) {
            console.log(err)
        });

exports.query = async function(sql, callback) {
    if (pool.connected === false) { await pool.connect(); }
    pool.request().query(sql).then(function(recordset) {
        callback(recordset)
    }).catch(function(err) {
        try {
            console.log(err.originalError.info)
        } catch (error) {
            console.log(err)
        }
        callback(null, err);
    });
}
