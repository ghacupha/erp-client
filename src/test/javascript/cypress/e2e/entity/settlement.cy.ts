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

describe('Settlement e2e test', () => {
  const settlementPageUrl = '/settlement';
  const settlementPageUrlPattern = new RegExp('/settlement(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const settlementSample = {};

  let settlement;
  let settlementCurrency;
  let paymentCategory;
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
        iso4217CurrencyCode: 'har',
        currencyName: 'Kwanza',
        country: 'Lebanon',
        numericCode: 'hack program',
        minorUnit: 'bricks-and-clicks Missouri bypassing',
        fileUploadToken: 'Clothing Wooden Account',
        compilationToken: 'Bedfordshire monitor Florida',
      },
    }).then(({ body }) => {
      settlementCurrency = body;
    });
    // create an instance at the required relationship entity:
    cy.authenticatedRequest({
      method: 'POST',
      url: '/api/payment-categories',
      body: {
        categoryName: 'state',
        categoryDescription: 'circuit Salad',
        categoryType: 'CATEGORY13',
        fileUploadToken: 'Berkshire',
        compilationToken: 'Soft generate',
      },
    }).then(({ body }) => {
      paymentCategory = body;
    });
    // create an instance at the required relationship entity:
    cy.authenticatedRequest({
      method: 'POST',
      url: '/api/dealers',
      body: {
        dealerName: 'Polarised Pizza',
        taxNumber: 'e-business Account',
        identificationDocumentNumber: 'Phased Azerbaijan',
        organizationName: 'target',
        department: 'content collaborative',
        position: 'Berkshire Factors program',
        postalAddress: 'toolset',
        physicalAddress: 'Fresh',
        accountName: 'Home Loan Account',
        accountNumber: 'Soap',
        bankersName: 'JBOD PNG salmon',
        bankersBranch: 'Car SCSI',
        bankersSwiftCode: 'coherent Steel',
        fileUploadToken: 'Ireland e-business',
        compilationToken: 'withdrawal Quality Cotton',
        remarks: 'Li4vZmFrZS1kYXRhL2Jsb2IvaGlwc3Rlci50eHQ=',
        otherNames: 'Denmark Keys',
      },
    }).then(({ body }) => {
      dealer = body;
    });
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/settlements+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/settlements').as('postEntityRequest');
    cy.intercept('DELETE', '/api/settlements/*').as('deleteEntityRequest');
  });

  beforeEach(() => {
    // Simulate relationships api for better performance and reproducibility.
    cy.intercept('GET', '/api/placeholders', {
      statusCode: 200,
      body: [],
    });

    cy.intercept('GET', '/api/settlement-currencies', {
      statusCode: 200,
      body: [settlementCurrency],
    });

    cy.intercept('GET', '/api/payment-labels', {
      statusCode: 200,
      body: [],
    });

    cy.intercept('GET', '/api/payment-categories', {
      statusCode: 200,
      body: [paymentCategory],
    });

    cy.intercept('GET', '/api/settlements', {
      statusCode: 200,
      body: [],
    });

    cy.intercept('GET', '/api/dealers', {
      statusCode: 200,
      body: [dealer],
    });

    cy.intercept('GET', '/api/payment-invoices', {
      statusCode: 200,
      body: [],
    });

    cy.intercept('GET', '/api/business-documents', {
      statusCode: 200,
      body: [],
    });
  });

  afterEach(() => {
    if (settlement) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/settlements/${settlement.id}`,
      }).then(() => {
        settlement = undefined;
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
    if (paymentCategory) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/payment-categories/${paymentCategory.id}`,
      }).then(() => {
        paymentCategory = undefined;
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

  it('Settlements menu should load Settlements page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('settlement');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Settlement').should('exist');
    cy.url().should('match', settlementPageUrlPattern);
  });

  describe('Settlement page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(settlementPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Settlement page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/settlement/new$'));
        cy.getEntityCreateUpdateHeading('Settlement');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', settlementPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/settlements',
          body: {
            ...settlementSample,
            settlementCurrency: settlementCurrency,
            paymentCategory: paymentCategory,
            biller: dealer,
          },
        }).then(({ body }) => {
          settlement = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/settlements+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/settlements?page=0&size=20>; rel="last",<http://localhost/api/settlements?page=0&size=20>; rel="first"',
              },
              body: [settlement],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(settlementPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details Settlement page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('settlement');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', settlementPageUrlPattern);
      });

      it('edit button click should load edit Settlement page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Settlement');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', settlementPageUrlPattern);
      });

      it.skip('edit button click should load edit Settlement page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Settlement');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', settlementPageUrlPattern);
      });

      it('last delete button click should delete instance of Settlement', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('settlement').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', settlementPageUrlPattern);

        settlement = undefined;
      });
    });
  });

  describe('new Settlement page', () => {
    beforeEach(() => {
      cy.visit(`${settlementPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Settlement');
    });

    it('should create an instance of Settlement', () => {
      cy.get(`[data-cy="paymentNumber"]`).type('compress calculate Granite').should('have.value', 'compress calculate Granite');

      cy.get(`[data-cy="paymentDate"]`).type('2022-02-02').blur().should('have.value', '2022-02-02');

      cy.get(`[data-cy="paymentAmount"]`).type('5729').should('have.value', '5729');

      cy.get(`[data-cy="description"]`).type('Fresh Passage Island').should('have.value', 'Fresh Passage Island');

      cy.get(`[data-cy="notes"]`).type('magenta Buckinghamshire circuit').should('have.value', 'magenta Buckinghamshire circuit');

      cy.setFieldImageAsBytesOfEntity('calculationFile', 'integration-test.png', 'image/png');

      cy.get(`[data-cy="fileUploadToken"]`)
        .type('transmitting Infrastructure virtual')
        .should('have.value', 'transmitting Infrastructure virtual');

      cy.get(`[data-cy="compilationToken"]`).type('bluetooth').should('have.value', 'bluetooth');

      cy.get(`[data-cy="remarks"]`)
        .type('../fake-data/blob/hipster.txt')
        .invoke('val')
        .should('match', new RegExp('../fake-data/blob/hipster.txt'));

      cy.get(`[data-cy="settlementCurrency"]`).select(1);
      cy.get(`[data-cy="paymentCategory"]`).select(1);
      cy.get(`[data-cy="biller"]`).select(1);

      // since cypress clicks submit too fast before the blob fields are validated
      cy.wait(200); // eslint-disable-line cypress/no-unnecessary-waiting
      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        settlement = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', settlementPageUrlPattern);
    });
  });
});
