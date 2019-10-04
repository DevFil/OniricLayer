import {conf} from "../app";
import {packetStream, poolStream} from "./interfaces";
const WebSocket = require("ws");
const net = require("net");


export function rand(n: number) {
    let chars = "01234567890ABCDEF";
    let res = "";
    for (let i = 0; i < n; i++) {
        let id = Math.ceil(Math.random() * (chars.length - 1));
        res += chars[id];
    }
    return res;
}

export function RealtimeServer(web: any): void{
    const srv = new WebSocket.Server({
        server: web,
        path: "/proxy",
        maxPayload: 1024
    });
    srv.on("connection", (ws, req) => {
        let conn:packetStream = {
            uid: null,
            pid: rand(16).toString(),
            uip: getClientIp(req),
            workerId: null,
            found: 0,
            accepted: 0,
            ws: ws,
            pl: new net.Socket()
        };
        let pool = conf.pool.split(":");
        conn.pl.connect(
            pool[1],
            pool[0]
        );
        conn.ws.on("message", data => {
            ws2pool(conn, data);
            console.log("[>] Request: " + " ( " + conn.uip + " )" + "\n\n" + data + "\n");
        });
        conn.ws.on("error", data => {
            console.log("[!] "  + " ( " + conn.uip + " )" + " WebSocket " + data + "\n");
            conn.pl.destroy();
        });
        conn.ws.on("close", () => {
            console.log("[!] "  + " ( " + conn.uip + " )" + " offline.\n");
            conn.pl.destroy();
        });
        conn.pl.on("data", function(data) {
            let linesdata = data;
            let lines = String(linesdata).split("\n");
            if (lines[1].length > 0) {
                console.log("[<] Response: " + " ( " + conn.uip + " )" + "\n\n" + lines[0] + "\n");
                console.log("[<] Response: " + " ( " + conn.uip + " )" + "\n\n" + lines[1] + "\n");
                pool2ws(conn, lines[0]);
                pool2ws(conn, lines[1]);
            } else {
                console.log("[<] Response: " + " ( " + conn.uip + " )" + "\n\n" + data + "\n");
                pool2ws(conn, data);
            }
        });
        conn.pl.on("error", data => {
            console.log("PoolSocket " + data + "\n");
            if (conn.ws.readyState !== 3) {
                conn.ws.close();
            }
        });
        conn.pl.on("close", () => {
            console.log("PoolSocket Closed.\n");
            if (conn.ws.readyState !== 3) {
                conn.ws.close();
            }
        });
    });
}


export function getClientIp(req): any {
    let theIp =
        req.headers["x-forwarded-for"] ||
        req.headers["x-real-ip"] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
    return theIp;
}

export function ws2pool(conn, data) {
    let buf: poolStream;
    data = JSON.parse(data);
    switch (data.type) {
        case "auth": {
            conn.uid = data.params.userID || "Anonymous";
            buf = {
                method: "login",
                params: {
                    login: conf.addr,
                    pass: conf.pass,
                    rigid: "",
                    agent: "oniric"
                },
                id: conn.pid
            };
            conn.pl.write(JSON.stringify(buf) + "\n");
            console.log('[!] Websocket to XMR Pool'+ JSON.stringify(buf) + "\n" + "\n");
            break;
        }
        case "submit": {
            conn.found++;
            buf = {
                method: "submit",
                params: {
                    id: conn.workerId,
                    job_id: data.params.job_id,
                    nonce: data.params.nonce,
                    result: data.params.result
                },
                id: conn.pid
            };
            conn.pl.write(JSON.stringify(buf) + "\n");
            console.log('[!] Websocket to XMR Pool'+ JSON.stringify(buf) + "\n" + "\n");
            break;
        }
    }
}
// Trans PoolSocket to WebSocket
export function pool2ws(conn, data) {
    try {
        let buf: poolStream;
        data = JSON.parse(data);
        if (data.id === conn.pid && data.result) {
            if (data.result.id) {
                conn.workerId = data.result.id;
                buf = {
                    type: "authed",
                    params: {
                        hashes: conn.accepted
                    }
                };
                console.log('[!] XMR Pool to WebSocket  '+ JSON.stringify(buf) + "\n");
                conn.ws.send(JSON.stringify(buf));
                buf = {
                    type: "job",
                    params: data.result.job
                };
                console.log('[!] XMR Pool to WebSocket  '+ JSON.stringify(buf) + "\n");
                conn.ws.send(JSON.stringify(buf));
            } else if (data.result.status === "OK") {
                conn.accepted++;
                buf = {
                    type: "hash_accepted",
                    params: {
                        hashes: conn.accepted
                    }
                };
                console.log('[!] XMR Pool to WebSocket  '+ JSON.stringify(buf) + "\n");
                conn.ws.send(JSON.stringify(buf));
            }
        }
        if (data.id === conn.pid && data.error) {
            if (data.error.code === -1) {
                buf = {
                    type: "error",
                    params: {
                        error: data.error.message
                    }
                };
            } else {
                buf = {
                    type: "banned",
                    params: {
                        banned: conn.pid
                    }
                };
            }
            console.log('[!] XMR Pool to WebSocket  '+ JSON.stringify(buf) + "\n");
            conn.ws.send(JSON.stringify(buf));
        }
        if (data.method === "job") {
            buf = {
                type: "job",
                params: data.params
            };
            console.log('[!] XMR Pool to WebSocket  '+ JSON.stringify(buf) + "\n");
            conn.ws.send(JSON.stringify(buf));

        }
    } catch (error) {
        console.warn("[!] Error: " + error.message);
    }
}