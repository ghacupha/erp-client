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

describe('PaymentRequisition e2e test', () => {
  const paymentRequisitionPageUrl = '/payment-requisition';
  const paymentRequisitionPageUrlPattern = new RegExp('/payment-requisition(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const paymentRequisitionSample = {};

  let paymentRequisition;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/services/erpservice/api/payment-requisitions+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/services/erpservice/api/payment-requisitions').as('postEntityRequest');
    cy.intercept('DELETE', '/services/erpservice/api/payment-requisitions/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (paymentRequisition) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/services/erpservice/api/payment-requisitions/${paymentRequisition.id}`,
      }).then(() => {
        paymentRequisition = undefined;
      });
    }
  });

  it('PaymentRequisitions menu should load PaymentRequisitions page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('payment-requisition');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('PaymentRequisition').should('exist');
    cy.url().should('match', paymentRequisitionPageUrlPattern);
  });

  describe('PaymentRequisition page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(paymentRequisitionPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create PaymentRequisition page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/payment-requisition/new$'));
        cy.getEntityCreateUpdateHeading('PaymentRequisition');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', paymentRequisitionPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/services/erpservice/api/payment-requisitions',
          body: paymentRequisitionSample,
        }).then(({ body }) => {
          paymentRequisition = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/services/erpservice/api/payment-requisitions+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/services/erpservice/api/payment-requisitions?page=0&size=20>; rel="last",<http://localhost/services/erpservice/api/payment-requisitions?page=0&size=20>; rel="first"',
              },
              body: [paymentRequisition],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(paymentRequisitionPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details PaymentRequisition page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('paymentRequisition');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', paymentRequisitionPageUrlPattern);
      });

      it('edit button click should load edit PaymentRequisition page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('PaymentRequisition');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', paymentRequisitionPageUrlPattern);
      });

      it.skip('edit button click should load edit PaymentRequisition page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('PaymentRequisition');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', paymentRequisitionPageUrlPattern);
      });

      it('last delete button click should delete instance of PaymentRequisition', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('paymentRequisition').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', paymentRequisitionPageUrlPattern);

        paymentRequisition = undefined;
      });
    });
  });

  describe('new PaymentRequisition page', () => {
    beforeEach(() => {
      cy.visit(`${paymentRequisitionPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('PaymentRequisition');
    });

    it('should create an instance of PaymentRequisition', () => {
      cy.get(`[data-cy="receptionDate"]`).type('2021-07-20').blur().should('have.value', '2021-07-20');

      cy.get(`[data-cy="dealerName"]`).type('front-end Borders').should('have.value', 'front-end Borders');

      cy.get(`[data-cy="briefDescription"]`)
        .type('firewall Buckinghamshire deposit')
        .should('have.value', 'firewall Buckinghamshire deposit');

      cy.get(`[data-cy="requisitionNumber"]`).type('Lead').should('have.value', 'Lead');

      cy.get(`[data-cy="invoicedAmount"]`).type('8515').should('have.value', '8515');

      cy.get(`[data-cy="disbursementCost"]`).type('42541').should('have.value', '42541');

      cy.get(`[data-cy="taxableAmount"]`).type('40465').should('have.value', '40465');

      cy.get(`[data-cy="requisitionProcessed"]`).should('not.be.checked');
      cy.get(`[data-cy="requisitionProcessed"]`).click().should('be.checked');

      cy.get(`[data-cy="fileUploadToken"]`).type('Fantastic').should('have.value', 'Fantastic');

      cy.get(`[data-cy="compilationToken"]`).type('Underpass orange').should('have.value', 'Underpass orange');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        paymentRequisition = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', paymentRequisitionPageUrlPattern);
    });
  });
});
