///
/// Erp System - Mark III No 3 (Caleb Series) Client 0.2.0-SNAPSHOT
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

describe('WorkInProgressRegistration e2e test', () => {
  const workInProgressRegistrationPageUrl = '/work-in-progress-registration';
  const workInProgressRegistrationPageUrlPattern = new RegExp('/work-in-progress-registration(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'admin';
  const password = Cypress.env('E2E_PASSWORD') ?? 'admin';
  const workInProgressRegistrationSample = { sequenceNumber: 'indigo Village' };

  let workInProgressRegistration: any;
  //let serviceOutlet: any;
  //let settlement: any;
  //let dealer: any;

  before(() => {
    cy.window().then(win => {
      win.sessionStorage.clear();
    });
    cy.visit('');
    cy.login(username, password);
    cy.get(entityItemSelector).should('exist');
  });

  /* Disabled due to incompatibility
  beforeEach(() => {
    // create an instance at the required relationship entity:
    cy.authenticatedRequest({
      method: 'POST',
      url: '/api/service-outlets',
      body: {"outletCode":"Consultant convergence Accountability","outletName":"JSON Frozen dynamic","town":"incremental payment","parliamentaryConstituency":"e-commerce bypassing","gpsCoordinates":"relationships Guam Berkshire","outletOpeningDate":"2022-03-01","regulatorApprovalDate":"2022-03-01","outletClosureDate":"2022-03-01","dateLastModified":"2022-03-01","licenseFeePayable":24201},
    }).then(({ body }) => {
      serviceOutlet = body;
    });
    // create an instance at the required relationship entity:
    cy.authenticatedRequest({
      method: 'POST',
      url: '/api/settlements',
      body: {"paymentNumber":"Liaison","paymentDate":"2022-02-02","paymentAmount":64012,"description":"Account Digitized orange","notes":"plug-and-play Dollar","calculationFile":"Li4vZmFrZS1kYXRhL2Jsb2IvaGlwc3Rlci5wbmc=","calculationFileContentType":"unknown","fileUploadToken":"indexing","compilationToken":"Road Alaska Bedfordshire","remarks":"Li4vZmFrZS1kYXRhL2Jsb2IvaGlwc3Rlci50eHQ="},
    }).then(({ body }) => {
      settlement = body;
    });
    // create an instance at the required relationship entity:
    cy.authenticatedRequest({
      method: 'POST',
      url: '/api/dealers',
      body: {"dealerName":"cross-platform","taxNumber":"Greens Pants","identificationDocumentNumber":"Movies parallelism","organizationName":"deposit Avon","department":"utilize generating","position":"Wooden","postalAddress":"Isle","physicalAddress":"Mobility Forge Tasty","accountName":"Savings Account","accountNumber":"leverage initiatives back-end","bankersName":"streamline ADP","bankersBranch":"indigo 5th","bankersSwiftCode":"Account","fileUploadToken":"Gloves","compilationToken":"overriding throughput Cotton","remarks":"Li4vZmFrZS1kYXRhL2Jsb2IvaGlwc3Rlci50eHQ=","otherNames":"Walks"},
    }).then(({ body }) => {
      dealer = body;
    });
  });
   */

  beforeEach(() => {
    cy.intercept('GET', '/api/work-in-progress-registrations+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/work-in-progress-registrations').as('postEntityRequest');
    cy.intercept('DELETE', '/api/work-in-progress-registrations/*').as('deleteEntityRequest');
  });

  /* Disabled due to incompatibility
  beforeEach(() => {
    // Simulate relationships api for better performance and reproducibility.
    cy.intercept('GET', '/api/placeholders', {
      statusCode: 200,
      body: [],
    });

    cy.intercept('GET', '/api/payment-invoices', {
      statusCode: 200,
      body: [],
    });

    cy.intercept('GET', '/api/service-outlets', {
      statusCode: 200,
      body: [serviceOutlet],
    });

    cy.intercept('GET', '/api/settlements', {
      statusCode: 200,
      body: [settlement],
    });

    cy.intercept('GET', '/api/purchase-orders', {
      statusCode: 200,
      body: [],
    });

    cy.intercept('GET', '/api/delivery-notes', {
      statusCode: 200,
      body: [],
    });

    cy.intercept('GET', '/api/job-sheets', {
      statusCode: 200,
      body: [],
    });

    cy.intercept('GET', '/api/dealers', {
      statusCode: 200,
      body: [dealer],
    });

    cy.intercept('GET', '/api/work-in-progress-registrations', {
      statusCode: 200,
      body: [],
    });

    cy.intercept('GET', '/api/settlement-currencies', {
      statusCode: 200,
      body: [],
    });

    cy.intercept('GET', '/api/work-project-registers', {
      statusCode: 200,
      body: [],
    });

  });
   */

  afterEach(() => {
    if (workInProgressRegistration) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/work-in-progress-registrations/${workInProgressRegistration.id}`,
      }).then(() => {
        workInProgressRegistration = undefined;
      });
    }
  });

  /* Disabled due to incompatibility
  afterEach(() => {
    if (serviceOutlet) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/service-outlets/${serviceOutlet.id}`,
      }).then(() => {
        serviceOutlet = undefined;
      });
    }
    if (settlement) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/settlements/${settlement.id}`,
      }).then(() => {
        settlement = undefined;
      });
    }
    if (dealer) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/dealers/${dealer.id}`,
      }).then(() => {
        dealer = undefined;
      });
    }
  });
   */

  it('WorkInProgressRegistrations menu should load WorkInProgressRegistrations page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('work-in-progress-registration');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('WorkInProgressRegistration').should('exist');
    cy.url().should('match', workInProgressRegistrationPageUrlPattern);
  });

  describe('WorkInProgressRegistration page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(workInProgressRegistrationPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create WorkInProgressRegistration page', () => {
        cy.get(entityCreateButtonSelector).click({ force: true });
        cy.url().should('match', new RegExp('/work-in-progress-registration/new$'));
        cy.getEntityCreateUpdateHeading('WorkInProgressRegistration');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click({ force: true });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', workInProgressRegistrationPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      /* Disabled due to incompatibility
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/work-in-progress-registrations',
  
          body: {
            ...workInProgressRegistrationSample,
            serviceOutlet: serviceOutlet,
            settlement: settlement,
            dealer: dealer,
          },
        }).then(({ body }) => {
          workInProgressRegistration = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/work-in-progress-registrations+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [workInProgressRegistration],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(workInProgressRegistrationPageUrl);

        cy.wait('@entitiesRequestInternal');
      });
       */

      beforeEach(function () {
        cy.visit(workInProgressRegistrationPageUrl);

        cy.wait('@entitiesRequest').then(({ response }) => {
          if (response!.body.length === 0) {
            this.skip();
          }
        });
      });

      it('detail button click should load details WorkInProgressRegistration page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('workInProgressRegistration');
        cy.get(entityDetailsBackButtonSelector).click({ force: true });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', workInProgressRegistrationPageUrlPattern);
      });

      it('edit button click should load edit WorkInProgressRegistration page', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('WorkInProgressRegistration');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click({ force: true });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', workInProgressRegistrationPageUrlPattern);
      });

      it.skip('last delete button click should delete instance of WorkInProgressRegistration', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('workInProgressRegistration').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click({ force: true });
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', workInProgressRegistrationPageUrlPattern);

        workInProgressRegistration = undefined;
      });
    });
  });

  describe('new WorkInProgressRegistration page', () => {
    beforeEach(() => {
      cy.visit(`${workInProgressRegistrationPageUrl}`);
      cy.get(entityCreateButtonSelector).click({ force: true });
      cy.getEntityCreateUpdateHeading('WorkInProgressRegistration');
    });

    it.skip('should create an instance of WorkInProgressRegistration', () => {
      cy.get(`[data-cy="sequenceNumber"]`).type('Convertible').should('have.value', 'Convertible');

      cy.get(`[data-cy="particulars"]`).type('San Plastic').should('have.value', 'San Plastic');

      cy.get(`[data-cy="instalmentAmount"]`).type('42556').should('have.value', '42556');

      cy.setFieldImageAsBytesOfEntity('comments', 'integration-test.png', 'image/png');

      cy.get(`[data-cy="serviceOutlet"]`).select([0]);
      cy.get(`[data-cy="settlement"]`).select([0]);
      cy.get(`[data-cy="dealer"]`).select(1);

      // since cypress clicks submit too fast before the blob fields are validated
      cy.wait(200); // eslint-disable-line cypress/no-unnecessary-waiting
      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        workInProgressRegistration = response!.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should('match', workInProgressRegistrationPageUrlPattern);
    });
  });
});
