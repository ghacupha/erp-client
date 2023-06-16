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

describe('Dealer e2e test', () => {
  const dealerPageUrl = '/dealer';
  const dealerPageUrlPattern = new RegExp('/dealer(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const dealerSample = { dealerName: 'Buckinghamshire system-worthy' };

  let dealer;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/services/erpservice/api/dealers+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/services/erpservice/api/dealers').as('postEntityRequest');
    cy.intercept('DELETE', '/services/erpservice/api/dealers/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (dealer) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/services/erpservice/api/dealers/${dealer.id}`,
      }).then(() => {
        dealer = undefined;
      });
    }
  });

  it('Dealers menu should load Dealers page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('dealer');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Dealer').should('exist');
    cy.url().should('match', dealerPageUrlPattern);
  });

  describe('Dealer page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(dealerPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Dealer page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/dealer/new$'));
        cy.getEntityCreateUpdateHeading('Dealer');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', dealerPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/services/erpservice/api/dealers',
          body: dealerSample,
        }).then(({ body }) => {
          dealer = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/services/erpservice/api/dealers+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/services/erpservice/api/dealers?page=0&size=20>; rel="last",<http://localhost/services/erpservice/api/dealers?page=0&size=20>; rel="first"',
              },
              body: [dealer],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(dealerPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details Dealer page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('dealer');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', dealerPageUrlPattern);
      });

      it('edit button click should load edit Dealer page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Dealer');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', dealerPageUrlPattern);
      });

      it.skip('edit button click should load edit Dealer page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Dealer');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', dealerPageUrlPattern);
      });

      it('last delete button click should delete instance of Dealer', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('dealer').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', dealerPageUrlPattern);

        dealer = undefined;
      });
    });
  });

  describe('new Dealer page', () => {
    beforeEach(() => {
      cy.visit(`${dealerPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Dealer');
    });

    it('should create an instance of Dealer', () => {
      cy.get(`[data-cy="dealerName"]`).type('calculating Rubber Mobility').should('have.value', 'calculating Rubber Mobility');

      cy.get(`[data-cy="taxNumber"]`).type('Robust Dakota Robust').should('have.value', 'Robust Dakota Robust');

      cy.get(`[data-cy="identificationDocumentNumber"]`).type('Table Global').should('have.value', 'Table Global');

      cy.get(`[data-cy="organizationName"]`).type('Yen Won Intelligent').should('have.value', 'Yen Won Intelligent');

      cy.get(`[data-cy="department"]`).type('Chair').should('have.value', 'Chair');

      cy.get(`[data-cy="position"]`).type('haptic magenta Yuan').should('have.value', 'haptic magenta Yuan');

      cy.get(`[data-cy="postalAddress"]`).type('Business-focused Small').should('have.value', 'Business-focused Small');

      cy.get(`[data-cy="physicalAddress"]`).type('generate Nevada empower').should('have.value', 'generate Nevada empower');

      cy.get(`[data-cy="accountName"]`).type('Personal Loan Account').should('have.value', 'Personal Loan Account');

      cy.get(`[data-cy="accountNumber"]`).type('Ecuador calculating Internal').should('have.value', 'Ecuador calculating Internal');

      cy.get(`[data-cy="bankersName"]`).type('Quality Interactions Bedfordshire').should('have.value', 'Quality Interactions Bedfordshire');

      cy.get(`[data-cy="bankersBranch"]`).type('Account Wooden Rial').should('have.value', 'Account Wooden Rial');

      cy.get(`[data-cy="bankersSwiftCode"]`).type('Health Analyst').should('have.value', 'Health Analyst');

      cy.get(`[data-cy="fileUploadToken"]`).type('matrix rich').should('have.value', 'matrix rich');

      cy.get(`[data-cy="compilationToken"]`).type('program').should('have.value', 'program');

      cy.get(`[data-cy="remarks"]`)
        .type('../fake-data/blob/hipster.txt')
        .invoke('val')
        .should('match', new RegExp('../fake-data/blob/hipster.txt'));

      cy.get(`[data-cy="otherNames"]`).type('Towels neural-net').should('have.value', 'Towels neural-net');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        dealer = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', dealerPageUrlPattern);
    });
  });
});
