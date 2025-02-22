import { Answers } from 'inquirer';

declare global {
    namespace Electronify {
        interface FormatsForOs {
            [key: string]: string[];
            generic: string[];
            macos: string[];
            linux: string[];
            windows: string[];
        }
        interface Choices {
            [key: string]: string | number | boolean | Answers;
            auto: boolean;
            url: string | Answers;
            appName: string;
            os: string | Answers;
            format: string | Answers;
            iconPath: string | Answers;
            architecture: string | number | Answers;
        }

        interface Args {
            [key: string]: string | undefined;
            auto?: string;
            url?: string;
            os?: string;
            format?: string;
            arch?: string;
            verbose?: string;
            name?: string;
            iconPath?: string;
        }
    }
}
