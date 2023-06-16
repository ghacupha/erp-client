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

describe('QuestionBase e2e test', () => {
  const questionBasePageUrl = '/question-base';
  const questionBasePageUrlPattern = new RegExp('/question-base(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const questionBaseSample = {
    context: 'Ergonomic',
    serial: 'edc05720-79db-4de2-8c90-aad3f64777bf',
    questionBaseKey: 'Market',
    questionBaseLabel: 'Customer-focused intuitive',
    order: 67685,
    controlType: 'DATE',
  };

  let questionBase;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/question-bases+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/question-bases').as('postEntityRequest');
    cy.intercept('DELETE', '/api/question-bases/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (questionBase) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/question-bases/${questionBase.id}`,
      }).then(() => {
        questionBase = undefined;
      });
    }
  });

  it('QuestionBases menu should load QuestionBases page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('question-base');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('QuestionBase').should('exist');
    cy.url().should('match', questionBasePageUrlPattern);
  });

  describe('QuestionBase page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(questionBasePageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create QuestionBase page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/question-base/new$'));
        cy.getEntityCreateUpdateHeading('QuestionBase');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', questionBasePageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/question-bases',
          body: questionBaseSample,
        }).then(({ body }) => {
          questionBase = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/question-bases+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/question-bases?page=0&size=20>; rel="last",<http://localhost/api/question-bases?page=0&size=20>; rel="first"',
              },
              body: [questionBase],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(questionBasePageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details QuestionBase page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('questionBase');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', questionBasePageUrlPattern);
      });

      it('edit button click should load edit QuestionBase page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('QuestionBase');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', questionBasePageUrlPattern);
      });

      it.skip('edit button click should load edit QuestionBase page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('QuestionBase');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', questionBasePageUrlPattern);
      });

      it('last delete button click should delete instance of QuestionBase', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('questionBase').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', questionBasePageUrlPattern);

        questionBase = undefined;
      });
    });
  });

  describe('new QuestionBase page', () => {
    beforeEach(() => {
      cy.visit(`${questionBasePageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('QuestionBase');
    });

    it('should create an instance of QuestionBase', () => {
      cy.get(`[data-cy="context"]`).type('AI').should('have.value', 'AI');

      cy.get(`[data-cy="serial"]`)
        .type('513e0859-b9e5-475b-a7cd-e54f65dcee32')
        .invoke('val')
        .should('match', new RegExp('513e0859-b9e5-475b-a7cd-e54f65dcee32'));

      cy.get(`[data-cy="questionBaseValue"]`).type('Grocery').should('have.value', 'Grocery');

      cy.get(`[data-cy="questionBaseKey"]`).type('generate Mexico').should('have.value', 'generate Mexico');

      cy.get(`[data-cy="questionBaseLabel"]`).type('withdrawal Salad Regional').should('have.value', 'withdrawal Salad Regional');

      cy.get(`[data-cy="required"]`).should('not.be.checked');
      cy.get(`[data-cy="required"]`).click().should('be.checked');

      cy.get(`[data-cy="order"]`).type('63044').should('have.value', '63044');

      cy.get(`[data-cy="controlType"]`).select('MONTH');

      cy.get(`[data-cy="placeholder"]`).type('payment olive parse').should('have.value', 'payment olive parse');

      cy.get(`[data-cy="iterable"]`).should('not.be.checked');
      cy.get(`[data-cy="iterable"]`).click().should('be.checked');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        questionBase = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', questionBasePageUrlPattern);
    });
  });
});
