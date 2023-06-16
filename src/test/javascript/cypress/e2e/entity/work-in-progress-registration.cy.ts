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

describe('WorkInProgressRegistration e2e test', () => {
  const workInProgressRegistrationPageUrl = '/work-in-progress-registration';
  const workInProgressRegistrationPageUrlPattern = new RegExp('/work-in-progress-registration(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const workInProgressRegistrationSample = { sequenceNumber: 'generation monetize generate' };

  let workInProgressRegistration;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/work-in-progress-registrations+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/work-in-progress-registrations').as('postEntityRequest');
    cy.intercept('DELETE', '/api/work-in-progress-registrations/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (workInProgressRegistration) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/work-in-progress-registrations/${workInProgressRegistration.id}`,
      }).then(() => {
        workInProgressRegistration = undefined;
      });
    }
  });

  it('WorkInProgressRegistrations menu should load WorkInProgressRegistrations page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('work-in-progress-registration');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('WorkInProgressRegistration').should('exist');
    cy.url().should('match', workInProgressRegistrationPageUrlPattern);
  });

  describe('WorkInProgressRegistration page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(workInProgressRegistrationPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create WorkInProgressRegistration page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/work-in-progress-registration/new$'));
        cy.getEntityCreateUpdateHeading('WorkInProgressRegistration');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', workInProgressRegistrationPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/work-in-progress-registrations',
          body: workInProgressRegistrationSample,
        }).then(({ body }) => {
          workInProgressRegistration = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/work-in-progress-registrations+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/work-in-progress-registrations?page=0&size=20>; rel="last",<http://localhost/api/work-in-progress-registrations?page=0&size=20>; rel="first"',
              },
              body: [workInProgressRegistration],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(workInProgressRegistrationPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details WorkInProgressRegistration page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('workInProgressRegistration');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', workInProgressRegistrationPageUrlPattern);
      });

      it('edit button click should load edit WorkInProgressRegistration page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('WorkInProgressRegistration');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', workInProgressRegistrationPageUrlPattern);
      });

      it.skip('edit button click should load edit WorkInProgressRegistration page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('WorkInProgressRegistration');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', workInProgressRegistrationPageUrlPattern);
      });

      it('last delete button click should delete instance of WorkInProgressRegistration', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('workInProgressRegistration').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', workInProgressRegistrationPageUrlPattern);

        workInProgressRegistration = undefined;
      });
    });
  });

  describe('new WorkInProgressRegistration page', () => {
    beforeEach(() => {
      cy.visit(`${workInProgressRegistrationPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('WorkInProgressRegistration');
    });

    it('should create an instance of WorkInProgressRegistration', () => {
      cy.get(`[data-cy="sequenceNumber"]`).type('partnerships').should('have.value', 'partnerships');

      cy.get(`[data-cy="particulars"]`).type('Granite Grocery networks').should('have.value', 'Granite Grocery networks');

      cy.get(`[data-cy="instalmentAmount"]`).type('62297').should('have.value', '62297');

      cy.setFieldImageAsBytesOfEntity('comments', 'integration-test.png', 'image/png');

      // since cypress clicks submit too fast before the blob fields are validated
      cy.wait(200); // eslint-disable-line cypress/no-unnecessary-waiting
      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        workInProgressRegistration = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', workInProgressRegistrationPageUrlPattern);
    });
  });
});
