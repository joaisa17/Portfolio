const { alias } = require('react-app-rewire-alias');

module.exports = function override(config) {
    alias({
        '@Components/*': 'src/Components',
        '@Media': 'src/Media',

        '@css': 'src/css',
        '@js': 'src/js'
    })(config);

    return config;
}