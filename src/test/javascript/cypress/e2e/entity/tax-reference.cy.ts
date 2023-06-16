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

describe('TaxReference e2e test', () => {
  const taxReferencePageUrl = '/tax-reference';
  const taxReferencePageUrlPattern = new RegExp('/tax-reference(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const taxReferenceSample = { taxPercentage: 75987, taxReferenceType: 'VALUE_ADDED_TAX' };

  let taxReference;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/services/erpservice/api/tax-references+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/services/erpservice/api/tax-references').as('postEntityRequest');
    cy.intercept('DELETE', '/services/erpservice/api/tax-references/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (taxReference) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/services/erpservice/api/tax-references/${taxReference.id}`,
      }).then(() => {
        taxReference = undefined;
      });
    }
  });

  it('TaxReferences menu should load TaxReferences page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('tax-reference');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('TaxReference').should('exist');
    cy.url().should('match', taxReferencePageUrlPattern);
  });

  describe('TaxReference page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(taxReferencePageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create TaxReference page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/tax-reference/new$'));
        cy.getEntityCreateUpdateHeading('TaxReference');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', taxReferencePageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/services/erpservice/api/tax-references',
          body: taxReferenceSample,
        }).then(({ body }) => {
          taxReference = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/services/erpservice/api/tax-references+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/services/erpservice/api/tax-references?page=0&size=20>; rel="last",<http://localhost/services/erpservice/api/tax-references?page=0&size=20>; rel="first"',
              },
              body: [taxReference],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(taxReferencePageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details TaxReference page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('taxReference');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', taxReferencePageUrlPattern);
      });

      it('edit button click should load edit TaxReference page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('TaxReference');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', taxReferencePageUrlPattern);
      });

      it.skip('edit button click should load edit TaxReference page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('TaxReference');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', taxReferencePageUrlPattern);
      });

      it('last delete button click should delete instance of TaxReference', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('taxReference').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', taxReferencePageUrlPattern);

        taxReference = undefined;
      });
    });
  });

  describe('new TaxReference page', () => {
    beforeEach(() => {
      cy.visit(`${taxReferencePageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('TaxReference');
    });

    it('should create an instance of TaxReference', () => {
      cy.get(`[data-cy="taxName"]`).type('Planner').should('have.value', 'Planner');

      cy.get(`[data-cy="taxDescription"]`).type('action-items Director').should('have.value', 'action-items Director');

      cy.get(`[data-cy="taxPercentage"]`).type('17488').should('have.value', '17488');

      cy.get(`[data-cy="taxReferenceType"]`).select('SERVICE_CHARGE');

      cy.get(`[data-cy="fileUploadToken"]`).type('withdrawal Chair SCSI').should('have.value', 'withdrawal Chair SCSI');

      cy.get(`[data-cy="compilationToken"]`).type('optimizing').should('have.value', 'optimizing');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        taxReference = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', taxReferencePageUrlPattern);
    });
  });
});
