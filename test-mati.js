const { readFile } = require("graceful-fs");
const js = require("./");

const file = "./jsontest.json";

const data1 = {
  name: "Luffy",
  age: 19,
  ocuppation: "Pirate King",
};

const data2 = {
  name: "Zoro",
  age: 21,
  occupation: "World's Greatest Swordsman",
};

js.writeFileSync(file, data2);

console.log(js.readFileSync(file));

js.writeFile(file, data1, (err) => {
  if (err) throw err;
});

js.readFile(file, (err, obj) => {
  if (err) throw err;
  console.log(obj);
});
