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

describe('MessageToken e2e test', () => {
  const messageTokenPageUrl = '/message-token';
  const messageTokenPageUrlPattern = new RegExp('/message-token(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const messageTokenSample = { timeSent: 93268, tokenValue: 'Tuna' };

  let messageToken;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/services/erpservice/api/message-tokens+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/services/erpservice/api/message-tokens').as('postEntityRequest');
    cy.intercept('DELETE', '/services/erpservice/api/message-tokens/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (messageToken) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/services/erpservice/api/message-tokens/${messageToken.id}`,
      }).then(() => {
        messageToken = undefined;
      });
    }
  });

  it('MessageTokens menu should load MessageTokens page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('message-token');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('MessageToken').should('exist');
    cy.url().should('match', messageTokenPageUrlPattern);
  });

  describe('MessageToken page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(messageTokenPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create MessageToken page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/message-token/new$'));
        cy.getEntityCreateUpdateHeading('MessageToken');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', messageTokenPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/services/erpservice/api/message-tokens',
          body: messageTokenSample,
        }).then(({ body }) => {
          messageToken = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/services/erpservice/api/message-tokens+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/services/erpservice/api/message-tokens?page=0&size=20>; rel="last",<http://localhost/services/erpservice/api/message-tokens?page=0&size=20>; rel="first"',
              },
              body: [messageToken],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(messageTokenPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details MessageToken page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('messageToken');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', messageTokenPageUrlPattern);
      });

      it('edit button click should load edit MessageToken page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('MessageToken');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', messageTokenPageUrlPattern);
      });

      it.skip('edit button click should load edit MessageToken page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('MessageToken');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', messageTokenPageUrlPattern);
      });

      it('last delete button click should delete instance of MessageToken', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('messageToken').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', messageTokenPageUrlPattern);

        messageToken = undefined;
      });
    });
  });

  describe('new MessageToken page', () => {
    beforeEach(() => {
      cy.visit(`${messageTokenPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('MessageToken');
    });

    it('should create an instance of MessageToken', () => {
      cy.get(`[data-cy="description"]`).type('Creative Rustic').should('have.value', 'Creative Rustic');

      cy.get(`[data-cy="timeSent"]`).type('81292').should('have.value', '81292');

      cy.get(`[data-cy="tokenValue"]`).type('well-modulated Stravenue BCEAO').should('have.value', 'well-modulated Stravenue BCEAO');

      cy.get(`[data-cy="received"]`).should('not.be.checked');
      cy.get(`[data-cy="received"]`).click().should('be.checked');

      cy.get(`[data-cy="actioned"]`).should('not.be.checked');
      cy.get(`[data-cy="actioned"]`).click().should('be.checked');

      cy.get(`[data-cy="contentFullyEnqueued"]`).should('not.be.checked');
      cy.get(`[data-cy="contentFullyEnqueued"]`).click().should('be.checked');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        messageToken = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', messageTokenPageUrlPattern);
    });
  });
});
