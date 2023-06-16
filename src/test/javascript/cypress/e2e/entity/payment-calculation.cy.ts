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

describe('PaymentCalculation e2e test', () => {
  const paymentCalculationPageUrl = '/payment-calculation';
  const paymentCalculationPageUrlPattern = new RegExp('/payment-calculation(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const paymentCalculationSample = {};

  let paymentCalculation;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/services/erpservice/api/payment-calculations+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/services/erpservice/api/payment-calculations').as('postEntityRequest');
    cy.intercept('DELETE', '/services/erpservice/api/payment-calculations/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (paymentCalculation) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/services/erpservice/api/payment-calculations/${paymentCalculation.id}`,
      }).then(() => {
        paymentCalculation = undefined;
      });
    }
  });

  it('PaymentCalculations menu should load PaymentCalculations page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('payment-calculation');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('PaymentCalculation').should('exist');
    cy.url().should('match', paymentCalculationPageUrlPattern);
  });

  describe('PaymentCalculation page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(paymentCalculationPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create PaymentCalculation page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/payment-calculation/new$'));
        cy.getEntityCreateUpdateHeading('PaymentCalculation');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', paymentCalculationPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/services/erpservice/api/payment-calculations',
          body: paymentCalculationSample,
        }).then(({ body }) => {
          paymentCalculation = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/services/erpservice/api/payment-calculations+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/services/erpservice/api/payment-calculations?page=0&size=20>; rel="last",<http://localhost/services/erpservice/api/payment-calculations?page=0&size=20>; rel="first"',
              },
              body: [paymentCalculation],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(paymentCalculationPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details PaymentCalculation page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('paymentCalculation');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', paymentCalculationPageUrlPattern);
      });

      it('edit button click should load edit PaymentCalculation page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('PaymentCalculation');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', paymentCalculationPageUrlPattern);
      });

      it.skip('edit button click should load edit PaymentCalculation page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('PaymentCalculation');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', paymentCalculationPageUrlPattern);
      });

      it('last delete button click should delete instance of PaymentCalculation', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('paymentCalculation').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', paymentCalculationPageUrlPattern);

        paymentCalculation = undefined;
      });
    });
  });

  describe('new PaymentCalculation page', () => {
    beforeEach(() => {
      cy.visit(`${paymentCalculationPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('PaymentCalculation');
    });

    it('should create an instance of PaymentCalculation', () => {
      cy.get(`[data-cy="paymentExpense"]`).type('94213').should('have.value', '94213');

      cy.get(`[data-cy="withholdingVAT"]`).type('4859').should('have.value', '4859');

      cy.get(`[data-cy="withholdingTax"]`).type('89558').should('have.value', '89558');

      cy.get(`[data-cy="paymentAmount"]`).type('36269').should('have.value', '36269');

      cy.get(`[data-cy="fileUploadToken"]`).type('Direct systematic Money').should('have.value', 'Direct systematic Money');

      cy.get(`[data-cy="compilationToken"]`).type('Lakes').should('have.value', 'Lakes');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        paymentCalculation = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', paymentCalculationPageUrlPattern);
    });
  });
});
