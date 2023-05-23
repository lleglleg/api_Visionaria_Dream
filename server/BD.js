var mysql = require('mssql');
const { Client } = require('pg');

const Pool = require('pg').Pool
  
const connectionData = {
    user: 'curiosity',
    host: 'node5533-promotoriabafardev-clone20175.paasmx.connectnow.global',
    database: 'VRLand',
    password: 'aDj5jjIpq2',
    port: 11048,
  }
//   const client = new Client(connectionData);
//   client.connect()
const pool = new Pool(connectionData);
// let config = {
//     server: '192.168.2.63',
//     user: 'app_termo',
//     password: 'pr4d1ppsrv',
//     database: 'VRLand',
//     requestTimeout: 180000, // for timeout setting
//     connectionTimeout: 180000, 
//     options: {
//         enableArithAbort: true,
//         encrypt: false
//     }
// };
// // Local Connection
// const pool = new mysql.ConnectionPool(config);


// pool.connect()
//     .then(function() { console.log(`Conected with the Database: ${config.database} in ${config.server} `) }).catch(
//         function(err) {
//             console.log(err)
//         });

exports.query = async function(sql, callback) {
    let data = await pool.query(sql);
    callback(data)
    // client.query(sql)
    // .then(response => {
    //     callback(response)
    //     // console.log(response.rows)
    //     client.end()
    // })
    // .catch(err => {
    //     try {
    //         console.log(err.originalError.info)
    //         } catch (error) {
    //             console.log(err)
    //         }
    //         callback(null, err);
    //     client.end()
    // })
    // if (pool.connected === false) { await pool.connect(); }
    // pool.request().query(sql).then(function(recordset) {
    //     callback(recordset)
    // }).catch(function(err) {
    //     try {
    //         console.log(err.originalError.info)
    //     } catch (error) {
    //         console.log(err)
    //     }
    //     callback(null, err);
    // });
}
