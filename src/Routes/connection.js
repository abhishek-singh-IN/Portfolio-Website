var mysql =require("mysql")

const mysqlConnection=mysql.createConnection({
    host:"localhost",
    user:"singhabhishek",
    password:"singhabhishek",
    database:"singhabhishek",
    multipleStatement:true
});
mysqlConnection.connect((err)=> {
    if (!err) {
        console.log("Connected MySQL Database");
    } else {
        console.log("Connection failed to MYSQL");
    }
})

module.exports=mysqlConnection;
