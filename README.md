# electronify

[![Actions Status](https://github.com/UweStolz/electronify/workflows/build/badge.svg)](https://github.com/UweStolz/electronify/actions)

## Overview

```sh
yarn electronify
```

### Commands

```
Options:
  --version      Show version number                                   [boolean]
  --url, -u      Your URL you want to build an archive for.             [string]
  --os, -o       Your operating system.                                 [string]
  --format, -f   Your desired target format.                            [string]
  --arch, -a     The architecture of your system.                       [string]
  --name, -n     The name which should be used.                         [string]
  --icon, -i     The path to your icon you wish to use.                 [string]
  --verbose, -v  Activate DEBUG logging messages.                      [boolean]
  --help         Show help                                             [boolean]
```

#### URL

#### Formats

| OS            | Format                                                                |
| ------------- | --------------------------------------------------------------------- |
| Valid for all | `7z`, `zip`, `tar.xz`, `tar.7z`, `tar.lz`, `tar.gz`, `tar.bz2`, `dir` |
| macos         | `dmg`, `pkg`, `mas`                                                   |
| linux         | `appimage`, `snap`, `deb`, `rpm`, `freebsd`, `pacman`, `p5p`, `apk`   |
| windows       | `nsis`, `nsis-web`, `portable`, `appx`, `msi`, `squirrel`             |

#### Architecture

Supported: x64, ia32, armv7l, arm64

#### Icons

Windows:
- Size: at least 256x256
- Type `.png` or `.ico`  

macOS:
- Size: 512x512
- Type `.icns`  

Linux:
- Size: 512x512
- Type: `.icns`

## Installation

[Yarn](https://yarnpkg.com/lang/en/) is recommended instead of npm.  
`yarn global add electronify`

## License

[MIT](LICENSE.md)
