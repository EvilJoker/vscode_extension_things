import { ItemStruct, JsonPersist } from './item';

//  临时的测试
// 示例用法
const items: ItemStruct[] = [
    new ItemStruct(1, 'todolist', 'name1', 'show1', 'info1'),
    new ItemStruct(2, 'type2', 'name2', 'show2', 'info2'),
];


JsonPersist.serializeToFile(items);

const loadedItems = JsonPersist.deserializeFromFile();
console.log(loadedItems);
