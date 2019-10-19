/* eslint-disable @typescript-eslint/no-explicit-any */
import fsExtra from 'fs-extra';
import * as args from './cli/args';
import * as exitProcess from './util/system';
import * as builder from './builder';
import * as ask from './cli/ask';

jest.mock('./cli/logger');
jest.mock('./cli/ask');
jest.mock('yargs');

// eslint-disable-next-line import/first
import execute from './index';

describe('execute()', (): void => {
  test('User gets prompted for every option possible', async () => {
    const mockedInitialize = jest.spyOn(args, 'initialize').mockImplementationOnce(async (): Promise<any> => {});
    const mockedCollectArgumentsFromCli = jest.spyOn(args, 'collectArgumentsFromCli').mockImplementationOnce(async () => {
      const mockedArguments: Electronify.Args = {
        arch: undefined,
        format: undefined,
        iconPath: undefined,
        name: undefined,
        os: undefined,
        url: undefined,
        verbose: undefined,
      };
      return mockedArguments;
    });

    const mockedAskForUrl = jest.spyOn(ask, 'forURL').mockImplementationOnce(async (): Promise<any> => {});
    const mockedAskForOs = jest.spyOn(ask, 'forOS').mockImplementationOnce(async (): Promise<any> => {});
    const mockedAskForGenericFormats = jest.spyOn(ask, 'forGenericFormats').mockImplementationOnce(async (): Promise<any> => {});
    const mockedAskForFormat = jest.spyOn(ask, 'forFormat').mockImplementationOnce(async (): Promise<any> => {});
    const mockedAskForArch = jest.spyOn(ask, 'forArch').mockImplementationOnce(async (): Promise<any> => {});
    const mockedAskForCustomIcon = jest.spyOn(ask, 'forCustomIcon').mockImplementationOnce(async (): Promise<any> => true);
    const mockedAskForIcon = jest.spyOn(ask, 'forIcon').mockImplementationOnce(async (): Promise<any> => {});

    const mockedWriteJSON = jest.spyOn(fsExtra, 'writeJSON').mockImplementationOnce(async (): Promise<void> => {});
    const mockedBuildArtifact = jest.spyOn(builder, 'default').mockImplementationOnce(async (): Promise<void> => {});

    const mockedExitProcess = jest.spyOn(exitProcess, 'default').mockImplementationOnce((): void => {});
    await execute();
    expect(mockedInitialize).toHaveBeenCalled();
    expect(mockedCollectArgumentsFromCli).toHaveBeenCalled();

    expect(mockedAskForUrl).toHaveBeenCalled();
    expect(mockedAskForOs).toHaveBeenCalled();
    expect(mockedAskForGenericFormats).toHaveBeenCalled();
    expect(mockedAskForFormat).toHaveBeenCalled();
    expect(mockedAskForArch).toHaveBeenCalled();
    expect(mockedAskForCustomIcon).toHaveBeenCalled();
    expect(mockedAskForIcon).toHaveBeenCalled();

    expect(mockedWriteJSON).toHaveBeenCalled();
    expect(mockedBuildArtifact).toHaveBeenCalled();
    expect(mockedExitProcess).not.toHaveBeenCalled();
  });
  test('User does not get prompted if the argument was given via cli', async () => {
    const mockedInitialize = jest.spyOn(args, 'initialize').mockImplementationOnce(async (): Promise<any> => {});
    const mockedCollectArgumentsFromCli = jest.spyOn(args, 'collectArgumentsFromCli')
      .mockImplementationOnce(async () => {
        const mockedArguments: Electronify.Args = {
          arch: 'x64',
          format: 'snap',
          iconPath: './some/path.png',
          name: 'SomeName',
          os: 'linux',
          url: 'http://example.com',
          verbose: 'true',
        };
        return mockedArguments;
      });

    const mockedAskForUrl = jest.spyOn(ask, 'forURL').mockImplementationOnce(async (): Promise<any> => {});
    const mockedAskForOs = jest.spyOn(ask, 'forOS').mockImplementationOnce(async (): Promise<any> => {});
    const mockedAskForGenericFormats = jest.spyOn(ask, 'forGenericFormats').mockImplementationOnce(async (): Promise<any> => {});
    const mockedAskForFormat = jest.spyOn(ask, 'forFormat').mockImplementationOnce(async (): Promise<any> => {});
    const mockedAskForArch = jest.spyOn(ask, 'forArch').mockImplementationOnce(async (): Promise<any> => {});
    const mockedAskForCustomIcon = jest.spyOn(ask, 'forCustomIcon').mockImplementationOnce(async (): Promise<any> => {});
    const mockedAskForIcon = jest.spyOn(ask, 'forIcon').mockImplementationOnce(async (): Promise<any> => {});

    const mockedWriteJSON = jest.spyOn(fsExtra, 'writeJSON').mockImplementationOnce(async (): Promise<void> => {});
    const mockedBuildArtifact = jest.spyOn(builder, 'default').mockImplementationOnce(async (): Promise<void> => {});

    const mockedExitProcess = jest.spyOn(exitProcess, 'default').mockImplementationOnce((): void => {});
    await execute();
    expect(mockedInitialize).toHaveBeenCalled();
    expect(mockedCollectArgumentsFromCli).toHaveBeenCalled();

    expect(mockedAskForUrl).not.toHaveBeenCalled();
    expect(mockedAskForOs).not.toHaveBeenCalled();
    expect(mockedAskForGenericFormats).not.toHaveBeenCalled();
    expect(mockedAskForFormat).not.toHaveBeenCalled();
    expect(mockedAskForArch).not.toHaveBeenCalled();
    expect(mockedAskForCustomIcon).not.toHaveBeenCalled();
    expect(mockedAskForIcon).not.toHaveBeenCalled();

    expect(mockedWriteJSON).toHaveBeenCalled();
    expect(mockedBuildArtifact).toHaveBeenCalled();
    expect(mockedExitProcess).not.toHaveBeenCalled();
  });
  test('An error gets catched successfully, if one occurs', async () => {
    const mockedInitialize = jest.spyOn(args, 'initialize').mockImplementationOnce(async (): Promise<any> => {});
    const mockedCollectArgumentsFromCli = jest.spyOn(args, 'collectArgumentsFromCli').mockImplementationOnce(async (): Promise<any> => {});

    const mockedAskForUrl = jest.spyOn(ask, 'forURL').mockImplementationOnce(async (): Promise<any> => {});
    const mockedAskForOs = jest.spyOn(ask, 'forOS').mockImplementationOnce(async (): Promise<any> => {});
    const mockedAskForGenericFormats = jest.spyOn(ask, 'forGenericFormats').mockImplementationOnce(async (): Promise<any> => {});
    const mockedAskForFormat = jest.spyOn(ask, 'forFormat').mockImplementationOnce(async (): Promise<any> => {});
    const mockedAskForArch = jest.spyOn(ask, 'forArch').mockImplementationOnce(async (): Promise<any> => {});
    const mockedAskForCustomIcon = jest.spyOn(ask, 'forCustomIcon').mockImplementationOnce(async (): Promise<any> => {});
    const mockedAskForIcon = jest.spyOn(ask, 'forIcon').mockImplementationOnce(async (): Promise<any> => {});

    const mockedWriteJSON = jest.spyOn(fsExtra, 'writeJSON').mockImplementationOnce(async (): Promise<void> => {});
    const mockedBuildArtifact = jest.spyOn(builder, 'default').mockImplementationOnce(async (): Promise<void> => {});

    const mockedExitProcess = jest.spyOn(exitProcess, 'default').mockImplementationOnce((): void => {});
    await execute();
    expect(mockedInitialize).toHaveBeenCalled();
    expect(mockedCollectArgumentsFromCli).toHaveBeenCalled();

    expect(mockedAskForUrl).not.toHaveBeenCalled();
    expect(mockedAskForOs).not.toHaveBeenCalled();
    expect(mockedAskForGenericFormats).not.toHaveBeenCalled();
    expect(mockedAskForFormat).not.toHaveBeenCalled();
    expect(mockedAskForArch).not.toHaveBeenCalled();
    expect(mockedAskForCustomIcon).not.toHaveBeenCalled();
    expect(mockedAskForIcon).not.toHaveBeenCalled();

    expect(mockedWriteJSON).not.toHaveBeenCalled();
    expect(mockedBuildArtifact).not.toHaveBeenCalled();
    expect(mockedExitProcess).toHaveBeenCalledWith(1);
  });
});
