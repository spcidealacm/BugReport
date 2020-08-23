import * as vscode from "vscode";
import * as svfInfo from "../config/BugReportSVF.json";
import { StoreInfo } from "../storeInfo";
import { Terminial } from "../components/terminial";
import * as path from "path";
import * as fs from "fs";

class BugReportTerminial extends Terminial {
    protected envPath: string = path.join(
        StoreInfo.extensionContext.extensionPath,
        svfInfo.env
    );
    protected envCli: string = `source ${this.envPath} ${StoreInfo.extensionContext.extensionPath}`;
    protected svfPath: string = path.join(
        StoreInfo.extensionContext.extensionPath,
        svfInfo["svf-ex"]
    );
    protected svfCli: string = `bash ${this.svfPath}`;
    protected pwdCli: string = `cd ${vscode.workspace.rootPath}`;
    constructor() {
        super(svfInfo.name);
    }

    public RunCommand() {
        if (!fs.existsSync(svfInfo.llvm_path)) {
            let handle = vscode.window.showInformationMessage(
                "Cannot recognize basic environment, do you want to config it first ?",
                "YES",
                "NO"
            );
            let selfThis = this;
            handle.then(function (result) {
                switch (result) {
                    case "YES":
                        selfThis.RunCommandBasic();
                        break;
                    case "NO":
                        vscode.window.showInformationMessage(
                            "Well, You could config by yourself or click the build button again."
                        );
                        return;
                }
            });
        } else {
            this.RunCommandBasic();
        }
    }

    public RunCommandBasic() {
        if (!this.CheckStatus()) {
            this.CreateTerminial(svfInfo.name);
        }
        this.terminial.show();
        this.terminial.sendText(this.envCli);
        this.terminial.sendText(this.svfCli);
    }
}

export { BugReportTerminial };
