import pageIcon from 'page-icon-finder';
import { PageIcon } from 'page-icon-finder/types';
import sharp, { OutputInfo } from 'sharp';

async function getIcon(url: string): Promise<PageIcon.IconResponse> {
  const result = await pageIcon(url, '.png');
  return result;
}

function resizeImage(image: Buffer): void {
  sharp(image)
    .resize(256, 256)
    .png()
    .toFile('./test.png', (err: Error, info: OutputInfo) => {
      if (err) console.error(err);
      console.log('INFO:\n', info);
    });
}

async function execute(): Promise<void> {
  const img = await getIcon('https://facebook.com/');
  const bufferFromIcon = img.data as Buffer;
  resizeImage(bufferFromIcon);
}

execute();
