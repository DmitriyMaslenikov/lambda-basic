const path = require('path');
const fs = require('fs/promises');
const filePath = path.join(__dirname, '../data/db.txt');

const readFile = () => {
  return fs.readFile(filePath, 'utf-8');
};

const writeFile = (content) => {
  return fs.writeFile(filePath, content, { flag: 'a+' });
};
module.exports = { readFile, writeFile };
