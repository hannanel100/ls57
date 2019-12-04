const mysql = require('mysql');
const _connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',

    database: 'phone-exercise'
});


function readOne(query, callback) {
    _connection.query(query, function (error, results, fields) {
        if (error) {
            callback("query error" + error, null)
        }
        else {

            callback(null, results);
        }
    });

}
function updateOtp(query, callback) {
    _connection.query(query, function (error, results, fields) {
        if (error) {
            callback("query error" + error)
        }
        else {
            callback(null, results);
        }
    });

}
const dalModule = () => {

    return {
        readOne: readOne,
        updateOtp: updateOtp,

    }
}
module.exports = dalModule;