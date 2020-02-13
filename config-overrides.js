module.exports = (config, env) => {
    require('react-app-rewire-postcss')(config, true);

    return config;
};