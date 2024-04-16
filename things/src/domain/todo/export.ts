
import * as vscode from 'vscode';
import { TodoItem, TodoTreeViewProvider } from './todotree';
import { multiStepInput } from './todotree_additem';
import { JsonPersist } from '../../infra/persist/item';
import { TODOPROVIDER } from '../../infra/constant';

export function registryTodoList(context: vscode.ExtensionContext, objectmap: Map<string, Object | null | void>) {
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
        let item = await multiStepInput(context);
        // 存储
        JsonPersist.addItems([item]);
        // 刷新
        todoListProvider.refresh();
    });

    context.subscriptions.push(addCommandDisposable);

    // 删除
    let removeCommandDisposable = vscode.commands.registerCommand('things.todolist.remove', async (item: TodoItem) => {
        console.log(item.getItemId());
        JsonPersist.removeItems([item.getItemId()]);
        todoListProvider.refresh();
    });

    context.subscriptions.push(removeCommandDisposable);
    // 更新
    let updateCommandDisposable = vscode.commands.registerCommand('things.todolist.update', async (item: TodoItem) => {

        let item_temp = await multiStepInput(context);
        let id = <number>item.getItemId();
        item_temp.id = id;
        JsonPersist.updateItem(item_temp);
        todoListProvider.refresh();

    });

    context.subscriptions.push(updateCommandDisposable);

}