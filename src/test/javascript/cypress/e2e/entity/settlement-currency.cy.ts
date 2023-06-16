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

describe('SettlementCurrency e2e test', () => {
  const settlementCurrencyPageUrl = '/settlement-currency';
  const settlementCurrencyPageUrlPattern = new RegExp('/settlement-currency(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const settlementCurrencySample = { iso4217CurrencyCode: 'Ore', currencyName: 'Ethiopian Birr', country: 'Italy' };

  let settlementCurrency;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/settlement-currencies+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/settlement-currencies').as('postEntityRequest');
    cy.intercept('DELETE', '/api/settlement-currencies/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (settlementCurrency) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/settlement-currencies/${settlementCurrency.id}`,
      }).then(() => {
        settlementCurrency = undefined;
      });
    }
  });

  it('SettlementCurrencies menu should load SettlementCurrencies page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('settlement-currency');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('SettlementCurrency').should('exist');
    cy.url().should('match', settlementCurrencyPageUrlPattern);
  });

  describe('SettlementCurrency page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(settlementCurrencyPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create SettlementCurrency page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/settlement-currency/new$'));
        cy.getEntityCreateUpdateHeading('SettlementCurrency');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', settlementCurrencyPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/settlement-currencies',
          body: settlementCurrencySample,
        }).then(({ body }) => {
          settlementCurrency = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/settlement-currencies+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/settlement-currencies?page=0&size=20>; rel="last",<http://localhost/api/settlement-currencies?page=0&size=20>; rel="first"',
              },
              body: [settlementCurrency],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(settlementCurrencyPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details SettlementCurrency page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('settlementCurrency');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', settlementCurrencyPageUrlPattern);
      });

      it('edit button click should load edit SettlementCurrency page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('SettlementCurrency');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', settlementCurrencyPageUrlPattern);
      });

      it.skip('edit button click should load edit SettlementCurrency page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('SettlementCurrency');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', settlementCurrencyPageUrlPattern);
      });

      it('last delete button click should delete instance of SettlementCurrency', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('settlementCurrency').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', settlementCurrencyPageUrlPattern);

        settlementCurrency = undefined;
      });
    });
  });

  describe('new SettlementCurrency page', () => {
    beforeEach(() => {
      cy.visit(`${settlementCurrencyPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('SettlementCurrency');
    });

    it('should create an instance of SettlementCurrency', () => {
      cy.get(`[data-cy="iso4217CurrencyCode"]`).type('Acc').should('have.value', 'Acc');

      cy.get(`[data-cy="currencyName"]`).type('Gourde').should('have.value', 'Gourde');

      cy.get(`[data-cy="country"]`).type('Svalbard &amp; Jan Mayen Islands').should('have.value', 'Svalbard &amp; Jan Mayen Islands');

      cy.get(`[data-cy="numericCode"]`).type('drive').should('have.value', 'drive');

      cy.get(`[data-cy="minorUnit"]`).type('Gloves sky Turkmenistan').should('have.value', 'Gloves sky Turkmenistan');

      cy.get(`[data-cy="fileUploadToken"]`).type('of Steel Associate').should('have.value', 'of Steel Associate');

      cy.get(`[data-cy="compilationToken"]`).type('navigate').should('have.value', 'navigate');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        settlementCurrency = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', settlementCurrencyPageUrlPattern);
    });
  });
});
