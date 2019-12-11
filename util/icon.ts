import pageIcon, { PageIcon } from 'page-icon-finder';
// @ts-ignore - False positive error for types
import sharp, { OutputInfo } from 'sharp';
import logger from '../cli/logger';

async function getIcon(url: string): Promise<PageIcon.IconResponse> {
  const result = await pageIcon(url, '.png');
  return result;
}

function resizeImage(image: Buffer): void {
  const filepath = './icon.png';
  sharp(image)
    .resize(256, 256)
    .png()
    .toFile(filepath, (err: Error, info: OutputInfo) => {
      if (err) logger.error(err);
      logger.debug(info);
    });
}

export default async function downloadAndResizeIcon(url: string): Promise<void> {
  const img = await getIcon(url);
  const bufferFromIcon = img.data as Buffer;
  resizeImage(bufferFromIcon);
}
