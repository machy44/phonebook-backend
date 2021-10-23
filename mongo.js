const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

if (process.argv.length === 4) {
  console.log(
    `Please provide the name and a number 
     as an argument: node mongo.js <password> <name> <phone-number>`
  );
  process.exit(1);
}

const password = process.argv[2];

const url = `
mongodb+srv://fullstack:${password}@cluster0.1c9fa.mongodb.net/phonebook-app?retryWrites=true&w=majority`;

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 3) {
  mongoose.connect(url);
  Person.find().then((result) => {
    console.log("phonebook:");
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
    process.exit(1);
  });
}

const name = process.argv[3];
const number = process.argv[4];

const person = new Person({
  name,
  number,
});

if (name && number) {
  mongoose.connect(url);
  person.save().then((result) => {
    console.log(result);
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
}
