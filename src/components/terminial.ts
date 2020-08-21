import * as vscode from "vscode";

class Terminial {
    protected terminial: vscode.Terminal;
    protected existFlag: boolean;
    constructor(name: string, shellpath?: string, args?: string[] | string) {
        this.terminial = vscode.window.createTerminal(name, shellpath, args);
        this.existFlag = true;
    }
    protected CreateTerminial(
        name: string,
        shellpath?: string,
        args?: string[] | string
    ) {
        this.RemoveTerminial();
        this.terminial = vscode.window.createTerminal(name, shellpath, args);
        this.existFlag = true;
    }
    protected CheckStatus(): boolean {
        if (this.terminial && !this.terminial.exitStatus && this.existFlag) {
            return true;
        } else {
            this.existFlag = false;
        }
        return this.existFlag;
    }

    public RemoveTerminial() {
        this.terminial.dispose();
        this.existFlag = false;
    }
}

export { Terminial };
