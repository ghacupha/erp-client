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

describe('SystemContentType e2e test', () => {
  const systemContentTypePageUrl = '/system-content-type';
  const systemContentTypePageUrlPattern = new RegExp('/system-content-type(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const systemContentTypeSample = {
    contentTypeName: 'whiteboard Books',
    contentTypeHeader: 'generate Dakota wireless',
    availability: 'SUPPORTED',
  };

  let systemContentType;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/system-content-types+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/system-content-types').as('postEntityRequest');
    cy.intercept('DELETE', '/api/system-content-types/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (systemContentType) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/system-content-types/${systemContentType.id}`,
      }).then(() => {
        systemContentType = undefined;
      });
    }
  });

  it('SystemContentTypes menu should load SystemContentTypes page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('system-content-type');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('SystemContentType').should('exist');
    cy.url().should('match', systemContentTypePageUrlPattern);
  });

  describe('SystemContentType page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(systemContentTypePageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create SystemContentType page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/system-content-type/new$'));
        cy.getEntityCreateUpdateHeading('SystemContentType');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', systemContentTypePageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/system-content-types',
          body: systemContentTypeSample,
        }).then(({ body }) => {
          systemContentType = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/system-content-types+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/system-content-types?page=0&size=20>; rel="last",<http://localhost/api/system-content-types?page=0&size=20>; rel="first"',
              },
              body: [systemContentType],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(systemContentTypePageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details SystemContentType page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('systemContentType');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', systemContentTypePageUrlPattern);
      });

      it('edit button click should load edit SystemContentType page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('SystemContentType');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', systemContentTypePageUrlPattern);
      });

      it.skip('edit button click should load edit SystemContentType page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('SystemContentType');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', systemContentTypePageUrlPattern);
      });

      it('last delete button click should delete instance of SystemContentType', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('systemContentType').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', systemContentTypePageUrlPattern);

        systemContentType = undefined;
      });
    });
  });

  describe('new SystemContentType page', () => {
    beforeEach(() => {
      cy.visit(`${systemContentTypePageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('SystemContentType');
    });

    it('should create an instance of SystemContentType', () => {
      cy.get(`[data-cy="contentTypeName"]`).type('open-source').should('have.value', 'open-source');

      cy.get(`[data-cy="contentTypeHeader"]`).type('workforce Unbranded').should('have.value', 'workforce Unbranded');

      cy.get(`[data-cy="comments"]`)
        .type('../fake-data/blob/hipster.txt')
        .invoke('val')
        .should('match', new RegExp('../fake-data/blob/hipster.txt'));

      cy.get(`[data-cy="availability"]`).select('SUPPORTED');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        systemContentType = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', systemContentTypePageUrlPattern);
    });
  });
});
