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

describe('PrepaymentMapping e2e test', () => {
  const prepaymentMappingPageUrl = '/prepayment-mapping';
  const prepaymentMappingPageUrlPattern = new RegExp('/prepayment-mapping(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const prepaymentMappingSample = {
    parameterKey: 'help-desk',
    parameterGuid: '5796d973-1460-49a9-b0cb-0c032e83c64e',
    parameter: 'Facilitator',
  };

  let prepaymentMapping;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/prepayment-mappings+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/prepayment-mappings').as('postEntityRequest');
    cy.intercept('DELETE', '/api/prepayment-mappings/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (prepaymentMapping) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/prepayment-mappings/${prepaymentMapping.id}`,
      }).then(() => {
        prepaymentMapping = undefined;
      });
    }
  });

  it('PrepaymentMappings menu should load PrepaymentMappings page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('prepayment-mapping');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('PrepaymentMapping').should('exist');
    cy.url().should('match', prepaymentMappingPageUrlPattern);
  });

  describe('PrepaymentMapping page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(prepaymentMappingPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create PrepaymentMapping page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/prepayment-mapping/new$'));
        cy.getEntityCreateUpdateHeading('PrepaymentMapping');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', prepaymentMappingPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/prepayment-mappings',
          body: prepaymentMappingSample,
        }).then(({ body }) => {
          prepaymentMapping = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/prepayment-mappings+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/prepayment-mappings?page=0&size=20>; rel="last",<http://localhost/api/prepayment-mappings?page=0&size=20>; rel="first"',
              },
              body: [prepaymentMapping],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(prepaymentMappingPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details PrepaymentMapping page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('prepaymentMapping');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', prepaymentMappingPageUrlPattern);
      });

      it('edit button click should load edit PrepaymentMapping page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('PrepaymentMapping');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', prepaymentMappingPageUrlPattern);
      });

      it.skip('edit button click should load edit PrepaymentMapping page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('PrepaymentMapping');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', prepaymentMappingPageUrlPattern);
      });

      it('last delete button click should delete instance of PrepaymentMapping', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('prepaymentMapping').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', prepaymentMappingPageUrlPattern);

        prepaymentMapping = undefined;
      });
    });
  });

  describe('new PrepaymentMapping page', () => {
    beforeEach(() => {
      cy.visit(`${prepaymentMappingPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('PrepaymentMapping');
    });

    it('should create an instance of PrepaymentMapping', () => {
      cy.get(`[data-cy="parameterKey"]`).type('leverage').should('have.value', 'leverage');

      cy.get(`[data-cy="parameterGuid"]`)
        .type('11c72b40-9401-498e-876c-0bb988e80835')
        .invoke('val')
        .should('match', new RegExp('11c72b40-9401-498e-876c-0bb988e80835'));

      cy.get(`[data-cy="parameter"]`).type('line users').should('have.value', 'line users');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        prepaymentMapping = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', prepaymentMappingPageUrlPattern);
    });
  });
});
