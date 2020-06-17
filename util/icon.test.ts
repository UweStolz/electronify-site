import * as pageIconFinder from 'page-icon-finder';
import downloadAndResizeIcon from './icon';

jest.mock('sharp');

const sampleBuffer = { data: Buffer.from('I am a Buffer') };
const fakeUrl = 'https://ww.someAddress.com';

describe('Icon', () => {
  beforeEach(() => {
    jest.spyOn(pageIconFinder, 'default').mockImplementationOnce(async (): Promise<any> => sampleBuffer);
  });
  test('Windows', async () => {
    await downloadAndResizeIcon(fakeUrl, 'windows');
  });
  test('win32', async () => {
    await downloadAndResizeIcon(fakeUrl, 'win32');
  });
  test('darwin', async () => {
    await downloadAndResizeIcon(fakeUrl, 'darwin');
  });
  test('macOS', async () => {
    await downloadAndResizeIcon(fakeUrl, 'macos');
  });
  test('Linux', async () => {
    await downloadAndResizeIcon(fakeUrl, 'linux');
  });
});
