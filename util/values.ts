const formatsForOs = {
  all: ['7z', 'zip', 'tar.xz', 'tar.7z', 'tar.lz', 'tar.gz', 'tar.bz2', 'dir'],
  macos: ['dmg', 'pkg', 'mas'],
  linux: ['appimage', 'snap', 'deb', 'rpm', 'freebsd', 'pacman', 'p5p', 'apk'],
  windows: ['nsis', 'nsis-web', 'portable', 'appx', 'msi', 'squirrel'],
};

const allValidFormats = [
  '7z', 'zip', 'tar.xz', 'tar.7z', 'tar.lz', 'tar.gz', 'tar.bz2', 'dir',
  'dmg', 'pkg', 'mas', 'appimage', 'snap', 'deb', 'rpm', 'freebsd', 'pacman',
  'p5p', 'apk', 'nsis', 'nsis-web', 'portable', 'appx', 'msi', 'squirrel'];

export { formatsForOs, allValidFormats };
