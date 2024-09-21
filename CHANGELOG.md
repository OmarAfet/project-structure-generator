# Change Log
All notable changes to the "structure-generator" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [1.0.0] - YYYY-MM-DD
### Added
- Initial release.

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