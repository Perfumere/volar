import * as vscode from 'vscode';
import * as shared from '@volar/shared';
import type { LanguageClient } from 'vscode-languageclient/node';

export async function activate(context: vscode.ExtensionContext, languageClient: LanguageClient) {
	await languageClient.onReady();
	context.subscriptions.push(languageClient.onRequest(shared.GetEditorSelectionRequest.type, () => {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			return {
				textDocument: {
					uri: languageClient.code2ProtocolConverter.asUri(editor.document.uri),
				},
				position: editor.selection.end,
			};
		}
	}));
}
