import * as vscode from "vscode";
import { initial } from "./store";

export function activate(context: vscode.ExtensionContext) {
    initial(context);
}

export function deactivate() {}
