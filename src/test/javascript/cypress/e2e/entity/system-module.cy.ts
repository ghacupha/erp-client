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

describe('SystemModule e2e test', () => {
  const systemModulePageUrl = '/system-module';
  const systemModulePageUrlPattern = new RegExp('/system-module(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const systemModuleSample = { moduleName: 'hack multi-byte' };

  let systemModule;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/system-modules+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/system-modules').as('postEntityRequest');
    cy.intercept('DELETE', '/api/system-modules/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (systemModule) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/system-modules/${systemModule.id}`,
      }).then(() => {
        systemModule = undefined;
      });
    }
  });

  it('SystemModules menu should load SystemModules page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('system-module');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('SystemModule').should('exist');
    cy.url().should('match', systemModulePageUrlPattern);
  });

  describe('SystemModule page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(systemModulePageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create SystemModule page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/system-module/new$'));
        cy.getEntityCreateUpdateHeading('SystemModule');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', systemModulePageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/system-modules',
          body: systemModuleSample,
        }).then(({ body }) => {
          systemModule = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/system-modules+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/system-modules?page=0&size=20>; rel="last",<http://localhost/api/system-modules?page=0&size=20>; rel="first"',
              },
              body: [systemModule],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(systemModulePageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details SystemModule page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('systemModule');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', systemModulePageUrlPattern);
      });

      it('edit button click should load edit SystemModule page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('SystemModule');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', systemModulePageUrlPattern);
      });

      it.skip('edit button click should load edit SystemModule page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('SystemModule');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', systemModulePageUrlPattern);
      });

      it('last delete button click should delete instance of SystemModule', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('systemModule').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', systemModulePageUrlPattern);

        systemModule = undefined;
      });
    });
  });

  describe('new SystemModule page', () => {
    beforeEach(() => {
      cy.visit(`${systemModulePageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('SystemModule');
    });

    it('should create an instance of SystemModule', () => {
      cy.get(`[data-cy="moduleName"]`).type('Plastic').should('have.value', 'Plastic');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        systemModule = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', systemModulePageUrlPattern);
    });
  });
});
