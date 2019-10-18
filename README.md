# electronify

[![codecov](https://codecov.io/gh/UweStolz/electronify/branch/master/graph/badge.svg?token=WX5Gah4xXf)](https://codecov.io/gh/UweStolz/electronify)

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

| OS | Format |
|----|--------|
| Valid for all | `7z`, `zip`, `tar.xz`, `tar.7z`, `tar.lz`, `tar.gz`, `tar.bz2`, `dir` |
| macos | `dmg`, `pkg`, `mas` |
| linux | `appimage`, `snap`, `deb`, `rpm`, `freebsd`, `pacman`, `p5p`, `apk` |
| windows | `nsis`, `nsis-web`, `portable`, `appx`, `msi`, `squirrel` |

#### Architecture

Supported: x64, ia32, armv7l, arm64

#### Icons

The icon needs to be 512x512 and to be from type `.png`

## Installation

[Yarn](https://yarnpkg.com/lang/en/) is recommended instead of npm.  
`yarn global add electronify`

## License
UNLICENSED
