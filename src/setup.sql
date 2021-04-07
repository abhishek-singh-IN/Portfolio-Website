create database singhabhishek;
create user singhabhishek identified by 'Singh@abhishek#123';
grant all privileges on singhabhishek.* to singhabhishek;
flush privileges ;

use singhabhishek;
CREATE TABLE Contact1
(
    Name    varchar(75),
    Mail    varchar(75),
    Subject varchar(75),
    Message varchar(2000),
    TS      TIMESTAMP DEFAULT 0 ON UPDATE CURRENT_TIMESTAMP,
    DT      DATETIME  DEFAULT 0 ON UPDATE CURRENT_TIMESTAMP
);
