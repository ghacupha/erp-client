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

describe('PaymentInvoice e2e test', () => {
  const paymentInvoicePageUrl = '/payment-invoice';
  const paymentInvoicePageUrlPattern = new RegExp('/payment-invoice(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const paymentInvoiceSample = { invoiceNumber: 'intuitive throughput wireless' };

  let paymentInvoice;
  let settlementCurrency;
  let dealer;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    // create an instance at the required relationship entity:
    cy.authenticatedRequest({
      method: 'POST',
      url: '/api/settlement-currencies',
      body: {
        iso4217CurrencyCode: 'Inv',
        currencyName: 'Baht',
        country: 'Falkland Islands (Malvinas)',
        numericCode: 'transmitting',
        minorUnit: 'streamline',
        fileUploadToken: 'Rwanda Card',
        compilationToken: 'Jewelery orchid View',
      },
    }).then(({ body }) => {
      settlementCurrency = body;
    });
    // create an instance at the required relationship entity:
    cy.authenticatedRequest({
      method: 'POST',
      url: '/api/dealers',
      body: {
        dealerName: 'array Intelligent distributed',
        taxNumber: 'Frozen',
        identificationDocumentNumber: 'backing solid whiteboard',
        organizationName: 'whiteboard',
        department: 'forecast',
        position: 'Mouse',
        postalAddress: 'Berkshire redundant transmitter',
        physicalAddress: 'Small',
        accountName: 'Home Loan Account',
        accountNumber: 'navigate Assistant',
        bankersName: 'Alaska',
        bankersBranch: 'user-centric Sports',
        bankersSwiftCode: 'e-tailers',
        fileUploadToken: 'driver GB',
        compilationToken: 'PCI transmitting navigating',
        remarks: 'Li4vZmFrZS1kYXRhL2Jsb2IvaGlwc3Rlci50eHQ=',
        otherNames: 'copy Lead Chips',
      },
    }).then(({ body }) => {
      dealer = body;
    });
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/payment-invoices+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/payment-invoices').as('postEntityRequest');
    cy.intercept('DELETE', '/api/payment-invoices/*').as('deleteEntityRequest');
  });

  beforeEach(() => {
    // Simulate relationships api for better performance and reproducibility.
    cy.intercept('GET', '/api/purchase-orders', {
      statusCode: 200,
      body: [],
    });

    cy.intercept('GET', '/api/placeholders', {
      statusCode: 200,
      body: [],
    });

    cy.intercept('GET', '/api/payment-labels', {
      statusCode: 200,
      body: [],
    });

    cy.intercept('GET', '/api/settlement-currencies', {
      statusCode: 200,
      body: [settlementCurrency],
    });

    cy.intercept('GET', '/api/dealers', {
      statusCode: 200,
      body: [dealer],
    });

    cy.intercept('GET', '/api/delivery-notes', {
      statusCode: 200,
      body: [],
    });

    cy.intercept('GET', '/api/job-sheets', {
      statusCode: 200,
      body: [],
    });

    cy.intercept('GET', '/api/business-documents', {
      statusCode: 200,
      body: [],
    });
  });

  afterEach(() => {
    if (paymentInvoice) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/payment-invoices/${paymentInvoice.id}`,
      }).then(() => {
        paymentInvoice = undefined;
      });
    }
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
    if (dealer) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/dealers/${dealer.id}`,
      }).then(() => {
        dealer = undefined;
      });
    }
  });

  it('PaymentInvoices menu should load PaymentInvoices page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('payment-invoice');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('PaymentInvoice').should('exist');
    cy.url().should('match', paymentInvoicePageUrlPattern);
  });

  describe('PaymentInvoice page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(paymentInvoicePageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create PaymentInvoice page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/payment-invoice/new$'));
        cy.getEntityCreateUpdateHeading('PaymentInvoice');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', paymentInvoicePageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/payment-invoices',
          body: {
            ...paymentInvoiceSample,
            settlementCurrency: settlementCurrency,
            biller: dealer,
          },
        }).then(({ body }) => {
          paymentInvoice = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/payment-invoices+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/payment-invoices?page=0&size=20>; rel="last",<http://localhost/api/payment-invoices?page=0&size=20>; rel="first"',
              },
              body: [paymentInvoice],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(paymentInvoicePageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details PaymentInvoice page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('paymentInvoice');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', paymentInvoicePageUrlPattern);
      });

      it('edit button click should load edit PaymentInvoice page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('PaymentInvoice');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', paymentInvoicePageUrlPattern);
      });

      it.skip('edit button click should load edit PaymentInvoice page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('PaymentInvoice');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', paymentInvoicePageUrlPattern);
      });

      it('last delete button click should delete instance of PaymentInvoice', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('paymentInvoice').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', paymentInvoicePageUrlPattern);

        paymentInvoice = undefined;
      });
    });
  });

  describe('new PaymentInvoice page', () => {
    beforeEach(() => {
      cy.visit(`${paymentInvoicePageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('PaymentInvoice');
    });

    it('should create an instance of PaymentInvoice', () => {
      cy.get(`[data-cy="invoiceNumber"]`).type('front-end').should('have.value', 'front-end');

      cy.get(`[data-cy="invoiceDate"]`).type('2022-02-03').blur().should('have.value', '2022-02-03');

      cy.get(`[data-cy="invoiceAmount"]`).type('19117').should('have.value', '19117');

      cy.get(`[data-cy="fileUploadToken"]`).type('Vista Sweden').should('have.value', 'Vista Sweden');

      cy.get(`[data-cy="compilationToken"]`).type('calculating').should('have.value', 'calculating');

      cy.get(`[data-cy="remarks"]`)
        .type('../fake-data/blob/hipster.txt')
        .invoke('val')
        .should('match', new RegExp('../fake-data/blob/hipster.txt'));

      cy.get(`[data-cy="settlementCurrency"]`).select(1);
      cy.get(`[data-cy="biller"]`).select(1);

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        paymentInvoice = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', paymentInvoicePageUrlPattern);
    });
  });
});
