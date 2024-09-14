# [**Structure Generator**](https://marketplace.visualstudio.com/items?itemName=OmarAfet.structure-generator)

A Visual Studio Code extension that generates and visualizes the directory structure of your workspace based on customizable include and exclude patterns.

## Features

- **Generate Directory Structure:** Quickly generate a textual representation of your project's directory structure.
- **Customizable Patterns:** Configure include and exclude patterns to filter the directories and files displayed.
- **Easy to Use:** Activate the extension and run the command to view your project's structure directly within VS Code.
- **Real-Time Updates:** Reflects changes in the directory structure as you modify your project.

## Installation

1. Open Visual Studio Code.
2. Go to the Extensions view by clicking on the Extensions icon in the Activity Bar on the side of the window or pressing `Ctrl + Shift + X`.
3. Search for **Structure Generator**.
4. Click **Install** on the extension by [@OmarAfet](https://github.com/OmarAfet).
5. Reload VS Code if prompted.

## Usage

1. Open the workspace or folder you want to analyze.
2. Open the Command Palette by pressing `Ctrl + Shift + P`.
3. Type `Structure Generator: Generate Structure` and press `Enter`.
4. A new text document will open displaying the directory structure based on your configurations.

## Configuration

You can customize the behavior of the Structure Generator extension by modifying the settings in your `settings.json`.

### Exclude Patterns

Specify glob patterns to exclude certain files or directories from the generated structure.
