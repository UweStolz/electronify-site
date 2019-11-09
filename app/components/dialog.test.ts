const mockedShowErrorBox = jest.fn();
const mockedShowMessageBox = jest.fn();
jest.mock('electron', () => ({
  __esmodule: true,
  dialog: {
    showErrorBox: mockedShowErrorBox.mockImplementation(() => {}),
    showMessageBox: mockedShowMessageBox.mockImplementation(async () => {}),
  },
}));

// eslint-disable-next-line import/first
import * as dialog from './dialog';

test('Opens an error box', (): void => {
  dialog.openErrorBox('some title', 'some content');
  expect(mockedShowErrorBox).toHaveBeenCalled();
});

test('Opens a message box', async (): Promise<void> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fakeBrowserwidow: any = {};
  const options = { message: 'some message' };
  await dialog.openMessageBox(fakeBrowserwidow, options);
  expect(mockedShowMessageBox).toHaveBeenCalled();
});
