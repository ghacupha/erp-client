import { entityItemSelector } from '../../support/commands';
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

describe('Dealer e2e test', () => {
  const dealerPageUrl = '/dealer';
  const dealerPageUrlPattern = new RegExp('/dealer(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'admin';
  const password = Cypress.env('E2E_PASSWORD') ?? 'admin';
  const dealerSample = { dealerName: 'synthesize e-commerce' };

  let dealer: any;

  before(() => {
    cy.window().then(win => {
      win.sessionStorage.clear();
    });
    cy.visit('');
    cy.login(username, password);
    cy.get(entityItemSelector).should('exist');
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/dealers+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/dealers').as('postEntityRequest');
    cy.intercept('DELETE', '/api/dealers/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (dealer) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/dealers/${dealer.id}`,
      }).then(() => {
        dealer = undefined;
      });
    }
  });

  it('Dealers menu should load Dealers page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('dealer');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Dealer').should('exist');
    cy.url().should('match', dealerPageUrlPattern);
  });

  describe('Dealer page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(dealerPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Dealer page', () => {
        cy.get(entityCreateButtonSelector).click({ force: true });
        cy.url().should('match', new RegExp('/dealer/new$'));
        cy.getEntityCreateUpdateHeading('Dealer');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click({ force: true });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', dealerPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/dealers',
          body: dealerSample,
        }).then(({ body }) => {
          dealer = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/dealers+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [dealer],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(dealerPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details Dealer page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('dealer');
        cy.get(entityDetailsBackButtonSelector).click({ force: true });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', dealerPageUrlPattern);
      });

      it('edit button click should load edit Dealer page', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Dealer');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click({ force: true });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', dealerPageUrlPattern);
      });

      it('last delete button click should delete instance of Dealer', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('dealer').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click({ force: true });
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', dealerPageUrlPattern);

        dealer = undefined;
      });
    });
  });

  describe('new Dealer page', () => {
    beforeEach(() => {
      cy.visit(`${dealerPageUrl}`);
      cy.get(entityCreateButtonSelector).click({ force: true });
      cy.getEntityCreateUpdateHeading('Dealer');
    });

    it('should create an instance of Dealer', () => {
      cy.get(`[data-cy="dealerName"]`).type('white copy').should('have.value', 'white copy');

      cy.get(`[data-cy="taxNumber"]`).type('circuit').should('have.value', 'circuit');

      cy.get(`[data-cy="postalAddress"]`).type('Granite Account').should('have.value', 'Granite Account');

      cy.get(`[data-cy="physicalAddress"]`).type('customized innovate').should('have.value', 'customized innovate');

      cy.get(`[data-cy="accountName"]`).type('Credit Card Account').should('have.value', 'Credit Card Account');

      cy.get(`[data-cy="accountNumber"]`).type('Baby Account').should('have.value', 'Baby Account');

      cy.get(`[data-cy="bankersName"]`)
        .type('Implementation transparent content')
        .should('have.value', 'Implementation transparent content');

      cy.get(`[data-cy="bankersBranch"]`).type('empowering').should('have.value', 'empowering');

      cy.get(`[data-cy="bankersSwiftCode"]`).type('Practical Unbranded end-to-end').should('have.value', 'Practical Unbranded end-to-end');

      cy.get(`[data-cy="fileUploadToken"]`).type('structure Vanuatu blockchains').should('have.value', 'structure Vanuatu blockchains');

      cy.get(`[data-cy="compilationToken"]`).type('connecting Administrator').should('have.value', 'connecting Administrator');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        dealer = response!.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should('match', dealerPageUrlPattern);
    });
  });
});
