import * as vscode from "vscode";
import { BugReportBar } from "./models/BugReportBar";
import { BugReportCommand } from "./models/BugReportCommand";
import { BugReportWebPanel } from "./models/BugReportWebPanel";
import { BugReportTerminial } from "./models/BugReportTerminial";
import { SVFBuildCommand } from "./models/SVFBuildCommand";
import { SVFBarType, SVFBuildBar } from "./models/SVFBuildBar";

class StoreInfo {
    private static _extensionContext: vscode.ExtensionContext;
    private static _bugReportBar: BugReportBar;
    private static _bugReportCommand: BugReportCommand;
    private static _bugReportWebPanel: BugReportWebPanel;
    private static _bugReportTerminial: BugReportTerminial;
    private static _svfOpenConfigCommand: SVFBuildCommand;
    private static _svfBuildSvfExCommand: SVFBuildCommand;
    private static _svfOpenConfigBar: SVFBuildBar;
    private static _svfBuildSvfExBar: SVFBuildBar;
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
    public static get svfOpenConfigCommand(): SVFBuildCommand {
        return StoreInfo._svfOpenConfigCommand;
    }
    public static set svfOpenConfigCommand(value: SVFBuildCommand) {
        StoreInfo._svfOpenConfigCommand = value;
    }
    public static get svfBuildSvfExCommand(): SVFBuildCommand {
        return StoreInfo._svfBuildSvfExCommand;
    }
    public static set svfBuildSvfExCommand(value: SVFBuildCommand) {
        StoreInfo._svfBuildSvfExCommand = value;
    }
    public static get svfOpenConfigBar(): SVFBuildBar {
        return StoreInfo._svfOpenConfigBar;
    }
    public static set svfOpenConfigBar(value: SVFBuildBar) {
        StoreInfo._svfOpenConfigBar = value;
    }
    public static get svfBuildSvfExBar(): SVFBuildBar {
        return StoreInfo._svfBuildSvfExBar;
    }
    public static set svfBuildSvfExBar(value: SVFBuildBar) {
        StoreInfo._svfBuildSvfExBar = value;
    }
}

function StartActive(context: vscode.ExtensionContext) {
    StoreInfo.extensionContext = context;
    StoreInfo.bugReportBar = new BugReportBar();
    StoreInfo.bugReportCommand = new BugReportCommand();
    StoreInfo.bugReportTerminial = new BugReportTerminial();
    StoreInfo.svfOpenConfigCommand = new SVFBuildCommand(SVFBarType.OpenConifg);
    StoreInfo.svfBuildSvfExCommand = new SVFBuildCommand(SVFBarType.BuildSvfEx);
    StoreInfo.svfOpenConfigBar = new SVFBuildBar(SVFBarType.OpenConifg);
    StoreInfo.svfBuildSvfExBar = new SVFBuildBar(SVFBarType.BuildSvfEx);
    // StoreInfo.svfOpenConfigBar.setShow(false);
    // StoreInfo.svfBuildSvfExBar.setShow(false);
}

function ClearStore() {
    if (StoreInfo.bugReportTerminial) {
        StoreInfo.bugReportTerminial.RemoveTerminial();
    }
    if (StoreInfo.bugReportWebPanel) {
        StoreInfo.bugReportWebPanel.deletePanel();
    }
    // StoreInfo.svfOpenConfigBar.setShow(false);
    // StoreInfo.svfBuildSvfExBar.setShow(false);
}

export { StoreInfo, StartActive, ClearStore };
