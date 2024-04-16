/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { window, ExtensionContext } from 'vscode';
import { MultiStepInput, State } from '../../infra/ui/quickpick/multiStepInput';
import { JsonPersist } from '../../infra/persist/item';
import { TodoItemStrut, TodoTreeViewProvider } from './todotree';
import { objectmap } from '../../extension';
import { TODOPROVIDER } from '../../infra/constant';
/**
 * 
 * 从官方的例子改写
 */
export async function multiStepInput(context: ExtensionContext) {

	let item = new TodoItemStrut(2, 'default', 'show2', 'info2');
	async function collectInputs() {
		const state = {} as Partial<State>; // 表示 state 对象，必须是 State
		// 开始启动输入。(input => pickResourceGroup(input, state) 是一个函数对象
		await MultiStepInput.run(input => InputMetaNameStep(input, state));
		return state as State;
	}

	const title = 'Create TodoList Item';

	// 步骤： InputMetaNameStep ==> InputMetaShowStep

	async function InputMetaNameStep(input: MultiStepInput, state: Partial<State>) {
		state.name = await input.showInputBox({
			title,
			step: 1,
			totalSteps: 2,
			value: state.name || '',
			prompt: 'item name',
			validate: validateNameIsUnique,
			shouldResume: shouldResume
		});
		item.meta_name = state.name;
		return (input: MultiStepInput) => inputMetaShowStep(input, state);
	}

	async function inputMetaShowStep(input: MultiStepInput, state: Partial<State>) {
		// TODO: Remember current value when navigating back.
		state.name = await input.showInputBox({
			title,
			step: 2,
			totalSteps: 2,
			value: state.name || '',
			prompt: 'item descripe for show',
			validate: validateNameIsUnique,
			shouldResume: shouldResume
		});
		item.meta_show = state.name;
	}

	function shouldResume() {
		// Could show a notification with the option to resume.
		return new Promise<boolean>((resolve, reject) => {
			// noop
		});
	}

	async function validateNameIsUnique(name: string) {
		// ...validate...
		await new Promise(resolve => setTimeout(resolve, 1000));
		return name === 'vscode' ? 'Name not unique' : undefined;
	}

	// 入口 --> 生成 states 状态
	const state = await collectInputs();
	
	window.showInformationMessage(`add item succ '${item.toString()}'`);
	// 存储
	JsonPersist.addItems([item]);
	// 刷新
	(<TodoTreeViewProvider>objectmap.get(TODOPROVIDER)).refresh();
}