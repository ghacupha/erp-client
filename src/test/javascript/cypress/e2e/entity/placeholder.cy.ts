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

describe('Placeholder e2e test', () => {
  const placeholderPageUrl = '/placeholder';
  const placeholderPageUrlPattern = new RegExp('/placeholder(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const placeholderSample = { description: 'schemas Administrator Loan' };

  let placeholder;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/services/erpservice/api/placeholders+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/services/erpservice/api/placeholders').as('postEntityRequest');
    cy.intercept('DELETE', '/services/erpservice/api/placeholders/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (placeholder) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/services/erpservice/api/placeholders/${placeholder.id}`,
      }).then(() => {
        placeholder = undefined;
      });
    }
  });

  it('Placeholders menu should load Placeholders page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('placeholder');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Placeholder').should('exist');
    cy.url().should('match', placeholderPageUrlPattern);
  });

  describe('Placeholder page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(placeholderPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Placeholder page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/placeholder/new$'));
        cy.getEntityCreateUpdateHeading('Placeholder');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', placeholderPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/services/erpservice/api/placeholders',
          body: placeholderSample,
        }).then(({ body }) => {
          placeholder = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/services/erpservice/api/placeholders+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/services/erpservice/api/placeholders?page=0&size=20>; rel="last",<http://localhost/services/erpservice/api/placeholders?page=0&size=20>; rel="first"',
              },
              body: [placeholder],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(placeholderPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details Placeholder page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('placeholder');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', placeholderPageUrlPattern);
      });

      it('edit button click should load edit Placeholder page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Placeholder');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', placeholderPageUrlPattern);
      });

      it.skip('edit button click should load edit Placeholder page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Placeholder');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', placeholderPageUrlPattern);
      });

      it('last delete button click should delete instance of Placeholder', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('placeholder').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', placeholderPageUrlPattern);

        placeholder = undefined;
      });
    });
  });

  describe('new Placeholder page', () => {
    beforeEach(() => {
      cy.visit(`${placeholderPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Placeholder');
    });

    it('should create an instance of Placeholder', () => {
      cy.get(`[data-cy="description"]`).type('methodologies').should('have.value', 'methodologies');

      cy.get(`[data-cy="token"]`).type('Shoes').should('have.value', 'Shoes');

      cy.get(`[data-cy="fileUploadToken"]`).type('Frozen Keyboard').should('have.value', 'Frozen Keyboard');

      cy.get(`[data-cy="compilationToken"]`).type('quantify North portals').should('have.value', 'quantify North portals');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        placeholder = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', placeholderPageUrlPattern);
    });
  });
});
