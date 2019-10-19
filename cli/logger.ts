import pino from 'pino';

const logger = pino({
  base: null,
  prettyPrint: {
    colorize: true,
    crlf: false,
    errorLikeObjectKeys: ['err', 'error'],
    errorProps: '',
    translateTime: 'HH:MM:ss',
  },
});

export default logger;
