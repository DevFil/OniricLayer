import {RealtimeServer} from "./libs/poolws";
import {readFiles,distributeFiles} from "./libs/fileHelper";
const http = require("http");
const fs = require("fs");
export const conf = JSON.parse(fs.readFileSync(__dirname + "/config.json", "utf8"));
export class App {
    public result = {};
    public fileLists = ["/miner.html", "/lib/Oniric.min.js", "/lib/cryptonight.js", "/lib/cryptonight.wasm"];
    constructor() {
        this.result = readFiles(this.fileLists,conf,__dirname);
        this.start();
        console.log('[!] Oniric Server Loaded');
        console.log('[!] Realtime server Listen on: '+ conf.lhost + ':' + conf.lport);
        console.log('[!] Pool Host: '+conf.pool);
        console.log('[!] XMR Wallet: ' + conf.addr);
        console.log(`[!] Daemon start. PID: ${process.pid}\n`);
    }
    private start(): void{
        let stats = (req, res) => {
            req.url = req.url === "/" ? "/miner.html" : req.url;
            res.setHeader("Access-Control-Allow-Origin", "*");
            distributeFiles(req,res);
            res.end(this.result[req.url]);
        };
        const web = http.createServer(stats);
        RealtimeServer(web);
        web.listen(conf.lport, conf.lhost);
    }
}
new App();