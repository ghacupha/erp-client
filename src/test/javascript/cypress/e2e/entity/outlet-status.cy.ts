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

describe('OutletStatus e2e test', () => {
  const outletStatusPageUrl = '/outlet-status';
  const outletStatusPageUrlPattern = new RegExp('/outlet-status(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const outletStatusSample = { branchStatusTypeCode: 'Metal teal Mouse', branchStatusType: 'CLOSED' };

  let outletStatus;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/outlet-statuses+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/outlet-statuses').as('postEntityRequest');
    cy.intercept('DELETE', '/api/outlet-statuses/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (outletStatus) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/outlet-statuses/${outletStatus.id}`,
      }).then(() => {
        outletStatus = undefined;
      });
    }
  });

  it('OutletStatuses menu should load OutletStatuses page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('outlet-status');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('OutletStatus').should('exist');
    cy.url().should('match', outletStatusPageUrlPattern);
  });

  describe('OutletStatus page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(outletStatusPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create OutletStatus page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/outlet-status/new$'));
        cy.getEntityCreateUpdateHeading('OutletStatus');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', outletStatusPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/outlet-statuses',
          body: outletStatusSample,
        }).then(({ body }) => {
          outletStatus = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/outlet-statuses+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/outlet-statuses?page=0&size=20>; rel="last",<http://localhost/api/outlet-statuses?page=0&size=20>; rel="first"',
              },
              body: [outletStatus],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(outletStatusPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details OutletStatus page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('outletStatus');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', outletStatusPageUrlPattern);
      });

      it('edit button click should load edit OutletStatus page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('OutletStatus');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', outletStatusPageUrlPattern);
      });

      it.skip('edit button click should load edit OutletStatus page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('OutletStatus');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', outletStatusPageUrlPattern);
      });

      it('last delete button click should delete instance of OutletStatus', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('outletStatus').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', outletStatusPageUrlPattern);

        outletStatus = undefined;
      });
    });
  });

  describe('new OutletStatus page', () => {
    beforeEach(() => {
      cy.visit(`${outletStatusPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('OutletStatus');
    });

    it('should create an instance of OutletStatus', () => {
      cy.get(`[data-cy="branchStatusTypeCode"]`).type('white Loan Lead').should('have.value', 'white Loan Lead');

      cy.get(`[data-cy="branchStatusType"]`).select('INACTIVE');

      cy.get(`[data-cy="branchStatusTypeDescription"]`).type('leading-edge payment').should('have.value', 'leading-edge payment');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        outletStatus = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', outletStatusPageUrlPattern);
    });
  });
});
