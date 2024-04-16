import * as vscode from 'vscode';
import { ItemStruct, JsonPersist } from '../../infra/persist/item';

// 定义 tree item 类
class TodoItemStrut extends ItemStruct {
    static TYPE: string = "todolist";
    // 和 ItemStruct 一样暂时保持一致。
    constructor(id: number, meta_name: string, meta_show: string, info: string) {
        super(id, TodoItemStrut.TYPE, meta_name, meta_show, info);
    }

}


// 定义 item
class TodoItem extends vscode.TreeItem {
    private item: TodoItemStrut|null = null;
    constructor(
        public readonly todoitem: TodoItemStrut|null,
        public readonly label: string,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState,
        public readonly command?: vscode.Command
    ) {
        super(label, collapsibleState);
        this.item = todoitem;
        if(todoitem){
            this.tooltip = `name: ${todoitem.meta_name}\ndescribe: ${todoitem.meta_show}\n`;
        }
        

    }
    static create(struct: TodoItemStrut | ItemStruct): TodoItem {
        if (struct instanceof TodoItemStrut) {
            return new TodoItem(struct, struct.meta_show, vscode.TreeItemCollapsibleState.None);
        } else {

            let todoItemStruct = new TodoItemStrut(struct.id, struct.meta_name, struct.meta_show, struct.info);
            return new TodoItem(struct, todoItemStruct.meta_show, vscode.TreeItemCollapsibleState.None);
        }

    }
    contextValue = 'things.todolist.item';
    getItemId(): number|null {
        if (this.item === null) {
            return null;
        }
        return this.item.id;
    }

    // iconPath: vscode.Uri.file(path.join(__filename, '..', '..', 'resources', 'tree-item-icon.svg'))
}

// 定义 dataprovider
class TodoTreeViewProvider implements vscode.TreeDataProvider<TodoItem> {
    private _onDidChangeTreeData: vscode.EventEmitter<TodoItem | undefined | null | void> = new vscode.EventEmitter<TodoItem | undefined>();
    readonly onDidChangeTreeData: vscode.Event<TodoItem | undefined | null | void> = this._onDidChangeTreeData.event;

    refresh(): void {
        this._onDidChangeTreeData.fire();
    }

    // 用来返回根节点
    getTreeItem(element: TodoItem): TodoItem {
        return element;
    }
    // 返回根节点的子节点
    getChildren(element?: TodoItem | undefined): vscode.ProviderResult<TodoItem[]> {

        const items = JsonPersist.getItems(TodoItemStrut.TYPE).map(item => {
            return TodoItem.create(item);
        });
        console.log("refresh");
        // 这里模拟返回一些静态树节点，实际开发中应根据业务逻辑动态获取节点数据
        return Promise.resolve(items);

    }


}

export { TodoTreeViewProvider, TodoItemStrut, TodoItem};