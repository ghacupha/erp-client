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

describe('ApplicationUser e2e test', () => {
  const applicationUserPageUrl = '/application-user';
  const applicationUserPageUrlPattern = new RegExp('/application-user(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  // const applicationUserSample = {"designation":"1c626a03-d160-48a2-abcd-3020e380d257","applicationIdentity":"Ergonomic static niches"};

  let applicationUser;
  // let dealer;
  // let securityClearance;
  // let user;

  beforeEach(() => {
    cy.login(username, password);
  });

  /* Disabled due to incompatibility
  beforeEach(() => {
    // create an instance at the required relationship entity:
    cy.authenticatedRequest({
      method: 'POST',
      url: '/api/dealers',
      body: {"dealerName":"Usability Wooden","taxNumber":"Tasty Towels Keyboard","identificationDocumentNumber":"action-items","organizationName":"Clothing Tactics","department":"Grocery","position":"Intelligent","postalAddress":"Points Berkshire","physicalAddress":"Markets content","accountName":"Auto Loan Account","accountNumber":"Utah","bankersName":"synergies Health","bankersBranch":"Armenia Frozen Music","bankersSwiftCode":"Gorgeous Markets Pizza","fileUploadToken":"Clothing","compilationToken":"navigate Keyboard Slovenia","remarks":"Li4vZmFrZS1kYXRhL2Jsb2IvaGlwc3Rlci50eHQ=","otherNames":"Designer Plastic"},
    }).then(({ body }) => {
      dealer = body;
    });
    // create an instance at the required relationship entity:
    cy.authenticatedRequest({
      method: 'POST',
      url: '/api/security-clearances',
      body: {"clearanceLevel":"sexy Integration PCI"},
    }).then(({ body }) => {
      securityClearance = body;
    });
    // create an instance at the required relationship entity:
    cy.authenticatedRequest({
      method: 'POST',
      url: '/api/users',
      body: {"login":"orchestrate Assistant copying","firstName":"Johnpaul","lastName":"Thiel"},
    }).then(({ body }) => {
      user = body;
    });
  });
   */

  beforeEach(() => {
    cy.intercept('GET', '/api/application-users+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/application-users').as('postEntityRequest');
    cy.intercept('DELETE', '/api/application-users/*').as('deleteEntityRequest');
  });

  /* Disabled due to incompatibility
  beforeEach(() => {
    // Simulate relationships api for better performance and reproducibility.
    cy.intercept('GET', '/api/dealers', {
      statusCode: 200,
      body: [dealer],
    });

    cy.intercept('GET', '/api/security-clearances', {
      statusCode: 200,
      body: [securityClearance],
    });

    cy.intercept('GET', '/api/users', {
      statusCode: 200,
      body: [user],
    });

    cy.intercept('GET', '/api/universally-unique-mappings', {
      statusCode: 200,
      body: [],
    });

  });
   */

  afterEach(() => {
    if (applicationUser) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/application-users/${applicationUser.id}`,
      }).then(() => {
        applicationUser = undefined;
      });
    }
  });

  /* Disabled due to incompatibility
  afterEach(() => {
    if (dealer) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/dealers/${dealer.id}`,
      }).then(() => {
        dealer = undefined;
      });
    }
    if (securityClearance) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/security-clearances/${securityClearance.id}`,
      }).then(() => {
        securityClearance = undefined;
      });
    }
    if (user) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/users/${user.id}`,
      }).then(() => {
        user = undefined;
      });
    }
  });
   */

  it('ApplicationUsers menu should load ApplicationUsers page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('application-user');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('ApplicationUser').should('exist');
    cy.url().should('match', applicationUserPageUrlPattern);
  });

  describe('ApplicationUser page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(applicationUserPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create ApplicationUser page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/application-user/new$'));
        cy.getEntityCreateUpdateHeading('ApplicationUser');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', applicationUserPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      /* Disabled due to incompatibility
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/application-users',
          body: {
            ...applicationUserSample,
            organization: dealer,
            department: dealer,
            securityClearance: securityClearance,
            systemIdentity: user,
            dealerIdentity: dealer,
          },
        }).then(({ body }) => {
          applicationUser = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/application-users+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/application-users?page=0&size=20>; rel="last",<http://localhost/api/application-users?page=0&size=20>; rel="first"',
              },
              body: [applicationUser],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(applicationUserPageUrl);

        cy.wait('@entitiesRequestInternal');
      });
       */

      beforeEach(function () {
        cy.visit(applicationUserPageUrl);

        cy.wait('@entitiesRequest').then(({ response }) => {
          if (response.body.length === 0) {
            this.skip();
          }
        });
      });

      it('detail button click should load details ApplicationUser page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('applicationUser');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', applicationUserPageUrlPattern);
      });

      it('edit button click should load edit ApplicationUser page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('ApplicationUser');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', applicationUserPageUrlPattern);
      });

      it.skip('edit button click should load edit ApplicationUser page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('ApplicationUser');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', applicationUserPageUrlPattern);
      });

      it.skip('last delete button click should delete instance of ApplicationUser', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('applicationUser').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', applicationUserPageUrlPattern);

        applicationUser = undefined;
      });
    });
  });

  describe('new ApplicationUser page', () => {
    beforeEach(() => {
      cy.visit(`${applicationUserPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('ApplicationUser');
    });

    it.skip('should create an instance of ApplicationUser', () => {
      cy.get(`[data-cy="designation"]`)
        .type('38b313a0-fd40-48e5-8bb1-5902ac837ca1')
        .invoke('val')
        .should('match', new RegExp('38b313a0-fd40-48e5-8bb1-5902ac837ca1'));

      cy.get(`[data-cy="applicationIdentity"]`).type('THX Analyst support').should('have.value', 'THX Analyst support');

      cy.get(`[data-cy="organization"]`).select(1);
      cy.get(`[data-cy="department"]`).select(1);
      cy.get(`[data-cy="securityClearance"]`).select(1);
      cy.get(`[data-cy="systemIdentity"]`).select(1);
      cy.get(`[data-cy="dealerIdentity"]`).select(1);

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        applicationUser = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', applicationUserPageUrlPattern);
    });
  });
});
