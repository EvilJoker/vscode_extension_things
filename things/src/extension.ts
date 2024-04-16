// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { TodoItem, TodoTreeViewProvider } from './domain/todo/todotree';
import { multiStepInput } from './domain/todo/todotree_additem';
import { TODOPROVIDER } from './infra/constant';
import { JsonPersist } from './infra/persist/item';
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

export var objectmap = new Map<string, Object|null|void>();
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

    registryTodoList(context);

    // 注册其余treeview
    let repositoryDisposable = vscode.window.registerTreeDataProvider('things.repository', new TodoTreeViewProvider());
    context.subscriptions.push(repositoryDisposable);
    let enviromentDisposable = vscode.window.registerTreeDataProvider('things.enviroment', new TodoTreeViewProvider());
    context.subscriptions.push(enviromentDisposable);
    let actionDisposable = vscode.window.registerTreeDataProvider('things.action', new TodoTreeViewProvider());
    context.subscriptions.push(actionDisposable);
}

// This method is called when your extension is deactivated

function registryTodoList(context: vscode.ExtensionContext) {
    let todoListProvider = new TodoTreeViewProvider();
    objectmap.set(TODOPROVIDER, todoListProvider);
    // 注册treeview
    let todolistDisposable = vscode.window.registerTreeDataProvider('things.todolist', todoListProvider);
    context.subscriptions.push(todolistDisposable);

    let refreshCommandDisposable = vscode.commands.registerCommand('things.todolist.refresh', () => {
        todoListProvider.refresh();
    });
    context.subscriptions.push(refreshCommandDisposable);
    // 增加
    let addCommandDisposable = vscode.commands.registerCommand('things.todolist.add', async () => {
        multiStepInput(context);
    });

    context.subscriptions.push(addCommandDisposable);
    // 删除
    let removeCommandDisposable = vscode.commands.registerCommand('things.todolist.remove', async (item: TodoItem) => {
        console.log(item.getItemId());
        JsonPersist.removeItems([item.getItemId()]);
        todoListProvider.refresh();
    });
    
    context.subscriptions.push(removeCommandDisposable);

}
export function deactivate() { }
