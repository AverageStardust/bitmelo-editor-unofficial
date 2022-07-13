const vscode = require("vscode");
let bitmeloPanel = null;


async function getBitmeloPanel(extensionUri, context, position, updater, reopener) {
	if (bitmeloPanel === null) {
		bitmeloPanel = new BitmeloPanel(extensionUri, context, position, updater, reopener);
	} else {
		bitmeloPanel.revealAt(position);
	}
	return bitmeloPanel;
}

function hasBitmeloPanel() {
	return bitmeloPanel !== null;
}

function resetBitmeloPanel() {
	if (bitmeloPanel !== null && bitmeloPanel.panel !== null) {
		bitmeloPanel.panel.dispose();
	}
	bitmeloPanel = null;
}

class BitmeloPanel {
	constructor(extensionUri, context, position, updater) {
		this.panel = null;
		this.context = context;
		this.indexHTML = null;
		this.extensionUri = extensionUri;
		this.updater = updater;
		this.project = null;
		this.isActive = false;
		this.allowMessagesAfter = Date.now();
		this.ensurePanel(position);
	}

	async revealAt(position) {
		if (this.ensurePanel(position)) {
			this.reloadProject();
		} else {
			this.panel.reveal(position);
		}
	}

	async ensurePanel(position) {
		if (this.panel !== null) return false;

		this.panel = vscode.window.createWebviewPanel(
			'bitmeloEditor',
			'Bitmelo Editor',
			position
		);
		if (this.indexHTML === null) {
			const indexPath = vscode.Uri.joinPath(this.extensionUri, "out", "index.html");
			this.indexHTML = vscode.workspace.fs.readFile(indexPath)
				.then((data) => data.toString());
		}

		this.panel.webview.options = {
			enableScripts: true
		};
		this.panel.webview.html = await this.indexHTML;
		this.panel.onDidDispose(() => {
			this.panel = null;
		});
		this.panel.onDidChangeViewState(() => {
			if (!this.panel.visible) this.isActive = false;
		});
		this.panel.webview.onDidReceiveMessage(
			async (project) => {
				if (Date.now() < this.allowMessagesAfter) return;
				if (this.panel !== null) {
					if (!this.isActive) {
						this.reloadProject();
						this.isActive = true;
					} else {
						this.project = JSON.stringify(project);
					}
					this.updater(this);
				}
			},
			undefined,
			this.context.subscriptions
		);

		this.isActive = true;
		return true;
	}

	reloadProject() {
		this.setProject(this.project);
		this.allowMessagesAfter = Date.now() + 1000;
	}

	getProject() {
		return this.project;
	}

	setProject(project) {
		this.panel.webview.postMessage(JSON.parse(project));
	}
}

module.exports = {
	getBitmeloPanel,
	hasBitmeloPanel,
	resetBitmeloPanel
}