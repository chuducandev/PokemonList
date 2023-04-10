module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
        [
            'module-resolver',
            {
                root: ['./src'],
                extensions: ['.ts', '.tsx', '.js', '.json'],
                alias: {
                    '@pokemon': './src',
                },
            },
        ],
        ['@babel/plugin-proposal-export-namespace-from'],
    ],
};
