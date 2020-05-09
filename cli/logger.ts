import pino, { destination, DestinationStream, LoggerOptions } from 'pino';

// @ts-ignore
const destinationInstance = destination({
  sync: false,
}) as DestinationStream;

const options: LoggerOptions = {
  base: null,
  prettyPrint: {
    colorize: true,
    crlf: false,
    errorLikeObjectKeys: ['err', 'error'],
    errorProps: '',
    translateTime: 'HH:MM:ss',
  },
};

const logger = pino(
  options,
  destinationInstance,
);

export default logger;
