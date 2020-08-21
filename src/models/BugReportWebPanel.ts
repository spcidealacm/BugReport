import * as vscode from "vscode";
import * as webInfo from "../config/BugReportWeb.json";
import { StoreInfo } from "../storeInfo";
import { WebBasicPanel } from "../components/webpanel";

class BugReportWebPanel extends WebBasicPanel {
    constructor() {
        super(webInfo, StoreInfo.extensionContext);
        StoreInfo.bugReportWebPanel = this;
    }

    protected receiveMessage(message: { command: string; text: string }) {
        console.log(message);
        super.receiveMessage(message);
        switch (message.command) {
            case "fileclick":
                this.setWebpage(
                    this.webPanel,
                    webInfo["fileRelativePath"],
                    StoreInfo.extensionContext
                );
                break;
            case "show_svf_ex_file":
                

            default:
                break;
        }
    }

    protected disposeJob(
        webPanel: vscode.WebviewPanel,
        disposables: vscode.Disposable[],
        webIsReady: boolean
    ) {
        super.disposeJob(webPanel, disposables, webIsReady);
        StoreInfo.bugReportBar.setWait();
    }
}

export { BugReportWebPanel };
