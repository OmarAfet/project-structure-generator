import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

/**
 * Activates the "structure-generator" extension.
 * Registers the command to generate the directory structure based on user configurations.
 * @param context - The extension context.
 */
export function activate(context: vscode.ExtensionContext) {
  // Log a message indicating the extension has been activated
  console.log(
    'Congratulations, your extension "structure-generator" is now active!'
  );

  // Register the 'generateStructure' command
  let disposable = vscode.commands.registerCommand(
    "structure-generator.generateStructure",
    async () => {
      // Retrieve workspace folders
      const workspaceFolders = vscode.workspace.workspaceFolders;
      if (!workspaceFolders) {
        vscode.window.showErrorMessage("No workspace is opened.");
        return;
      }

      // Get the path of the first workspace folder
      const workspacePath = workspaceFolders[0].uri.fsPath;

      // Retrieve configuration for exclude and include patterns
      const config = vscode.workspace.getConfiguration("structureGenerator");
      const excludePatterns: string[] = config.get("exclude") || [];
      const includePatterns: string[] = config.get("include") || [];

      try {
        // Generate the directory structure based on provided patterns
        const structure = generateDirectoryStructure(
          workspacePath,
          excludePatterns,
          includePatterns
        );
        // Create and show a new text document with the generated structure
        const document = await vscode.workspace.openTextDocument({
          content: structure,
          language: "plaintext",
        });
        vscode.window.showTextDocument(document, { preview: false });
      } catch (error) {
        vscode.window.showErrorMessage(`Error generating structure: ${error}`);
      }
    }
  );

  // Add the disposable to the extension context
  context.subscriptions.push(disposable);
}

/**
 * Deactivates the "structure-generator" extension.
 */
export function deactivate() {}

/**
 * Interface representing a directory tree node.
 */
interface DirTree {
  name: string;
  children?: DirTree[];
}

/**
 * Generates a string representation of the directory structure.
 * @param dirPath - The root directory path.
 * @param exclude - Patterns to exclude.
 * @param include - Patterns to include.
 * @returns A formatted string representing the directory structure.
 */
export function generateDirectoryStructure(
  dirPath: string,
  exclude: string[],
  include: string[]
): string {
  const tree: DirTree = {
    name: path.basename(dirPath),
    children: [],
  };

  // Build the directory tree starting from the root path
  buildTree(dirPath, tree, exclude, include, "");

  // Format the tree into a readable string
  return formatTree(tree);
}

/**
 * Recursively builds the directory tree.
 * @param currentPath - The current directory path.
 * @param tree - The current tree node.
 * @param exclude - Patterns to exclude.
 * @param include - Patterns to include.
 * @param relativePath - The relative path from the root.
 */
function buildTree(
  currentPath: string,
  tree: DirTree,
  exclude: string[],
  include: string[],
  relativePath: string
) {
  // Read all items in the current directory
  const items = fs.readdirSync(currentPath, { withFileTypes: true });

  items.forEach((item) => {
    const itemPath = path.join(currentPath, item.name);
    const itemRelativePath = relativePath
      ? path.join(relativePath, item.name)
      : item.name;

    // Skip items based on exclude/include patterns
    if (shouldExclude(itemRelativePath, exclude, include)) {
      return;
    }

    const node: DirTree = { name: item.name };
    if (item.isDirectory()) {
      node.children = [];
      // Recursively build the tree for subdirectories
      buildTree(itemPath, node, exclude, include, itemRelativePath);
    }

    // Add the node to the current tree's children
    tree.children!.push(node);
  });
}

/**
 * Determines whether a file or directory should be excluded based on patterns.
 * @param filePath - The relative file path.
 * @param exclude - Patterns to exclude.
 * @param include - Patterns to include.
 * @returns True if the item should be excluded, otherwise false.
 */
export function shouldExclude(
  filePath: string,
  exclude: string[],
  include: string[]
): boolean {
  if (include.length > 0) {
    // Include patterns take precedence
    return !include.some((pattern) => matchesPattern(filePath, pattern));
  }
  // Exclude if it matches any exclude pattern
  return exclude.some((pattern) => matchesPattern(filePath, pattern));
}

/**
 * Checks if a file path matches a given pattern.
 * Supports simple glob patterns.
 * @param filePath - The file path to check.
 * @param pattern - The pattern to match against.
 * @returns True if the pattern matches the file path, otherwise false.
 */
export function matchesPattern(filePath: string, pattern: string): boolean {
  // Convert glob pattern to RegExp
  return new RegExp(
    "^" + pattern.replace(/\*\*/g, ".*").replace(/\*/g, "[^/]*") + "$"
  ).test(filePath);
}

/**
 * Formats the directory tree into a readable string.
 * @param tree - The directory tree.
 * @param prefix - The string prefix for formatting.
 * @param isRoot - Indicates if the current node is the root.
 * @returns A formatted string representing the tree structure.
 */
function formatTree(
  tree: DirTree,
  prefix: string = "",
  isRoot: boolean = true
): string {
  // Initialize the result with the root directory name
  let result = isRoot ? `${prefix}${tree.name}/\n` : "";

  if (!tree.children) return result;

  const lastIndex = tree.children.length - 1;
  tree.children.forEach((child, index) => {
    const isLast = index === lastIndex;
    const connector = isLast ? "└── " : "├── ";
    const childPrefix = prefix + (isLast ? "    " : "│   ");
    // Add the current child to the result
    result += `${prefix}${connector}${child.name}${
      child.children ? "/" : ""
    }\n`;
    if (child.children) {
      // Recursively format the subtree
      result += formatTree(child, childPrefix, false);
    }
  });

  return result;
}
