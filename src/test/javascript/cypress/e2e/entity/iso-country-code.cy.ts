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

describe('IsoCountryCode e2e test', () => {
  const isoCountryCodePageUrl = '/iso-country-code';
  const isoCountryCodePageUrlPattern = new RegExp('/iso-country-code(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const isoCountryCodeSample = {};

  let isoCountryCode;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/iso-country-codes+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/iso-country-codes').as('postEntityRequest');
    cy.intercept('DELETE', '/api/iso-country-codes/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (isoCountryCode) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/iso-country-codes/${isoCountryCode.id}`,
      }).then(() => {
        isoCountryCode = undefined;
      });
    }
  });

  it('IsoCountryCodes menu should load IsoCountryCodes page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('iso-country-code');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('IsoCountryCode').should('exist');
    cy.url().should('match', isoCountryCodePageUrlPattern);
  });

  describe('IsoCountryCode page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(isoCountryCodePageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create IsoCountryCode page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/iso-country-code/new$'));
        cy.getEntityCreateUpdateHeading('IsoCountryCode');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', isoCountryCodePageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/iso-country-codes',
          body: isoCountryCodeSample,
        }).then(({ body }) => {
          isoCountryCode = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/iso-country-codes+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/iso-country-codes?page=0&size=20>; rel="last",<http://localhost/api/iso-country-codes?page=0&size=20>; rel="first"',
              },
              body: [isoCountryCode],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(isoCountryCodePageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details IsoCountryCode page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('isoCountryCode');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', isoCountryCodePageUrlPattern);
      });

      it('edit button click should load edit IsoCountryCode page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('IsoCountryCode');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', isoCountryCodePageUrlPattern);
      });

      it.skip('edit button click should load edit IsoCountryCode page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('IsoCountryCode');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', isoCountryCodePageUrlPattern);
      });

      it('last delete button click should delete instance of IsoCountryCode', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('isoCountryCode').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', isoCountryCodePageUrlPattern);

        isoCountryCode = undefined;
      });
    });
  });

  describe('new IsoCountryCode page', () => {
    beforeEach(() => {
      cy.visit(`${isoCountryCodePageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('IsoCountryCode');
    });

    it('should create an instance of IsoCountryCode', () => {
      cy.get(`[data-cy="countryCode"]`).type('UG').should('have.value', 'UG');

      cy.get(`[data-cy="countryDescription"]`).type('Spain Executive').should('have.value', 'Spain Executive');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        isoCountryCode = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', isoCountryCodePageUrlPattern);
    });
  });
});
