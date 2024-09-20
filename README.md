# **Structure Generator**

A Visual Studio Code extension that generates and visualizes the directory structure of your workspace based on customizable include and exclude patterns.

## Features

- **Generate Directory Structure:** Quickly generate a textual representation of your project's directory structure.
- **Customizable Patterns:** Configure include and exclude patterns to filter the directories and files displayed.
- **Fast Performance:** Designed for speed, allowing even large projects to be processed swiftly.

## Installation

You can install **Structure Generator** from the [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=OmarAfet.structure-generator) or by searching for "Structure Generator" in the VS Code Extensions view (`Ctrl+Shift+X` or `Cmd+Shift+X` on macOS).

## Usage

1. Open the workspace or folder you want to analyze in VS Code.
2. **Optional:** Configure include and exclude patterns to tailor the generated structure.
   - Open the settings (`Ctrl + ,` or `Cmd + ,` on macOS).
   - Navigate to **Extensions** > **Structure Generator**.
   - Adjust the **Exclude** and **Include** settings as desired.
3. Open the Command Palette (`Ctrl + Shift + P` or `Cmd + Shift + P` on macOS).
4. Type `Structure Generator: Generate Project Structure` and press `Enter`.
5. A new text document will open, displaying the directory structure based on your configurations.

## Configuration

**Structure Generator** allows you to customize which files and directories are included or excluded from the generated structure using glob patterns.

### Exclude Patterns

Specify glob patterns to exclude specific files and directories.

**Default Exclude & Include Patterns:**

```json
"structureGenerator.exclude": [
  "node_modules", // Exclude the node_modules directory
  "**/.*" // Exclude any files or directories starting with a dot
]
"structureGenerator.include": [
  "src/**", // Include all files and directories within the "src" directory
  "src" // Include the "src" directory itself for "src/**" to work
]
```
