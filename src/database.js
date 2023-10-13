const mysql = require('promise-mysql');

const connection = mysql.createConnection({
    host:'lochnagar.abertay.ac.uk',
    user:'sql2303314',
    password:'trap bank arnold suse',
    database: 'sql2303314'
})

function getConnection(){
    return connection
}

module.exports = {
    getConnection
}