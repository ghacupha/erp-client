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

describe('AssetRegistration e2e test', () => {
  const assetRegistrationPageUrl = '/asset-registration';
  const assetRegistrationPageUrlPattern = new RegExp('/asset-registration(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  // const assetRegistrationSample = {"assetNumber":"incentivize","assetTag":"harness Buckinghamshire dot-com","assetCost":15916};

  let assetRegistration;
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
      url: '/api/settlements',
      body: {"paymentNumber":"West Account","paymentDate":"2022-02-02","paymentAmount":24593,"description":"up","notes":"Future invoice deposit","calculationFile":"Li4vZmFrZS1kYXRhL2Jsb2IvaGlwc3Rlci5wbmc=","calculationFileContentType":"unknown","fileUploadToken":"indexing Tasty Digitized","compilationToken":"synergize azure Avon","remarks":"Li4vZmFrZS1kYXRhL2Jsb2IvaGlwc3Rlci50eHQ="},
    }).then(({ body }) => {
      settlement = body;
    });
    // create an instance at the required relationship entity:
    cy.authenticatedRequest({
      method: 'POST',
      url: '/api/asset-categories',
      body: {"assetCategoryName":"Interactions","description":"Frozen Clothing","notes":"parsing black","remarks":"Li4vZmFrZS1kYXRhL2Jsb2IvaGlwc3Rlci50eHQ="},
    }).then(({ body }) => {
      assetCategory = body;
    });
    // create an instance at the required relationship entity:
    cy.authenticatedRequest({
      method: 'POST',
      url: '/api/dealers',
      body: {"dealerName":"background Berkshire","taxNumber":"Trail background Sausages","identificationDocumentNumber":"Incredible","organizationName":"Metal Coordinator","department":"Michigan","position":"calculate British","postalAddress":"support integrated Account","physicalAddress":"Granite virtual alarm","accountName":"Home Loan Account","accountNumber":"salmon Loan","bankersName":"EXE bypass systems","bankersBranch":"Cotton","bankersSwiftCode":"leverage","fileUploadToken":"Montana Handcrafted","compilationToken":"bricks-and-clicks bifurcated optical","remarks":"Li4vZmFrZS1kYXRhL2Jsb2IvaGlwc3Rlci50eHQ=","otherNames":"Delaware Architect Pizza"},
    }).then(({ body }) => {
      dealer = body;
    });
  });
   */

  beforeEach(() => {
    cy.intercept('GET', '/api/asset-registrations+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/asset-registrations').as('postEntityRequest');
    cy.intercept('DELETE', '/api/asset-registrations/*').as('deleteEntityRequest');
  });

  /* Disabled due to incompatibility
  beforeEach(() => {
    // Simulate relationships api for better performance and reproducibility.
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
      body: [],
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

    cy.intercept('GET', '/api/settlement-currencies', {
      statusCode: 200,
      body: [],
    });

    cy.intercept('GET', '/api/business-documents', {
      statusCode: 200,
      body: [],
    });

    cy.intercept('GET', '/api/asset-warranties', {
      statusCode: 200,
      body: [],
    });

    cy.intercept('GET', '/api/universally-unique-mappings', {
      statusCode: 200,
      body: [],
    });

    cy.intercept('GET', '/api/asset-accessories', {
      statusCode: 200,
      body: [],
    });

  });
   */

  afterEach(() => {
    if (assetRegistration) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/asset-registrations/${assetRegistration.id}`,
      }).then(() => {
        assetRegistration = undefined;
      });
    }
  });

  /* Disabled due to incompatibility
  afterEach(() => {
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

  it('AssetRegistrations menu should load AssetRegistrations page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('asset-registration');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('AssetRegistration').should('exist');
    cy.url().should('match', assetRegistrationPageUrlPattern);
  });

  describe('AssetRegistration page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(assetRegistrationPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create AssetRegistration page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/asset-registration/new$'));
        cy.getEntityCreateUpdateHeading('AssetRegistration');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', assetRegistrationPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      /* Disabled due to incompatibility
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/asset-registrations',
          body: {
            ...assetRegistrationSample,
            settlement: settlement,
            assetCategory: assetCategory,
            dealer: dealer,
          },
        }).then(({ body }) => {
          assetRegistration = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/asset-registrations+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/asset-registrations?page=0&size=20>; rel="last",<http://localhost/api/asset-registrations?page=0&size=20>; rel="first"',
              },
              body: [assetRegistration],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(assetRegistrationPageUrl);

        cy.wait('@entitiesRequestInternal');
      });
       */

      beforeEach(function () {
        cy.visit(assetRegistrationPageUrl);

        cy.wait('@entitiesRequest').then(({ response }) => {
          if (response.body.length === 0) {
            this.skip();
          }
        });
      });

      it('detail button click should load details AssetRegistration page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('assetRegistration');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', assetRegistrationPageUrlPattern);
      });

      it('edit button click should load edit AssetRegistration page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('AssetRegistration');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', assetRegistrationPageUrlPattern);
      });

      it.skip('edit button click should load edit AssetRegistration page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('AssetRegistration');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', assetRegistrationPageUrlPattern);
      });

      it.skip('last delete button click should delete instance of AssetRegistration', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('assetRegistration').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', assetRegistrationPageUrlPattern);

        assetRegistration = undefined;
      });
    });
  });

  describe('new AssetRegistration page', () => {
    beforeEach(() => {
      cy.visit(`${assetRegistrationPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('AssetRegistration');
    });

    it.skip('should create an instance of AssetRegistration', () => {
      cy.get(`[data-cy="assetNumber"]`).type('Chair Balanced black').should('have.value', 'Chair Balanced black');

      cy.get(`[data-cy="assetTag"]`).type('override clicks-and-mortar').should('have.value', 'override clicks-and-mortar');

      cy.get(`[data-cy="assetDetails"]`).type('flexibility expedite optimal').should('have.value', 'flexibility expedite optimal');

      cy.get(`[data-cy="assetCost"]`).type('98834').should('have.value', '98834');

      cy.setFieldImageAsBytesOfEntity('comments', 'integration-test.png', 'image/png');

      cy.get(`[data-cy="modelNumber"]`).type('extranet digital').should('have.value', 'extranet digital');

      cy.get(`[data-cy="serialNumber"]`).type('Global Extension iterate').should('have.value', 'Global Extension iterate');

      cy.get(`[data-cy="settlement"]`).select([0]);
      cy.get(`[data-cy="assetCategory"]`).select(1);
      cy.get(`[data-cy="dealer"]`).select(1);

      // since cypress clicks submit too fast before the blob fields are validated
      cy.wait(200); // eslint-disable-line cypress/no-unnecessary-waiting
      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        assetRegistration = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', assetRegistrationPageUrlPattern);
    });
  });
});
