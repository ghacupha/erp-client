///
/// Erp System - Mark II No 17 (Baruch Series)
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

describe('PrepaymentAmortization e2e test', () => {
  const prepaymentAmortizationPageUrl = '/prepayment-amortization';
  const prepaymentAmortizationPageUrlPattern = new RegExp('/prepayment-amortization(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'admin';
  const password = Cypress.env('E2E_PASSWORD') ?? 'admin';
  const prepaymentAmortizationSample = {};

  let prepaymentAmortization: any;

  before(() => {
    cy.window().then(win => {
      win.sessionStorage.clear();
    });
    cy.visit('');
    cy.login(username, password);
    cy.get(entityItemSelector).should('exist');
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/prepayment-amortizations+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/prepayment-amortizations').as('postEntityRequest');
    cy.intercept('DELETE', '/api/prepayment-amortizations/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (prepaymentAmortization) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/prepayment-amortizations/${prepaymentAmortization.id}`,
      }).then(() => {
        prepaymentAmortization = undefined;
      });
    }
  });

  it('PrepaymentAmortizations menu should load PrepaymentAmortizations page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('prepayment-amortization');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('PrepaymentAmortization').should('exist');
    cy.url().should('match', prepaymentAmortizationPageUrlPattern);
  });

  describe('PrepaymentAmortization page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(prepaymentAmortizationPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create PrepaymentAmortization page', () => {
        cy.get(entityCreateButtonSelector).click({ force: true });
        cy.url().should('match', new RegExp('/prepayment-amortization/new$'));
        cy.getEntityCreateUpdateHeading('PrepaymentAmortization');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click({ force: true });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', prepaymentAmortizationPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/prepayment-amortizations',
          body: prepaymentAmortizationSample,
        }).then(({ body }) => {
          prepaymentAmortization = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/prepayment-amortizations+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [prepaymentAmortization],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(prepaymentAmortizationPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details PrepaymentAmortization page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('prepaymentAmortization');
        cy.get(entityDetailsBackButtonSelector).click({ force: true });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', prepaymentAmortizationPageUrlPattern);
      });

      it('edit button click should load edit PrepaymentAmortization page', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('PrepaymentAmortization');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click({ force: true });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', prepaymentAmortizationPageUrlPattern);
      });

      it('last delete button click should delete instance of PrepaymentAmortization', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('prepaymentAmortization').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click({ force: true });
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', prepaymentAmortizationPageUrlPattern);

        prepaymentAmortization = undefined;
      });
    });
  });

  describe('new PrepaymentAmortization page', () => {
    beforeEach(() => {
      cy.visit(`${prepaymentAmortizationPageUrl}`);
      cy.get(entityCreateButtonSelector).click({ force: true });
      cy.getEntityCreateUpdateHeading('PrepaymentAmortization');
    });

    it('should create an instance of PrepaymentAmortization', () => {
      cy.get(`[data-cy="description"]`).type('Account Steel lime').should('have.value', 'Account Steel lime');

      cy.get(`[data-cy="prepaymentPeriod"]`).type('2022-05-02').should('have.value', '2022-05-02');

      cy.get(`[data-cy="prepaymentAmount"]`).type('48900').should('have.value', '48900');

      cy.get(`[data-cy="inactive"]`).should('not.be.checked');
      cy.get(`[data-cy="inactive"]`).click().should('be.checked');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        prepaymentAmortization = response!.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should('match', prepaymentAmortizationPageUrlPattern);
    });
  });
});
