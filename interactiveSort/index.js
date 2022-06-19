const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let string;

const arrayStr = (str) => {
  const arrStr = str.split(' ');
  return arrStr;
};

const sortWordsOrNumber = (arr) => {
  let arrNumbers = [];
  let arrWords = [];

  arr.forEach((el) => {
    if (Number(el)) {
      arrNumbers.push(Number(el));
    } else {
      arrWords.push(el);
    }
  });

  return { arrNumbers, arrWords };
};

const operationSelection = (operationNuber) => {
  rl.question(
    'What operation do you want to perform? \n' +
      '\n' +
      '1. Sort words alphabetically \n' +
      '2. Display numbers from smallest to largest \n' +
      '3. Display numbers from largest to smallest  \n' +
      '4. Display words in ascending order by the number of letters in a word  \n' +
      '5. Show only unique words \n' +
      '6. Show only unique values ​​from the entire set of words and numbers entered by the user \n' +
      '\n' +
      'Enter a number from 1 to 6 or "exit" to exit the application: ',

    (operationNuber) => {
      switch (operationNuber) {
        case 'exit':
          process.exit(0);
          break;
        case '1':
          console.log(sortWordsOrNumber(arrayStr(string)).arrWords.sort());
          break;
        case '2':
          console.log(
            sortWordsOrNumber(arrayStr(string))
              .arrNumbers.sort((a, b) => b - a)
              .reverse()
          );
          break;
        case '3':
          console.log(
            sortWordsOrNumber(arrayStr(string)).arrNumbers.sort((a, b) => b - a)
          );
          break;
        case '4':
          console.log(
            sortWordsOrNumber(arrayStr(string)).arrWords.sort(
              (a, b) => a.length - b.length
            )
          );
          break;
        case '5':
          console.log(new Set(sortWordsOrNumber(arrayStr(string)).arrWords));
          break;
        case '6':
          console.log(new Set(arrayStr(string)));
          break;
      }
      operationSelection();
    }
  );
};
rl.question('Hello! Enter 10 words or numbers WITHOUT SPACE: ', (str) => {
  string = str;
  operationSelection();
});
