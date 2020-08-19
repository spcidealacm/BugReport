import * as vscode from "vscode";
import * as bugInfo from "../config/BugReportBar.json";
import * as statusbar from "../components/statusBar";
import { Store } from "../store";

enum BarStatus {
    wait,
    load,
    ready,
}

function getAlignment(alignment?: string): vscode.StatusBarAlignment {
    if (alignment === "left") {
        return vscode.StatusBarAlignment.Left;
    } else {
        return vscode.StatusBarAlignment.Right;
    }
}

class BugReportBar extends statusbar.Bar {
    protected _status: BarStatus;
    public get status(): BarStatus {
        return this._status;
    }
    constructor() {
        // super(Store.context, getAlignment(bugInfo.alignment), bugInfo.priority);
        super(Store.context);
        this._status = BarStatus.wait;
        this.wait();
    }
    protected setStatus(status: BarStatus) {
        this._status = status;
        let obj;
        switch (status) {
            case BarStatus.wait:
                obj = bugInfo.wait;
                break;
            case BarStatus.load:
                obj = bugInfo.load;
                break;
            case BarStatus.ready:
                obj = bugInfo.ready;
                break;
            default:
                obj = bugInfo.wait;
                break;
        }
        super.setBar(bugInfo.command, obj.text, obj.color, true);
    }

    public wait() {
        this.setStatus(BarStatus.wait);
    }

    public load() {
        this.setStatus(BarStatus.load);
    }

    public ready() {
        this.setStatus(BarStatus.ready);
    }

    public isWait(): boolean {
        if (BarStatus.wait === this.status) {
            return true;
        }
        return false;
    }

    public isLoad(): boolean {
        if (BarStatus.load === this.status) {
            return true;
        }
        return false;
    }

    public isReady(): boolean {
        if (BarStatus.ready === this.status) {
            return true;
        }
        return false;
    }
}

export { BarStatus, BugReportBar };
