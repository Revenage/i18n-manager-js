const config = {
    development: {},
    production: {},
};

module.exports = config[process.env.NODE_ENV];
