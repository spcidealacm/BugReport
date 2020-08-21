import * as vscode from "vscode";
import { StoreInfo } from "./storeInfo";
import { BugReportBar } from "./models/BugReportBar";
import { BugReportCommand } from "./models/BugReportCommand";
import { BugReportRunScripts } from "./models/BugReportRunScripts";

export function activate(context: vscode.ExtensionContext) {
    StoreInfo.extensionContext = context;
    StoreInfo.bugReportBar = new BugReportBar();
    StoreInfo.bugReportCommand = new BugReportCommand();
    let runScripts = new BugReportRunScripts();
    runScripts.setEnv();
}

export function deactivate() {}
