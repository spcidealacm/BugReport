import * as vscode from "vscode";

class Command {
    constructor(private context: vscode.ExtensionContext, private cmd: string) {
        this.register();
    }
    protected register() {
        let disposable: vscode.Disposable = vscode.commands.registerCommand(
            this.cmd,
            () => {
                this.command();
            }
        );
        this.context.subscriptions.push(disposable);
    }
    protected command() {}
}

export { Command };
