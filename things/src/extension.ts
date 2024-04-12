// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { TodoTreeViewProvider } from './domain/todo/todotree';
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "things" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('things.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from things!');
	});


	context.subscriptions.push(disposable);
	// 注册treeview
	let todolistDisposable  = vscode.window.registerTreeDataProvider('things.todolist', new TodoTreeViewProvider());
	context.subscriptions.push(todolistDisposable);
	let repositoryDisposable  = vscode.window.registerTreeDataProvider('things.repository', new TodoTreeViewProvider());
	context.subscriptions.push(repositoryDisposable);
	let enviromentDisposable  = vscode.window.registerTreeDataProvider('things.enviroment', new TodoTreeViewProvider());
	context.subscriptions.push(enviromentDisposable);
	let actionDisposable  = vscode.window.registerTreeDataProvider('things.action', new TodoTreeViewProvider());
	context.subscriptions.push(actionDisposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
