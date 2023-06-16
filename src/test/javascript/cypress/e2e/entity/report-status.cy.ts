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

describe('ReportStatus e2e test', () => {
  const reportStatusPageUrl = '/report-status';
  const reportStatusPageUrlPattern = new RegExp('/report-status(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const reportStatusSample = { reportName: 'Way Berkshire', reportId: '64c34d37-dc22-44d3-b7d1-772a3d43cf33' };

  let reportStatus;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/report-statuses+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/report-statuses').as('postEntityRequest');
    cy.intercept('DELETE', '/api/report-statuses/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (reportStatus) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/report-statuses/${reportStatus.id}`,
      }).then(() => {
        reportStatus = undefined;
      });
    }
  });

  it('ReportStatuses menu should load ReportStatuses page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('report-status');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('ReportStatus').should('exist');
    cy.url().should('match', reportStatusPageUrlPattern);
  });

  describe('ReportStatus page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(reportStatusPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create ReportStatus page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/report-status/new$'));
        cy.getEntityCreateUpdateHeading('ReportStatus');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', reportStatusPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/report-statuses',
          body: reportStatusSample,
        }).then(({ body }) => {
          reportStatus = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/report-statuses+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/report-statuses?page=0&size=20>; rel="last",<http://localhost/api/report-statuses?page=0&size=20>; rel="first"',
              },
              body: [reportStatus],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(reportStatusPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details ReportStatus page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('reportStatus');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', reportStatusPageUrlPattern);
      });

      it('edit button click should load edit ReportStatus page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('ReportStatus');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', reportStatusPageUrlPattern);
      });

      it.skip('edit button click should load edit ReportStatus page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('ReportStatus');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', reportStatusPageUrlPattern);
      });

      it('last delete button click should delete instance of ReportStatus', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('reportStatus').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', reportStatusPageUrlPattern);

        reportStatus = undefined;
      });
    });
  });

  describe('new ReportStatus page', () => {
    beforeEach(() => {
      cy.visit(`${reportStatusPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('ReportStatus');
    });

    it('should create an instance of ReportStatus', () => {
      cy.get(`[data-cy="reportName"]`).type('global').should('have.value', 'global');

      cy.get(`[data-cy="reportId"]`)
        .type('754b6f64-e4ab-4537-a902-c1435511f49e')
        .invoke('val')
        .should('match', new RegExp('754b6f64-e4ab-4537-a902-c1435511f49e'));

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        reportStatus = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', reportStatusPageUrlPattern);
    });
  });
});
