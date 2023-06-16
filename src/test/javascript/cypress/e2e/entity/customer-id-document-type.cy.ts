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

describe('CustomerIDDocumentType e2e test', () => {
  const customerIDDocumentTypePageUrl = '/customer-id-document-type';
  const customerIDDocumentTypePageUrlPattern = new RegExp('/customer-id-document-type(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const customerIDDocumentTypeSample = { documentCode: 'Buckinghamshire plum', documentType: 'indexing' };

  let customerIDDocumentType;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/customer-id-document-types+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/customer-id-document-types').as('postEntityRequest');
    cy.intercept('DELETE', '/api/customer-id-document-types/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (customerIDDocumentType) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/customer-id-document-types/${customerIDDocumentType.id}`,
      }).then(() => {
        customerIDDocumentType = undefined;
      });
    }
  });

  it('CustomerIDDocumentTypes menu should load CustomerIDDocumentTypes page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('customer-id-document-type');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('CustomerIDDocumentType').should('exist');
    cy.url().should('match', customerIDDocumentTypePageUrlPattern);
  });

  describe('CustomerIDDocumentType page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(customerIDDocumentTypePageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create CustomerIDDocumentType page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/customer-id-document-type/new$'));
        cy.getEntityCreateUpdateHeading('CustomerIDDocumentType');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', customerIDDocumentTypePageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/customer-id-document-types',
          body: customerIDDocumentTypeSample,
        }).then(({ body }) => {
          customerIDDocumentType = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/customer-id-document-types+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/customer-id-document-types?page=0&size=20>; rel="last",<http://localhost/api/customer-id-document-types?page=0&size=20>; rel="first"',
              },
              body: [customerIDDocumentType],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(customerIDDocumentTypePageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details CustomerIDDocumentType page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('customerIDDocumentType');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', customerIDDocumentTypePageUrlPattern);
      });

      it('edit button click should load edit CustomerIDDocumentType page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('CustomerIDDocumentType');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', customerIDDocumentTypePageUrlPattern);
      });

      it.skip('edit button click should load edit CustomerIDDocumentType page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('CustomerIDDocumentType');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', customerIDDocumentTypePageUrlPattern);
      });

      it('last delete button click should delete instance of CustomerIDDocumentType', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('customerIDDocumentType').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', customerIDDocumentTypePageUrlPattern);

        customerIDDocumentType = undefined;
      });
    });
  });

  describe('new CustomerIDDocumentType page', () => {
    beforeEach(() => {
      cy.visit(`${customerIDDocumentTypePageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('CustomerIDDocumentType');
    });

    it('should create an instance of CustomerIDDocumentType', () => {
      cy.get(`[data-cy="documentCode"]`).type('Configuration').should('have.value', 'Configuration');

      cy.get(`[data-cy="documentType"]`).type('Security Franc Pound').should('have.value', 'Security Franc Pound');

      cy.get(`[data-cy="documentTypeDescription"]`).type('Movies').should('have.value', 'Movies');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        customerIDDocumentType = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', customerIDDocumentTypePageUrlPattern);
    });
  });
});
