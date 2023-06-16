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

describe('InstitutionCode e2e test', () => {
  const institutionCodePageUrl = '/institution-code';
  const institutionCodePageUrlPattern = new RegExp('/institution-code(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const institutionCodeSample = { institutionCode: 'Stream', institutionName: 'seize HDD' };

  let institutionCode;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/institution-codes+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/institution-codes').as('postEntityRequest');
    cy.intercept('DELETE', '/api/institution-codes/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (institutionCode) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/institution-codes/${institutionCode.id}`,
      }).then(() => {
        institutionCode = undefined;
      });
    }
  });

  it('InstitutionCodes menu should load InstitutionCodes page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('institution-code');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('InstitutionCode').should('exist');
    cy.url().should('match', institutionCodePageUrlPattern);
  });

  describe('InstitutionCode page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(institutionCodePageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create InstitutionCode page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/institution-code/new$'));
        cy.getEntityCreateUpdateHeading('InstitutionCode');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', institutionCodePageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/institution-codes',
          body: institutionCodeSample,
        }).then(({ body }) => {
          institutionCode = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/institution-codes+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/institution-codes?page=0&size=20>; rel="last",<http://localhost/api/institution-codes?page=0&size=20>; rel="first"',
              },
              body: [institutionCode],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(institutionCodePageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details InstitutionCode page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('institutionCode');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', institutionCodePageUrlPattern);
      });

      it('edit button click should load edit InstitutionCode page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('InstitutionCode');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', institutionCodePageUrlPattern);
      });

      it.skip('edit button click should load edit InstitutionCode page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('InstitutionCode');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', institutionCodePageUrlPattern);
      });

      it('last delete button click should delete instance of InstitutionCode', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('institutionCode').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', institutionCodePageUrlPattern);

        institutionCode = undefined;
      });
    });
  });

  describe('new InstitutionCode page', () => {
    beforeEach(() => {
      cy.visit(`${institutionCodePageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('InstitutionCode');
    });

    it('should create an instance of InstitutionCode', () => {
      cy.get(`[data-cy="institutionCode"]`).type('Direct e-business').should('have.value', 'Direct e-business');

      cy.get(`[data-cy="institutionName"]`).type('Connecticut').should('have.value', 'Connecticut');

      cy.get(`[data-cy="shortName"]`).type('generating e-markets').should('have.value', 'generating e-markets');

      cy.get(`[data-cy="category"]`).type('Concrete').should('have.value', 'Concrete');

      cy.get(`[data-cy="institutionCategory"]`).type('Forest value-added Chicken').should('have.value', 'Forest value-added Chicken');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        institutionCode = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', institutionCodePageUrlPattern);
    });
  });
});
