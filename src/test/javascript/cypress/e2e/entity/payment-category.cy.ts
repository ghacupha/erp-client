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

describe('PaymentCategory e2e test', () => {
  const paymentCategoryPageUrl = '/payment-category';
  const paymentCategoryPageUrlPattern = new RegExp('/payment-category(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const paymentCategorySample = { categoryName: 'enterprise tan programming', categoryType: 'CATEGORY11' };

  let paymentCategory;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/services/erpservice/api/payment-categories+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/services/erpservice/api/payment-categories').as('postEntityRequest');
    cy.intercept('DELETE', '/services/erpservice/api/payment-categories/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (paymentCategory) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/services/erpservice/api/payment-categories/${paymentCategory.id}`,
      }).then(() => {
        paymentCategory = undefined;
      });
    }
  });

  it('PaymentCategories menu should load PaymentCategories page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('payment-category');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('PaymentCategory').should('exist');
    cy.url().should('match', paymentCategoryPageUrlPattern);
  });

  describe('PaymentCategory page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(paymentCategoryPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create PaymentCategory page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/payment-category/new$'));
        cy.getEntityCreateUpdateHeading('PaymentCategory');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', paymentCategoryPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/services/erpservice/api/payment-categories',
          body: paymentCategorySample,
        }).then(({ body }) => {
          paymentCategory = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/services/erpservice/api/payment-categories+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/services/erpservice/api/payment-categories?page=0&size=20>; rel="last",<http://localhost/services/erpservice/api/payment-categories?page=0&size=20>; rel="first"',
              },
              body: [paymentCategory],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(paymentCategoryPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details PaymentCategory page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('paymentCategory');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', paymentCategoryPageUrlPattern);
      });

      it('edit button click should load edit PaymentCategory page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('PaymentCategory');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', paymentCategoryPageUrlPattern);
      });

      it.skip('edit button click should load edit PaymentCategory page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('PaymentCategory');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', paymentCategoryPageUrlPattern);
      });

      it('last delete button click should delete instance of PaymentCategory', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('paymentCategory').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', paymentCategoryPageUrlPattern);

        paymentCategory = undefined;
      });
    });
  });

  describe('new PaymentCategory page', () => {
    beforeEach(() => {
      cy.visit(`${paymentCategoryPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('PaymentCategory');
    });

    it('should create an instance of PaymentCategory', () => {
      cy.get(`[data-cy="categoryName"]`).type('Poland neural Account').should('have.value', 'Poland neural Account');

      cy.get(`[data-cy="categoryDescription"]`).type('Ruble Operations').should('have.value', 'Ruble Operations');

      cy.get(`[data-cy="categoryType"]`).select('CATEGORY0');

      cy.get(`[data-cy="fileUploadToken"]`).type('matrix Table Corner').should('have.value', 'matrix Table Corner');

      cy.get(`[data-cy="compilationToken"]`).type('Liaison').should('have.value', 'Liaison');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        paymentCategory = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', paymentCategoryPageUrlPattern);
    });
  });
});
