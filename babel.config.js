module.exports = {
    presets: [
        "@babel/preset-typescript",
        ['@babel/preset-env', { targets: { node: 'current' } }],
    ],
    plugins: [
        ['module-resolver', {
            alias: {
                "@modules": "./src/modules",
                "@config": "./src/config",
                "@shared": "./src/shared"
            }
        }],
        "babel-plugin-transform-typescript-metadata",
        ["@babel/plugin-proposal-decorators", { "legacy": true }],
        ["@babel/plugin-proposal-class-properties", { "loose": true }],
    ],
}
