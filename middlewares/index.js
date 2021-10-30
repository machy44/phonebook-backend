const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  console.log(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({
      error: "malformatted id",
    });
  }
  if (error.name === "ValidationError") {
    return response.status(400).json({
      error: error.message,
    });
  }

  next(error); // default Express error handler.
};

module.exports = {
  unknownEndpoint,
  errorHandler,
};
