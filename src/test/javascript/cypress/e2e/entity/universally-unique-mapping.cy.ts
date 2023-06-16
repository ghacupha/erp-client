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

describe('UniversallyUniqueMapping e2e test', () => {
  const universallyUniqueMappingPageUrl = '/universally-unique-mapping';
  const universallyUniqueMappingPageUrlPattern = new RegExp('/universally-unique-mapping(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const universallyUniqueMappingSample = { universalKey: 'Macao seize' };

  let universallyUniqueMapping;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/universally-unique-mappings+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/universally-unique-mappings').as('postEntityRequest');
    cy.intercept('DELETE', '/api/universally-unique-mappings/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (universallyUniqueMapping) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/universally-unique-mappings/${universallyUniqueMapping.id}`,
      }).then(() => {
        universallyUniqueMapping = undefined;
      });
    }
  });

  it('UniversallyUniqueMappings menu should load UniversallyUniqueMappings page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('universally-unique-mapping');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('UniversallyUniqueMapping').should('exist');
    cy.url().should('match', universallyUniqueMappingPageUrlPattern);
  });

  describe('UniversallyUniqueMapping page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(universallyUniqueMappingPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create UniversallyUniqueMapping page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/universally-unique-mapping/new$'));
        cy.getEntityCreateUpdateHeading('UniversallyUniqueMapping');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', universallyUniqueMappingPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/universally-unique-mappings',
          body: universallyUniqueMappingSample,
        }).then(({ body }) => {
          universallyUniqueMapping = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/universally-unique-mappings+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/universally-unique-mappings?page=0&size=20>; rel="last",<http://localhost/api/universally-unique-mappings?page=0&size=20>; rel="first"',
              },
              body: [universallyUniqueMapping],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(universallyUniqueMappingPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details UniversallyUniqueMapping page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('universallyUniqueMapping');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', universallyUniqueMappingPageUrlPattern);
      });

      it('edit button click should load edit UniversallyUniqueMapping page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('UniversallyUniqueMapping');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', universallyUniqueMappingPageUrlPattern);
      });

      it.skip('edit button click should load edit UniversallyUniqueMapping page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('UniversallyUniqueMapping');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', universallyUniqueMappingPageUrlPattern);
      });

      it('last delete button click should delete instance of UniversallyUniqueMapping', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('universallyUniqueMapping').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', universallyUniqueMappingPageUrlPattern);

        universallyUniqueMapping = undefined;
      });
    });
  });

  describe('new UniversallyUniqueMapping page', () => {
    beforeEach(() => {
      cy.visit(`${universallyUniqueMappingPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('UniversallyUniqueMapping');
    });

    it('should create an instance of UniversallyUniqueMapping', () => {
      cy.get(`[data-cy="universalKey"]`).type('Rubber Table Future').should('have.value', 'Rubber Table Future');

      cy.get(`[data-cy="mappedValue"]`).type('moderator Australia Bedfordshire').should('have.value', 'moderator Australia Bedfordshire');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        universallyUniqueMapping = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', universallyUniqueMappingPageUrlPattern);
    });
  });
});
