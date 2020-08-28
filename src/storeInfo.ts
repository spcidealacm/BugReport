import * as vscode from "vscode";
import { BugReportBar } from "./models/BugReportBar";
import { BugReportCommand } from "./models/BugReportCommand";
import { BugReportWebPanel } from "./models/BugReportWebPanel";
import { BugReportTerminal } from "./models/BugReportTerminal";
import { SVFBuildCommand } from "./models/SVFBuildCommand";
import { InstallEnvCommand } from "./models/InstallEnvCommand";
import { SVFBarType, SVFBuildBar } from "./models/SVFBuildBar";
import * as BarInfo from "./config/SVFBuildBar.json";
import * as fs from "fs";
import * as path from "path";
import { exec } from "child_process";

class StoreInfo {
    private static _extensionContext: vscode.ExtensionContext;
    private static _bugReportBar: BugReportBar;
    private static _bugReportCommand: BugReportCommand;
    private static _bugReportWebPanel: BugReportWebPanel;
    private static _bugReportTerminal: BugReportTerminal;
    private static _targetTerminal: BugReportTerminal;
    private static _svfOpenConfigCommand: SVFBuildCommand;
    private static _svfBuildSvfExCommand: SVFBuildCommand;
    private static _targetBuildCommand: SVFBuildCommand;
    private static _installEnvCommand: InstallEnvCommand;
    private static _svfOpenConfigBar: SVFBuildBar;
    private static _svfBuildSvfExBar: SVFBuildBar;
    private static _targetBuildBar: SVFBuildBar;
    private static _installEnvBar: SVFBuildBar;
    public static get installEnvBar(): SVFBuildBar {
        return StoreInfo._installEnvBar;
    }
    public static set installEnvBar(value: SVFBuildBar) {
        StoreInfo._installEnvBar = value;
    }
    private static _OpenFixFlag: string = "./OpenFileFlag.json";
    public static get OpenFixFlag(): string {
        return StoreInfo._OpenFixFlag;
    }
    public static set OpenFixFlag(value: string) {
        StoreInfo._OpenFixFlag = value;
    }

