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

describe('Payment e2e test', () => {
  const paymentPageUrl = '/payment';
  const paymentPageUrlPattern = new RegExp('/payment(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const paymentSample = { settlementCurrency: 'CAD' };

  let payment;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/services/erpservice/api/payments+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/services/erpservice/api/payments').as('postEntityRequest');
    cy.intercept('DELETE', '/services/erpservice/api/payments/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (payment) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/services/erpservice/api/payments/${payment.id}`,
      }).then(() => {
        payment = undefined;
      });
    }
  });

  it('Payments menu should load Payments page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('payment');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Payment').should('exist');
    cy.url().should('match', paymentPageUrlPattern);
  });

  describe('Payment page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(paymentPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Payment page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/payment/new$'));
        cy.getEntityCreateUpdateHeading('Payment');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', paymentPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/services/erpservice/api/payments',
          body: paymentSample,
        }).then(({ body }) => {
          payment = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/services/erpservice/api/payments+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/services/erpservice/api/payments?page=0&size=20>; rel="last",<http://localhost/services/erpservice/api/payments?page=0&size=20>; rel="first"',
              },
              body: [payment],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(paymentPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details Payment page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('payment');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', paymentPageUrlPattern);
      });

      it('edit button click should load edit Payment page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Payment');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', paymentPageUrlPattern);
      });

      it.skip('edit button click should load edit Payment page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Payment');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', paymentPageUrlPattern);
      });

      it('last delete button click should delete instance of Payment', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('payment').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', paymentPageUrlPattern);

        payment = undefined;
      });
    });
  });

  describe('new Payment page', () => {
    beforeEach(() => {
      cy.visit(`${paymentPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Payment');
    });

    it('should create an instance of Payment', () => {
      cy.get(`[data-cy="paymentNumber"]`).type('Rubber regional harness').should('have.value', 'Rubber regional harness');

      cy.get(`[data-cy="paymentDate"]`).type('2021-06-27').blur().should('have.value', '2021-06-27');

      cy.get(`[data-cy="invoicedAmount"]`).type('86615').should('have.value', '86615');

      cy.get(`[data-cy="paymentAmount"]`).type('55706').should('have.value', '55706');

      cy.get(`[data-cy="description"]`).type('Product').should('have.value', 'Product');

      cy.get(`[data-cy="settlementCurrency"]`).select('JPY');

      cy.setFieldImageAsBytesOfEntity('calculationFile', 'integration-test.png', 'image/png');

      cy.get(`[data-cy="dealerName"]`).type('Account').should('have.value', 'Account');

      cy.get(`[data-cy="purchaseOrderNumber"]`).type('Automotive structure').should('have.value', 'Automotive structure');

      cy.get(`[data-cy="fileUploadToken"]`).type('Graphical paradigm').should('have.value', 'Graphical paradigm');

      cy.get(`[data-cy="compilationToken"]`).type('transmit bluetooth').should('have.value', 'transmit bluetooth');

      // since cypress clicks submit too fast before the blob fields are validated
      cy.wait(200); // eslint-disable-line cypress/no-unnecessary-waiting
      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        payment = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', paymentPageUrlPattern);
    });
  });
});
