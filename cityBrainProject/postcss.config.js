module.exports = {
    plugins: [
        require('autoprefixer')({
            "browsersList": {
                "production": [
                    ">0.2%",
                    "not dead",
                    "not op_mini all"
                ],
                "development": [
                    "last 1 chrome version",
                    "last 1 firefox version",
                    "last 1 safari version",
                    "last 1 ie version"
                ]
            }
            // [
            //     "defaults",
            //     "not ie < 11",
            //     "last 2 versions",
            //     "> 1%",
            //     "iOS 7",
            //     "last 3 iOS versions"
            // ]
        })
    ]
};