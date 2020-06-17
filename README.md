# electronify

[![Actions Status](https://github.com/UweStolz/electronify-site/workflows/npmPublish/badge.svg)](https://github.com/UweStolz/electronify-site/actions) - [NPM](https://www.npmjs.com/package/electronify-site)

## Overview

```sh
yarn electronify
```

### Commands

```
Options:
  --version      Show version number                             [boolean]
  --url, -u      Your URL you want to build an archive for.      [string]
  --os, -o       Your operating system.                          [string]
  --format, -f   Your desired target format.                     [string]
  --arch, -a     The architecture of your system.                [string]
  --name, -n     The name which should be used.                  [string]
  --icon, -i     The path to your icon you wish to use.          [string]
  --verbose, -v  Activate DEBUG logging messages.                [boolean]
  --help         Show help                                       [boolean]
```

#### URL

#### Formats

This are the theoretically possible formate see the electron-builder [documentation](https://www.electron.build/multi-platform-build) for more details, for the specific requirements, if you want to build for a OS that differs from the one you are currently using.  

| OS            | Format                                                                |
| ------------- | --------------------------------------------------------------------- |
| Valid for all | `7z`, `zip`, `tar.xz`, `tar.7z`, `tar.lz`, `tar.gz`, `tar.bz2`, `dir` |
| macos         | `dmg`, `pkg`, `mas`                                                   |
| linux         | `appimage`, `snap`, `deb`, `rpm`, `freebsd`, `pacman`, `p5p`, `apk`   |
| windows       | `nsis`, `nsis-web`, `portable`, `appx`, `msi`, `squirrel`             |

#### Architecture

Supported: x64, ia32, armv7l, arm64

#### Icons

If you want to use a custom icon it shold be 512x512 in size  
Windows:
- Type `.png` or `.ico`  

macOS
- Type `.icns`  

Linux:
- Type: `.icns`

## Installation

[Yarn](https://yarnpkg.com/lang/en/) is recommended instead of npm.  
`yarn global add electronify-site`

## License

[MIT](LICENSE.md)
