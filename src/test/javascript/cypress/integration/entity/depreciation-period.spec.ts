///
/// Erp System - Mark V No 1 (Ehud Series) Client 1.5.1
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

describe('DepreciationPeriod e2e test', () => {
  const depreciationPeriodPageUrl = '/depreciation-period';
  const depreciationPeriodPageUrlPattern = new RegExp('/depreciation-period(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'admin';
  const password = Cypress.env('E2E_PASSWORD') ?? 'admin';
  const depreciationPeriodSample = { startDate: '2023-07-04', endDate: '2023-07-04' };

  let depreciationPeriod: any;

  before(() => {
    cy.window().then(win => {
      win.sessionStorage.clear();
    });
    cy.visit('');
    cy.login(username, password);
    cy.get(entityItemSelector).should('exist');
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/depreciation-periods+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/depreciation-periods').as('postEntityRequest');
    cy.intercept('DELETE', '/api/depreciation-periods/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (depreciationPeriod) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/depreciation-periods/${depreciationPeriod.id}`,
      }).then(() => {
        depreciationPeriod = undefined;
      });
    }
  });

  it('DepreciationPeriods menu should load DepreciationPeriods page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('depreciation-period');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('DepreciationPeriod').should('exist');
    cy.url().should('match', depreciationPeriodPageUrlPattern);
  });

  describe('DepreciationPeriod page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(depreciationPeriodPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create DepreciationPeriod page', () => {
        cy.get(entityCreateButtonSelector).click({ force: true });
        cy.url().should('match', new RegExp('/depreciation-period/new$'));
        cy.getEntityCreateUpdateHeading('DepreciationPeriod');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click({ force: true });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', depreciationPeriodPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/depreciation-periods',
          body: depreciationPeriodSample,
        }).then(({ body }) => {
          depreciationPeriod = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/depreciation-periods+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [depreciationPeriod],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(depreciationPeriodPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details DepreciationPeriod page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('depreciationPeriod');
        cy.get(entityDetailsBackButtonSelector).click({ force: true });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', depreciationPeriodPageUrlPattern);
      });

      it('edit button click should load edit DepreciationPeriod page', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('DepreciationPeriod');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click({ force: true });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', depreciationPeriodPageUrlPattern);
      });

      it('last delete button click should delete instance of DepreciationPeriod', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('depreciationPeriod').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click({ force: true });
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', depreciationPeriodPageUrlPattern);

        depreciationPeriod = undefined;
      });
    });
  });

  describe('new DepreciationPeriod page', () => {
    beforeEach(() => {
      cy.visit(`${depreciationPeriodPageUrl}`);
      cy.get(entityCreateButtonSelector).click({ force: true });
      cy.getEntityCreateUpdateHeading('DepreciationPeriod');
    });

    it('should create an instance of DepreciationPeriod', () => {
      cy.get(`[data-cy="startDate"]`).type('2023-07-03').should('have.value', '2023-07-03');

      cy.get(`[data-cy="endDate"]`).type('2023-07-04').should('have.value', '2023-07-04');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        depreciationPeriod = response!.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should('match', depreciationPeriodPageUrlPattern);
    });
  });
});
