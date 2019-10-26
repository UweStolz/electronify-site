import ora from 'ora';
import * as spinner from './spinner';

jest.mock('ora', () => {
  const succeed = jest.fn();
  const fail = jest.fn();
  const result = { fail, succeed };
  return jest.fn(() => result);
});

describe('Ora - Handler', () => {
  test('Sets the spinner to succeed', () => {
    const spinnerInstance = ora();
    spinner.setSpinnerState(spinnerInstance, true);
    expect(spinnerInstance.succeed).toHaveBeenCalled();
  });
  test('Sets the spinner to fail', () => {
    const spinnerInstance = ora();
    spinner.setSpinnerState(spinnerInstance, false);
    expect(spinnerInstance.fail).toHaveBeenCalled();
  });
  test('Gets an instance of a spinner', () => {
    const spinnerInstance = spinner.getSpinner();
    expect(spinnerInstance).toBeDefined();
  });
});
