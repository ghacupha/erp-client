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

describe('AssetWarranty e2e test', () => {
  const assetWarrantyPageUrl = '/asset-warranty';
  const assetWarrantyPageUrlPattern = new RegExp('/asset-warranty(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const assetWarrantySample = {};

  let assetWarranty;
  let dealer;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    // create an instance at the required relationship entity:
    cy.authenticatedRequest({
      method: 'POST',
      url: '/api/dealers',
      body: {
        dealerName: 'overriding',
        taxNumber: 'olive',
        identificationDocumentNumber: 'B2C Connecticut',
        organizationName: 'Shores interface holistic',
        department: 'green',
        position: 'Automotive Fantastic',
        postalAddress: 'Security tertiary',
        physicalAddress: 'Tajikistan',
        accountName: 'Home Loan Account',
        accountNumber: 'Investment',
        bankersName: 'transition Books microchip',
        bankersBranch: 'Computer Valleys',
        bankersSwiftCode: 'Franc Cliff proactive',
        fileUploadToken: 'virtual calculate',
        compilationToken: 'input driver white',
        remarks: 'Li4vZmFrZS1kYXRhL2Jsb2IvaGlwc3Rlci50eHQ=',
        otherNames: 'neural',
      },
    }).then(({ body }) => {
      dealer = body;
    });
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/asset-warranties+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/asset-warranties').as('postEntityRequest');
    cy.intercept('DELETE', '/api/asset-warranties/*').as('deleteEntityRequest');
  });

  beforeEach(() => {
    // Simulate relationships api for better performance and reproducibility.
    cy.intercept('GET', '/api/placeholders', {
      statusCode: 200,
      body: [],
    });

    cy.intercept('GET', '/api/universally-unique-mappings', {
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
  });

  afterEach(() => {
    if (assetWarranty) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/asset-warranties/${assetWarranty.id}`,
      }).then(() => {
        assetWarranty = undefined;
      });
    }
  });

  afterEach(() => {
    if (dealer) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/dealers/${dealer.id}`,
      }).then(() => {
        dealer = undefined;
      });
    }
  });

  it('AssetWarranties menu should load AssetWarranties page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('asset-warranty');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('AssetWarranty').should('exist');
    cy.url().should('match', assetWarrantyPageUrlPattern);
  });

  describe('AssetWarranty page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(assetWarrantyPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create AssetWarranty page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/asset-warranty/new$'));
        cy.getEntityCreateUpdateHeading('AssetWarranty');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', assetWarrantyPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/asset-warranties',
          body: {
            ...assetWarrantySample,
            dealer: dealer,
          },
        }).then(({ body }) => {
          assetWarranty = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/asset-warranties+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/asset-warranties?page=0&size=20>; rel="last",<http://localhost/api/asset-warranties?page=0&size=20>; rel="first"',
              },
              body: [assetWarranty],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(assetWarrantyPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details AssetWarranty page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('assetWarranty');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', assetWarrantyPageUrlPattern);
      });

      it('edit button click should load edit AssetWarranty page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('AssetWarranty');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', assetWarrantyPageUrlPattern);
      });

      it.skip('edit button click should load edit AssetWarranty page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('AssetWarranty');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', assetWarrantyPageUrlPattern);
      });

      it('last delete button click should delete instance of AssetWarranty', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('assetWarranty').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', assetWarrantyPageUrlPattern);

        assetWarranty = undefined;
      });
    });
  });

  describe('new AssetWarranty page', () => {
    beforeEach(() => {
      cy.visit(`${assetWarrantyPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('AssetWarranty');
    });

    it('should create an instance of AssetWarranty', () => {
      cy.get(`[data-cy="assetTag"]`).type('microchip').should('have.value', 'microchip');

      cy.get(`[data-cy="description"]`).type('Shirt').should('have.value', 'Shirt');

      cy.get(`[data-cy="modelNumber"]`).type('Industrial solution-oriented').should('have.value', 'Industrial solution-oriented');

      cy.get(`[data-cy="serialNumber"]`).type('deploy secondary').should('have.value', 'deploy secondary');

      cy.get(`[data-cy="expiryDate"]`).type('2023-05-04').blur().should('have.value', '2023-05-04');

      cy.get(`[data-cy="dealer"]`).select(1);

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        assetWarranty = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', assetWarrantyPageUrlPattern);
    });
  });
});
