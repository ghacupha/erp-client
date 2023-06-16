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

describe('MfbBranchCode e2e test', () => {
  const mfbBranchCodePageUrl = '/mfb-branch-code';
  const mfbBranchCodePageUrlPattern = new RegExp('/mfb-branch-code(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const mfbBranchCodeSample = {};

  let mfbBranchCode;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/mfb-branch-codes+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/mfb-branch-codes').as('postEntityRequest');
    cy.intercept('DELETE', '/api/mfb-branch-codes/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (mfbBranchCode) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/mfb-branch-codes/${mfbBranchCode.id}`,
      }).then(() => {
        mfbBranchCode = undefined;
      });
    }
  });

  it('MfbBranchCodes menu should load MfbBranchCodes page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('mfb-branch-code');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('MfbBranchCode').should('exist');
    cy.url().should('match', mfbBranchCodePageUrlPattern);
  });

  describe('MfbBranchCode page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(mfbBranchCodePageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create MfbBranchCode page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/mfb-branch-code/new$'));
        cy.getEntityCreateUpdateHeading('MfbBranchCode');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', mfbBranchCodePageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/mfb-branch-codes',
          body: mfbBranchCodeSample,
        }).then(({ body }) => {
          mfbBranchCode = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/mfb-branch-codes+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/mfb-branch-codes?page=0&size=20>; rel="last",<http://localhost/api/mfb-branch-codes?page=0&size=20>; rel="first"',
              },
              body: [mfbBranchCode],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(mfbBranchCodePageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details MfbBranchCode page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('mfbBranchCode');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', mfbBranchCodePageUrlPattern);
      });

      it('edit button click should load edit MfbBranchCode page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('MfbBranchCode');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', mfbBranchCodePageUrlPattern);
      });

      it.skip('edit button click should load edit MfbBranchCode page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('MfbBranchCode');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', mfbBranchCodePageUrlPattern);
      });

      it('last delete button click should delete instance of MfbBranchCode', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('mfbBranchCode').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', mfbBranchCodePageUrlPattern);

        mfbBranchCode = undefined;
      });
    });
  });

  describe('new MfbBranchCode page', () => {
    beforeEach(() => {
      cy.visit(`${mfbBranchCodePageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('MfbBranchCode');
    });

    it('should create an instance of MfbBranchCode', () => {
      cy.get(`[data-cy="bankCode"]`).type('PCI 24/365').should('have.value', 'PCI 24/365');

      cy.get(`[data-cy="bankName"]`).type('Avon Electronics').should('have.value', 'Avon Electronics');

      cy.get(`[data-cy="branchCode"]`).type('Ruble Frozen').should('have.value', 'Ruble Frozen');

      cy.get(`[data-cy="branchName"]`).type('Account core optimal').should('have.value', 'Account core optimal');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        mfbBranchCode = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', mfbBranchCodePageUrlPattern);
    });
  });
});
