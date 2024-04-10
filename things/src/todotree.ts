import * as vscode from 'vscode';



// 定义 item
class TodoItem extends vscode.TreeItem {
    constructor(
        public readonly label: string,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState,
        public readonly command?: vscode.Command
    ) {
        super(label, collapsibleState);
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
        // 这里模拟返回一些静态树节点，实际开发中应根据业务逻辑动态获取节点数据
        const items: TodoItem[] = [
            new TodoItem('Node 1', vscode.TreeItemCollapsibleState.None),
            new TodoItem('Node 2', vscode.TreeItemCollapsibleState.Collapsed),
            new TodoItem('Node 3', vscode.TreeItemCollapsibleState.None),
        ];
        return Promise.resolve(items);

    }
}

export {TodoTreeViewProvider};