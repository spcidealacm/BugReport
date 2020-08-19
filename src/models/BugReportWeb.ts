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
        super.receiveMessage(message);
    }
}

export { BugReportWeb };
