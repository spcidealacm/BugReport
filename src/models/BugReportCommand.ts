import * as vscode from "vscode";
import * as bugInfo from "../config/BugReportBar.json";
import { Command } from "../components/command";
import { Store } from "../store";
import { BarStatus } from "../models/BugReportBar";

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
    static webReady = false;
    static GenWeb() {
        return setTimeout(() => {
            vscode.window.showInformationMessage("Web Generate");
            MyEvent.webReady = true;
        }, MyEvent.GenWebTime * 1000);
    }
    static CleanWeb() {
        MyEvent.webReady = false;
    }
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

    protected wait(seconds: number) {
        Store.bar.load(); //Run from wait mode will put status into load mode first. then wait for work finish.
        MyEvent.webReady = false;
        return new Promise((resolve, reject) => {
            let handleWeb = MyEvent.GenWeb();
            let num = 0;
            let handle: NodeJS.Timeout = setInterval(() => {
                if (MyEvent.webReady) {
                    clearInterval(handle);
                    Store.bar.ready();
                } else if (num === seconds * 10) {
                    vscode.window.showInformationMessage("Time Out");
                    MyEvent.CleanWeb();
                    clearInterval(handle);
                    clearInterval(handleWeb);
                    Store.bar.wait();
                }
                num++;
            }, 100);

            MyEvent.eventEmitter.addListener("exit", () => {
                vscode.window.showInformationMessage("Work cancel.");
                MyEvent.CleanWeb();
                clearInterval(handle);
                clearInterval(handleWeb);
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
        vscode.window.showInformationMessage("Return to wait");
        Store.bar.wait();
    }

    protected default() {
        vscode.window.showErrorMessage("Error Bar status.");
        Store.bar.wait();
    }
}

export { BugReportCommand };
