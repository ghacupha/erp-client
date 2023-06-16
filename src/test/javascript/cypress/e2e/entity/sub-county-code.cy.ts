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

describe('SubCountyCode e2e test', () => {
  const subCountyCodePageUrl = '/sub-county-code';
  const subCountyCodePageUrlPattern = new RegExp('/sub-county-code(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const subCountyCodeSample = {};

  let subCountyCode;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/sub-county-codes+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/sub-county-codes').as('postEntityRequest');
    cy.intercept('DELETE', '/api/sub-county-codes/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (subCountyCode) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/sub-county-codes/${subCountyCode.id}`,
      }).then(() => {
        subCountyCode = undefined;
      });
    }
  });

  it('SubCountyCodes menu should load SubCountyCodes page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('sub-county-code');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('SubCountyCode').should('exist');
    cy.url().should('match', subCountyCodePageUrlPattern);
  });

  describe('SubCountyCode page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(subCountyCodePageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create SubCountyCode page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/sub-county-code/new$'));
        cy.getEntityCreateUpdateHeading('SubCountyCode');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', subCountyCodePageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/sub-county-codes',
          body: subCountyCodeSample,
        }).then(({ body }) => {
          subCountyCode = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/sub-county-codes+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/sub-county-codes?page=0&size=20>; rel="last",<http://localhost/api/sub-county-codes?page=0&size=20>; rel="first"',
              },
              body: [subCountyCode],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(subCountyCodePageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details SubCountyCode page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('subCountyCode');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', subCountyCodePageUrlPattern);
      });

      it('edit button click should load edit SubCountyCode page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('SubCountyCode');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', subCountyCodePageUrlPattern);
      });

      it.skip('edit button click should load edit SubCountyCode page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('SubCountyCode');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', subCountyCodePageUrlPattern);
      });

      it('last delete button click should delete instance of SubCountyCode', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('subCountyCode').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', subCountyCodePageUrlPattern);

        subCountyCode = undefined;
      });
    });
  });

  describe('new SubCountyCode page', () => {
    beforeEach(() => {
      cy.visit(`${subCountyCodePageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('SubCountyCode');
    });

    it('should create an instance of SubCountyCode', () => {
      cy.get(`[data-cy="countyCode"]`).type('mint').should('have.value', 'mint');

      cy.get(`[data-cy="countyName"]`).type('mindshare scalable Facilitator').should('have.value', 'mindshare scalable Facilitator');

      cy.get(`[data-cy="subCountyCode"]`).type('Georgia parse Brand').should('have.value', 'Georgia parse Brand');

      cy.get(`[data-cy="subCountyName"]`).type('red Michigan Utah').should('have.value', 'red Michigan Utah');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        subCountyCode = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', subCountyCodePageUrlPattern);
    });
  });
});
