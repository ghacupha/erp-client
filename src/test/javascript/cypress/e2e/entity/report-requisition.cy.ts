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

describe('ReportRequisition e2e test', () => {
  const reportRequisitionPageUrl = '/report-requisition';
  const reportRequisitionPageUrlPattern = new RegExp('/report-requisition(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  // const reportRequisitionSample = {"reportName":"Pine","reportRequestTime":"2022-06-16T05:10:44.149Z","reportPassword":"black auxiliary","reportId":"e7a303be-3ddc-4ed8-9082-d6a8fde10370"};

  let reportRequisition;
  // let reportTemplate;
  // let reportContentType;

  beforeEach(() => {
    cy.login(username, password);
  });

  /* Disabled due to incompatibility
  beforeEach(() => {
    // create an instance at the required relationship entity:
    cy.authenticatedRequest({
      method: 'POST',
      url: '/api/report-templates',
      body: {"catalogueNumber":"Generic Savings","description":"Li4vZmFrZS1kYXRhL2Jsb2IvaGlwc3Rlci50eHQ=","notes":"Li4vZmFrZS1kYXRhL2Jsb2IvaGlwc3Rlci5wbmc=","notesContentType":"unknown","reportFile":"Li4vZmFrZS1kYXRhL2Jsb2IvaGlwc3Rlci5wbmc=","reportFileContentType":"unknown","compileReportFile":"Li4vZmFrZS1kYXRhL2Jsb2IvaGlwc3Rlci5wbmc=","compileReportFileContentType":"unknown"},
    }).then(({ body }) => {
      reportTemplate = body;
    });
    // create an instance at the required relationship entity:
    cy.authenticatedRequest({
      method: 'POST',
      url: '/api/report-content-types',
      body: {"reportTypeName":"Focused HDD Security","reportFileExtension":"group Books Internal"},
    }).then(({ body }) => {
      reportContentType = body;
    });
  });
   */

  beforeEach(() => {
    cy.intercept('GET', '/api/report-requisitions+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/report-requisitions').as('postEntityRequest');
    cy.intercept('DELETE', '/api/report-requisitions/*').as('deleteEntityRequest');
  });

  /* Disabled due to incompatibility
  beforeEach(() => {
    // Simulate relationships api for better performance and reproducibility.
    cy.intercept('GET', '/api/placeholders', {
      statusCode: 200,
      body: [],
    });

    cy.intercept('GET', '/api/universally-unique-mappings', {
      statusCode: 200,
      body: [],
    });

    cy.intercept('GET', '/api/report-templates', {
      statusCode: 200,
      body: [reportTemplate],
    });

    cy.intercept('GET', '/api/report-content-types', {
      statusCode: 200,
      body: [reportContentType],
    });

  });
   */

  afterEach(() => {
    if (reportRequisition) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/report-requisitions/${reportRequisition.id}`,
      }).then(() => {
        reportRequisition = undefined;
      });
    }
  });

  /* Disabled due to incompatibility
  afterEach(() => {
    if (reportTemplate) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/report-templates/${reportTemplate.id}`,
      }).then(() => {
        reportTemplate = undefined;
      });
    }
    if (reportContentType) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/report-content-types/${reportContentType.id}`,
      }).then(() => {
        reportContentType = undefined;
      });
    }
  });
   */

  it('ReportRequisitions menu should load ReportRequisitions page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('report-requisition');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('ReportRequisition').should('exist');
    cy.url().should('match', reportRequisitionPageUrlPattern);
  });

  describe('ReportRequisition page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(reportRequisitionPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create ReportRequisition page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/report-requisition/new$'));
        cy.getEntityCreateUpdateHeading('ReportRequisition');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', reportRequisitionPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      /* Disabled due to incompatibility
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/report-requisitions',
          body: {
            ...reportRequisitionSample,
            reportTemplate: reportTemplate,
            reportContentType: reportContentType,
          },
        }).then(({ body }) => {
          reportRequisition = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/report-requisitions+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/report-requisitions?page=0&size=20>; rel="last",<http://localhost/api/report-requisitions?page=0&size=20>; rel="first"',
              },
              body: [reportRequisition],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(reportRequisitionPageUrl);

        cy.wait('@entitiesRequestInternal');
      });
       */

      beforeEach(function () {
        cy.visit(reportRequisitionPageUrl);

        cy.wait('@entitiesRequest').then(({ response }) => {
          if (response.body.length === 0) {
            this.skip();
          }
        });
      });

      it('detail button click should load details ReportRequisition page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('reportRequisition');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', reportRequisitionPageUrlPattern);
      });

      it('edit button click should load edit ReportRequisition page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('ReportRequisition');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', reportRequisitionPageUrlPattern);
      });

      it.skip('edit button click should load edit ReportRequisition page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('ReportRequisition');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', reportRequisitionPageUrlPattern);
      });

      it.skip('last delete button click should delete instance of ReportRequisition', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('reportRequisition').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', reportRequisitionPageUrlPattern);

        reportRequisition = undefined;
      });
    });
  });

  describe('new ReportRequisition page', () => {
    beforeEach(() => {
      cy.visit(`${reportRequisitionPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('ReportRequisition');
    });

    it.skip('should create an instance of ReportRequisition', () => {
      cy.get(`[data-cy="reportName"]`).type('Accounts deposit').should('have.value', 'Accounts deposit');

      cy.get(`[data-cy="reportRequestTime"]`).type('2022-06-16T01:10').blur().should('have.value', '2022-06-16T01:10');

      cy.get(`[data-cy="reportPassword"]`).type('Passage').should('have.value', 'Passage');

      cy.get(`[data-cy="reportStatus"]`).select('SUCCESSFUL');

      cy.get(`[data-cy="reportId"]`)
        .type('5b6c27ee-cc29-49fb-bb30-6d4abf884b91')
        .invoke('val')
        .should('match', new RegExp('5b6c27ee-cc29-49fb-bb30-6d4abf884b91'));

      cy.setFieldImageAsBytesOfEntity('reportFileAttachment', 'integration-test.png', 'image/png');

      cy.get(`[data-cy="reportFileCheckSum"]`)
        .type('../fake-data/blob/hipster.txt')
        .invoke('val')
        .should('match', new RegExp('../fake-data/blob/hipster.txt'));

      cy.setFieldImageAsBytesOfEntity('reportNotes', 'integration-test.png', 'image/png');

      cy.get(`[data-cy="reportTemplate"]`).select(1);
      cy.get(`[data-cy="reportContentType"]`).select(1);

      // since cypress clicks submit too fast before the blob fields are validated
      cy.wait(200); // eslint-disable-line cypress/no-unnecessary-waiting
      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        reportRequisition = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', reportRequisitionPageUrlPattern);
    });
  });
});
