/* --------------------------------------------------------------------------------------------
 * Copyright 2023 (c) Kamyar Mohajerani. All rights reserved.
 * Licensed under the Apache 2.0 License.
 * See the included LICENSE file in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

import * as vscode from 'vscode';
import { workspace, ExtensionContext } from 'vscode';

import {
    LanguageClient,
    LanguageClientOptions,
    Executable,
    ServerOptions,
    TransportKind
} from 'vscode-languageclient/node';

let client: undefined | LanguageClient = undefined;

export function activate(context: ExtensionContext) {
    const output = vscode.window.createOutputChannel('DSLX Language Server');
    const config = vscode.workspace.getConfiguration('dslx');
    const binary_path: string = config.get('languageServerPath') as string;
    const dslx_path: string = config.get('dslxPath') as string;
    const stdlib_path: string = config.get('stdlibPath') as string;

    // If the extension is launched in debug mode then the debug server options are used
    // Otherwise the run options are used
    const serverOptions: Executable = {
        command: binary_path,
        transport: TransportKind.stdio,
        args: ["--dslx_path", dslx_path, "--stdlib_path", stdlib_path, "--"],
    };

    // Options to control the language client
    const clientOptions: LanguageClientOptions = {
        // Register the server for plain text documents
        documentSelector: [{ scheme: 'file', language: 'dslx' }],
        outputChannel: output,
    };

    // Create the language client and start the client.
    client = new LanguageClient(
        'dslxLanguageServer',
        'DSLX Language Server',
        serverOptions,
        clientOptions
    );

    // Start the client. This will also launch the server
    client.start();
}

export function deactivate(): Thenable<void> | undefined {
    if (!client) {
        return undefined;
    }
    return client.stop();
}
