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

describe('AssetAccessory e2e test', () => {
  const assetAccessoryPageUrl = '/asset-accessory';
  const assetAccessoryPageUrlPattern = new RegExp('/asset-accessory(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  // const assetAccessorySample = {};

  let assetAccessory;
  // let serviceOutlet;
  // let settlement;
  // let assetCategory;
  // let dealer;

  beforeEach(() => {
    cy.login(username, password);
  });

  /* Disabled due to incompatibility
  beforeEach(() => {
    // create an instance at the required relationship entity:
    cy.authenticatedRequest({
      method: 'POST',
      url: '/api/service-outlets',
      body: {"outletCode":"Illinois Communications Mozambique","outletName":"calculating generate matrix","town":"Human","parliamentaryConstituency":"forecast Facilitator","gpsCoordinates":"redundant networks Guam","outletOpeningDate":"2022-02-28","regulatorApprovalDate":"2022-03-01","outletClosureDate":"2022-03-01","dateLastModified":"2022-02-28","licenseFeePayable":90332},
    }).then(({ body }) => {
      serviceOutlet = body;
    });
    // create an instance at the required relationship entity:
    cy.authenticatedRequest({
      method: 'POST',
      url: '/api/settlements',
      body: {"paymentNumber":"quantifying methodologies firewall","paymentDate":"2022-02-02","paymentAmount":25250,"description":"synthesize","notes":"program withdrawal Account","calculationFile":"Li4vZmFrZS1kYXRhL2Jsb2IvaGlwc3Rlci5wbmc=","calculationFileContentType":"unknown","fileUploadToken":"revolutionary silver Hat","compilationToken":"capacitor Jersey application","remarks":"Li4vZmFrZS1kYXRhL2Jsb2IvaGlwc3Rlci50eHQ="},
    }).then(({ body }) => {
      settlement = body;
    });
    // create an instance at the required relationship entity:
    cy.authenticatedRequest({
      method: 'POST',
      url: '/api/asset-categories',
      body: {"assetCategoryName":"Plains Trail","description":"Bedfordshire back-end Bedfordshire","notes":"PCI","remarks":"Li4vZmFrZS1kYXRhL2Jsb2IvaGlwc3Rlci50eHQ="},
    }).then(({ body }) => {
      assetCategory = body;
    });
    // create an instance at the required relationship entity:
    cy.authenticatedRequest({
      method: 'POST',
      url: '/api/dealers',
      body: {"dealerName":"Berkshire Loan","taxNumber":"France calculating","identificationDocumentNumber":"Rwanda connect","organizationName":"Music Table","department":"JSON","position":"Legacy Configurable","postalAddress":"CSS Sports distributed","physicalAddress":"Money Savings turquoise","accountName":"Checking Account","accountNumber":"Ohio","bankersName":"Virginia District","bankersBranch":"Sleek encryption Intelligent","bankersSwiftCode":"incremental","fileUploadToken":"Customer-focused Rial Data","compilationToken":"Secured","remarks":"Li4vZmFrZS1kYXRhL2Jsb2IvaGlwc3Rlci50eHQ=","otherNames":"Account"},
    }).then(({ body }) => {
      dealer = body;
    });
  });
   */

  beforeEach(() => {
    cy.intercept('GET', '/api/asset-accessories+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/asset-accessories').as('postEntityRequest');
    cy.intercept('DELETE', '/api/asset-accessories/*').as('deleteEntityRequest');
  });

  /* Disabled due to incompatibility
  beforeEach(() => {
    // Simulate relationships api for better performance and reproducibility.
    cy.intercept('GET', '/api/asset-warranties', {
      statusCode: 200,
      body: [],
    });

    cy.intercept('GET', '/api/placeholders', {
      statusCode: 200,
      body: [],
    });

    cy.intercept('GET', '/api/payment-invoices', {
      statusCode: 200,
      body: [],
    });

    cy.intercept('GET', '/api/service-outlets', {
      statusCode: 200,
      body: [serviceOutlet],
    });

    cy.intercept('GET', '/api/settlements', {
      statusCode: 200,
      body: [settlement],
    });

    cy.intercept('GET', '/api/asset-categories', {
      statusCode: 200,
      body: [assetCategory],
    });

    cy.intercept('GET', '/api/purchase-orders', {
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

    cy.intercept('GET', '/api/dealers', {
      statusCode: 200,
      body: [dealer],
    });

    cy.intercept('GET', '/api/business-documents', {
      statusCode: 200,
      body: [],
    });

    cy.intercept('GET', '/api/universally-unique-mappings', {
      statusCode: 200,
      body: [],
    });

  });
   */

  afterEach(() => {
    if (assetAccessory) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/asset-accessories/${assetAccessory.id}`,
      }).then(() => {
        assetAccessory = undefined;
      });
    }
  });

  /* Disabled due to incompatibility
  afterEach(() => {
    if (serviceOutlet) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/service-outlets/${serviceOutlet.id}`,
      }).then(() => {
        serviceOutlet = undefined;
      });
    }
    if (settlement) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/settlements/${settlement.id}`,
      }).then(() => {
        settlement = undefined;
      });
    }
    if (assetCategory) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/asset-categories/${assetCategory.id}`,
      }).then(() => {
        assetCategory = undefined;
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

  it('AssetAccessories menu should load AssetAccessories page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('asset-accessory');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('AssetAccessory').should('exist');
    cy.url().should('match', assetAccessoryPageUrlPattern);
  });

  describe('AssetAccessory page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(assetAccessoryPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create AssetAccessory page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/asset-accessory/new$'));
        cy.getEntityCreateUpdateHeading('AssetAccessory');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', assetAccessoryPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      /* Disabled due to incompatibility
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/asset-accessories',
          body: {
            ...assetAccessorySample,
            serviceOutlet: serviceOutlet,
            settlement: settlement,
            assetCategory: assetCategory,
            dealer: dealer,
          },
        }).then(({ body }) => {
          assetAccessory = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/asset-accessories+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/asset-accessories?page=0&size=20>; rel="last",<http://localhost/api/asset-accessories?page=0&size=20>; rel="first"',
              },
              body: [assetAccessory],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(assetAccessoryPageUrl);

        cy.wait('@entitiesRequestInternal');
      });
       */

      beforeEach(function () {
        cy.visit(assetAccessoryPageUrl);

        cy.wait('@entitiesRequest').then(({ response }) => {
          if (response.body.length === 0) {
            this.skip();
          }
        });
      });

      it('detail button click should load details AssetAccessory page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('assetAccessory');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', assetAccessoryPageUrlPattern);
      });

      it('edit button click should load edit AssetAccessory page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('AssetAccessory');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', assetAccessoryPageUrlPattern);
      });

      it.skip('edit button click should load edit AssetAccessory page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('AssetAccessory');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', assetAccessoryPageUrlPattern);
      });

      it.skip('last delete button click should delete instance of AssetAccessory', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('assetAccessory').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', assetAccessoryPageUrlPattern);

        assetAccessory = undefined;
      });
    });
  });

  describe('new AssetAccessory page', () => {
    beforeEach(() => {
      cy.visit(`${assetAccessoryPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('AssetAccessory');
    });

    it.skip('should create an instance of AssetAccessory', () => {
      cy.get(`[data-cy="assetTag"]`).type('Up-sized Avon Small').should('have.value', 'Up-sized Avon Small');

      cy.get(`[data-cy="assetDetails"]`).type('Rubber lime Ukraine').should('have.value', 'Rubber lime Ukraine');

      cy.setFieldImageAsBytesOfEntity('comments', 'integration-test.png', 'image/png');

      cy.get(`[data-cy="modelNumber"]`).type('capacitor relationships').should('have.value', 'capacitor relationships');

      cy.get(`[data-cy="serialNumber"]`).type('Administrator synthesize').should('have.value', 'Administrator synthesize');

      cy.get(`[data-cy="serviceOutlet"]`).select(1);
      cy.get(`[data-cy="settlement"]`).select([0]);
      cy.get(`[data-cy="assetCategory"]`).select(1);
      cy.get(`[data-cy="dealer"]`).select(1);

      // since cypress clicks submit too fast before the blob fields are validated
      cy.wait(200); // eslint-disable-line cypress/no-unnecessary-waiting
      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        assetAccessory = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', assetAccessoryPageUrlPattern);
    });
  });
});
