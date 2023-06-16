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

describe('BusinessStamp e2e test', () => {
  const businessStampPageUrl = '/business-stamp';
  const businessStampPageUrlPattern = new RegExp('/business-stamp(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const businessStampSample = {};

  let businessStamp;
  let dealer;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    // create an instance at the required relationship entity:
    cy.authenticatedRequest({
      method: 'POST',
      url: '/api/dealers',
      body: {
        dealerName: 'magnetic portal',
        taxNumber: 'National Orchestrator',
        identificationDocumentNumber: 'Investment',
        organizationName: 'Buckinghamshire Directives Romania',
        department: 'platforms Accountability',
        position: 'National Gorgeous Unbranded',
        postalAddress: 'Ranch Auto',
        physicalAddress: 'Optimized Mauritius pixel',
        accountName: 'Savings Account',
        accountNumber: 'Grenada success',
        bankersName: 'Rial Director Executive',
        bankersBranch: 'markets',
        bankersSwiftCode: 'Account Market',
        fileUploadToken: 'open-source Realigned Small',
        compilationToken: 'virtual access',
        remarks: 'Li4vZmFrZS1kYXRhL2Jsb2IvaGlwc3Rlci50eHQ=',
        otherNames: 'Tuna',
      },
    }).then(({ body }) => {
      dealer = body;
    });
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/business-stamps+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/business-stamps').as('postEntityRequest');
    cy.intercept('DELETE', '/api/business-stamps/*').as('deleteEntityRequest');
  });

  beforeEach(() => {
    // Simulate relationships api for better performance and reproducibility.
    cy.intercept('GET', '/api/dealers', {
      statusCode: 200,
      body: [dealer],
    });

    cy.intercept('GET', '/api/placeholders', {
      statusCode: 200,
      body: [],
    });
  });

  afterEach(() => {
    if (businessStamp) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/business-stamps/${businessStamp.id}`,
      }).then(() => {
        businessStamp = undefined;
      });
    }
  });

  afterEach(() => {
    if (dealer) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/dealers/${dealer.id}`,
      }).then(() => {
        dealer = undefined;
      });
    }
  });

  it('BusinessStamps menu should load BusinessStamps page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('business-stamp');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('BusinessStamp').should('exist');
    cy.url().should('match', businessStampPageUrlPattern);
  });

  describe('BusinessStamp page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(businessStampPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create BusinessStamp page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/business-stamp/new$'));
        cy.getEntityCreateUpdateHeading('BusinessStamp');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', businessStampPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/business-stamps',
          body: {
            ...businessStampSample,
            stampHolder: dealer,
          },
        }).then(({ body }) => {
          businessStamp = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/business-stamps+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/business-stamps?page=0&size=20>; rel="last",<http://localhost/api/business-stamps?page=0&size=20>; rel="first"',
              },
              body: [businessStamp],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(businessStampPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details BusinessStamp page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('businessStamp');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', businessStampPageUrlPattern);
      });

      it('edit button click should load edit BusinessStamp page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('BusinessStamp');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', businessStampPageUrlPattern);
      });

      it.skip('edit button click should load edit BusinessStamp page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('BusinessStamp');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', businessStampPageUrlPattern);
      });

      it('last delete button click should delete instance of BusinessStamp', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('businessStamp').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', businessStampPageUrlPattern);

        businessStamp = undefined;
      });
    });
  });

  describe('new BusinessStamp page', () => {
    beforeEach(() => {
      cy.visit(`${businessStampPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('BusinessStamp');
    });

    it('should create an instance of BusinessStamp', () => {
      cy.get(`[data-cy="stampDate"]`).type('2022-03-02').blur().should('have.value', '2022-03-02');

      cy.get(`[data-cy="purpose"]`).type('Movies Generic').should('have.value', 'Movies Generic');

      cy.get(`[data-cy="details"]`).type('Soft Program Accounts').should('have.value', 'Soft Program Accounts');

      cy.get(`[data-cy="remarks"]`)
        .type('../fake-data/blob/hipster.txt')
        .invoke('val')
        .should('match', new RegExp('../fake-data/blob/hipster.txt'));

      cy.get(`[data-cy="stampHolder"]`).select(1);

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        businessStamp = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', businessStampPageUrlPattern);
    });
  });
});
