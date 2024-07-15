import * as vscode from 'vscode';
import { disposableGetSnippet } from './lib/snippet';

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.commands.registerCommand(
            'vanto-snippet.getSnippet',
            disposableGetSnippet
        ),
    );
}

export function deactivate() { }
