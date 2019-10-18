import execute from './index';
import * as args from './cli/args';
import * as exitProcess from './util/system';

jest.mock('fs-extra');
jest.mock('./cli/logger');
jest.mock('./builder');
jest.mock('./cli/ask');

// FIXME - Sample
test('Index - execute()', async () => {
  const mockedInitialize = jest.spyOn(args, 'initialize').mockImplementationOnce((): any => {});
  const mockedExitProcess = jest.spyOn(exitProcess, 'default').mockImplementationOnce(() => {});
  await execute();
  expect(mockedInitialize).toHaveBeenCalled();
  expect(mockedExitProcess).toHaveBeenCalledWith(1);
});
