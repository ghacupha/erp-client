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

describe('ProcessStatus e2e test', () => {
  const processStatusPageUrl = '/process-status';
  const processStatusPageUrlPattern = new RegExp('/process-status(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const processStatusSample = { statusCode: 'deliverables strategize Shirt', description: 'technologies connecting' };

  let processStatus;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/process-statuses+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/process-statuses').as('postEntityRequest');
    cy.intercept('DELETE', '/api/process-statuses/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (processStatus) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/process-statuses/${processStatus.id}`,
      }).then(() => {
        processStatus = undefined;
      });
    }
  });

  it('ProcessStatuses menu should load ProcessStatuses page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('process-status');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('ProcessStatus').should('exist');
    cy.url().should('match', processStatusPageUrlPattern);
  });

  describe('ProcessStatus page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(processStatusPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create ProcessStatus page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/process-status/new$'));
        cy.getEntityCreateUpdateHeading('ProcessStatus');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', processStatusPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/process-statuses',
          body: processStatusSample,
        }).then(({ body }) => {
          processStatus = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/process-statuses+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/process-statuses?page=0&size=20>; rel="last",<http://localhost/api/process-statuses?page=0&size=20>; rel="first"',
              },
              body: [processStatus],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(processStatusPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details ProcessStatus page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('processStatus');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', processStatusPageUrlPattern);
      });

      it('edit button click should load edit ProcessStatus page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('ProcessStatus');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', processStatusPageUrlPattern);
      });

      it.skip('edit button click should load edit ProcessStatus page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('ProcessStatus');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', processStatusPageUrlPattern);
      });

      it('last delete button click should delete instance of ProcessStatus', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('processStatus').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', processStatusPageUrlPattern);

        processStatus = undefined;
      });
    });
  });

  describe('new ProcessStatus page', () => {
    beforeEach(() => {
      cy.visit(`${processStatusPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('ProcessStatus');
    });

    it('should create an instance of ProcessStatus', () => {
      cy.get(`[data-cy="statusCode"]`).type('project').should('have.value', 'project');

      cy.get(`[data-cy="description"]`).type('withdrawal red').should('have.value', 'withdrawal red');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        processStatus = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', processStatusPageUrlPattern);
    });
  });
});
