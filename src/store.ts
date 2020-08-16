import * as vscode from "vscode";
import * as statusbar from "./components/statusBar";

let storeContext: vscode.ExtensionContext;
let storeBar: statusbar.Bar;

function SetContext(context: vscode.ExtensionContext) {
    storeContext = context;
}
function GetContext(): vscode.ExtensionContext {
    return storeContext;
}
function SetBar(bar: statusbar.Bar) {
    storeBar = bar;
}
function GetBar() {
    return storeBar;
}

export { SetContext, GetContext, SetBar, GetBar };
