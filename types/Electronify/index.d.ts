import { Answers } from 'inquirer';

declare global {
    namespace Electronify {
        interface Choices {
            [key: string]: string | number| Answers;
            url: string | Answers;
            os: string | Answers;
            format: string | Answers;
            architecture: string | number | Answers;
        }

        interface Args {
            [key: string]: string | undefined;
            url?: string;
            os?: string;
            format?: string;
            arch?: string;
            verbose?: string;
        }
    }
}