import * as vscode from "vscode";
import { BugReportBar } from "./models/BugReportBar";
import { BugReportCommand } from "./models/BugReportCommand";
import { BugReportWebPanel } from "./models/BugReportWebPanel";
import { BugReportTerminial } from "./models/BugReportTerminial";

class StoreInfo {
    private static _extensionContext: vscode.ExtensionContext;
    private static _bugReportBar: BugReportBar;
    private static _bugReportCommand: BugReportCommand;
    private static _bugReportWebPanel: BugReportWebPanel;
    private static _bugReportTerminial: BugReportTerminial;
    public static get bugReportTerminial(): BugReportTerminial {
        return StoreInfo._bugReportTerminial;
    }
    public static set bugReportTerminial(value: BugReportTerminial) {
        StoreInfo._bugReportTerminial = value;
    }

    public static get bugReportWebPanel(): BugReportWebPanel {
        return StoreInfo._bugReportWebPanel;
    }
    public static set bugReportWebPanel(value: BugReportWebPanel) {
        StoreInfo._bugReportWebPanel = value;
    }
    public static get bugReportCommand(): BugReportCommand {
        return StoreInfo._bugReportCommand;
    }
    public static set bugReportCommand(value: BugReportCommand) {
        StoreInfo._bugReportCommand = value;
    }
    public static get bugReportBar(): BugReportBar {
        return StoreInfo._bugReportBar;
    }
    public static set bugReportBar(value: BugReportBar) {
        StoreInfo._bugReportBar = value;
    }
    public static get extensionContext(): vscode.ExtensionContext {
        return StoreInfo._extensionContext;
    }
    public static set extensionContext(value: vscode.ExtensionContext) {
        StoreInfo._extensionContext = value;
    }
}

function StartActive(context: vscode.ExtensionContext) {
    StoreInfo.extensionContext = context;
    StoreInfo.bugReportBar = new BugReportBar();
    StoreInfo.bugReportCommand = new BugReportCommand();
    StoreInfo.bugReportTerminial = new BugReportTerminial();
}

function ClearStore() {
    if(StoreInfo.bugReportTerminial){
        StoreInfo.bugReportTerminial.RemoveTerminial();
    }
    if (StoreInfo.bugReportWebPanel) {
        StoreInfo.bugReportWebPanel.deletePanel();
    }
}

export { StoreInfo, StartActive, ClearStore };
