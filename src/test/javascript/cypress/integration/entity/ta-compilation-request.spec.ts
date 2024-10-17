///
/// Erp System - Mark X No 10 (Jehoiada Series) Client 1.7.8
/// Copyright © 2021 - 2024 Edwin Njeru (mailnjeru@gmail.com)
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

describe('TACompilationRequest e2e test', () => {
  const tACompilationRequestPageUrl = '/ta-compilation-request';
  const tACompilationRequestPageUrlPattern = new RegExp('/ta-compilation-request(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'admin';
  const password = Cypress.env('E2E_PASSWORD') ?? 'admin';
  const tACompilationRequestSample = {
    requisitionId: '701d8b71-3a1a-475a-b1e3-27ceb25837b2',
    batchJobIdentifier: 'd70d8f68-987d-47bd-b9ff-6867ab430298',
    initialAmountStepIdentifier: '4df47b28-f4d1-43a1-8b89-88d4ed9342fd',
    depreciationAmountStepIdentifier: 'e2bbff65-64d7-4795-89b9-58c8f96969b8',
    initialLeaseAmountStepIdentifier: '259522d3-32fd-4fbf-88ef-0270dd76d6ea',
    interestAmountStepIdentifier: '7b7d2442-b7ff-4b60-b23d-61ade77afa58',
    flagAmortisedStepIdentifier: 'ddcd7e6e-6557-4698-a5be-ee2f4e884e90',
  };

  let tACompilationRequest: any;

  before(() => {
    cy.window().then(win => {
      win.sessionStorage.clear();
    });
    cy.visit('');
    cy.login(username, password);
    cy.get(entityItemSelector).should('exist');
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/ta-compilation-requests+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/ta-compilation-requests').as('postEntityRequest');
    cy.intercept('DELETE', '/api/ta-compilation-requests/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (tACompilationRequest) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/ta-compilation-requests/${tACompilationRequest.id}`,
      }).then(() => {
        tACompilationRequest = undefined;
      });
    }
  });

  it('TACompilationRequests menu should load TACompilationRequests page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('ta-compilation-request');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('TACompilationRequest').should('exist');
    cy.url().should('match', tACompilationRequestPageUrlPattern);
  });

  describe('TACompilationRequest page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(tACompilationRequestPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create TACompilationRequest page', () => {
        cy.get(entityCreateButtonSelector).click({ force: true });
        cy.url().should('match', new RegExp('/ta-compilation-request/new$'));
        cy.getEntityCreateUpdateHeading('TACompilationRequest');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click({ force: true });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', tACompilationRequestPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/ta-compilation-requests',
          body: tACompilationRequestSample,
        }).then(({ body }) => {
          tACompilationRequest = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/ta-compilation-requests+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [tACompilationRequest],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(tACompilationRequestPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details TACompilationRequest page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('tACompilationRequest');
        cy.get(entityDetailsBackButtonSelector).click({ force: true });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', tACompilationRequestPageUrlPattern);
      });

      it('edit button click should load edit TACompilationRequest page', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('TACompilationRequest');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click({ force: true });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', tACompilationRequestPageUrlPattern);
      });

      it('last delete button click should delete instance of TACompilationRequest', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('tACompilationRequest').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click({ force: true });
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', tACompilationRequestPageUrlPattern);

        tACompilationRequest = undefined;
      });
    });
  });

  describe('new TACompilationRequest page', () => {
    beforeEach(() => {
      cy.visit(`${tACompilationRequestPageUrl}`);
      cy.get(entityCreateButtonSelector).click({ force: true });
      cy.getEntityCreateUpdateHeading('TACompilationRequest');
    });

    it('should create an instance of TACompilationRequest', () => {
      cy.get(`[data-cy="requisitionId"]`)
        .type('0c00a183-48e3-478e-806a-030398d86843')
        .invoke('val')
        .should('match', new RegExp('0c00a183-48e3-478e-806a-030398d86843'));

      cy.get(`[data-cy="timeOfRequest"]`).type('2024-10-14T12:04').should('have.value', '2024-10-14T12:04');

      cy.get(`[data-cy="compilationProcessStatus"]`).select('COMPLETE');

      cy.get(`[data-cy="numberOfEnumeratedItems"]`).type('36605').should('have.value', '36605');

      cy.get(`[data-cy="batchJobIdentifier"]`)
        .type('df04dbf7-a162-469a-949a-576ae96c230e')
        .invoke('val')
        .should('match', new RegExp('df04dbf7-a162-469a-949a-576ae96c230e'));

      cy.get(`[data-cy="initialAmountStepIdentifier"]`)
        .type('13e24d36-7f65-4f58-821b-60103721b935')
        .invoke('val')
        .should('match', new RegExp('13e24d36-7f65-4f58-821b-60103721b935'));

      cy.get(`[data-cy="depreciationAmountStepIdentifier"]`)
        .type('c0025453-ac40-4b8c-a4c7-7ccd80881507')
        .invoke('val')
        .should('match', new RegExp('c0025453-ac40-4b8c-a4c7-7ccd80881507'));

      cy.get(`[data-cy="initialLeaseAmountStepIdentifier"]`)
        .type('dc027ee3-f374-424d-abcc-1a7db0f398fc')
        .invoke('val')
        .should('match', new RegExp('dc027ee3-f374-424d-abcc-1a7db0f398fc'));

      cy.get(`[data-cy="interestAmountStepIdentifier"]`)
        .type('2f4a6077-0fb7-46f1-a600-f52206cfd437')
        .invoke('val')
        .should('match', new RegExp('2f4a6077-0fb7-46f1-a600-f52206cfd437'));

      cy.get(`[data-cy="flagAmortisedStepIdentifier"]`)
        .type('dbac7e9d-89e5-43c3-9e0e-7b0422baec1a')
        .invoke('val')
        .should('match', new RegExp('dbac7e9d-89e5-43c3-9e0e-7b0422baec1a'));

      cy.get(`[data-cy="compilationTime"]`).type('2024-10-13T16:43').should('have.value', '2024-10-13T16:43');

      cy.get(`[data-cy="invalidated"]`).should('not.be.checked');
      cy.get(`[data-cy="invalidated"]`).click().should('be.checked');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        tACompilationRequest = response!.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should('match', tACompilationRequestPageUrlPattern);
    });
  });
});
