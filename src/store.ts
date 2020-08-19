import * as vscode from "vscode";
import { BugReportBar } from "./models/BugReportBar";
import { BugReportCommand } from "./models/BugReportCommand";

class Store {
    private static _context: vscode.ExtensionContext;
    private static _bar: BugReportBar;
    private static _command: BugReportCommand;
    public static get command(): BugReportCommand {
        return Store._command;
    }
    public static set command(value: BugReportCommand) {
        Store._command = value;
    }
    public static get bar(): BugReportBar {
        return Store._bar;
    }
    public static set bar(value: BugReportBar) {
        Store._bar = value;
    }
    public static get context(): vscode.ExtensionContext {
        return Store._context;
    }
    public static set context(value: vscode.ExtensionContext) {
        Store._context = value;
    }
}

function initial(context: vscode.ExtensionContext) {
    Store.context = context;
    Store.bar = new BugReportBar();
    Store.command = new BugReportCommand();
}

export { Store , initial};
