import * as args from './args';

test('Collects arguments', async () => {
  const argsToCollect: string[] = ['verbose', 'url', 'os', 'format', 'arch', 'name', 'icon'];
  const returnedObject = {
    verbose: undefined,
    url: undefined,
    os: undefined,
    format: undefined,
    arch: undefined,
    name: undefined,
    icon: undefined,
  };
  await args.initialize(argsToCollect);
  const collectedArgs: Electronify.Args = await args.collectArgumentsFromCli(argsToCollect);
  expect(collectedArgs).toMatchObject(returnedObject);
});

test('Only collects given argument', async () => {
  const argsToCollect: string[] = ['icon'];
  const returnedObject = {
    verbose: undefined,
    url: undefined,
    os: undefined,
    format: undefined,
    arch: undefined,
    name: undefined,
    icon: undefined,
  };
  await args.initialize(argsToCollect);
  const collectedArgs: Electronify.Args = await args.collectArgumentsFromCli(argsToCollect);
  expect(collectedArgs).not.toMatchObject(returnedObject);
});

// FIXME
test.only('Validates the given URL', async () => {
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
