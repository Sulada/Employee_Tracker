     CREATE DATABASE company_db;
     USE company_db;

     CREATE TABLE department
     (
         id int NOT NULL AUTO_INCREMENT,
         name VARCHAR(30) NOT NULL,
         PRIMARY KEY (id)
     );

    CREATE TABLE role
    (
         id int NOT NULL AUTO_INCREMENT,
         title VARCHAR(30) NOT NULL,
         salary DECIMAL(5,2) NOT NULL,
         department_id INT NOT NULL,
         PRIMARY KEY (id)
     );

    CREATE TABLE employee
    (
         id int NOT NULL AUTO_INCREMENT,
         first_name VARCHAR(30) NOT NULL,
         last_name VARCHAR(30) NOT NULL,
         role_id INT NOT NULL,
         manager_id INT NOT NULL,
         PRIMARY KEY (id)
     );