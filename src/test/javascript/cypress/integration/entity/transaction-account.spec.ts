///
/// Erp System - Mark X No 6 (Jehoiada Series) Client 1.7.4
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

describe('TransactionAccount e2e test', () => {
  const transactionAccountPageUrl = '/transaction-account';
  const transactionAccountPageUrlPattern = new RegExp('/transaction-account(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'admin';
  const password = Cypress.env('E2E_PASSWORD') ?? 'admin';
  const transactionAccountSample = { accountNumber: 'Total', accountName: 'Personal Loan Account' };

  let transactionAccount: any;

  before(() => {
    cy.window().then(win => {
      win.sessionStorage.clear();
    });
    cy.visit('');
    cy.login(username, password);
    cy.get(entityItemSelector).should('exist');
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/transaction-accounts+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/transaction-accounts').as('postEntityRequest');
    cy.intercept('DELETE', '/api/transaction-accounts/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (transactionAccount) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/transaction-accounts/${transactionAccount.id}`,
      }).then(() => {
        transactionAccount = undefined;
      });
    }
  });

  it('TransactionAccounts menu should load TransactionAccounts page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('transaction-account');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('TransactionAccount').should('exist');
    cy.url().should('match', transactionAccountPageUrlPattern);
  });

  describe('TransactionAccount page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(transactionAccountPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create TransactionAccount page', () => {
        cy.get(entityCreateButtonSelector).click({ force: true });
        cy.url().should('match', new RegExp('/transaction-account/new$'));
        cy.getEntityCreateUpdateHeading('TransactionAccount');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click({ force: true });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', transactionAccountPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/transaction-accounts',
          body: transactionAccountSample,
        }).then(({ body }) => {
          transactionAccount = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/transaction-accounts+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [transactionAccount],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(transactionAccountPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details TransactionAccount page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('transactionAccount');
        cy.get(entityDetailsBackButtonSelector).click({ force: true });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', transactionAccountPageUrlPattern);
      });

      it('edit button click should load edit TransactionAccount page', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('TransactionAccount');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click({ force: true });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', transactionAccountPageUrlPattern);
      });

      it('last delete button click should delete instance of TransactionAccount', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('transactionAccount').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click({ force: true });
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', transactionAccountPageUrlPattern);

        transactionAccount = undefined;
      });
    });
  });

  describe('new TransactionAccount page', () => {
    beforeEach(() => {
      cy.visit(`${transactionAccountPageUrl}`);
      cy.get(entityCreateButtonSelector).click({ force: true });
      cy.getEntityCreateUpdateHeading('TransactionAccount');
    });

    it('should create an instance of TransactionAccount', () => {
      cy.get(`[data-cy="accountNumber"]`).type('azure Communications withdrawal').should('have.value', 'azure Communications withdrawal');

      cy.get(`[data-cy="accountName"]`).type('Savings Account').should('have.value', 'Savings Account');

      cy.setFieldImageAsBytesOfEntity('notes', 'integration-test.png', 'image/png');

      // since cypress clicks submit too fast before the blob fields are validated
      cy.wait(200); // eslint-disable-line cypress/no-unnecessary-waiting
      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        transactionAccount = response!.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should('match', transactionAccountPageUrlPattern);
    });
  });
});
