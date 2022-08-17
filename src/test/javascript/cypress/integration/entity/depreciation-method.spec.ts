///
/// Erp System - Mark II No 26 (Baruch Series) Client v 0.1.2-SNAPSHOT
/// Copyright © 2021 - 2022 Edwin Njeru (mailnjeru@gmail.com)
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

describe('DepreciationMethod e2e test', () => {
  const depreciationMethodPageUrl = '/depreciation-method';
  const depreciationMethodPageUrlPattern = new RegExp('/depreciation-method(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'admin';
  const password = Cypress.env('E2E_PASSWORD') ?? 'admin';
  const depreciationMethodSample = { depreciationMethodName: 'synthesize' };

  let depreciationMethod: any;

  before(() => {
    cy.window().then(win => {
      win.sessionStorage.clear();
    });
    cy.visit('');
    cy.login(username, password);
    cy.get(entityItemSelector).should('exist');
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/depreciation-methods+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/depreciation-methods').as('postEntityRequest');
    cy.intercept('DELETE', '/api/depreciation-methods/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (depreciationMethod) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/depreciation-methods/${depreciationMethod.id}`,
      }).then(() => {
        depreciationMethod = undefined;
      });
    }
  });

  it('DepreciationMethods menu should load DepreciationMethods page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('depreciation-method');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('DepreciationMethod').should('exist');
    cy.url().should('match', depreciationMethodPageUrlPattern);
  });

  describe('DepreciationMethod page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(depreciationMethodPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create DepreciationMethod page', () => {
        cy.get(entityCreateButtonSelector).click({ force: true });
        cy.url().should('match', new RegExp('/depreciation-method/new$'));
        cy.getEntityCreateUpdateHeading('DepreciationMethod');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click({ force: true });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', depreciationMethodPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/depreciation-methods',
          body: depreciationMethodSample,
        }).then(({ body }) => {
          depreciationMethod = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/depreciation-methods+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [depreciationMethod],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(depreciationMethodPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details DepreciationMethod page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('depreciationMethod');
        cy.get(entityDetailsBackButtonSelector).click({ force: true });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', depreciationMethodPageUrlPattern);
      });

      it('edit button click should load edit DepreciationMethod page', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('DepreciationMethod');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click({ force: true });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', depreciationMethodPageUrlPattern);
      });

      it('last delete button click should delete instance of DepreciationMethod', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('depreciationMethod').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click({ force: true });
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', depreciationMethodPageUrlPattern);

        depreciationMethod = undefined;
      });
    });
  });

  describe('new DepreciationMethod page', () => {
    beforeEach(() => {
      cy.visit(`${depreciationMethodPageUrl}`);
      cy.get(entityCreateButtonSelector).click({ force: true });
      cy.getEntityCreateUpdateHeading('DepreciationMethod');
    });

    it('should create an instance of DepreciationMethod', () => {
      cy.get(`[data-cy="depreciationMethodName"]`).type('salmon').should('have.value', 'salmon');

      cy.get(`[data-cy="description"]`).type('blue Hill Health').should('have.value', 'blue Hill Health');

      cy.get(`[data-cy="depreciationType"]`).select('DECLINING_BALANCE');

      cy.get(`[data-cy="remarks"]`)
        .type('../fake-data/blob/hipster.txt')
        .invoke('val')
        .should('match', new RegExp('../fake-data/blob/hipster.txt'));

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        depreciationMethod = response!.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should('match', depreciationMethodPageUrlPattern);
    });
  });
});
