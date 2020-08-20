import * as vscode from "vscode";
import * as webInfo from "../config/BugReportWeb.json";
import { Store } from "../store";
import { WebPanel } from "../components/webpanel";

class BugReportWeb extends WebPanel {
    constructor() {
        super(webInfo, Store.context);
        Store.web = this;
    }

    protected receiveMessage(message: { command: string; text: string }) {
        console.log(message);
        super.receiveMessage(message);
        switch (message.command) {
            case "fileclick":
                this.setWebpage(
                    this.webPanel,
                    webInfo["fileRelativePath"],
                    Store.context
                );
                break;

            default:
                break;
        }
    }

    protected dispose(
        webPanel: vscode.WebviewPanel,
        disposables: vscode.Disposable[],
        webIsReady: boolean
    ) {
        super.dispose(webPanel, disposables, webIsReady);
        Store.bar.wait();
    }
}

export { BugReportWeb };
