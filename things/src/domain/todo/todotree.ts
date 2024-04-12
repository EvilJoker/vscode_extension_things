import * as vscode from 'vscode';
import { ItemStruct, JsonPersist} from '../../infra/persist/item';

// 定义 tree item 类
class TodoItemStrut extends ItemStruct {
    static TYPE :string= "todolist";
    // 和 ItemStruct 一样暂时保持一致。
    
}


// 定义 item
class TodoItem extends vscode.TreeItem {
    constructor(
        public readonly label: string,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState,
        public readonly command?: vscode.Command
    ) {
        super(label, collapsibleState);
    }
    static create(struct: TodoItemStrut|ItemStruct): TodoItem{
        if (struct instanceof TodoItemStrut) {
            return new TodoItem(struct.meta_show, vscode.TreeItemCollapsibleState.None);
        } else {

            let todoItemStruct = new TodoItemStrut(struct.id, struct.meta_type, struct.meta_name, struct.meta_show, struct.info);
            return new TodoItem(todoItemStruct.meta_show, vscode.TreeItemCollapsibleState.None);
        }

  
    }

    // iconPath: vscode.Uri.file(path.join(__filename, '..', '..', 'resources', 'tree-item-icon.svg'))
}

// 定义 dataprovider
class TodoTreeViewProvider implements vscode.TreeDataProvider<TodoItem> {
    // 用来返回根节点
    getTreeItem(element: TodoItem): TodoItem {
        return element;
    }
    // 返回根节点的子节点
    getChildren(element?: TodoItem | undefined): vscode.ProviderResult<TodoItem[]> {

        const items = JsonPersist.getItems(TodoItemStrut.TYPE).map(item => {
            return TodoItem.create(item);
        });
        // 这里模拟返回一些静态树节点，实际开发中应根据业务逻辑动态获取节点数据
        return Promise.resolve(items);

    }
    

}

export {TodoTreeViewProvider};