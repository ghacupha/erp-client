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

describe('PrepaymentAccount e2e test', () => {
  const prepaymentAccountPageUrl = '/prepayment-account';
  const prepaymentAccountPageUrlPattern = new RegExp('/prepayment-account(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'admin';
  const password = Cypress.env('E2E_PASSWORD') ?? 'admin';
  const prepaymentAccountSample = { catalogueNumber: 'IB', particulars: 'eco-centric Shoes Squares' };

  let prepaymentAccount: any;

  before(() => {
    cy.window().then(win => {
      win.sessionStorage.clear();
    });
    cy.visit('');
    cy.login(username, password);
    cy.get(entityItemSelector).should('exist');
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/prepayment-accounts+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/prepayment-accounts').as('postEntityRequest');
    cy.intercept('DELETE', '/api/prepayment-accounts/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (prepaymentAccount) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/prepayment-accounts/${prepaymentAccount.id}`,
      }).then(() => {
        prepaymentAccount = undefined;
      });
    }
  });

  it('PrepaymentAccounts menu should load PrepaymentAccounts page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('prepayment-account');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('PrepaymentAccount').should('exist');
    cy.url().should('match', prepaymentAccountPageUrlPattern);
  });

  describe('PrepaymentAccount page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(prepaymentAccountPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create PrepaymentAccount page', () => {
        cy.get(entityCreateButtonSelector).click({ force: true });
        cy.url().should('match', new RegExp('/prepayment-account/new$'));
        cy.getEntityCreateUpdateHeading('PrepaymentAccount');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click({ force: true });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', prepaymentAccountPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/prepayment-accounts',
          body: prepaymentAccountSample,
        }).then(({ body }) => {
          prepaymentAccount = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/prepayment-accounts+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [prepaymentAccount],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(prepaymentAccountPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details PrepaymentAccount page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('prepaymentAccount');
        cy.get(entityDetailsBackButtonSelector).click({ force: true });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', prepaymentAccountPageUrlPattern);
      });

      it('edit button click should load edit PrepaymentAccount page', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('PrepaymentAccount');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click({ force: true });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', prepaymentAccountPageUrlPattern);
      });

      it('last delete button click should delete instance of PrepaymentAccount', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('prepaymentAccount').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click({ force: true });
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', prepaymentAccountPageUrlPattern);

        prepaymentAccount = undefined;
      });
    });
  });

  describe('new PrepaymentAccount page', () => {
    beforeEach(() => {
      cy.visit(`${prepaymentAccountPageUrl}`);
      cy.get(entityCreateButtonSelector).click({ force: true });
      cy.getEntityCreateUpdateHeading('PrepaymentAccount');
    });

    it('should create an instance of PrepaymentAccount', () => {
      cy.get(`[data-cy="catalogueNumber"]`).type('Belarussian Bike').should('have.value', 'Belarussian Bike');

      cy.get(`[data-cy="particulars"]`).type('Iowa program Avon').should('have.value', 'Iowa program Avon');

      cy.get(`[data-cy="notes"]`)
        .type('../fake-data/blob/hipster.txt')
        .invoke('val')
        .should('match', new RegExp('../fake-data/blob/hipster.txt'));

      cy.get(`[data-cy="prepaymentAmount"]`).type('68526').should('have.value', '68526');

      cy.get(`[data-cy="prepaymentGuid"]`)
        .type('9ca1876d-89bd-43d3-ad47-544aa5d6d9e1')
        .invoke('val')
        .should('match', new RegExp('9ca1876d-89bd-43d3-ad47-544aa5d6d9e1'));

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        prepaymentAccount = response!.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should('match', prepaymentAccountPageUrlPattern);
    });
  });
});
