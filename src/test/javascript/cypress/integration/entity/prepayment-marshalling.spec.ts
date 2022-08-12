///
/// Erp System - Mark II No 26 (Baruch Series) Client v 0.1.1-SNAPSHOT
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

describe('PrepaymentMarshalling e2e test', () => {
  const prepaymentMarshallingPageUrl = '/prepayment-marshalling';
  const prepaymentMarshallingPageUrlPattern = new RegExp('/prepayment-marshalling(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'admin';
  const password = Cypress.env('E2E_PASSWORD') ?? 'admin';
  const prepaymentMarshallingSample = { inactive: false };

  let prepaymentMarshalling: any;
  let prepaymentAccount: any;

  before(() => {
    cy.window().then(win => {
      win.sessionStorage.clear();
    });
    cy.visit('');
    cy.login(username, password);
    cy.get(entityItemSelector).should('exist');
  });

  beforeEach(() => {
    // create an instance at the required relationship entity:
    cy.authenticatedRequest({
      method: 'POST',
      url: '/api/prepayment-accounts',
      body: {
        catalogueNumber: 'Chicken',
        particulars: 'Fully-configurable utilisation',
        notes: 'Li4vZmFrZS1kYXRhL2Jsb2IvaGlwc3Rlci50eHQ=',
        prepaymentAmount: 47673,
        prepaymentGuid: 'c8a9da64-56e5-4591-8d07-b24137561029',
      },
    }).then(({ body }) => {
      prepaymentAccount = body;
    });
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/prepayment-marshallings+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/prepayment-marshallings').as('postEntityRequest');
    cy.intercept('DELETE', '/api/prepayment-marshallings/*').as('deleteEntityRequest');
  });

  beforeEach(() => {
    // Simulate relationships api for better performance and reproducibility.
    cy.intercept('GET', '/api/prepayment-accounts', {
      statusCode: 200,
      body: [prepaymentAccount],
    });

    cy.intercept('GET', '/api/placeholders', {
      statusCode: 200,
      body: [],
    });
  });

  afterEach(() => {
    if (prepaymentMarshalling) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/prepayment-marshallings/${prepaymentMarshalling.id}`,
      }).then(() => {
        prepaymentMarshalling = undefined;
      });
    }
  });

  afterEach(() => {
    if (prepaymentAccount) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/prepayment-accounts/${prepaymentAccount.id}`,
      }).then(() => {
        prepaymentAccount = undefined;
      });
    }
  });

  it('PrepaymentMarshallings menu should load PrepaymentMarshallings page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('prepayment-marshalling');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('PrepaymentMarshalling').should('exist');
    cy.url().should('match', prepaymentMarshallingPageUrlPattern);
  });

  describe('PrepaymentMarshalling page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(prepaymentMarshallingPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create PrepaymentMarshalling page', () => {
        cy.get(entityCreateButtonSelector).click({ force: true });
        cy.url().should('match', new RegExp('/prepayment-marshalling/new$'));
        cy.getEntityCreateUpdateHeading('PrepaymentMarshalling');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click({ force: true });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', prepaymentMarshallingPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/prepayment-marshallings',

          body: {
            ...prepaymentMarshallingSample,
            prepaymentAccount: prepaymentAccount,
          },
        }).then(({ body }) => {
          prepaymentMarshalling = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/prepayment-marshallings+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [prepaymentMarshalling],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(prepaymentMarshallingPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details PrepaymentMarshalling page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('prepaymentMarshalling');
        cy.get(entityDetailsBackButtonSelector).click({ force: true });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', prepaymentMarshallingPageUrlPattern);
      });

      it('edit button click should load edit PrepaymentMarshalling page', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('PrepaymentMarshalling');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click({ force: true });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', prepaymentMarshallingPageUrlPattern);
      });

      it('last delete button click should delete instance of PrepaymentMarshalling', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('prepaymentMarshalling').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click({ force: true });
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', prepaymentMarshallingPageUrlPattern);

        prepaymentMarshalling = undefined;
      });
    });
  });

  describe('new PrepaymentMarshalling page', () => {
    beforeEach(() => {
      cy.visit(`${prepaymentMarshallingPageUrl}`);
      cy.get(entityCreateButtonSelector).click({ force: true });
      cy.getEntityCreateUpdateHeading('PrepaymentMarshalling');
    });

    it('should create an instance of PrepaymentMarshalling', () => {
      cy.get(`[data-cy="inactive"]`).should('not.be.checked');
      cy.get(`[data-cy="inactive"]`).click().should('be.checked');

      cy.get(`[data-cy="amortizationCommencementDate"]`).type('2022-05-03').should('have.value', '2022-05-03');

      cy.get(`[data-cy="amortizationPeriods"]`).type('82509').should('have.value', '82509');

      cy.get(`[data-cy="prepaymentAccount"]`).select(1);

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        prepaymentMarshalling = response!.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should('match', prepaymentMarshallingPageUrlPattern);
    });
  });
});
