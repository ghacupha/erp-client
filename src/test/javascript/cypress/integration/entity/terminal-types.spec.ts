///
/// Erp System - Mark X No 9 (Jehoiada Series) Client 1.7.7
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

describe('TerminalTypes e2e test', () => {
  const terminalTypesPageUrl = '/terminal-types';
  const terminalTypesPageUrlPattern = new RegExp('/terminal-types(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'admin';
  const password = Cypress.env('E2E_PASSWORD') ?? 'admin';
  const terminalTypesSample = { txnTerminalTypeCode: 'Singapore Investor navigate', txnChannelType: 'Marketing Steel optical' };

  let terminalTypes: any;

  before(() => {
    cy.window().then(win => {
      win.sessionStorage.clear();
    });
    cy.visit('');
    cy.login(username, password);
    cy.get(entityItemSelector).should('exist');
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/terminal-types+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/terminal-types').as('postEntityRequest');
    cy.intercept('DELETE', '/api/terminal-types/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (terminalTypes) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/terminal-types/${terminalTypes.id}`,
      }).then(() => {
        terminalTypes = undefined;
      });
    }
  });

  it('TerminalTypes menu should load TerminalTypes page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('terminal-types');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('TerminalTypes').should('exist');
    cy.url().should('match', terminalTypesPageUrlPattern);
  });

  describe('TerminalTypes page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(terminalTypesPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create TerminalTypes page', () => {
        cy.get(entityCreateButtonSelector).click({ force: true });
        cy.url().should('match', new RegExp('/terminal-types/new$'));
        cy.getEntityCreateUpdateHeading('TerminalTypes');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click({ force: true });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', terminalTypesPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/terminal-types',
          body: terminalTypesSample,
        }).then(({ body }) => {
          terminalTypes = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/terminal-types+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [terminalTypes],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(terminalTypesPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details TerminalTypes page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('terminalTypes');
        cy.get(entityDetailsBackButtonSelector).click({ force: true });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', terminalTypesPageUrlPattern);
      });

      it('edit button click should load edit TerminalTypes page', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('TerminalTypes');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click({ force: true });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', terminalTypesPageUrlPattern);
      });

      it('last delete button click should delete instance of TerminalTypes', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('terminalTypes').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click({ force: true });
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', terminalTypesPageUrlPattern);

        terminalTypes = undefined;
      });
    });
  });

  describe('new TerminalTypes page', () => {
    beforeEach(() => {
      cy.visit(`${terminalTypesPageUrl}`);
      cy.get(entityCreateButtonSelector).click({ force: true });
      cy.getEntityCreateUpdateHeading('TerminalTypes');
    });

    it('should create an instance of TerminalTypes', () => {
      cy.get(`[data-cy="txnTerminalTypeCode"]`).type('Licensed Outdoors Intelligent').should('have.value', 'Licensed Outdoors Intelligent');

      cy.get(`[data-cy="txnChannelType"]`).type('Fantastic synthesize').should('have.value', 'Fantastic synthesize');

      cy.get(`[data-cy="txnChannelTypeDetails"]`)
        .type('../fake-data/blob/hipster.txt')
        .invoke('val')
        .should('match', new RegExp('../fake-data/blob/hipster.txt'));

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        terminalTypes = response!.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should('match', terminalTypesPageUrlPattern);
    });
  });
});
