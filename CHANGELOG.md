# Change Log
All notable changes to the [Structure Generator extension](https://marketplace.visualstudio.com/items?itemName=OmarAfet.structure-generator) will be documented in this file.

## [1.0.4] - 2024-09-21
### Fixed

## [1.0.3] - 2024-09-21
### Added
- Webpack support:
  - Added `webpack`, `webpack-cli`, and `@types/webpack` as dependencies.
  - Included a `postinstall` script to run VSCode extension installation.

### Changed
- `tsconfig.json`: 
  - Added `webpack` types to `types` array.
  
- `webpack.config.js`: 
  - Output directory changed from `dist` to `out`.
  - Standardized quote styles and cleaned up formatting.
  - Source map generation remains enabled (`nosources-source-map`).

## [1.0.2] - 2024-09-21
### Changed
- Updated extension logic and documentation.
- Updated the `README.md` with detailed installation instructions, enhanced usage guide, and new configuration examples.
- Updated `package.json` to version `1.0.2`, refined command title and default include/exclude patterns.
- Refactored the `extension.ts`:
  - Added comments to improve code readability.
  - Replaced custom glob matching logic with `minimatch`.
  - Enhanced the `buildTree` function for better handling of file system traversal and filtering.
  - Improved formatting of directory structure output with visual connectors.

### Removed
- Removed `.gitignore` file.