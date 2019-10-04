export const fs = require("fs");
export function readFiles(files: string[], conf: any, dir: string): any {
    let result = {};
    for (let i = 0; i < files.length; i++) {
        let currentFile = files[i];
        if (files[i].match(/\.wasm$/)) {
            result[currentFile] = fs
                .readFileSync(dir + "/web" + currentFile, null);
        } else {
            result[currentFile] = fs
                .readFileSync(dir + "/web" + currentFile, "utf8")
                .replace(/%oniric%/g, conf.domain);
        }
    }
    return result;
}

export function distributeFiles(req: any,res: any): any{
    if (req.url.match(/\.js/)) {
        return res.setHeader("Content-Type", "application/javascript");
    } else if (req.url.match(/\.html$/)) {
        return res.setHeader("Content-Type", "text/html");
    } else if (req.url.match(/\.wasm$/)) {
        return res.setHeader("Content-Type", "application/wasm");
    } else {
        return res.setHeader("Content-Type", "application/octet-stream");
    }
}