const express = require("express");
const generateId = require("./utils.js").generateId;
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

const Person = require("./modules/person");

require.dotE;

const app = express();

app.use(cors());
app.use(express.static("build"));
app.use(express.json());

morgan.token("body", (req, res) => JSON.stringify(req.body));

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms  :body")
);

app.get("/api/persons", (request, response) => {
  Person.find().then((persons) => {
    response.json(persons);
  });
});

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id).then((person) => {
    response.json(person);
  });
});

app.delete("/api/persons/:id", (request, response) => {
  Person.deleteOne({ _id: request.params.id }).then(() => {
    response.status(204).end();
  });
});

app.post("/api/persons", async (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "the name or number is missing",
    });
  }

  const isPersonExists = await Person.findOne({ name: body.name });

  if (isPersonExists) {
    return response.status(409).json({
      error: "name must be unique",
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

app.get("/info", (request, response) => {
  Person.count().then((res) => {
    response.send(`
      <p>Phoneboook has info for ${res} people</p>
      <p>${new Date()}</p>
      `);
  });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
