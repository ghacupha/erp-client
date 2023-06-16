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

describe('TaxRule e2e test', () => {
  const taxRulePageUrl = '/tax-rule';
  const taxRulePageUrlPattern = new RegExp('/tax-rule(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const taxRuleSample = {};

  let taxRule;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/services/erpservice/api/tax-rules+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/services/erpservice/api/tax-rules').as('postEntityRequest');
    cy.intercept('DELETE', '/services/erpservice/api/tax-rules/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (taxRule) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/services/erpservice/api/tax-rules/${taxRule.id}`,
      }).then(() => {
        taxRule = undefined;
      });
    }
  });

  it('TaxRules menu should load TaxRules page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('tax-rule');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('TaxRule').should('exist');
    cy.url().should('match', taxRulePageUrlPattern);
  });

  describe('TaxRule page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(taxRulePageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create TaxRule page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/tax-rule/new$'));
        cy.getEntityCreateUpdateHeading('TaxRule');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', taxRulePageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/services/erpservice/api/tax-rules',
          body: taxRuleSample,
        }).then(({ body }) => {
          taxRule = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/services/erpservice/api/tax-rules+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/services/erpservice/api/tax-rules?page=0&size=20>; rel="last",<http://localhost/services/erpservice/api/tax-rules?page=0&size=20>; rel="first"',
              },
              body: [taxRule],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(taxRulePageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details TaxRule page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('taxRule');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', taxRulePageUrlPattern);
      });

      it('edit button click should load edit TaxRule page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('TaxRule');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', taxRulePageUrlPattern);
      });

      it.skip('edit button click should load edit TaxRule page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('TaxRule');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', taxRulePageUrlPattern);
      });

      it('last delete button click should delete instance of TaxRule', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('taxRule').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', taxRulePageUrlPattern);

        taxRule = undefined;
      });
    });
  });

  describe('new TaxRule page', () => {
    beforeEach(() => {
      cy.visit(`${taxRulePageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('TaxRule');
    });

    it('should create an instance of TaxRule', () => {
      cy.get(`[data-cy="telcoExciseDuty"]`).type('90530').should('have.value', '90530');

      cy.get(`[data-cy="valueAddedTax"]`).type('75900').should('have.value', '75900');

      cy.get(`[data-cy="withholdingVAT"]`).type('30523').should('have.value', '30523');

      cy.get(`[data-cy="withholdingTaxConsultancy"]`).type('41831').should('have.value', '41831');

      cy.get(`[data-cy="withholdingTaxRent"]`).type('12841').should('have.value', '12841');

      cy.get(`[data-cy="cateringLevy"]`).type('81369').should('have.value', '81369');

      cy.get(`[data-cy="serviceCharge"]`).type('21632').should('have.value', '21632');

      cy.get(`[data-cy="withholdingTaxImportedService"]`).type('59602').should('have.value', '59602');

      cy.get(`[data-cy="fileUploadToken"]`).type('Garden benchmark').should('have.value', 'Garden benchmark');

      cy.get(`[data-cy="compilationToken"]`).type('override AGP virtual').should('have.value', 'override AGP virtual');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        taxRule = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', taxRulePageUrlPattern);
    });
  });
});
