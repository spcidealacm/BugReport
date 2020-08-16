import * as vscode from "vscode";

class Bar {
    private bar: vscode.StatusBarItem;
    constructor(alignment?: vscode.StatusBarAlignment, priority?: number) {
        this.bar = vscode.window.createStatusBarItem(alignment, priority);
    }

    public setBar(
        command: string | vscode.Command | undefined,
        text: string,
        color: string | vscode.ThemeColor | undefined,
        show?: boolean
    ) {
        this.bar.command = command;
        this.bar.text = text;
        this.bar.color = color;
        if(show === false){
            this.bar.hide();
        }
    }

    public active(context: vscode.ExtensionContext) {
        context.subscriptions.push(this.bar);
    }
}

export { Bar };
