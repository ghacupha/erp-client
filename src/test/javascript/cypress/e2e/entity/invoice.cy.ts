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

describe('Invoice e2e test', () => {
  const invoicePageUrl = '/invoice';
  const invoicePageUrlPattern = new RegExp('/invoice(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const invoiceSample = { invoiceNumber: 'International', currency: 'TZS' };

  let invoice;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/services/erpservice/api/invoices+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/services/erpservice/api/invoices').as('postEntityRequest');
    cy.intercept('DELETE', '/services/erpservice/api/invoices/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (invoice) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/services/erpservice/api/invoices/${invoice.id}`,
      }).then(() => {
        invoice = undefined;
      });
    }
  });

  it('Invoices menu should load Invoices page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('invoice');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Invoice').should('exist');
    cy.url().should('match', invoicePageUrlPattern);
  });

  describe('Invoice page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(invoicePageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Invoice page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/invoice/new$'));
        cy.getEntityCreateUpdateHeading('Invoice');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', invoicePageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/services/erpservice/api/invoices',
          body: invoiceSample,
        }).then(({ body }) => {
          invoice = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/services/erpservice/api/invoices+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/services/erpservice/api/invoices?page=0&size=20>; rel="last",<http://localhost/services/erpservice/api/invoices?page=0&size=20>; rel="first"',
              },
              body: [invoice],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(invoicePageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details Invoice page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('invoice');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', invoicePageUrlPattern);
      });

      it('edit button click should load edit Invoice page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Invoice');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', invoicePageUrlPattern);
      });

      it.skip('edit button click should load edit Invoice page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Invoice');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', invoicePageUrlPattern);
      });

      it('last delete button click should delete instance of Invoice', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('invoice').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', invoicePageUrlPattern);

        invoice = undefined;
      });
    });
  });

  describe('new Invoice page', () => {
    beforeEach(() => {
      cy.visit(`${invoicePageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Invoice');
    });

    it('should create an instance of Invoice', () => {
      cy.get(`[data-cy="invoiceNumber"]`).type('Wooden orchid Station').should('have.value', 'Wooden orchid Station');

      cy.get(`[data-cy="invoiceDate"]`).type('2021-06-27').blur().should('have.value', '2021-06-27');

      cy.get(`[data-cy="invoiceAmount"]`).type('88698').should('have.value', '88698');

      cy.get(`[data-cy="currency"]`).select('EUR');

      cy.get(`[data-cy="paymentReference"]`).type('hack').should('have.value', 'hack');

      cy.get(`[data-cy="dealerName"]`).type('Synchronised National').should('have.value', 'Synchronised National');

      cy.get(`[data-cy="fileUploadToken"]`).type('Investment').should('have.value', 'Investment');

      cy.get(`[data-cy="compilationToken"]`).type('Self-enabling Open-architected').should('have.value', 'Self-enabling Open-architected');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        invoice = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', invoicePageUrlPattern);
    });
  });
});
