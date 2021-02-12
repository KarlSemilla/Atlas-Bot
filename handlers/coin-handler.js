const coin = require('coin-toss');

const flip = () => {
  return coin.toss();
};

const flipMessage = (msg) => {
  return msg;
};

module.exports = {
  flip,
  flipMessage,
};
