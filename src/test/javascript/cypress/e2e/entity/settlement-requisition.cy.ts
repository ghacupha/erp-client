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

describe('SettlementRequisition e2e test', () => {
  const settlementRequisitionPageUrl = '/settlement-requisition';
  const settlementRequisitionPageUrlPattern = new RegExp('/settlement-requisition(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  // const settlementRequisitionSample = {"serialNumber":"19542061-99b1-4efb-9bcf-c345876aed26","timeOfRequisition":"2022-10-19T02:52:27.580Z","requisitionNumber":"invoice","paymentAmount":1795,"paymentStatus":"PROCESSED"};

  let settlementRequisition;
  // let settlementCurrency;
  // let applicationUser;
  // let dealer;

  beforeEach(() => {
    cy.login(username, password);
  });

  /* Disabled due to incompatibility
  beforeEach(() => {
    // create an instance at the required relationship entity:
    cy.authenticatedRequest({
      method: 'POST',
      url: '/api/settlement-currencies',
      body: {"iso4217CurrencyCode":"tra","currencyName":"Iranian Rial","country":"United States Minor Outlying Islands","numericCode":"synthesize Senior drive","minorUnit":"payment","fileUploadToken":"Directives input data-warehouse","compilationToken":"Generic"},
    }).then(({ body }) => {
      settlementCurrency = body;
    });
    // create an instance at the required relationship entity:
    cy.authenticatedRequest({
      method: 'POST',
      url: '/api/application-users',
      body: {"designation":"ad53c9f5-50e8-4e9a-908f-9368a0ff9189","applicationIdentity":"Euro California"},
    }).then(({ body }) => {
      applicationUser = body;
    });
    // create an instance at the required relationship entity:
    cy.authenticatedRequest({
      method: 'POST',
      url: '/api/dealers',
      body: {"dealerName":"frame Concrete pixel","taxNumber":"Metal","identificationDocumentNumber":"Steel Field","organizationName":"Quality Soft","department":"Principal","position":"Towels Future","postalAddress":"Group teal Chicken","physicalAddress":"Grocery encoding","accountName":"Home Loan Account","accountNumber":"Global Unions","bankersName":"mesh Facilitator Cambridgeshire","bankersBranch":"payment payment","bankersSwiftCode":"New","fileUploadToken":"pixel Bedfordshire","compilationToken":"front-end Colorado","remarks":"Li4vZmFrZS1kYXRhL2Jsb2IvaGlwc3Rlci50eHQ=","otherNames":"data-warehouse data-warehouse moratorium"},
    }).then(({ body }) => {
      dealer = body;
    });
  });
   */

  beforeEach(() => {
    cy.intercept('GET', '/api/settlement-requisitions+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/settlement-requisitions').as('postEntityRequest');
    cy.intercept('DELETE', '/api/settlement-requisitions/*').as('deleteEntityRequest');
  });

  /* Disabled due to incompatibility
  beforeEach(() => {
    // Simulate relationships api for better performance and reproducibility.
    cy.intercept('GET', '/api/settlement-currencies', {
      statusCode: 200,
      body: [settlementCurrency],
    });

    cy.intercept('GET', '/api/application-users', {
      statusCode: 200,
      body: [applicationUser],
    });

    cy.intercept('GET', '/api/dealers', {
      statusCode: 200,
      body: [dealer],
    });

    cy.intercept('GET', '/api/payment-invoices', {
      statusCode: 200,
      body: [],
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

    cy.intercept('GET', '/api/universally-unique-mappings', {
      statusCode: 200,
      body: [],
    });

    cy.intercept('GET', '/api/placeholders', {
      statusCode: 200,
      body: [],
    });

  });
   */

  afterEach(() => {
    if (settlementRequisition) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/settlement-requisitions/${settlementRequisition.id}`,
      }).then(() => {
        settlementRequisition = undefined;
      });
    }
  });

  /* Disabled due to incompatibility
  afterEach(() => {
    if (settlementCurrency) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/settlement-currencies/${settlementCurrency.id}`,
      }).then(() => {
        settlementCurrency = undefined;
      });
    }
    if (applicationUser) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/application-users/${applicationUser.id}`,
      }).then(() => {
        applicationUser = undefined;
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
   */

  it('SettlementRequisitions menu should load SettlementRequisitions page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('settlement-requisition');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('SettlementRequisition').should('exist');
    cy.url().should('match', settlementRequisitionPageUrlPattern);
  });

  describe('SettlementRequisition page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(settlementRequisitionPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create SettlementRequisition page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/settlement-requisition/new$'));
        cy.getEntityCreateUpdateHeading('SettlementRequisition');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', settlementRequisitionPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      /* Disabled due to incompatibility
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/settlement-requisitions',
          body: {
            ...settlementRequisitionSample,
            settlementCurrency: settlementCurrency,
            currentOwner: applicationUser,
            nativeOwner: applicationUser,
            nativeDepartment: dealer,
            biller: dealer,
          },
        }).then(({ body }) => {
          settlementRequisition = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/settlement-requisitions+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/settlement-requisitions?page=0&size=20>; rel="last",<http://localhost/api/settlement-requisitions?page=0&size=20>; rel="first"',
              },
              body: [settlementRequisition],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(settlementRequisitionPageUrl);

        cy.wait('@entitiesRequestInternal');
      });
       */

      beforeEach(function () {
        cy.visit(settlementRequisitionPageUrl);

        cy.wait('@entitiesRequest').then(({ response }) => {
          if (response.body.length === 0) {
            this.skip();
          }
        });
      });

      it('detail button click should load details SettlementRequisition page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('settlementRequisition');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', settlementRequisitionPageUrlPattern);
      });

      it('edit button click should load edit SettlementRequisition page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('SettlementRequisition');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', settlementRequisitionPageUrlPattern);
      });

      it.skip('edit button click should load edit SettlementRequisition page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('SettlementRequisition');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', settlementRequisitionPageUrlPattern);
      });

      it.skip('last delete button click should delete instance of SettlementRequisition', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('settlementRequisition').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', settlementRequisitionPageUrlPattern);

        settlementRequisition = undefined;
      });
    });
  });

  describe('new SettlementRequisition page', () => {
    beforeEach(() => {
      cy.visit(`${settlementRequisitionPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('SettlementRequisition');
    });

    it.skip('should create an instance of SettlementRequisition', () => {
      cy.get(`[data-cy="description"]`).type('Mississippi').should('have.value', 'Mississippi');

      cy.get(`[data-cy="serialNumber"]`)
        .type('f0441444-e149-4f59-b0b5-baad69e2004b')
        .invoke('val')
        .should('match', new RegExp('f0441444-e149-4f59-b0b5-baad69e2004b'));

      cy.get(`[data-cy="timeOfRequisition"]`).type('2022-10-18T18:54').blur().should('have.value', '2022-10-18T18:54');

      cy.get(`[data-cy="requisitionNumber"]`).type('Engineer Cambridgeshire green').should('have.value', 'Engineer Cambridgeshire green');

      cy.get(`[data-cy="paymentAmount"]`).type('28479').should('have.value', '28479');

      cy.get(`[data-cy="paymentStatus"]`).select('RETURNED_TO_SENDER');

      cy.get(`[data-cy="settlementCurrency"]`).select(1);
      cy.get(`[data-cy="currentOwner"]`).select(1);
      cy.get(`[data-cy="nativeOwner"]`).select(1);
      cy.get(`[data-cy="nativeDepartment"]`).select(1);
      cy.get(`[data-cy="biller"]`).select(1);

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        settlementRequisition = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', settlementRequisitionPageUrlPattern);
    });
  });
});
