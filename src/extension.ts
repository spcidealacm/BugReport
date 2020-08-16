
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "bugreport" is now active!');

	let disposable = vscode.commands.registerCommand('bugreport.helloWorld', () => {

		vscode.window.showInformationMessage('Hello World from BugReport!');
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
