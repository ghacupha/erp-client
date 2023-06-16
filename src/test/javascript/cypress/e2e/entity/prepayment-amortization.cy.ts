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

describe('PrepaymentAmortization e2e test', () => {
  const prepaymentAmortizationPageUrl = '/prepayment-amortization';
  const prepaymentAmortizationPageUrlPattern = new RegExp('/prepayment-amortization(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const prepaymentAmortizationSample = {};

  let prepaymentAmortization;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/prepayment-amortizations+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/prepayment-amortizations').as('postEntityRequest');
    cy.intercept('DELETE', '/api/prepayment-amortizations/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (prepaymentAmortization) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/prepayment-amortizations/${prepaymentAmortization.id}`,
      }).then(() => {
        prepaymentAmortization = undefined;
      });
    }
  });

  it('PrepaymentAmortizations menu should load PrepaymentAmortizations page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('prepayment-amortization');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('PrepaymentAmortization').should('exist');
    cy.url().should('match', prepaymentAmortizationPageUrlPattern);
  });

  describe('PrepaymentAmortization page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(prepaymentAmortizationPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create PrepaymentAmortization page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/prepayment-amortization/new$'));
        cy.getEntityCreateUpdateHeading('PrepaymentAmortization');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', prepaymentAmortizationPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/prepayment-amortizations',
          body: prepaymentAmortizationSample,
        }).then(({ body }) => {
          prepaymentAmortization = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/prepayment-amortizations+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/prepayment-amortizations?page=0&size=20>; rel="last",<http://localhost/api/prepayment-amortizations?page=0&size=20>; rel="first"',
              },
              body: [prepaymentAmortization],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(prepaymentAmortizationPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details PrepaymentAmortization page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('prepaymentAmortization');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', prepaymentAmortizationPageUrlPattern);
      });

      it('edit button click should load edit PrepaymentAmortization page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('PrepaymentAmortization');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', prepaymentAmortizationPageUrlPattern);
      });

      it.skip('edit button click should load edit PrepaymentAmortization page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('PrepaymentAmortization');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', prepaymentAmortizationPageUrlPattern);
      });

      it('last delete button click should delete instance of PrepaymentAmortization', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('prepaymentAmortization').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', prepaymentAmortizationPageUrlPattern);

        prepaymentAmortization = undefined;
      });
    });
  });

  describe('new PrepaymentAmortization page', () => {
    beforeEach(() => {
      cy.visit(`${prepaymentAmortizationPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('PrepaymentAmortization');
    });

    it('should create an instance of PrepaymentAmortization', () => {
      cy.get(`[data-cy="description"]`).type('Borders Movies Hong').should('have.value', 'Borders Movies Hong');

      cy.get(`[data-cy="prepaymentPeriod"]`).type('2022-05-03').blur().should('have.value', '2022-05-03');

      cy.get(`[data-cy="prepaymentAmount"]`).type('99216').should('have.value', '99216');

      cy.get(`[data-cy="inactive"]`).should('not.be.checked');
      cy.get(`[data-cy="inactive"]`).click().should('be.checked');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        prepaymentAmortization = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', prepaymentAmortizationPageUrlPattern);
    });
  });
});
