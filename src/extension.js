"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
function activate(context) {
    console.log('Congratulations, your extension "structure-generator" is now active!');
    let disposable = vscode.commands.registerCommand("structure-generator.generateStructure", async () => {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders) {
            vscode.window.showErrorMessage("No workspace is opened.");
            return;
        }
        const workspacePath = workspaceFolders[0].uri.fsPath;
        const config = vscode.workspace.getConfiguration("structureGenerator");
        const excludePatterns = config.get("exclude") || [];
        const includePatterns = config.get("include") || [];
        try {
            const structure = generateDirectoryStructure(workspacePath, excludePatterns, includePatterns);
            const document = await vscode.workspace.openTextDocument({
                content: structure,
                language: "plaintext",
            });
            vscode.window.showTextDocument(document, { preview: false });
        }
        catch (error) {
            vscode.window.showErrorMessage(`Error generating structure: ${error}`);
        }
    });
    context.subscriptions.push(disposable);
}
function deactivate() { }
function generateDirectoryStructure(dirPath, exclude, include) {
    const tree = {
        name: path.basename(dirPath),
        children: [],
    };
    buildTree(dirPath, tree, exclude, include);
    return formatTree(tree, "");
}
function buildTree(currentPath, tree, exclude, include) {
    const items = fs.readdirSync(currentPath, { withFileTypes: true });
    items.forEach((item, index) => {
        const itemPath = path.join(currentPath, item.name);
        const relativePath = path.relative(vscode.workspace.rootPath || "", itemPath);
        if (shouldExclude(relativePath, exclude, include)) {
            return;
        }
        const node = { name: item.name };
        if (item.isDirectory()) {
            node.children = [];
            buildTree(itemPath, node, exclude, include);
        }
        tree.children.push(node);
    });
}
function shouldExclude(filePath, exclude, include) {
    if (include.length > 0) {
        return !include.some((pattern) => matchesPattern(filePath, pattern));
    }
    return exclude.some((pattern) => matchesPattern(filePath, pattern));
}
function matchesPattern(filePath, pattern) {
    // Simple matching using glob patterns
    return new RegExp("^" + pattern.replace(/\*\*/g, ".*").replace(/\*/g, "[^/]*") + "$").test(filePath);
}
function formatTree(tree, prefix) {
    let result = `${prefix}${tree.name}\n`;
    if (!tree.children)
        return result;
    const lastIndex = tree.children.length - 1;
    tree.children.forEach((child, index) => {
        const isLast = index === lastIndex;
        const newPrefix = prefix + (isLast ? "└── " : "├── ");
        result += `${newPrefix}${child.name}\n`;
        if (child.children) {
            const childPrefix = prefix + (isLast ? "    " : "│   ");
            result += formatTree(child, childPrefix);
        }
    });
    return result;
}
//# sourceMappingURL=extension.js.map