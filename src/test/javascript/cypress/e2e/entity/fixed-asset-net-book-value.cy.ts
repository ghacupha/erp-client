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

describe('FixedAssetNetBookValue e2e test', () => {
  const fixedAssetNetBookValuePageUrl = '/fixed-asset-net-book-value';
  const fixedAssetNetBookValuePageUrlPattern = new RegExp('/fixed-asset-net-book-value(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const fixedAssetNetBookValueSample = {};

  let fixedAssetNetBookValue;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/services/erpservice/api/fixed-asset-net-book-values+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/services/erpservice/api/fixed-asset-net-book-values').as('postEntityRequest');
    cy.intercept('DELETE', '/services/erpservice/api/fixed-asset-net-book-values/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (fixedAssetNetBookValue) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/services/erpservice/api/fixed-asset-net-book-values/${fixedAssetNetBookValue.id}`,
      }).then(() => {
        fixedAssetNetBookValue = undefined;
      });
    }
  });

  it('FixedAssetNetBookValues menu should load FixedAssetNetBookValues page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('fixed-asset-net-book-value');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('FixedAssetNetBookValue').should('exist');
    cy.url().should('match', fixedAssetNetBookValuePageUrlPattern);
  });

  describe('FixedAssetNetBookValue page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(fixedAssetNetBookValuePageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create FixedAssetNetBookValue page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/fixed-asset-net-book-value/new$'));
        cy.getEntityCreateUpdateHeading('FixedAssetNetBookValue');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', fixedAssetNetBookValuePageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/services/erpservice/api/fixed-asset-net-book-values',
          body: fixedAssetNetBookValueSample,
        }).then(({ body }) => {
          fixedAssetNetBookValue = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/services/erpservice/api/fixed-asset-net-book-values+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/services/erpservice/api/fixed-asset-net-book-values?page=0&size=20>; rel="last",<http://localhost/services/erpservice/api/fixed-asset-net-book-values?page=0&size=20>; rel="first"',
              },
              body: [fixedAssetNetBookValue],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(fixedAssetNetBookValuePageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details FixedAssetNetBookValue page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('fixedAssetNetBookValue');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', fixedAssetNetBookValuePageUrlPattern);
      });

      it('edit button click should load edit FixedAssetNetBookValue page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('FixedAssetNetBookValue');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', fixedAssetNetBookValuePageUrlPattern);
      });

      it.skip('edit button click should load edit FixedAssetNetBookValue page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('FixedAssetNetBookValue');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', fixedAssetNetBookValuePageUrlPattern);
      });

      it('last delete button click should delete instance of FixedAssetNetBookValue', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('fixedAssetNetBookValue').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', fixedAssetNetBookValuePageUrlPattern);

        fixedAssetNetBookValue = undefined;
      });
    });
  });

  describe('new FixedAssetNetBookValue page', () => {
    beforeEach(() => {
      cy.visit(`${fixedAssetNetBookValuePageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('FixedAssetNetBookValue');
    });

    it('should create an instance of FixedAssetNetBookValue', () => {
      cy.get(`[data-cy="assetNumber"]`).type('32088').should('have.value', '32088');

      cy.get(`[data-cy="serviceOutletCode"]`).type('deposit functionalities').should('have.value', 'deposit functionalities');

      cy.get(`[data-cy="assetTag"]`).type('cultivate').should('have.value', 'cultivate');

      cy.get(`[data-cy="assetDescription"]`).type('Handmade Officer').should('have.value', 'Handmade Officer');

      cy.get(`[data-cy="netBookValueDate"]`).type('2021-03-22').blur().should('have.value', '2021-03-22');

      cy.get(`[data-cy="assetCategory"]`).type('Ghana Granite').should('have.value', 'Ghana Granite');

      cy.get(`[data-cy="netBookValue"]`).type('15739').should('have.value', '15739');

      cy.get(`[data-cy="depreciationRegime"]`).select('DECLINING_BALANCE_BASIS');

      cy.get(`[data-cy="fileUploadToken"]`).type('static Fantastic').should('have.value', 'static Fantastic');

      cy.get(`[data-cy="compilationToken"]`).type('Refined').should('have.value', 'Refined');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        fixedAssetNetBookValue = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', fixedAssetNetBookValuePageUrlPattern);
    });
  });
});
