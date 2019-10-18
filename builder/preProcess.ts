function getBaseName(url: string): string {
  const host = new URL(url).hostname;
  const baseName = host.substring(0, 4) === 'www.'
    ? host.substring(4, host.lastIndexOf('.'))
    : host.substring(0, host.lastIndexOf('.'));
  return baseName;
}

export default async function preprocessData(choices: Electronify.Choices): Promise<Electronify.Choices> {
  const OS: string = choices.os.toUpperCase();
  const nameFromUrl: string = getBaseName(choices.url as string);
  const pathToIcon: string = choices.iconPath as string;
  const archMap = {
    ia32: 0,
    x64: 1,
    armv7l: 2,
    arm64: 3,
  };
    // @ts-ignore
  const arch: number = archMap[choices.architecture];
  const data: Electronify.Choices = {
    appName: choices.appName,
    url: nameFromUrl,
    os: OS,
    format: choices.format,
    architecture: arch,
    iconPath: pathToIcon,
  };
  return data;
}
