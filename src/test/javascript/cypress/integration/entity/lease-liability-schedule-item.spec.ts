///
/// Erp System - Mark V No 1 (Ehud Series) Client 1.4.4
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

describe('LeaseLiabilityScheduleItem e2e test', () => {
  const leaseLiabilityScheduleItemPageUrl = '/lease-liability-schedule-item';
  const leaseLiabilityScheduleItemPageUrlPattern = new RegExp('/lease-liability-schedule-item(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'admin';
  const password = Cypress.env('E2E_PASSWORD') ?? 'admin';
  const leaseLiabilityScheduleItemSample = {};

  let leaseLiabilityScheduleItem: any;
  let leaseContract: any;

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
      url: '/api/lease-contracts',
      body: {
        bookingId: 'intelligence Montana impactful',
        leaseTitle: 'indexing granular streamline',
        identifier: '2580cc3b-1340-4987-8292-a19f887b969c',
        description: 'embrace eyeballs syndicate',
        commencementDate: '2023-01-09',
        terminalDate: '2023-01-08',
      },
    }).then(({ body }) => {
      leaseContract = body;
    });
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/lease-liability-schedule-items+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/lease-liability-schedule-items').as('postEntityRequest');
    cy.intercept('DELETE', '/api/lease-liability-schedule-items/*').as('deleteEntityRequest');
  });

  beforeEach(() => {
    // Simulate relationships api for better performance and reproducibility.
    cy.intercept('GET', '/api/placeholders', {
      statusCode: 200,
      body: [],
    });

    cy.intercept('GET', '/api/lease-contracts', {
      statusCode: 200,
      body: [leaseContract],
    });

    cy.intercept('GET', '/api/lease-model-metadata', {
      statusCode: 200,
      body: [],
    });

    cy.intercept('GET', '/api/universally-unique-mappings', {
      statusCode: 200,
      body: [],
    });
  });

  afterEach(() => {
    if (leaseLiabilityScheduleItem) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/lease-liability-schedule-items/${leaseLiabilityScheduleItem.id}`,
      }).then(() => {
        leaseLiabilityScheduleItem = undefined;
      });
    }
  });

  afterEach(() => {
    if (leaseContract) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/lease-contracts/${leaseContract.id}`,
      }).then(() => {
        leaseContract = undefined;
      });
    }
  });

  it('LeaseLiabilityScheduleItems menu should load LeaseLiabilityScheduleItems page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('lease-liability-schedule-item');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('LeaseLiabilityScheduleItem').should('exist');
    cy.url().should('match', leaseLiabilityScheduleItemPageUrlPattern);
  });

  describe('LeaseLiabilityScheduleItem page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(leaseLiabilityScheduleItemPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create LeaseLiabilityScheduleItem page', () => {
        cy.get(entityCreateButtonSelector).click({ force: true });
        cy.url().should('match', new RegExp('/lease-liability-schedule-item/new$'));
        cy.getEntityCreateUpdateHeading('LeaseLiabilityScheduleItem');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click({ force: true });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', leaseLiabilityScheduleItemPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/lease-liability-schedule-items',

          body: {
            ...leaseLiabilityScheduleItemSample,
            leaseContract: leaseContract,
          },
        }).then(({ body }) => {
          leaseLiabilityScheduleItem = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/lease-liability-schedule-items+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [leaseLiabilityScheduleItem],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(leaseLiabilityScheduleItemPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details LeaseLiabilityScheduleItem page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('leaseLiabilityScheduleItem');
        cy.get(entityDetailsBackButtonSelector).click({ force: true });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', leaseLiabilityScheduleItemPageUrlPattern);
      });

      it('edit button click should load edit LeaseLiabilityScheduleItem page', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('LeaseLiabilityScheduleItem');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click({ force: true });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', leaseLiabilityScheduleItemPageUrlPattern);
      });

      it('last delete button click should delete instance of LeaseLiabilityScheduleItem', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('leaseLiabilityScheduleItem').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click({ force: true });
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', leaseLiabilityScheduleItemPageUrlPattern);

        leaseLiabilityScheduleItem = undefined;
      });
    });
  });

  describe('new LeaseLiabilityScheduleItem page', () => {
    beforeEach(() => {
      cy.visit(`${leaseLiabilityScheduleItemPageUrl}`);
      cy.get(entityCreateButtonSelector).click({ force: true });
      cy.getEntityCreateUpdateHeading('LeaseLiabilityScheduleItem');
    });

    it('should create an instance of LeaseLiabilityScheduleItem', () => {
      cy.get(`[data-cy="sequenceNumber"]`).type('97481').should('have.value', '97481');

      cy.get(`[data-cy="periodIncluded"]`).should('not.be.checked');
      cy.get(`[data-cy="periodIncluded"]`).click().should('be.checked');

      cy.get(`[data-cy="periodStartDate"]`).type('2023-03-28').should('have.value', '2023-03-28');

      cy.get(`[data-cy="periodEndDate"]`).type('2023-03-28').should('have.value', '2023-03-28');

      cy.get(`[data-cy="openingBalance"]`).type('2512').should('have.value', '2512');

      cy.get(`[data-cy="cashPayment"]`).type('57989').should('have.value', '57989');

      cy.get(`[data-cy="principalPayment"]`).type('1472').should('have.value', '1472');

      cy.get(`[data-cy="interestPayment"]`).type('17465').should('have.value', '17465');

      cy.get(`[data-cy="outstandingBalance"]`).type('60769').should('have.value', '60769');

      cy.get(`[data-cy="interestPayableOpening"]`).type('31988').should('have.value', '31988');

      cy.get(`[data-cy="interestExpenseAccrued"]`).type('15834').should('have.value', '15834');

      cy.get(`[data-cy="interestPayableBalance"]`).type('33962').should('have.value', '33962');

      cy.get(`[data-cy="leaseContract"]`).select(1);

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        leaseLiabilityScheduleItem = response!.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should('match', leaseLiabilityScheduleItemPageUrlPattern);
    });
  });
});
