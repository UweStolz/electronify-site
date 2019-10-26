import ora, { Ora, Options } from 'ora';

export function setSpinnerState(spinnerInstance: Ora, state: boolean): void {
  if (state) { spinnerInstance.succeed(); } else spinnerInstance.fail();
}

export function getSpinner(options?: string | Options | undefined): Ora {
  const spinnerInstance = ora(options);
  return spinnerInstance;
}
