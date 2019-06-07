# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/) and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.1] - 2019-06-07

### Changed

- Switched to using `@culturehq/scripts` for development.
- Switched to using `@testing-library/react` for testing.
- Use `prepublishOnly` so that the `dist` directory does not need to be checked in.

## [1.0.0] - 2019-03-12

### Added

- Properly handles focus by focusing on the first link when the dropdown is rendered and then passing it back to the previous active element when the dropdown is hidden.
- Keyboard handling on the dropdown to allow the user to hit escape to close it.

### Changed

- Rewrote the state management using hooks (and updated the `react` and `react-dom` dependencies to require 16.8).

## [0.2.0] - 2018-12-19

### Changed

- Document the default wording using the `defaultProps` static value.

## [0.1.0] - 2018-12-06

### Added

- Initial release 🎉

[unreleased]: https://github.com/CultureHQ/add-to-calendar/compare/v1.0.1...HEAD
[1.0.1]: https://github.com/CultureHQ/add-to-calendar/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/CultureHQ/add-to-calendar/compare/v0.2.0...v1.0.0
[0.2.0]: https://github.com/CultureHQ/add-to-calendar/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/CultureHQ/add-to-calendar/compare/d105a7...v0.1.0
