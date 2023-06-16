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
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const leaseLiabilityScheduleItemSample = {};

  let leaseLiabilityScheduleItem;
  let leaseContract;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    // create an instance at the required relationship entity:
    cy.authenticatedRequest({
      method: 'POST',
      url: '/api/lease-contracts',
      body: {
        bookingId: 'invoice Unions New',
        leaseTitle: 'SSL',
        identifier: 'fa3e3650-6af0-4a71-93e9-ec2673bdb3ca',
        description: 'Miquelon fuchsia',
        commencementDate: '2023-01-09',
        terminalDate: '2023-01-09',
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
      if (response.body.length === 0) {
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
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/lease-liability-schedule-item/new$'));
        cy.getEntityCreateUpdateHeading('LeaseLiabilityScheduleItem');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
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
              headers: {
                link: '<http://localhost/api/lease-liability-schedule-items?page=0&size=20>; rel="last",<http://localhost/api/lease-liability-schedule-items?page=0&size=20>; rel="first"',
              },
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
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', leaseLiabilityScheduleItemPageUrlPattern);
      });

      it('edit button click should load edit LeaseLiabilityScheduleItem page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('LeaseLiabilityScheduleItem');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', leaseLiabilityScheduleItemPageUrlPattern);
      });

      it.skip('edit button click should load edit LeaseLiabilityScheduleItem page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('LeaseLiabilityScheduleItem');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', leaseLiabilityScheduleItemPageUrlPattern);
      });

      it('last delete button click should delete instance of LeaseLiabilityScheduleItem', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('leaseLiabilityScheduleItem').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', leaseLiabilityScheduleItemPageUrlPattern);

        leaseLiabilityScheduleItem = undefined;
      });
    });
  });

  describe('new LeaseLiabilityScheduleItem page', () => {
    beforeEach(() => {
      cy.visit(`${leaseLiabilityScheduleItemPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('LeaseLiabilityScheduleItem');
    });

    it('should create an instance of LeaseLiabilityScheduleItem', () => {
      cy.get(`[data-cy="sequenceNumber"]`).type('98590').should('have.value', '98590');

      cy.get(`[data-cy="periodIncluded"]`).should('not.be.checked');
      cy.get(`[data-cy="periodIncluded"]`).click().should('be.checked');

      cy.get(`[data-cy="periodStartDate"]`).type('2023-03-28').blur().should('have.value', '2023-03-28');

      cy.get(`[data-cy="periodEndDate"]`).type('2023-03-28').blur().should('have.value', '2023-03-28');

      cy.get(`[data-cy="openingBalance"]`).type('10418').should('have.value', '10418');

      cy.get(`[data-cy="cashPayment"]`).type('37270').should('have.value', '37270');

      cy.get(`[data-cy="principalPayment"]`).type('7097').should('have.value', '7097');

      cy.get(`[data-cy="interestPayment"]`).type('58479').should('have.value', '58479');

      cy.get(`[data-cy="outstandingBalance"]`).type('9567').should('have.value', '9567');

      cy.get(`[data-cy="interestPayableOpening"]`).type('77879').should('have.value', '77879');

      cy.get(`[data-cy="interestExpenseAccrued"]`).type('11815').should('have.value', '11815');

      cy.get(`[data-cy="interestPayableBalance"]`).type('93871').should('have.value', '93871');

      cy.get(`[data-cy="leaseContract"]`).select(1);

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        leaseLiabilityScheduleItem = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', leaseLiabilityScheduleItemPageUrlPattern);
    });
  });
});
