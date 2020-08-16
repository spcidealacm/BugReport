import * as vscode from "vscode";
import * as bugInfo from "../config/BugReportBar.json";
import * as statusbar from "../components/statusBar";

function getAlignment(alignment?: string): vscode.StatusBarAlignment{
    if(alignment === "left"){
        return vscode.StatusBarAlignment.Left;
    }else{
        return vscode.StatusBarAlignment.Right;
    }
}

class BugReportBar{
    private readonly _bar: statusbar.Bar;
    public get bar(): statusbar.Bar {
        return this._bar;
    }
    constructor(){
        this._bar = new statusbar.Bar(getAlignment(bugInfo.alignment), bugInfo.priority);
        this._bar.setBar(bugInfo.Load.command, bugInfo.Load.text, bugInfo.Load.color, bugInfo.Load.show);
        
    }
}