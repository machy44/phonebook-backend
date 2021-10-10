const generateId = () => {
  return Math.floor(Math.random() * Date.now());
};

module.exports = {
  generateId,
};
