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

describe('PaymentLabel e2e test', () => {
  const paymentLabelPageUrl = '/payment-label';
  const paymentLabelPageUrlPattern = new RegExp('/payment-label(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const paymentLabelSample = { description: 'Unbranded Up-sized primary' };

  let paymentLabel;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/payment-labels+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/payment-labels').as('postEntityRequest');
    cy.intercept('DELETE', '/api/payment-labels/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (paymentLabel) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/payment-labels/${paymentLabel.id}`,
      }).then(() => {
        paymentLabel = undefined;
      });
    }
  });

  it('PaymentLabels menu should load PaymentLabels page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('payment-label');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('PaymentLabel').should('exist');
    cy.url().should('match', paymentLabelPageUrlPattern);
  });

  describe('PaymentLabel page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(paymentLabelPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create PaymentLabel page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/payment-label/new$'));
        cy.getEntityCreateUpdateHeading('PaymentLabel');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', paymentLabelPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/payment-labels',
          body: paymentLabelSample,
        }).then(({ body }) => {
          paymentLabel = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/payment-labels+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/payment-labels?page=0&size=20>; rel="last",<http://localhost/api/payment-labels?page=0&size=20>; rel="first"',
              },
              body: [paymentLabel],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(paymentLabelPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details PaymentLabel page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('paymentLabel');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', paymentLabelPageUrlPattern);
      });

      it('edit button click should load edit PaymentLabel page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('PaymentLabel');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', paymentLabelPageUrlPattern);
      });

      it.skip('edit button click should load edit PaymentLabel page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('PaymentLabel');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', paymentLabelPageUrlPattern);
      });

      it('last delete button click should delete instance of PaymentLabel', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('paymentLabel').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', paymentLabelPageUrlPattern);

        paymentLabel = undefined;
      });
    });
  });

  describe('new PaymentLabel page', () => {
    beforeEach(() => {
      cy.visit(`${paymentLabelPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('PaymentLabel');
    });

    it('should create an instance of PaymentLabel', () => {
      cy.get(`[data-cy="description"]`).type('moderator benchmark').should('have.value', 'moderator benchmark');

      cy.get(`[data-cy="comments"]`).type('Cedi conglomeration e-markets').should('have.value', 'Cedi conglomeration e-markets');

      cy.get(`[data-cy="fileUploadToken"]`).type('Facilitator Berkshire harness').should('have.value', 'Facilitator Berkshire harness');

      cy.get(`[data-cy="compilationToken"]`).type('transmitter').should('have.value', 'transmitter');

      cy.get(`[data-cy="remarks"]`)
        .type('../fake-data/blob/hipster.txt')
        .invoke('val')
        .should('match', new RegExp('../fake-data/blob/hipster.txt'));

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        paymentLabel = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', paymentLabelPageUrlPattern);
    });
  });
});
