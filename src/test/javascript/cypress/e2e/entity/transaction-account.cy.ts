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

describe('TransactionAccount e2e test', () => {
  const transactionAccountPageUrl = '/transaction-account';
  const transactionAccountPageUrlPattern = new RegExp('/transaction-account(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const transactionAccountSample = { accountNumber: 'Directives', accountName: 'Investment Account' };

  let transactionAccount;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/transaction-accounts+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/transaction-accounts').as('postEntityRequest');
    cy.intercept('DELETE', '/api/transaction-accounts/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (transactionAccount) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/transaction-accounts/${transactionAccount.id}`,
      }).then(() => {
        transactionAccount = undefined;
      });
    }
  });

  it('TransactionAccounts menu should load TransactionAccounts page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('transaction-account');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('TransactionAccount').should('exist');
    cy.url().should('match', transactionAccountPageUrlPattern);
  });

  describe('TransactionAccount page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(transactionAccountPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create TransactionAccount page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/transaction-account/new$'));
        cy.getEntityCreateUpdateHeading('TransactionAccount');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', transactionAccountPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/transaction-accounts',
          body: transactionAccountSample,
        }).then(({ body }) => {
          transactionAccount = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/transaction-accounts+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/transaction-accounts?page=0&size=20>; rel="last",<http://localhost/api/transaction-accounts?page=0&size=20>; rel="first"',
              },
              body: [transactionAccount],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(transactionAccountPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details TransactionAccount page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('transactionAccount');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', transactionAccountPageUrlPattern);
      });

      it('edit button click should load edit TransactionAccount page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('TransactionAccount');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', transactionAccountPageUrlPattern);
      });

      it.skip('edit button click should load edit TransactionAccount page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('TransactionAccount');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', transactionAccountPageUrlPattern);
      });

      it('last delete button click should delete instance of TransactionAccount', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('transactionAccount').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', transactionAccountPageUrlPattern);

        transactionAccount = undefined;
      });
    });
  });

  describe('new TransactionAccount page', () => {
    beforeEach(() => {
      cy.visit(`${transactionAccountPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('TransactionAccount');
    });

    it('should create an instance of TransactionAccount', () => {
      cy.get(`[data-cy="accountNumber"]`).type('Implementation Palau fuchsia').should('have.value', 'Implementation Palau fuchsia');

      cy.get(`[data-cy="accountName"]`).type('Personal Loan Account').should('have.value', 'Personal Loan Account');

      cy.setFieldImageAsBytesOfEntity('notes', 'integration-test.png', 'image/png');

      // since cypress clicks submit too fast before the blob fields are validated
      cy.wait(200); // eslint-disable-line cypress/no-unnecessary-waiting
      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        transactionAccount = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', transactionAccountPageUrlPattern);
    });
  });
});
