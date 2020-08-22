import * as vscode from "vscode";
import * as svfInfo from "../config/SVFBuildBar.json";
import { BasicCommand } from "../components/command";
import { SVFBarType } from "./SVFBuildBar";
import { StoreInfo } from "../storeInfo";
import * as path from "path";
import * as fs from "fs";
import { setTimeout } from "timers";
import { BugReportTerminial } from "./BugReportTerminial";

class SVFBuildCommand extends BasicCommand {
    protected barType: SVFBarType | undefined;
    constructor(barType: SVFBarType) {
        let command: string = "";
        switch (barType) {
            case SVFBarType.OpenConifg:
                command = svfInfo.OpenConifg.command;
                break;
            case SVFBarType.BuildSvfEx:
                command = svfInfo.BuildSvfEx.command;
                break;
            default:
                vscode.window.showErrorMessage("Register Command Error.");
                console.log(`[Register Error] SVF barType: ${barType}`);
                return;
        }
        super(StoreInfo.extensionContext, command);
        this.barType = barType;
    }
    protected exeCommand() {
        switch (this.barType) {
            case SVFBarType.OpenConifg:
                this.OpenConfigCommand();
                break;
            case SVFBarType.BuildSvfEx:
                this.BuildSvfExCommand();
                break;
            default:
                vscode.window.showErrorMessage("Run Command Error.");
                console.log(`[Run Command Error] SVF barType: ${this.barType}`);
                return;
        }
    }
    protected OpenConfigCommand() {
        if (!vscode.workspace.rootPath) {
            vscode.window.showErrorMessage("Please open a folder.");
            return;
        }
        let rootPath = vscode.workspace.rootPath;
        let folder = svfInfo.OpenConifg.folder;
        let file = svfInfo.OpenConifg.path;

        let folderPath: string = path.join(rootPath, folder);
        let filePath: string = path.join(folderPath, file);

        if (!fs.existsSync(filePath)) {
            if (fs.existsSync(folderPath)) {
                this.DownloadSVFLogic(
                    filePath,
                    "The key file is lost. Do you want to delete old folder and download new one?"
                );
            } else {
                this.DownloadSVFLogic(
                    filePath,
                    "You don't have SVF-example folder. Do you want to download it?"
                );
            }
        } else {
            vscode.window.showTextDocument(vscode.Uri.file(filePath));
        }
    }
    protected BuildSvfExCommand() {
        if (!StoreInfo.bugReportTerminial) {
            StoreInfo.bugReportTerminial = new BugReportTerminial();
        }
        StoreInfo.bugReportTerminial.RunCommand();
    }
    private DownloadSVFLogic(filePath: string, info: string) {
        let promise = vscode.window.showInformationMessage(info, "YES", "NO");
        let selfThis = this;
        promise.then(function (result) {
            switch (result) {
                case "YES":
                    selfThis.DownloadSVF(filePath);
                    break;
                case "NO":
                    return;
                default:
                    vscode.window.showErrorMessage("No Way to be here.");
                    return;
            }
        });
    }
    private DownloadSVF(filePath: string) {
        let terminial = vscode.window.createTerminal("DOWNLOAD SVF-EX");
        let extensionPath = StoreInfo.extensionContext.extensionPath;
        let bashfile = "./scripts/download.sh";
        let bashPath: string = path.join(extensionPath, bashfile);
        let cli: string = `bash ${bashPath}`;
        terminial.show();
        terminial.sendText(cli);
        let handel = setInterval(() => {
            if (fs.existsSync(filePath)) {
                vscode.window.showTextDocument(vscode.Uri.file(filePath));
                clearInterval(handel);
                setTimeout(() => {
                    terminial.dispose();
                }, 2000);
            }
        }, 100);
    }
}

export { SVFBuildCommand };
