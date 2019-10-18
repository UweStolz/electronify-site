/* eslint-disable @typescript-eslint/no-explicit-any */
import exitProcess from './system';

beforeAll(() => {
  const setProperty = (object: NodeJS.Process, property: string | number | symbol, value: () => any): any => {
    const originalProperty = Object.getOwnPropertyDescriptor(object, property);
    Object.defineProperty(object, property, { value });
    return originalProperty;
  };
  setProperty(process, 'exit', (): any => { });
});

test('Process.exit gets called with the given exit code', () => {
  const processExit = jest.spyOn(process, 'exit');
  exitProcess(0);
  expect(processExit).toHaveBeenCalledWith(0);
});
