import * as vscode from "vscode";
import * as svfInfo from "../config/BugReportSVF.json";
import { StoreInfo } from "../storeInfo";
import { Terminial } from "../components/terminial";
import * as path from "path";

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
        if (!this.CheckStatus()) {
            this.CreateTerminial(svfInfo.name);
        }
        this.terminial.show();
        this.terminial.sendText(this.envCli);
        this.terminial.sendText(this.svfCli);
    }
}

export { BugReportTerminial };
