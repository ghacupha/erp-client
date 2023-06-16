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

describe('OutletType e2e test', () => {
  const outletTypePageUrl = '/outlet-type';
  const outletTypePageUrlPattern = new RegExp('/outlet-type(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const outletTypeSample = { outletTypeCode: 'Rapid optical web-enabled', outletType: 'multimedia portals PCI' };

  let outletType;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/outlet-types+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/outlet-types').as('postEntityRequest');
    cy.intercept('DELETE', '/api/outlet-types/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (outletType) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/outlet-types/${outletType.id}`,
      }).then(() => {
        outletType = undefined;
      });
    }
  });

  it('OutletTypes menu should load OutletTypes page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('outlet-type');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('OutletType').should('exist');
    cy.url().should('match', outletTypePageUrlPattern);
  });

  describe('OutletType page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(outletTypePageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create OutletType page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/outlet-type/new$'));
        cy.getEntityCreateUpdateHeading('OutletType');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', outletTypePageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/outlet-types',
          body: outletTypeSample,
        }).then(({ body }) => {
          outletType = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/outlet-types+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/outlet-types?page=0&size=20>; rel="last",<http://localhost/api/outlet-types?page=0&size=20>; rel="first"',
              },
              body: [outletType],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(outletTypePageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details OutletType page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('outletType');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', outletTypePageUrlPattern);
      });

      it('edit button click should load edit OutletType page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('OutletType');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', outletTypePageUrlPattern);
      });

      it.skip('edit button click should load edit OutletType page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('OutletType');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', outletTypePageUrlPattern);
      });

      it('last delete button click should delete instance of OutletType', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('outletType').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', outletTypePageUrlPattern);

        outletType = undefined;
      });
    });
  });

  describe('new OutletType page', () => {
    beforeEach(() => {
      cy.visit(`${outletTypePageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('OutletType');
    });

    it('should create an instance of OutletType', () => {
      cy.get(`[data-cy="outletTypeCode"]`).type('virtual').should('have.value', 'virtual');

      cy.get(`[data-cy="outletType"]`).type('SAS driver').should('have.value', 'SAS driver');

      cy.get(`[data-cy="outletTypeDetails"]`).type('Licensed').should('have.value', 'Licensed');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        outletType = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', outletTypePageUrlPattern);
    });
  });
});
