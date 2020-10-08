create database singhabhishek;
create user singhabhishek identified with mysql_native_password by 'singhabhishek';
grant all privileges on singhabhishek.* to singhabhishek;
flush privileges ;
