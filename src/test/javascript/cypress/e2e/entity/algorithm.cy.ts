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

describe('Algorithm e2e test', () => {
  const algorithmPageUrl = '/algorithm';
  const algorithmPageUrlPattern = new RegExp('/algorithm(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const algorithmSample = { name: 'Euro Trace JBOD' };

  let algorithm;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/algorithms+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/algorithms').as('postEntityRequest');
    cy.intercept('DELETE', '/api/algorithms/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (algorithm) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/algorithms/${algorithm.id}`,
      }).then(() => {
        algorithm = undefined;
      });
    }
  });

  it('Algorithms menu should load Algorithms page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('algorithm');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Algorithm').should('exist');
    cy.url().should('match', algorithmPageUrlPattern);
  });

  describe('Algorithm page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(algorithmPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Algorithm page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/algorithm/new$'));
        cy.getEntityCreateUpdateHeading('Algorithm');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', algorithmPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/algorithms',
          body: algorithmSample,
        }).then(({ body }) => {
          algorithm = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/algorithms+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/algorithms?page=0&size=20>; rel="last",<http://localhost/api/algorithms?page=0&size=20>; rel="first"',
              },
              body: [algorithm],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(algorithmPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details Algorithm page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('algorithm');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', algorithmPageUrlPattern);
      });

      it('edit button click should load edit Algorithm page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Algorithm');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', algorithmPageUrlPattern);
      });

      it.skip('edit button click should load edit Algorithm page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Algorithm');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', algorithmPageUrlPattern);
      });

      it('last delete button click should delete instance of Algorithm', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('algorithm').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', algorithmPageUrlPattern);

        algorithm = undefined;
      });
    });
  });

  describe('new Algorithm page', () => {
    beforeEach(() => {
      cy.visit(`${algorithmPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Algorithm');
    });

    it('should create an instance of Algorithm', () => {
      cy.get(`[data-cy="name"]`).type('sensor').should('have.value', 'sensor');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        algorithm = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', algorithmPageUrlPattern);
    });
  });
});
