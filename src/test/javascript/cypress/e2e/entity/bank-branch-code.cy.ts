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

describe('BankBranchCode e2e test', () => {
  const bankBranchCodePageUrl = '/bank-branch-code';
  const bankBranchCodePageUrlPattern = new RegExp('/bank-branch-code(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const bankBranchCodeSample = { bankName: 'intranet withdrawal Face' };

  let bankBranchCode;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/bank-branch-codes+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/bank-branch-codes').as('postEntityRequest');
    cy.intercept('DELETE', '/api/bank-branch-codes/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (bankBranchCode) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/bank-branch-codes/${bankBranchCode.id}`,
      }).then(() => {
        bankBranchCode = undefined;
      });
    }
  });

  it('BankBranchCodes menu should load BankBranchCodes page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('bank-branch-code');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('BankBranchCode').should('exist');
    cy.url().should('match', bankBranchCodePageUrlPattern);
  });

  describe('BankBranchCode page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(bankBranchCodePageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create BankBranchCode page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/bank-branch-code/new$'));
        cy.getEntityCreateUpdateHeading('BankBranchCode');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', bankBranchCodePageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/bank-branch-codes',
          body: bankBranchCodeSample,
        }).then(({ body }) => {
          bankBranchCode = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/bank-branch-codes+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/bank-branch-codes?page=0&size=20>; rel="last",<http://localhost/api/bank-branch-codes?page=0&size=20>; rel="first"',
              },
              body: [bankBranchCode],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(bankBranchCodePageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details BankBranchCode page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('bankBranchCode');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', bankBranchCodePageUrlPattern);
      });

      it('edit button click should load edit BankBranchCode page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('BankBranchCode');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', bankBranchCodePageUrlPattern);
      });

      it.skip('edit button click should load edit BankBranchCode page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('BankBranchCode');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', bankBranchCodePageUrlPattern);
      });

      it('last delete button click should delete instance of BankBranchCode', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('bankBranchCode').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', bankBranchCodePageUrlPattern);

        bankBranchCode = undefined;
      });
    });
  });

  describe('new BankBranchCode page', () => {
    beforeEach(() => {
      cy.visit(`${bankBranchCodePageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('BankBranchCode');
    });

    it('should create an instance of BankBranchCode', () => {
      cy.get(`[data-cy="bankCode"]`).type('Automotive generate Intelligent').should('have.value', 'Automotive generate Intelligent');

      cy.get(`[data-cy="bankName"]`).type('Health Nevada').should('have.value', 'Health Nevada');

      cy.get(`[data-cy="branchCode"]`).type('Minnesota Salad').should('have.value', 'Minnesota Salad');

      cy.get(`[data-cy="branchName"]`).type('Republic').should('have.value', 'Republic');

      cy.get(`[data-cy="notes"]`).type('Multi-tiered Right-sized Global').should('have.value', 'Multi-tiered Right-sized Global');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        bankBranchCode = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', bankBranchCodePageUrlPattern);
    });
  });
});
