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

describe('FixedAssetAcquisition e2e test', () => {
  const fixedAssetAcquisitionPageUrl = '/fixed-asset-acquisition';
  const fixedAssetAcquisitionPageUrlPattern = new RegExp('/fixed-asset-acquisition(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const fixedAssetAcquisitionSample = {};

  let fixedAssetAcquisition;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/services/erpservice/api/fixed-asset-acquisitions+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/services/erpservice/api/fixed-asset-acquisitions').as('postEntityRequest');
    cy.intercept('DELETE', '/services/erpservice/api/fixed-asset-acquisitions/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (fixedAssetAcquisition) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/services/erpservice/api/fixed-asset-acquisitions/${fixedAssetAcquisition.id}`,
      }).then(() => {
        fixedAssetAcquisition = undefined;
      });
    }
  });

  it('FixedAssetAcquisitions menu should load FixedAssetAcquisitions page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('fixed-asset-acquisition');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('FixedAssetAcquisition').should('exist');
    cy.url().should('match', fixedAssetAcquisitionPageUrlPattern);
  });

  describe('FixedAssetAcquisition page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(fixedAssetAcquisitionPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create FixedAssetAcquisition page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/fixed-asset-acquisition/new$'));
        cy.getEntityCreateUpdateHeading('FixedAssetAcquisition');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', fixedAssetAcquisitionPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/services/erpservice/api/fixed-asset-acquisitions',
          body: fixedAssetAcquisitionSample,
        }).then(({ body }) => {
          fixedAssetAcquisition = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/services/erpservice/api/fixed-asset-acquisitions+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/services/erpservice/api/fixed-asset-acquisitions?page=0&size=20>; rel="last",<http://localhost/services/erpservice/api/fixed-asset-acquisitions?page=0&size=20>; rel="first"',
              },
              body: [fixedAssetAcquisition],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(fixedAssetAcquisitionPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details FixedAssetAcquisition page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('fixedAssetAcquisition');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', fixedAssetAcquisitionPageUrlPattern);
      });

      it('edit button click should load edit FixedAssetAcquisition page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('FixedAssetAcquisition');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', fixedAssetAcquisitionPageUrlPattern);
      });

      it.skip('edit button click should load edit FixedAssetAcquisition page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('FixedAssetAcquisition');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', fixedAssetAcquisitionPageUrlPattern);
      });

      it('last delete button click should delete instance of FixedAssetAcquisition', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('fixedAssetAcquisition').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', fixedAssetAcquisitionPageUrlPattern);

        fixedAssetAcquisition = undefined;
      });
    });
  });

  describe('new FixedAssetAcquisition page', () => {
    beforeEach(() => {
      cy.visit(`${fixedAssetAcquisitionPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('FixedAssetAcquisition');
    });

    it('should create an instance of FixedAssetAcquisition', () => {
      cy.get(`[data-cy="assetNumber"]`).type('40629').should('have.value', '40629');

      cy.get(`[data-cy="serviceOutletCode"]`).type('Fresh Ergonomic').should('have.value', 'Fresh Ergonomic');

      cy.get(`[data-cy="assetTag"]`).type('Pizza').should('have.value', 'Pizza');

      cy.get(`[data-cy="assetDescription"]`).type('Accounts vertical frictionless').should('have.value', 'Accounts vertical frictionless');

      cy.get(`[data-cy="purchaseDate"]`).type('2021-03-23').blur().should('have.value', '2021-03-23');

      cy.get(`[data-cy="assetCategory"]`).type('Metrics maximize Research').should('have.value', 'Metrics maximize Research');

      cy.get(`[data-cy="purchasePrice"]`).type('51642').should('have.value', '51642');

      cy.get(`[data-cy="fileUploadToken"]`).type('Computer').should('have.value', 'Computer');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        fixedAssetAcquisition = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', fixedAssetAcquisitionPageUrlPattern);
    });
  });
});
