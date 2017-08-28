var mysql = require('mysql');

var db = mysql.createPool({
    host: '60.205.221.162',
    user: 'root',
    password: 'root123',
    database: 'prs_alpha',
    port: 3306
});
/*
pool.on('connection', function (connection) {
    console.log("record pool on");
    connection.query('SET SESSION auto_increment_increment=1');
});
*/

function Record(record) {
    this.username = record.username;
    this.psid = record.psid;
    this.reservenow = record.reservenow;
    this.reservedate = record.reservedate;
    this.reserveintime = record.reserveintime;
    this.reserveouttime = record.reserveouttime;
}

Record.prototype.save = function save(callback) {

    var record = {
        username: this.username,
        psid : this.psid,
        reservenow : this.reservenow,
        reservedate : this.reservedate,
        reserveintime : this.reserveintime,
        reserveouttime : this.reserveouttime
    };

    var insertUserReserve_Sql = "INSERT INTO reserve_record (USER_NAME,PS_ID,RESERVE_NOW,RESERVE_DATE,RESERVE_INTIME,RESERVE_OUTTIME) VALUES (?, ?, ?, ?, ?, ?)";

    db.getConnection(function (err, connection) {

        db.query(insertUserReserve_Sql, [record.username, record.psid, record.reservenow, record.reservedate, record.reserveintime, record.reserveouttime], function (err, result) {

            if (err) {
                console.log('insertUserReverse_Sql Error: ' + err.message);
                return;
            }

            connection.release();
            callback(err, result);
        });

    });

};



//get user 's reserve record by username
Record.getRecordByUserName = function getRecordByUserName(username, callback) {


    var getRecordByUserName_Sql = "SELECT * FROM reserve_record WHERE USER_NAME = ?";//sql中now()函数用于获取当前datetime

    pool.getConnection(function (err, connection) {

        if (err) throw err;
        connection.query(getRecordByUserName_Sql, [username], function (err, result) {

            if (err) {
                console.log("getRecordByUserName Error: " + err.message);
                return;
            }
            console.log("invoke getRecordByUserName");
            callback(err, result);
        });

    });

};

module.exports = Record;