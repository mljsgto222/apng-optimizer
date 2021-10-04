const { defineConfig } = require('vite');

module.exports = defineConfig({
    build: {
        lib: {
            entry: './src/index.ts',
            name: 'apng-optimizer'
        }     
    }
});