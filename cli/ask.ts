import inquirer from 'inquirer';

async function ask(params: inquirer.QuestionCollection): Promise<inquirer.Answers> {
  const answers = await inquirer.prompt({
    name: 'answer',
    ...params,
  });
  return answers ? answers.answer : {};
}

export default async function forUrl(): Promise <inquirer.Answers> {
  return ask({
    message: 'What is the URL you want to wrap?',
    type: 'input',
    validate: (answer) => answer.length > 10,
  });
}
