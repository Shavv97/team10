const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Employee = require("./lib/Employee");
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
let teamMember = [];

const add = () => {
  inquirer.prompt({
    type: 'confirm',
    name: 'add',
    message: 'Add a New Employee'
  })
    .then(data => {

      if (data.add === true) {
        createEmployee()
      } else {
        fs.mkdir('output', { recursive: true }, (err => {
          if (err) {
            console.log(err)
          }
        }))
        writeToFile('./output/team.html', render(teamMember))

      }

    })
}
const createEmployee = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Type your employee name',
    },
    {
      type: 'input',
      name: 'id',
      message: 'Type your employee id',
    },
    {
      type: 'input',
      name: 'email',
      message: 'Type your employee email',
    },
    {
      type: 'list',
      name: 'role',
      message: 'Pick a role for your employee',
      choices: ['Intern', 'Engineer', 'Manager'],
    }
  ])
    .then(data => {
      if (data.role === 'Intern') {
        inquirer.prompt([
          {
            type: 'input',
            name: 'school',
            message: 'Where did the intern graduate from?'
          }
        ])
          .then(intern => {
            const newIntern = new Intern(data.name, data.id, data.email, intern.school)
            teamMember.push(newIntern)
            add()
            console.log(newIntern)
          })
      } else if (data.role === 'Engineer') {
        inquirer.prompt([
          {
            type: 'input',
            name: 'github',
            messege: 'What is the Engineer github Id?'
          }
        ])
          .then(engineer => {
            const newEngineer = new Engineer(data.name, data.id, data.email, engineer.github)
            teamMember.push(newEngineer)
            add()
            console.log(newEngineer)
          })
      } else if (data.role === 'Manager') {
        inquirer.prompt([
          {
            type: 'input',
            name: 'officeNumber',
            message: 'What is your manager office number?'
          }
        ]).then(manager => {
          const newManager = new Manager(data.name, data.id, data.email, manager.officeNumber)
          teamMember.push(newManager)
          add()
          console.log(newManager)
        })
      }

    }).catch(err => console.log(err))
}

function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, err => {
    if (err) {
      return console.log(err)
    }
    console.log("Your teamProfile has been Generated.")
  })
}
add();
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```