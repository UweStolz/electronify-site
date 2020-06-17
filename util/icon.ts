import pageIcon, { PageIcon } from 'page-icon-finder';
import sharp, { OutputInfo } from 'sharp';
import logger from '../cli/logger';

const path = __dirname;

async function getIcon(url: string): Promise<PageIcon.IconResponse> {
  const result = await pageIcon(url, '.png');
  return result;
}

function saveIconsForLinux(icon: Buffer): void {
  const sizes = [16, 32, 48, 64, 128, 256, 512];
  const iconsPath = `${path}/build/icons`;
  sizes.forEach((size) => {
    const filepath = `${iconsPath}/${size}x${size}.png`;
    sharp(icon)
      .resize(size, size)
      .png()
      .toFile(filepath, (err: Error, info: OutputInfo) => {
        if (err) logger.error(err);
        logger.debug(info, 'Icon:');
      });
  });
}

function saveIconForWindowsOrMac(icon: Buffer): void {
  const filepath = `${path}/build/icon.png`;
  sharp(icon)
    .resize(512, 512)
    .png()
    .toFile(filepath, (err: Error, info: OutputInfo) => {
      if (err) logger.error(err);
      logger.debug(info, 'Icon:');
    });
}

function resizeIcon(icon: Buffer, platform: string): void {
  switch (platform) {
    case 'linux':
      saveIconsForLinux(icon);
      break;
    case 'win32':
      saveIconForWindowsOrMac(icon);
      break;
    case 'windows':
      saveIconForWindowsOrMac(icon);
      break;
    case 'darwin':
      saveIconForWindowsOrMac(icon);
      break;
    case 'macos':
      saveIconForWindowsOrMac(icon);
      break;
    default:
      break;
  }
}

export default async function downloadAndResizeIcon(url: string, platform: string): Promise<void> {
  try {
    const img = await getIcon(url);
    const bufferFromIcon = img.data as Buffer;
    resizeIcon(bufferFromIcon, platform);
  } catch {
    logger.error('Could not download or create icon(s)!');
  }
}
