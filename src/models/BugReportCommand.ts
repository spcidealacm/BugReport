import * as vscode from "vscode";
import * as bugInfo from "../config/BugReportBar.json";
import { Command } from "../components/command";
import { Store } from "../store";
import { BarStatus } from "../models/BugReportBar";
import { BugReportWeb } from "../models/BugReportWeb";

function sleep(seconds: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, seconds * 1000);
    });
}

class MyEvent {
    static GenWebTime = 3;
    static WaitTime = 5;
    static events = require("events");
    static eventEmitter = new MyEvent.events.EventEmitter();
}

class BugReportCommand extends Command {
    constructor() {
        super(Store.context, bugInfo.command);
    }
    protected command() {
        switch (Store.bar.status) {
            case BarStatus.wait: // Run Bug Report command from wait status.
                this.wait(MyEvent.WaitTime);
                break;
            case BarStatus.load: // Run Bug Report command from load status.
                this.load();
                break;
            case BarStatus.ready: // Run Bug Report command from ready status.
                this.ready();
                break;
            default:
                this.default();
                break;
        }
    }

    protected prepare(): boolean {
        if (!vscode.workspace.rootPath) {
            return false;
        }
        return true;
    }

    protected wait(seconds: number) {
        if (!this.prepare()) {
            vscode.window.showErrorMessage("Please open a folder.");
            return;
        }
        Store.bar.load(); //Run from wait mode will put status into load mode first. then wait for work finish.
        new BugReportWeb();
        return new Promise((resolve, reject) => {
            let num = 0;
            let handle: NodeJS.Timeout = setInterval(() => {
                if (Store.web.isReady()) {
                    clearInterval(handle);
                    Store.bar.ready();
                } else if (num === seconds * 10) {
                    vscode.window.showInformationMessage("Time Out");
                    Store.web.delete();
                    clearInterval(handle);
                    Store.bar.wait();
                }
                num++;
            }, 100);

            MyEvent.eventEmitter.addListener("exit", () => {
                vscode.window.showInformationMessage("Work Cancel.");
                Store.web.delete();
                clearInterval(handle);
                reject();
            });
        });
    }

    protected load() {
        let promise = vscode.window.showInformationMessage(
            "Waiting for loading...",
            "WAIT LOAD",
            "CANCEL"
        );
        promise.then(function (result) {
            if (Store.bar.isLoad() && result === "CANCEL") {
                MyEvent.eventEmitter.emit("exit");
                Store.bar.wait();
            }
        });
    }

    protected ready() {
        Store.bar.wait();
        Store.web.delete();
    }

    protected default() {
        vscode.window.showErrorMessage("Error Bar status.");
        Store.bar.wait();
    }
}

export { BugReportCommand };
