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

describe('FixedAssetDepreciation e2e test', () => {
  const fixedAssetDepreciationPageUrl = '/fixed-asset-depreciation';
  const fixedAssetDepreciationPageUrlPattern = new RegExp('/fixed-asset-depreciation(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const fixedAssetDepreciationSample = {};

  let fixedAssetDepreciation;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/services/erpservice/api/fixed-asset-depreciations+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/services/erpservice/api/fixed-asset-depreciations').as('postEntityRequest');
    cy.intercept('DELETE', '/services/erpservice/api/fixed-asset-depreciations/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (fixedAssetDepreciation) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/services/erpservice/api/fixed-asset-depreciations/${fixedAssetDepreciation.id}`,
      }).then(() => {
        fixedAssetDepreciation = undefined;
      });
    }
  });

  it('FixedAssetDepreciations menu should load FixedAssetDepreciations page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('fixed-asset-depreciation');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('FixedAssetDepreciation').should('exist');
    cy.url().should('match', fixedAssetDepreciationPageUrlPattern);
  });

  describe('FixedAssetDepreciation page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(fixedAssetDepreciationPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create FixedAssetDepreciation page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/fixed-asset-depreciation/new$'));
        cy.getEntityCreateUpdateHeading('FixedAssetDepreciation');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', fixedAssetDepreciationPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/services/erpservice/api/fixed-asset-depreciations',
          body: fixedAssetDepreciationSample,
        }).then(({ body }) => {
          fixedAssetDepreciation = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/services/erpservice/api/fixed-asset-depreciations+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/services/erpservice/api/fixed-asset-depreciations?page=0&size=20>; rel="last",<http://localhost/services/erpservice/api/fixed-asset-depreciations?page=0&size=20>; rel="first"',
              },
              body: [fixedAssetDepreciation],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(fixedAssetDepreciationPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details FixedAssetDepreciation page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('fixedAssetDepreciation');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', fixedAssetDepreciationPageUrlPattern);
      });

      it('edit button click should load edit FixedAssetDepreciation page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('FixedAssetDepreciation');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', fixedAssetDepreciationPageUrlPattern);
      });

      it.skip('edit button click should load edit FixedAssetDepreciation page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('FixedAssetDepreciation');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', fixedAssetDepreciationPageUrlPattern);
      });

      it('last delete button click should delete instance of FixedAssetDepreciation', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('fixedAssetDepreciation').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', fixedAssetDepreciationPageUrlPattern);

        fixedAssetDepreciation = undefined;
      });
    });
  });

  describe('new FixedAssetDepreciation page', () => {
    beforeEach(() => {
      cy.visit(`${fixedAssetDepreciationPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('FixedAssetDepreciation');
    });

    it('should create an instance of FixedAssetDepreciation', () => {
      cy.get(`[data-cy="assetNumber"]`).type('86872').should('have.value', '86872');

      cy.get(`[data-cy="serviceOutletCode"]`).type('calculate metrics Quality').should('have.value', 'calculate metrics Quality');

      cy.get(`[data-cy="assetTag"]`).type('Agent').should('have.value', 'Agent');

      cy.get(`[data-cy="assetDescription"]`).type('Investment Fundamental').should('have.value', 'Investment Fundamental');

      cy.get(`[data-cy="depreciationDate"]`).type('2021-03-23').blur().should('have.value', '2021-03-23');

      cy.get(`[data-cy="assetCategory"]`).type('morph Avon Identity').should('have.value', 'morph Avon Identity');

      cy.get(`[data-cy="depreciationAmount"]`).type('75411').should('have.value', '75411');

      cy.get(`[data-cy="depreciationRegime"]`).select('DECLINING_BALANCE_BASIS');

      cy.get(`[data-cy="fileUploadToken"]`).type('eyeballs plum markets').should('have.value', 'eyeballs plum markets');

      cy.get(`[data-cy="compilationToken"]`).type('Handcrafted Generic e-tailers').should('have.value', 'Handcrafted Generic e-tailers');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        fixedAssetDepreciation = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', fixedAssetDepreciationPageUrlPattern);
    });
  });
});
