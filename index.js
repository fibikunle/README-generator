
const inquirer = require('inquirer');
const fs = require('fs');
const generateMarkdown = require('./utils/generateMarkdown.js');

//An array of questions for user input.
const questions = [

  //projectTitle
  {
    type: 'input',
    name: 'projectTitle',
    message: 'What is the title of your project? (Required):',
    validate: projectTitleInput => {
        if (projectTitleInput) {
          return true;
        } else {
          console.log('Please enter the title of your project!');
          return false;
        }
    }
  },

   //projectDescription
   {
    type: 'input',
    name: 'projectDescription',
    message: 'Provide a description of your app, i.e. the what, why, and how: (Required)',
    validate: descriptionInput => {
        if (descriptionInput) {
          return true;
        } else {
          console.log('Please enter a description for your project!');
          return false;
        }
    }
  },

  //github user name
  {
    type: 'input',
    name: 'github',
    message: 'Enter your GitHub Username (Required)',
    validate: githubInput => {
        if (githubInput) {
          return true;
        } else {
          console.log('Please enter your GitHub username!');
          return false;
        }
    }
  },
  //email for questions 
  {
    type: 'input',
    name: 'questionsEmail',
    message: 'Enter an email users can reach out to if they have questions. (Required)',
    validate: questionsEmailInput => {
        if (questionsEmailInput) {
        return true;
        } else {
        console.log('Please enter an email!');
        return false;
        }
    }
  },
  
//confirmRunNormally
{
  type: 'confirm',
  name: 'confirmRunNormally',
  message: 'From the terminal, does the app run with the typical "npm start" command? (Required)',
  default: true
},
//runCommand
{
  type: 'input',
  name: 'runCommand',
  message: `Type how the user should run the app from the terminal:`,
  when: ({ confirmRunNormally }) => {
    if (!confirmRunNormally) {
      return true;
    } else {
      return false;
    }
  },
  validate: descriptionInput => {
    if (descriptionInput) {
      return true;
    } else {
      console.log('Please enter something for how the user should run the app.');
      return false;
    }
}
},


  //projectUsage
  {
    type: 'input',
    name: 'projectUsage',
    message: 'Provide usage instructions for your project. In the next prompt, you will be asked whether you wish to include a GIF into your README.md file\'s Usage section: (Required)',
    validate: usageInfo => {
        if (usageInfo) {
          return true;
        } else {
          console.log('Please provide usage instructions!');
          return false;
        }
    }
  },
  
  //projectLicense
  {
    type: 'list',
    name: 'projectLicense',
    message: 'What license is this project made under? Select one (default is none):',
    choices: [ 'Apache License 2.0', 'MIT License', 'GNU GPLv3', 'GNU LGPLv3', 'GNU AGPLv3', 'Mozilla Public License 2.0', 'Boost Software License 1.0', 'The Unlicense', 'none'],
    default: 'none'
  },
  //projectContributions
  {
    type: 'input',
    name: 'projectContribute',
    message: 'Provide guidelines for how others may contribute to this project: (Required)',
    validate: contributeGuidelines => {
        if (contributeGuidelines) {
          return true;
        } else {
          console.log('Please provide usage instructions!');
          return false;
        }
    }
  },
  //projectTests
  {
    type: 'input',
    name: 'projectTests',
    message: 'Provide test descriptions for this app: (Required)',
    validate: contributeGuidelines => {
        if (contributeGuidelines) {
          return true;
        } else {
          console.log('Please provide test description!');
          return false;
        }
    }
  }
];

// Function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, err => {
      if(err) throw err;
      console.log('Readme Generated! Go to readme.md in the dist folder to see it!');
    });
}

// The init function prompts the user a series of questions stored in the array 'questions'
function init() {

  console.log(`
  =================
  Welcome to the ReadMe Generator! 
  Answer the following question prompts to feed information to the generator.
  =================
  `);
    return inquirer.prompt(questions);
}

// Function call to initialize app
init()
// The responses to the questions are stored in the answer object which is returned as a Promise.
// The inquirer.prompt method returns a Promise which we handle by way of the .then method
.then(userAnswers => {
    // console.log('Answers are: ', userAnswers);
    // use the generateMarkdown function to take the user responses and create the README.md sections etc
    return generateMarkdown(userAnswers);
})
.then(markdownContent => {
  writeToFile(`/Users/oluwafemiibikunle/Documents/GitHub/coursework/README-generator/README.md`, markdownContent);
})
.catch(err => {
    console.log('The error is: ', err);
});
