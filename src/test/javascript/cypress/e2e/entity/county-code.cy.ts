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

describe('CountyCode e2e test', () => {
  const countyCodePageUrl = '/county-code';
  const countyCodePageUrlPattern = new RegExp('/county-code(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const countyCodeSample = { countyCode: 18685, countyName: 'protocol synthesize Tasty', subCountyCode: 12471, subCountyName: 'violet' };

  let countyCode;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/county-codes+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/county-codes').as('postEntityRequest');
    cy.intercept('DELETE', '/api/county-codes/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (countyCode) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/county-codes/${countyCode.id}`,
      }).then(() => {
        countyCode = undefined;
      });
    }
  });

  it('CountyCodes menu should load CountyCodes page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('county-code');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('CountyCode').should('exist');
    cy.url().should('match', countyCodePageUrlPattern);
  });

  describe('CountyCode page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(countyCodePageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create CountyCode page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/county-code/new$'));
        cy.getEntityCreateUpdateHeading('CountyCode');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', countyCodePageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/county-codes',
          body: countyCodeSample,
        }).then(({ body }) => {
          countyCode = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/county-codes+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/county-codes?page=0&size=20>; rel="last",<http://localhost/api/county-codes?page=0&size=20>; rel="first"',
              },
              body: [countyCode],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(countyCodePageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details CountyCode page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('countyCode');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', countyCodePageUrlPattern);
      });

      it('edit button click should load edit CountyCode page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('CountyCode');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', countyCodePageUrlPattern);
      });

      it.skip('edit button click should load edit CountyCode page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('CountyCode');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', countyCodePageUrlPattern);
      });

      it('last delete button click should delete instance of CountyCode', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('countyCode').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', countyCodePageUrlPattern);

        countyCode = undefined;
      });
    });
  });

  describe('new CountyCode page', () => {
    beforeEach(() => {
      cy.visit(`${countyCodePageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('CountyCode');
    });

    it('should create an instance of CountyCode', () => {
      cy.get(`[data-cy="countyCode"]`).type('9349').should('have.value', '9349');

      cy.get(`[data-cy="countyName"]`).type('Account').should('have.value', 'Account');

      cy.get(`[data-cy="subCountyCode"]`).type('65136').should('have.value', '65136');

      cy.get(`[data-cy="subCountyName"]`).type('open Steel').should('have.value', 'open Steel');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        countyCode = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', countyCodePageUrlPattern);
    });
  });
});
