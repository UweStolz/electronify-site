// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector: any, text: any): void => {
    const element = document.getElementById(selector);
    if (element) { element.innerText = text; }
  };
  // eslint-disable-next-line no-restricted-syntax
  for (const type of ['chrome', 'node', 'electron']) {
    // @ts-ignore
    replaceText(`${type}-version`, process.versions[type]);
  }
});
