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

describe('WorkProjectRegister e2e test', () => {
  const workProjectRegisterPageUrl = '/work-project-register';
  const workProjectRegisterPageUrlPattern = new RegExp('/work-project-register(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const workProjectRegisterSample = { catalogueNumber: 'payment orchestration one-to-one', description: 'Rubber Guam Technician' };

  let workProjectRegister;
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
        dealerName: 'Bedfordshire Berkshire',
        taxNumber: 'CSS',
        identificationDocumentNumber: 'parsing Chief',
        organizationName: 'Cheese infrastructures',
        department: 'application moderator',
        position: 'Intelligent',
        postalAddress: 'Hat Intelligent',
        physicalAddress: 'Saint Personal',
        accountName: 'Savings Account',
        accountNumber: 'Awesome',
        bankersName: 'maximize US program',
        bankersBranch: 'Coordinator Incredible',
        bankersSwiftCode: 'Future-proofed',
        fileUploadToken: 'Licensed Mali',
        compilationToken: 'Glens',
        remarks: 'Li4vZmFrZS1kYXRhL2Jsb2IvaGlwc3Rlci50eHQ=',
        otherNames: 'Kids Shoes Account',
      },
    }).then(({ body }) => {
      dealer = body;
    });
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/work-project-registers+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/work-project-registers').as('postEntityRequest');
    cy.intercept('DELETE', '/api/work-project-registers/*').as('deleteEntityRequest');
  });

  beforeEach(() => {
    // Simulate relationships api for better performance and reproducibility.
    cy.intercept('GET', '/api/dealers', {
      statusCode: 200,
      body: [dealer],
    });

    cy.intercept('GET', '/api/settlement-currencies', {
      statusCode: 200,
      body: [],
    });

    cy.intercept('GET', '/api/placeholders', {
      statusCode: 200,
      body: [],
    });

    cy.intercept('GET', '/api/business-documents', {
      statusCode: 200,
      body: [],
    });
  });

  afterEach(() => {
    if (workProjectRegister) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/work-project-registers/${workProjectRegister.id}`,
      }).then(() => {
        workProjectRegister = undefined;
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

  it('WorkProjectRegisters menu should load WorkProjectRegisters page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('work-project-register');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('WorkProjectRegister').should('exist');
    cy.url().should('match', workProjectRegisterPageUrlPattern);
  });

  describe('WorkProjectRegister page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(workProjectRegisterPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create WorkProjectRegister page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/work-project-register/new$'));
        cy.getEntityCreateUpdateHeading('WorkProjectRegister');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', workProjectRegisterPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/work-project-registers',
          body: {
            ...workProjectRegisterSample,
            dealers: dealer,
          },
        }).then(({ body }) => {
          workProjectRegister = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/work-project-registers+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/work-project-registers?page=0&size=20>; rel="last",<http://localhost/api/work-project-registers?page=0&size=20>; rel="first"',
              },
              body: [workProjectRegister],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(workProjectRegisterPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details WorkProjectRegister page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('workProjectRegister');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', workProjectRegisterPageUrlPattern);
      });

      it('edit button click should load edit WorkProjectRegister page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('WorkProjectRegister');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', workProjectRegisterPageUrlPattern);
      });

      it.skip('edit button click should load edit WorkProjectRegister page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('WorkProjectRegister');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', workProjectRegisterPageUrlPattern);
      });

      it('last delete button click should delete instance of WorkProjectRegister', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('workProjectRegister').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', workProjectRegisterPageUrlPattern);

        workProjectRegister = undefined;
      });
    });
  });

  describe('new WorkProjectRegister page', () => {
    beforeEach(() => {
      cy.visit(`${workProjectRegisterPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('WorkProjectRegister');
    });

    it('should create an instance of WorkProjectRegister', () => {
      cy.get(`[data-cy="catalogueNumber"]`).type('Garden').should('have.value', 'Garden');

      cy.get(`[data-cy="description"]`).type('Vermont indexing').should('have.value', 'Vermont indexing');

      cy.setFieldImageAsBytesOfEntity('details', 'integration-test.png', 'image/png');

      cy.get(`[data-cy="totalProjectCost"]`).type('19384').should('have.value', '19384');

      cy.setFieldImageAsBytesOfEntity('additionalNotes', 'integration-test.png', 'image/png');

      cy.get(`[data-cy="dealers"]`).select([0]);

      // since cypress clicks submit too fast before the blob fields are validated
      cy.wait(200); // eslint-disable-line cypress/no-unnecessary-waiting
      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        workProjectRegister = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', workProjectRegisterPageUrlPattern);
    });
  });
});