    public static get bugReportTerminal(): BugReportTerminal {
        return StoreInfo._bugReportTerminal;
    }
    public static set bugReportTerminal(value: BugReportTerminal) {
        StoreInfo._bugReportTerminal = value;
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
    public static get targetBuildCommand(): SVFBuildCommand {
        return StoreInfo._targetBuildCommand;
    }
    public static set targetBuildCommand(value: SVFBuildCommand) {
        StoreInfo._targetBuildCommand = value;
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
    public static get targetBuildBar(): SVFBuildBar {
        return StoreInfo._targetBuildBar;
    }
    public static set targetBuildBar(value: SVFBuildBar) {
        StoreInfo._targetBuildBar = value;
    }
    public static get targetTerminal(): BugReportTerminal {
        return StoreInfo._targetTerminal;
    }
    public static set targetTerminal(value: BugReportTerminal) {
        StoreInfo._targetTerminal = value;
    }
    public static get installEnvCommand(): InstallEnvCommand {
        return StoreInfo._installEnvCommand;
    }
    public static set installEnvCommand(value: InstallEnvCommand) {
        StoreInfo._installEnvCommand = value;
    }
}

function StartActive(context: vscode.ExtensionContext) {
    StoreInfo.extensionContext = context;
    StoreInfo.bugReportBar = new BugReportBar();
    StoreInfo.bugReportCommand = new BugReportCommand();
    // StoreInfo.bugReportTerminal = new BugReportTerminal();
    StoreInfo.svfOpenConfigCommand = new SVFBuildCommand(SVFBarType.OpenConifg);
    StoreInfo.svfBuildSvfExCommand = new SVFBuildCommand(SVFBarType.BuildSvfEx);
    StoreInfo.targetBuildCommand = new SVFBuildCommand(SVFBarType.BuildTarget);
    StoreInfo.installEnvCommand = new InstallEnvCommand();
    StoreInfo.svfOpenConfigBar = new SVFBuildBar(
        SVFBarType.OpenConifg,
        BarInfo.OpenConifg.priority
    );
    StoreInfo.svfBuildSvfExBar = new SVFBuildBar(
        SVFBarType.BuildSvfEx,
        BarInfo.BuildSvfEx.priority
    );
    StoreInfo.targetBuildBar = new SVFBuildBar(
        SVFBarType.BuildTarget,
        BarInfo.BuildTarget.priority
    );
    StoreInfo.installEnvBar = new SVFBuildBar(
        SVFBarType.InstallEnv,
        BarInfo.InstallEnv.priority
    );
    OpenFixFile();
    SetBar();
    setInterval(() => {
        SetBar();
    }, 1000);
    // getCommand();
}

function SetBar() {
    if (CheckEnv()) {
        StoreInfo.installEnvBar.setShow(false);
        StoreInfo.svfOpenConfigBar.setShow(true);
        StoreInfo.svfBuildSvfExBar.setShow(true);
        StoreInfo.targetBuildBar.setShow(true);
        StoreInfo.bugReportBar.setShow(true);
    } else {
        StoreInfo.installEnvBar.setShow(true);
        StoreInfo.svfOpenConfigBar.setShow(false);
        StoreInfo.svfBuildSvfExBar.setShow(false);
        StoreInfo.targetBuildBar.setShow(false);
        StoreInfo.bugReportBar.setShow(false);
    }
}

function getCommand() {
    vscode.commands.getCommands().then(function (results) {
        console.log(results);
        if (!vscode.workspace.rootPath) {
            return;
        }
        let logPath = path.join(vscode.workspace.rootPath, "getCommand.log");
        results.forEach(function (result) {
            fs.appendFileSync(logPath, result + "\n");
        });
    });
}

function OpenFixFile() {
    console.log("OpenFixFile");
    let configPath = path.join(
        StoreInfo.extensionContext.extensionPath,
        StoreInfo.OpenFixFlag
    );
    if (fs.existsSync(configPath)) {
        console.log("OpenFixFile");
        let targetFile: string = BarInfo.BuildTarget.path;
        let rootPath = vscode.workspace.rootPath;
        if (!rootPath) {
            return;
        }
        let targetPath: string = path.join(rootPath, targetFile);
        StoreInfo.svfOpenConfigCommand.showTarget(targetPath);
    }
    ChangeInputFileStatus(false);
}

function CheckEnv() {
    let svf_backend = path.join(
        StoreInfo.extensionContext.extensionPath,
        BarInfo.OpenConifg.folder
    );
    if (
        Check("/usr/bin/llvm") &&
        Check("/usr/bin/svf-ex") &&
        Check("/usr/bin/svf-graph") &&
        Check(svf_backend)
    ) {
        return true;
    }
    return false;
}

function Check(path: string) {
    return fs.existsSync(path);
}

function ChangeInputFileStatus(status: boolean) {
    console.log("status: ", status);
    let configPath = path.join(
        StoreInfo.extensionContext.extensionPath,
        StoreInfo.OpenFixFlag
    );
    if (fs.existsSync(configPath) && !status) {
        fs.unlinkSync(configPath);
    } else if (!fs.existsSync(configPath) && status) {
        let cmd = `touch ${configPath}`;
        exec(cmd);
    }
}

function ClearStore() {
    if (StoreInfo.bugReportTerminal) {
        StoreInfo.bugReportTerminal.RemoveTerminal();
    }
    if (StoreInfo.bugReportWebPanel) {
        StoreInfo.bugReportWebPanel.deletePanel();
    }
    // StoreInfo.svfOpenConfigBar.setShow(false);
    // StoreInfo.svfBuildSvfExBar.setShow(false);
}

export { StoreInfo, StartActive, ClearStore, ChangeInputFileStatus, CheckEnv };
