/* eslint-disable @typescript-eslint/no-explicit-any */
import * as args from './args';

beforeAll(() => {
  const setProperty = (object: NodeJS.Process, property: string | number | symbol, value: () => any): any => {
    const originalProperty = Object.getOwnPropertyDescriptor(object, property);
    Object.defineProperty(object, property, { value });
    return originalProperty;
  };
  setProperty(process, 'exit', (): any => {});
});

test('Collects arguments', async () => {
  const argsToCollect: string[] = ['arch', 'format', 'icon', 'name', 'os', 'url', 'verbose'];
  const returnedObject = {
    arch: undefined,
    format: undefined,
    icon: undefined,
    name: undefined,
    os: undefined,
    url: undefined,
    verbose: undefined,
  };
  await args.initialize(argsToCollect);
  const collectedArgs: Electronify.Args = await args.collectArgumentsFromCli(argsToCollect);
  expect(collectedArgs).toMatchObject(returnedObject);
});

test('Only collects given argument', async () => {
  const argsToCollect: string[] = ['icon'];
  const returnedObject = {
    arch: undefined,
    format: undefined,
    icon: undefined,
    name: undefined,
    os: undefined,
    url: undefined,
    verbose: undefined,
  };
  await args.initialize(argsToCollect);
  const collectedArgs: Electronify.Args = await args.collectArgumentsFromCli(argsToCollect);
  expect(collectedArgs).not.toMatchObject(returnedObject);
});

test('Validates the given URL', async () => {
  // @ts-ignore
  const mockProcessExit = jest.spyOn(process, 'exit').mockImplementationOnce(() => {});
  const argsToCollect = [
    '/usr/local/bin/node',
    '/home/ustolz/repositories/PRIV/electronify/built/bin/electronify.js',
    '--url',
    'http://www.example.com'];
  await args.initialize(argsToCollect);
  expect(mockProcessExit).not.toHaveBeenCalledWith(1);
});

test('Exits the process, if the given URL is Invalid', async () => {
  console.error = jest.fn();
  // @ts-ignore
  const mockProcessExit = jest.spyOn(process, 'exit').mockImplementationOnce((number) => number);
  const argsToCollect = [
    '/usr/local/bin/node',
    '/home/ustolz/repositories/PRIV/electronify/built/bin/electronify.js',
    '--url',
    'NoValidUrl'];

  await args.initialize(argsToCollect);

  expect(mockProcessExit).toHaveBeenCalledWith(1);
  expect(console.error).toHaveBeenCalledWith(expect.stringContaining('Invalid URL!'));
});

test('Exits the process, if the given protocol is Invalid', async () => {
  console.error = jest.fn();
  // @ts-ignore
  const mockProcessExit = jest.spyOn(process, 'exit').mockImplementationOnce((number) => number);
  const argsToCollect = [
    '/usr/local/bin/node',
    '/home/ustolz/repositories/PRIV/electronify/built/bin/electronify.js',
    '--url',
    'asdf://www.example.com'];

  await args.initialize(argsToCollect);

  expect(mockProcessExit).toHaveBeenCalledWith(1);
  expect(console.error).toHaveBeenCalledWith(expect.stringContaining('Invalid URL!'));
});

test('Exits the process, if the given format does not fit the OS', async () => {
  console.error = jest.fn();
  // @ts-ignore
  const mockProcessExit = jest.spyOn(process, 'exit').mockImplementationOnce((number) => number);
  const argsToCollect = [
    '/usr/local/bin/node',
    '/home/ustolz/repositories/PRIV/electronify/built/bin/electronify.js',
    '--os',
    'linux',
    '--format',
    'nsis'];

  await args.initialize(argsToCollect);

  expect(mockProcessExit).toHaveBeenCalledWith(1);
  expect(console.error).toHaveBeenCalledWith(expect.stringContaining('OS and format do not match!'));
});
