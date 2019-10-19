const formatsForOs: Electronify.FormatsForOs = {
  generic: ['7z', 'zip', 'tar.xz', 'tar.7z', 'tar.lz', 'tar.gz', 'tar.bz2', 'dir'],
  linux: ['appimage', 'apk', 'deb', 'freebsd', 'pacman', 'p5p', 'rpm', 'snap'],
  macos: ['dmg', 'pkg', 'mas'],
  windows: ['appx', 'nsis', 'nsis-web', 'portable', 'msi', 'squirrel'],
};

const allValidFormats = [
  '7z', 'zip', 'tar.xz', 'tar.7z', 'tar.lz', 'tar.gz', 'tar.bz2', 'dir',
  'dmg', 'pkg', 'mas', 'appimage', 'snap', 'deb', 'rpm', 'freebsd', 'pacman',
  'p5p', 'apk', 'nsis', 'nsis-web', 'portable', 'appx', 'msi', 'squirrel'];

const architecture = ['x64', 'ia32', 'armv7l', 'arm64'];

export { formatsForOs, allValidFormats, architecture };
