
import builder from 'electron-builder';

const { Platform } = builder;

builder.build({
  targets: Platform.LINUX.createTarget(),
  config: {
    productName: 'someName',
  },
})
  .then(() => {
    // handle result
  })
  .catch((error) => {
    // handle error
  });
