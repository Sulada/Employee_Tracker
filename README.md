# MySQL: Employee Tracker

Build a command-line application that at a minimum allows the user to:

  * View all employee

  * View all employee by manager

  * Add Employee

  * Add Departments

  * Update employee managers

  * Delete Employee

  * **Install npm package (node_modules): `npm install`**
  * **Install MySQL npm package: `npm install mysql`**
  * **Install inquirer npm package: `npm install inquirer`**

# Database Schema

* **department table**:

  * **id** - INT PRIMARY KEY
  * **name** - VARCHAR(30) to hold department name

* **role table**:

  * **id** - INT PRIMARY KEY
  * **title** -  VARCHAR(30) to hold role title
  * **salary** -  DECIMAL to hold role salary
  * **department_id** -  INT to hold reference to department role belongs to

* **employee table**:

  * **id** - INT PRIMARY KEY
  * **first_name** - VARCHAR(30) to hold employee first name
  * **last_name** - VARCHAR(30) to hold employee last name
  * **role_id** - INT to hold reference to role employee has
  * **manager_id** - INT to hold reference to another employee that manager of the current employee. This field may be null if the employee has no manager

* **manager table**:

  * **id** - INT PRIMARY KEY
  * **manager_name** - VARCHAR(30) to hold manager name
  