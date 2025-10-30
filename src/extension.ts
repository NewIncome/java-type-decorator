/* Base/Initial code
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "java-type-decorator" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('java-type-decorator.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from java-type-decorator!');
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
*/
import * as vscode from 'vscode';
import * as fs from 'fs';

export function activate(context: vscode.ExtensionContext) {
  const provider: vscode.FileDecorationProvider = {
    onDidChangeFileDecorations: undefined,

    provideFileDecoration(uri: vscode.Uri): vscode.ProviderResult<vscode.FileDecoration> {
      // Only decorate Java files
      if (!uri.fsPath.endsWith('.java')) return;

      try {
        const content = fs.readFileSync(uri.fsPath, 'utf8');

        if (/\binterface\b/.test(content)) {
          // Blue badge for interfaces
          return new vscode.FileDecoration('I', 'Interface', new vscode.ThemeColor('charts.blue'));
        }

        if (/\bclass\b/.test(content)) {
          // Green badge for classes
          return new vscode.FileDecoration('C', 'Class', new vscode.ThemeColor('charts.green'));
        }
      } catch (err) {
        console.error('Error reading file:', err);
      }
    }
  };

  context.subscriptions.push(
    vscode.window.registerFileDecorationProvider(provider)
  );
}

export function deactivate() {}
