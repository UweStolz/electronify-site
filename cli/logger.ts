import pino from 'pino';

const logger = pino({
  prettyPrint: {
    colorize: true,
    crlf: false,
    errorLikeObjectKeys: ['err', 'error'],
    errorProps: '',
    translateTime: 'HH:MM:ss',
  },
  base: null,
});

export default logger;
