///
/// Erp System - Mark IV No 1 (David Series) Client 1.4.0
/// Copyright © 2021 - 2023 Edwin Njeru (mailnjeru@gmail.com)
///
/// This program is free software: you can redistribute it and/or modify
/// it under the terms of the GNU General Public License as published by
/// the Free Software Foundation, either version 3 of the License, or
/// (at your option) any later version.
///
/// This program is distributed in the hope that it will be useful,
/// but WITHOUT ANY WARRANTY; without even the implied warranty of
/// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
/// GNU General Public License for more details.
///
/// You should have received a copy of the GNU General Public License
/// along with this program. If not, see <http://www.gnu.org/licenses/>.
///

import { defineConfig } from 'cypress';

export const defaultConfig = {
  video: false,
  fixturesFolder: 'src/test/javascript/cypress/fixtures',
  screenshotsFolder: 'target/cypress/screenshots',
  downloadsFolder: 'target/cypress/downloads',
  videosFolder: 'target/cypress/videos',
  chromeWebSecurity: true,
  viewportWidth: 1200,
  viewportHeight: 720,
  retries: 2,
  env: {
    authenticationUrl: '/api/authenticate',
    jwtStorageName: 'jhi-authenticationToken',
  },
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    async setupNodeEvents(on, config) {
      return (await import('./src/test/javascript/cypress/plugins/index')).default(on, config);
    },
    baseUrl: 'http://localhost:8980/',
    specPattern: 'src/test/javascript/cypress/e2e/**/*.cy.ts',
    supportFile: 'src/test/javascript/cypress/support/index.ts',
    experimentalSessionAndOrigin: true,
  },
};

export default defineConfig(defaultConfig);
