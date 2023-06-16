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

describe('StringQuestionBase e2e test', () => {
  const stringQuestionBasePageUrl = '/string-question-base';
  const stringQuestionBasePageUrlPattern = new RegExp('/string-question-base(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const stringQuestionBaseSample = { key: 'Associate Texas', label: 'driver AI e-commerce', order: 20232, controlType: 'DATETIME_LOCAL' };

  let stringQuestionBase;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/string-question-bases+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/string-question-bases').as('postEntityRequest');
    cy.intercept('DELETE', '/api/string-question-bases/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (stringQuestionBase) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/string-question-bases/${stringQuestionBase.id}`,
      }).then(() => {
        stringQuestionBase = undefined;
      });
    }
  });

  it('StringQuestionBases menu should load StringQuestionBases page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('string-question-base');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('StringQuestionBase').should('exist');
    cy.url().should('match', stringQuestionBasePageUrlPattern);
  });

  describe('StringQuestionBase page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(stringQuestionBasePageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create StringQuestionBase page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/string-question-base/new$'));
        cy.getEntityCreateUpdateHeading('StringQuestionBase');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', stringQuestionBasePageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/string-question-bases',
          body: stringQuestionBaseSample,
        }).then(({ body }) => {
          stringQuestionBase = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/string-question-bases+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/string-question-bases?page=0&size=20>; rel="last",<http://localhost/api/string-question-bases?page=0&size=20>; rel="first"',
              },
              body: [stringQuestionBase],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(stringQuestionBasePageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details StringQuestionBase page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('stringQuestionBase');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', stringQuestionBasePageUrlPattern);
      });

      it('edit button click should load edit StringQuestionBase page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('StringQuestionBase');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', stringQuestionBasePageUrlPattern);
      });

      it('edit button click should load edit StringQuestionBase page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('StringQuestionBase');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', stringQuestionBasePageUrlPattern);
      });

      it('last delete button click should delete instance of StringQuestionBase', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('stringQuestionBase').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', stringQuestionBasePageUrlPattern);

        stringQuestionBase = undefined;
      });
    });
  });

  describe('new StringQuestionBase page', () => {
    beforeEach(() => {
      cy.visit(`${stringQuestionBasePageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('StringQuestionBase');
    });

    it('should create an instance of StringQuestionBase', () => {
      cy.get(`[data-cy="value"]`).type('Account redundant').should('have.value', 'Account redundant');

      cy.get(`[data-cy="key"]`).type('quantifying XML value-added').should('have.value', 'quantifying XML value-added');

      cy.get(`[data-cy="label"]`).type('reboot incremental').should('have.value', 'reboot incremental');

      cy.get(`[data-cy="required"]`).should('not.be.checked');
      cy.get(`[data-cy="required"]`).click().should('be.checked');

      cy.get(`[data-cy="order"]`).type('28912').should('have.value', '28912');

      cy.get(`[data-cy="controlType"]`).select('NUMBER');

      cy.get(`[data-cy="placeholder"]`).type('Kroon Corner').should('have.value', 'Kroon Corner');

      cy.get(`[data-cy="iterable"]`).should('not.be.checked');
      cy.get(`[data-cy="iterable"]`).click().should('be.checked');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        stringQuestionBase = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', stringQuestionBasePageUrlPattern);
    });
  });
});
