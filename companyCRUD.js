var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "company_db"
});

connection.connect(function(err) {
  if (err) throw err;
  runSearch();
});

function runSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View all employee",
        "View all employee by manager",
        "Add Employee",
        "Add Departments",
        "Update employee managers",
        "Delete Employee",
        "exit"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "View all employee":
        allEmployee();
        break;

      case "View all employee by manager":
        viewEmployeeByManager();
        break;

      case "Add Employee":
        addEmployee();
        break;

      case "Add Departments":
        addDepartments();
        break;

      case "Update employee managers":
        updateEmployeeManagers();
        break;

      case "Delete Employee":
        deleteEmployee();
        break;

      case "exit":
        connection.end();
        break;
      }
    });
}

function allEmployee() {
  connection.query("select employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, manager.manager_name from (((role left join employee on employee.role_id = role.id) left join department on role.department_id = department.id) left join manager on manager.id = employee.manager_id) order by id ASC;", function(err, res) {
    if (err) throw err;

    const cTable = require('console.table');
    const table = cTable.getTable(res);
    console.log(table);
    //connection.end();

    runSearch();
  });
}

function viewEmployeeByManager() {
  inquirer
    .prompt({
      name: "manager_name",
      type: "input",
      message: "What manager would you like to search for?"
    })
    .then(function(answer) {
      var query = "select employee.id, employee.first_name, employee.last_name, manager.manager_name from employee left join manager on employee.role_id = manager.id where ? order by id ASC";
      connection.query(query, {manager_name: answer.manager_name},function(err, res) {
        if (err) throw err;
        const cTable = require('console.table');
        const table = cTable.getTable(res);
        console.log(table);

        runSearch();
    });
  });
  }

  function addEmployee(){
      connection.query("SELECT * FROM role", function (err, results) {
          if (err) throw err;
          inquirer.prompt([
              {
                //input employee's first name
                  type: "input",
                  name: "firstname",
                  message: "What is the employee's first name?"
              },
              {
                //input employee's first name
                  type: "input",
                  name: "lastname",
                  message: "What is the employee's last name?"
              },
              {
                //make a list of employee's role use for loop
                  name: "choice",
                  type: "rawlist",
                  choices: function () {
                      var choiceArray = [];
                      for (var i = 0; i < results.length; i++) {
                          choiceArray.push(results[i].title);
                      }
                      return choiceArray;
                  },
                  message: "What is the employee's role?"
              },
          ]).then(function (res) {
              for (var i = 0; i < results.length; i++) {
                  if (results[i].title === res.choice) {
                      res.role_id = results[i].id;
                  } 
              }
              var query = "INSERT INTO employee SET ?"
              const VALUES = {
                  first_name: res.firstname,
                  last_name: res.lastname,
                  role_id: res.role_id
              }
              connection.query(query, VALUES, function (err) {
                  if (err) throw err;
                  console.log("Employee successfully added!");
                  const cTable = require('console.table');
                  const table = cTable.getTable(res);
                  console.log(table);

                  runSearch();
              });
          });
      });
    }

  function addDepartments(){
    inquirer
    .prompt({
      name: "name",
      type: "input",
      message: "What departments would you like to add?"
    })
    .then(function(answer) {
      var query = "INSERT INTO department SET ?";
      connection.query(query, {name: answer.name}, function(err, res) {
        if (err) throw err;
        const cTable = require('console.table');
        const table = cTable.getTable(res);
        console.log(table);

        runSearch();
      });
    });
  }

  function updateEmployeeManagers(){
    inquirer.prompt([
    {
      name: "manager_id",
      type: "input",
      message: "Input your manager ID?"
    },
    {
      name: "first_name",
      type: "input",
      message: "What is your Employee's First Name?"
    }
    ]).then(function(answer) {
    connection.query("UPDATE employee SET manager_id = ? WHERE first_name = ? ", [answer.manager_id, answer.first_name], function(err, res) {
      if (err) throw err;
      console.log("Update Employee's manager Success!!")
      const cTable = require('console.table');
      const table = cTable.getTable(res);
      console.log(table);
      //console.table(res);

      runSearch();
    });
  });
}

function deleteEmployee() {
  inquirer.prompt([
      {
          name: "firstName",
          type: "input",
          message: "What is your Employee's First Name?"
      },
      {
          name: "lastName",
          type: "input",
          message: "What is your Employee's Last Name?"
      }
  ]).then(function (answer) {

      connection.query("DELETE FROM employee WHERE first_name = ? and last_name = ?", [answer.firstName, answer.lastName], function (err) {
          if (err) throw err;
          console.log(`\n ${answer.firstName} ${answer.lastName} has been deleted \n`);

          runSearch();
      });
  });
}