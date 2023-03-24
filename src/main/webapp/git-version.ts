// This script runs operations *synchronously* which is normally not the best
// approach, but it keeps things simple, readable, and for now is good enough.

import { gitDescribeSync } from 'git-describe';
import { writeFileSync } from 'fs';


export const gitInfo = gitDescribeSync();
export const versionInfoJson = JSON.stringify(gitInfo, null, 2);

writeFileSync('git-version.json', versionInfoJson);
