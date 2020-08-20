import * as vscode from "vscode";

class BasicBar {
    protected readonly bar: vscode.StatusBarItem;
    constructor(
        context: vscode.ExtensionContext,
        alignment?: vscode.StatusBarAlignment,
        priority?: number
    ) {
        this.bar = vscode.window.createStatusBarItem(alignment, priority);
        context.subscriptions.push(this.bar);
    }

    protected setBasicBar(
        command: string | vscode.Command | undefined,
        text: string,
        color: string,
        show?: boolean
    ) {
        this.bar.command = command;
        this.bar.text = text;
        this.bar.color = new vscode.ThemeColor(color);
        this.bar.show();
        if (show === false) {
            this.bar.hide();
        }
    }
}

export { BasicBar };
