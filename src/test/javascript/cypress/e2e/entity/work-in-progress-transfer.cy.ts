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

describe('WorkInProgressTransfer e2e test', () => {
  const workInProgressTransferPageUrl = '/work-in-progress-transfer';
  const workInProgressTransferPageUrlPattern = new RegExp('/work-in-progress-transfer(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const workInProgressTransferSample = {};

  let workInProgressTransfer;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/work-in-progress-transfers+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/work-in-progress-transfers').as('postEntityRequest');
    cy.intercept('DELETE', '/api/work-in-progress-transfers/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (workInProgressTransfer) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/work-in-progress-transfers/${workInProgressTransfer.id}`,
      }).then(() => {
        workInProgressTransfer = undefined;
      });
    }
  });

  it('WorkInProgressTransfers menu should load WorkInProgressTransfers page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('work-in-progress-transfer');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('WorkInProgressTransfer').should('exist');
    cy.url().should('match', workInProgressTransferPageUrlPattern);
  });

  describe('WorkInProgressTransfer page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(workInProgressTransferPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create WorkInProgressTransfer page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/work-in-progress-transfer/new$'));
        cy.getEntityCreateUpdateHeading('WorkInProgressTransfer');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', workInProgressTransferPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/work-in-progress-transfers',
          body: workInProgressTransferSample,
        }).then(({ body }) => {
          workInProgressTransfer = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/work-in-progress-transfers+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/work-in-progress-transfers?page=0&size=20>; rel="last",<http://localhost/api/work-in-progress-transfers?page=0&size=20>; rel="first"',
              },
              body: [workInProgressTransfer],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(workInProgressTransferPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details WorkInProgressTransfer page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('workInProgressTransfer');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', workInProgressTransferPageUrlPattern);
      });

      it('edit button click should load edit WorkInProgressTransfer page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('WorkInProgressTransfer');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', workInProgressTransferPageUrlPattern);
      });

      it.skip('edit button click should load edit WorkInProgressTransfer page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('WorkInProgressTransfer');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', workInProgressTransferPageUrlPattern);
      });

      it('last delete button click should delete instance of WorkInProgressTransfer', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('workInProgressTransfer').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', workInProgressTransferPageUrlPattern);

        workInProgressTransfer = undefined;
      });
    });
  });

  describe('new WorkInProgressTransfer page', () => {
    beforeEach(() => {
      cy.visit(`${workInProgressTransferPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('WorkInProgressTransfer');
    });

    it('should create an instance of WorkInProgressTransfer', () => {
      cy.get(`[data-cy="description"]`).type('Loan Unbranded').should('have.value', 'Loan Unbranded');

      cy.get(`[data-cy="targetAssetNumber"]`).type('ubiquitous Communications').should('have.value', 'ubiquitous Communications');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        workInProgressTransfer = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', workInProgressTransferPageUrlPattern);
    });
  });
});
