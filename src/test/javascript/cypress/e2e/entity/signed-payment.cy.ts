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

describe('SignedPayment e2e test', () => {
  const signedPaymentPageUrl = '/signed-payment';
  const signedPaymentPageUrlPattern = new RegExp('/signed-payment(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const signedPaymentSample = {
    transactionNumber: 'Ergonomic',
    transactionDate: '2021-09-19',
    transactionCurrency: 'CAD',
    transactionAmount: 3265,
  };

  let signedPayment;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/signed-payments+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/signed-payments').as('postEntityRequest');
    cy.intercept('DELETE', '/api/signed-payments/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (signedPayment) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/signed-payments/${signedPayment.id}`,
      }).then(() => {
        signedPayment = undefined;
      });
    }
  });

  it('SignedPayments menu should load SignedPayments page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('signed-payment');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('SignedPayment').should('exist');
    cy.url().should('match', signedPaymentPageUrlPattern);
  });

  describe('SignedPayment page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(signedPaymentPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create SignedPayment page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/signed-payment/new$'));
        cy.getEntityCreateUpdateHeading('SignedPayment');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', signedPaymentPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/signed-payments',
          body: signedPaymentSample,
        }).then(({ body }) => {
          signedPayment = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/signed-payments+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/signed-payments?page=0&size=20>; rel="last",<http://localhost/api/signed-payments?page=0&size=20>; rel="first"',
              },
              body: [signedPayment],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(signedPaymentPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details SignedPayment page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('signedPayment');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', signedPaymentPageUrlPattern);
      });

      it('edit button click should load edit SignedPayment page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('SignedPayment');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', signedPaymentPageUrlPattern);
      });

      it.skip('edit button click should load edit SignedPayment page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('SignedPayment');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', signedPaymentPageUrlPattern);
      });

      it('last delete button click should delete instance of SignedPayment', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('signedPayment').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', signedPaymentPageUrlPattern);

        signedPayment = undefined;
      });
    });
  });

  describe('new SignedPayment page', () => {
    beforeEach(() => {
      cy.visit(`${signedPaymentPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('SignedPayment');
    });

    it('should create an instance of SignedPayment', () => {
      cy.get(`[data-cy="transactionNumber"]`).type('Ville Cambridgeshire Cheese').should('have.value', 'Ville Cambridgeshire Cheese');

      cy.get(`[data-cy="transactionDate"]`).type('2021-09-20').blur().should('have.value', '2021-09-20');

      cy.get(`[data-cy="transactionCurrency"]`).select('CHF');

      cy.get(`[data-cy="transactionAmount"]`).type('41509').should('have.value', '41509');

      cy.get(`[data-cy="dealerName"]`).type('Zealand Fish').should('have.value', 'Zealand Fish');

      cy.get(`[data-cy="fileUploadToken"]`).type('withdrawal').should('have.value', 'withdrawal');

      cy.get(`[data-cy="compilationToken"]`).type('of Paradigm Human').should('have.value', 'of Paradigm Human');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        signedPayment = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', signedPaymentPageUrlPattern);
    });
  });
});
