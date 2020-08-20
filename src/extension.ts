import * as vscode from "vscode";
import { StoreInfo } from "./storeInfo";
import { BugReportBar } from "./models/BugReportBar";
import { BugReportCommand } from "./models/BugReportCommand";

export function activate(context: vscode.ExtensionContext) {
    StoreInfo.extensionContext = context;
    StoreInfo.bugReportBar = new BugReportBar();
    StoreInfo.bugReportCommand = new BugReportCommand();
}

export function deactivate() {}
