import {RealtimeServer} from "./libs/poolws";
const http = require("http");
const fs = require("fs");
const express = require("express");
const app = express();
export const conf = JSON.parse(fs.readFileSync(__dirname + "/config.json", "utf8"));
export class App {
    constructor() {
        app.use(express.static(__dirname+'/web'));
        this.start();
        console.log('[!] Oniric Server Loaded');
        console.log('[!] Realtime and Rest-Api are Listening on: '+ conf.host + ':' + conf.port);
        console.log('[!] Pool Host: '+conf.pool);
        console.log('[!] XMR Wallet: ' + conf.addr);
        console.log(`[!] Daemon start. PID: ${process.pid}\n`);
    }
    private start(): void{
        app.get('/', (req, res)=>{
            res.setHeader("Access-Control-Allow-Origin", "*");
            console.log(req.body);
            res.send({message: 'Hi'});
        });
        const web = http.createServer(app);
        RealtimeServer(web);
        web.listen(conf.port,conf.domain);
    }
}
new App();