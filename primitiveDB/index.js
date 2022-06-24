const inquirer = require('inquirer');

const file = require('./service/fileService');

const prompt = inquirer.createPromptModule();
const questionsInputUser = [
  {
    type: 'input',
    name: 'name',
    message: "Enter the user's name. To cancel press ENTER:",
  },
  {
    type: 'list',
    name: 'gender',
    message: 'Choose your Gender',
    default: 'male',
    choices: ['female', 'male'],
    when: (answers) => answers.name !== '',
  },
  {
    type: 'number',
    name: 'age',
    message: 'Enter yourgggfd age ',
    when: (answers) => answers.name !== '',
  },
];

(async () => {
  let user, answer, db, arrUsers;

  do {
    user = await prompt(questionsInputUser);

    if (user.name !== '') {
      await file.writeFile(JSON.stringify(user) + '\n');
    } else {
      db = await file.readFile();
      arrUsers = db.split('\n').filter((element) => element !== '');
      console.log(arrUsers);
    }
  } while (user.name !== '');
  answer = await prompt({
    type: 'confirm',
    name: 'answer',
    message: 'Find user by name in BD?',
  });
  if (answer.answer) {
    const searchedUser = await prompt({
      type: 'input',
      name: 'name',
      message: "Enter the user's name.",
    });
    let search = 'No such user';
    arrUsers.forEach((element) => {
      if (JSON.parse(element).name === searchedUser.name) {
        search = element;
      }
    });
    console.log(search);
  } else {
    process.exit();
  }
})();
