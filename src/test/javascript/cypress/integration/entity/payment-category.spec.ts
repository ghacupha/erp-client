import { entityItemSelector } from '../../support/commands';
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
  const username = Cypress.env('E2E_USERNAME') ?? 'admin';
  const password = Cypress.env('E2E_PASSWORD') ?? 'admin';
  const paymentCategorySample = { categoryName: 'Central Table calculate', categoryType: 'CATEGORY9' };

  let paymentCategory: any;

  before(() => {
    cy.window().then(win => {
      win.sessionStorage.clear();
    });
    cy.visit('');
    cy.login(username, password);
    cy.get(entityItemSelector).should('exist');
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/payment-categories+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/payment-categories').as('postEntityRequest');
    cy.intercept('DELETE', '/api/payment-categories/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (paymentCategory) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/payment-categories/${paymentCategory.id}`,
      }).then(() => {
        paymentCategory = undefined;
      });
    }
  });

  it('PaymentCategories menu should load PaymentCategories page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('payment-category');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response!.body.length === 0) {
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
        cy.get(entityCreateButtonSelector).click({ force: true });
        cy.url().should('match', new RegExp('/payment-category/new$'));
        cy.getEntityCreateUpdateHeading('PaymentCategory');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click({ force: true });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', paymentCategoryPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/payment-categories',
          body: paymentCategorySample,
        }).then(({ body }) => {
          paymentCategory = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/payment-categories+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
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
        cy.get(entityDetailsBackButtonSelector).click({ force: true });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', paymentCategoryPageUrlPattern);
      });

      it('edit button click should load edit PaymentCategory page', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('PaymentCategory');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click({ force: true });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', paymentCategoryPageUrlPattern);
      });

      it('last delete button click should delete instance of PaymentCategory', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('paymentCategory').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click({ force: true });
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', paymentCategoryPageUrlPattern);

        paymentCategory = undefined;
      });
    });
  });

  describe('new PaymentCategory page', () => {
    beforeEach(() => {
      cy.visit(`${paymentCategoryPageUrl}`);
      cy.get(entityCreateButtonSelector).click({ force: true });
      cy.getEntityCreateUpdateHeading('PaymentCategory');
    });

    it('should create an instance of PaymentCategory', () => {
      cy.get(`[data-cy="categoryName"]`).type('Cambridgeshire Forward').should('have.value', 'Cambridgeshire Forward');

      cy.get(`[data-cy="categoryDescription"]`).type('AI').should('have.value', 'AI');

      cy.get(`[data-cy="categoryType"]`).select('CATEGORY2');

      cy.get(`[data-cy="fileUploadToken"]`).type('incentivize').should('have.value', 'incentivize');

      cy.get(`[data-cy="compilationToken"]`).type('index').should('have.value', 'index');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        paymentCategory = response!.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should('match', paymentCategoryPageUrlPattern);
    });
  });
});
