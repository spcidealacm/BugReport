import * as svfInfo from "../config/BugReportSVF.json";
import { StoreInfo } from "../storeInfo";
import { RunScripts } from "../components/script";
import * as path from "path";

class BugReportRunScripts extends RunScripts {
    public setEnv() {
        let envPath: string = path.join(
            StoreInfo.extensionContext.extensionPath,
            svfInfo.env
        );
        let cli: string = `source ${envPath} ${StoreInfo.extensionContext.extensionPath}`;
        this.runCommand(cli);
    }
}

export { BugReportRunScripts };
