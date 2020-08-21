import * as vscode from "vscode";
let exec = require("child_process").exec;

class RunScripts {
    public runCommand(cli: string) {
        exec(cli, (err: boolean, stdout: string, stderr: string) => {
            if (err) {
                console.log(err);
                return false;
            } else {
                console.log("stdout: " + stdout);
                console.log("stderr: " + stderr);
            }
        });
    }
}

export { RunScripts };
