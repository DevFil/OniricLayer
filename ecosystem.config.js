const fs = require("fs");
const conf = JSON.parse(fs.readFileSync(__dirname + "/dist/build/config.json", "utf8"));
module.exports = {
    apps : [{
        name: conf.name,
        script: "./dist/build/app.js",
        instances: 1,
        exec_mode : "cluster",
        autorestart: true,
        watch: true,
        ignore_watch : ["node_modules"],
        watch_options: {
            "followSymlinks": false
        },
        max_memory_restart: '1G',
        env: {
            NODE_ENV: "development",
        },
        env_production: {
            NODE_ENV: "production",
        }
    }]
};
