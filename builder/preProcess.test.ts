import preprocessData from './preProcess';

test('The Data gets processed successfully', async () => {
  const choices: Electronify.Choices = {
    appName: '',
    architecture: 'x64',
    format: 'snap',
    iconPath: './some/path.png',
    os: 'linux',
    url: 'http://www.example.com',
  };
  const data: Electronify.Choices = await preprocessData(choices);
  expect(data.architecture).toBe(1);
  expect(data.os).toBe('LINUX');
  expect(data.url).toBe('example');
});
