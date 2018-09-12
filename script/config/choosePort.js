const detect = require('detect-port');
const chalk = require('chalk');
const clog = console.log;

const choosePort = PORT => {
  return detect(PORT)
    .then(
      port =>
        new Promise(resolve => {
          if (port === PORT) {
            return resolve(port);
          }
          clog(chalk.red('端口 ' + PORT + ' 已被占用'));
          resolve(null);
        })
    )
    .catch(err => {
      throw new Error(err);
    });
};

module.exports = choosePort;
