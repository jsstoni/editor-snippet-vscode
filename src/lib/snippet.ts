import * as vscode from 'vscode';
import { Snippet } from '../types/snippet';

export const URL_BASE = 'http://localhost:3000/api/snippet';

export const disposableGetSnippet = async () => {
    const editor = vscode.window.activeTextEditor;

    if (!editor) {
        vscode.window.showErrorMessage('There is no active editor');
        return;
    }

    try {
        const response = await fetch(URL_BASE, {
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.MzYwNjExMQ.C0WjL5ZW3HUQRq1llnGOsHis_ktVNfS2KFgM0SJIJZE'
            }
        });

        if (!response.ok) {
            throw new Error('error getting data');
        }

        const data = await response.json() as Snippet[];

        const items = data.map(item => ({ label: item.name, description: item.language, snippet: item }));

        const selectedItem = await vscode.window.showQuickPick(items, {
            placeHolder: 'Select an item to insert',
            canPickMany: false
        });

        if (selectedItem) {
            const position = editor.selection.active;
            const snippet = selectedItem.snippet;

            editor.edit(editBuilder => {
                editBuilder.insert(position, snippet.code);
            });

            vscode.window.showInformationMessage(`Inserted snippet: ${snippet.name}`);
        }
    } catch (error) {
        vscode.window.showErrorMessage(`Error: ${error}`);
    }
};