///
/// Erp System - Mark IX No 2 (Hilkiah Series) Client 1.6.3
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

import { entityItemSelector } from '../../support/commands';
import {
  entityTableSelector,
  entityDetailsButtonSelector,
  entityDetailsBackButtonSelector,
  entityCreateButtonSelector,
  entityCreateSaveButtonSelector,
  entityCreateCancelButtonSelector,
  entityEditButtonSelector,
  entityDeleteButtonSelector,
  entityConfirmDeleteButtonSelector,
} from '../../support/entity';

describe('AutonomousReport e2e test', () => {
  const autonomousReportPageUrl = '/autonomous-report';
  const autonomousReportPageUrlPattern = new RegExp('/autonomous-report(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'admin';
  const password = Cypress.env('E2E_PASSWORD') ?? 'admin';
  const autonomousReportSample = {
    reportName: 'Kong',
    createdAt: '2023-12-06T13:29:37.106Z',
    reportFilename: '57b8359f-d139-427f-a6c6-7a89c1ae2770',
  };

  let autonomousReport: any;

  before(() => {
    cy.window().then(win => {
      win.sessionStorage.clear();
    });
    cy.visit('');
    cy.login(username, password);
    cy.get(entityItemSelector).should('exist');
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/autonomous-reports+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/autonomous-reports').as('postEntityRequest');
    cy.intercept('DELETE', '/api/autonomous-reports/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (autonomousReport) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/autonomous-reports/${autonomousReport.id}`,
      }).then(() => {
        autonomousReport = undefined;
      });
    }
  });

  it('AutonomousReports menu should load AutonomousReports page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('autonomous-report');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('AutonomousReport').should('exist');
    cy.url().should('match', autonomousReportPageUrlPattern);
  });

  describe('AutonomousReport page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(autonomousReportPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create AutonomousReport page', () => {
        cy.get(entityCreateButtonSelector).click({ force: true });
        cy.url().should('match', new RegExp('/autonomous-report/new$'));
        cy.getEntityCreateUpdateHeading('AutonomousReport');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click({ force: true });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', autonomousReportPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/autonomous-reports',
          body: autonomousReportSample,
        }).then(({ body }) => {
          autonomousReport = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/autonomous-reports+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [autonomousReport],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(autonomousReportPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details AutonomousReport page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('autonomousReport');
        cy.get(entityDetailsBackButtonSelector).click({ force: true });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', autonomousReportPageUrlPattern);
      });

      it('edit button click should load edit AutonomousReport page', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('AutonomousReport');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click({ force: true });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', autonomousReportPageUrlPattern);
      });

      it('last delete button click should delete instance of AutonomousReport', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('autonomousReport').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click({ force: true });
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', autonomousReportPageUrlPattern);

        autonomousReport = undefined;
      });
    });
  });

  describe('new AutonomousReport page', () => {
    beforeEach(() => {
      cy.visit(`${autonomousReportPageUrl}`);
      cy.get(entityCreateButtonSelector).click({ force: true });
      cy.getEntityCreateUpdateHeading('AutonomousReport');
    });

    it('should create an instance of AutonomousReport', () => {
      cy.get(`[data-cy="reportName"]`).type('FTP JSON').should('have.value', 'FTP JSON');

      cy.get(`[data-cy="reportParameters"]`).type('withdrawal').should('have.value', 'withdrawal');

      cy.get(`[data-cy="createdAt"]`).type('2023-12-06T13:19').should('have.value', '2023-12-06T13:19');

      cy.get(`[data-cy="reportFilename"]`)
        .type('adf34fec-3ee4-4ad9-91fe-d497fdc0fdcc')
        .invoke('val')
        .should('match', new RegExp('adf34fec-3ee4-4ad9-91fe-d497fdc0fdcc'));

      cy.setFieldImageAsBytesOfEntity('reportFile', 'integration-test.png', 'image/png');

      // since cypress clicks submit too fast before the blob fields are validated
      cy.wait(200); // eslint-disable-line cypress/no-unnecessary-waiting
      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        autonomousReport = response!.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should('match', autonomousReportPageUrlPattern);
    });
  });
});
