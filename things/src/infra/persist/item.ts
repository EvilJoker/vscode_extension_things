// 数据结构的定义

import { serialize } from "v8";
import fs from 'fs';
import * as os from 'os';
import * as path from 'path';


class ItemStruct {
    public id: number;
    public meta_type: string;
    public meta_name: string;
    public meta_show: string;
    public info: string;

    constructor(id: number, meta_type: string, meta_name: string, meta_show: string, info: string) {
        this.id = id;
        this.meta_type = meta_type;
        this.meta_name = meta_name;
        this.meta_show = meta_show;
        this.info = info;
    }
    toString(): string {
        return `{name: ${this.meta_name}, show: ${this.meta_show}, info: ${this.info}}`;
    }

    toJson(): Object {
        return {
            id: this.id,
            meta_type: this.meta_type,
            meta_name: this.meta_name,
            meta_show: this.meta_show,
            info: this.info
        };
    }
    static fromJson(json: Object): ItemStruct {
        const { id, meta_type, meta_name, meta_show, info } = json as ItemStruct;
        return new ItemStruct(id, meta_type, meta_name, meta_show, info);
    }
}

// 持久化
class JsonPersist {
    // 暂时存储到 ~/items.json
    static FILEPATH: string = path.join(os.homedir(), 'items.json');
    private static instance :JsonPersist;
    public items: ItemStruct[] = [];

    public static getInstance(): JsonPersist {
        if (!JsonPersist.instance) {
            JsonPersist.instance = new JsonPersist();
        }
        return JsonPersist.instance;
    }

    private constructor() {
        if (!fs.existsSync(JsonPersist.FILEPATH)) {
            JsonPersist.serializeToFile(this.items);
        }
        this.items = JsonPersist.deserializeFromFile();
    }

 


    static serializeToFile(items: ItemStruct[], filePath: string = JsonPersist.FILEPATH) {
        const serializedItems = items.map(item => item.toJson());
        const json = JSON.stringify(serializedItems, null, 2);
        fs.writeFileSync(filePath, json);
    }
    static deserializeFromFile(filePath: string = JsonPersist.FILEPATH): ItemStruct[] {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const parsedItems = JSON.parse(fileContent);
        // return parsedItems.map((item: ItemStruct) => ItemStruct.fromJson(item)); 简写
        return parsedItems.map(ItemStruct.fromJson);
    }
    // 增删改查方法
    static addItems(items: ItemStruct[]){
        let persist = JsonPersist.getInstance();
        // 更新内存
        persist.items.push(...items);
        // 写入文件
        JsonPersist.serializeToFile(persist.items);

    }

    static getItems(type: string): ItemStruct[] {
        return JsonPersist.getInstance().items.filter(item=> item.meta_type === type);
    }
}


export { ItemStruct, JsonPersist };

