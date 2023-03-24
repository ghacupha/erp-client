import * as git_version from './git-version';

export const versionInfo = (() => {
  try {
    // tslint:disable-next-line:no-var-requires @typescript-eslint/no-unsafe-return
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return git_version;
  } catch {
    // In dev the file might not exist:
    return { tag: 'v0.0.0', hash: 'dev' };
  }
})();
