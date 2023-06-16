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

describe('XlsxReportRequisition e2e test', () => {
  const xlsxReportRequisitionPageUrl = '/xlsx-report-requisition';
  const xlsxReportRequisitionPageUrlPattern = new RegExp('/xlsx-report-requisition(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const xlsxReportRequisitionSample = {
    reportName: 'Games Principal',
    userPassword: 'Supervisor Verde',
    reportId: '68dbce83-33f5-4f0d-9346-ab90448346dc',
  };

  let xlsxReportRequisition;
  let reportTemplate;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    // create an instance at the required relationship entity:
    cy.authenticatedRequest({
      method: 'POST',
      url: '/api/report-templates',
      body: {
        catalogueNumber: 'alarm',
        description: 'Li4vZmFrZS1kYXRhL2Jsb2IvaGlwc3Rlci50eHQ=',
        notes: 'Li4vZmFrZS1kYXRhL2Jsb2IvaGlwc3Rlci5wbmc=',
        notesContentType: 'unknown',
        reportFile: 'Li4vZmFrZS1kYXRhL2Jsb2IvaGlwc3Rlci5wbmc=',
        reportFileContentType: 'unknown',
        compileReportFile: 'Li4vZmFrZS1kYXRhL2Jsb2IvaGlwc3Rlci5wbmc=',
        compileReportFileContentType: 'unknown',
      },
    }).then(({ body }) => {
      reportTemplate = body;
    });
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/xlsx-report-requisitions+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/xlsx-report-requisitions').as('postEntityRequest');
    cy.intercept('DELETE', '/api/xlsx-report-requisitions/*').as('deleteEntityRequest');
  });

  beforeEach(() => {
    // Simulate relationships api for better performance and reproducibility.
    cy.intercept('GET', '/api/report-templates', {
      statusCode: 200,
      body: [reportTemplate],
    });

    cy.intercept('GET', '/api/placeholders', {
      statusCode: 200,
      body: [],
    });

    cy.intercept('GET', '/api/universally-unique-mappings', {
      statusCode: 200,
      body: [],
    });
  });

  afterEach(() => {
    if (xlsxReportRequisition) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/xlsx-report-requisitions/${xlsxReportRequisition.id}`,
      }).then(() => {
        xlsxReportRequisition = undefined;
      });
    }
  });

  afterEach(() => {
    if (reportTemplate) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/report-templates/${reportTemplate.id}`,
      }).then(() => {
        reportTemplate = undefined;
      });
    }
  });

  it('XlsxReportRequisitions menu should load XlsxReportRequisitions page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('xlsx-report-requisition');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('XlsxReportRequisition').should('exist');
    cy.url().should('match', xlsxReportRequisitionPageUrlPattern);
  });

  describe('XlsxReportRequisition page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(xlsxReportRequisitionPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create XlsxReportRequisition page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/xlsx-report-requisition/new$'));
        cy.getEntityCreateUpdateHeading('XlsxReportRequisition');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', xlsxReportRequisitionPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/xlsx-report-requisitions',
          body: {
            ...xlsxReportRequisitionSample,
            reportTemplate: reportTemplate,
          },
        }).then(({ body }) => {
          xlsxReportRequisition = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/xlsx-report-requisitions+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/xlsx-report-requisitions?page=0&size=20>; rel="last",<http://localhost/api/xlsx-report-requisitions?page=0&size=20>; rel="first"',
              },
              body: [xlsxReportRequisition],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(xlsxReportRequisitionPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details XlsxReportRequisition page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('xlsxReportRequisition');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', xlsxReportRequisitionPageUrlPattern);
      });

      it('edit button click should load edit XlsxReportRequisition page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('XlsxReportRequisition');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', xlsxReportRequisitionPageUrlPattern);
      });

      it.skip('edit button click should load edit XlsxReportRequisition page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('XlsxReportRequisition');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', xlsxReportRequisitionPageUrlPattern);
      });

      it('last delete button click should delete instance of XlsxReportRequisition', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('xlsxReportRequisition').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', xlsxReportRequisitionPageUrlPattern);

        xlsxReportRequisition = undefined;
      });
    });
  });

  describe('new XlsxReportRequisition page', () => {
    beforeEach(() => {
      cy.visit(`${xlsxReportRequisitionPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('XlsxReportRequisition');
    });

    it('should create an instance of XlsxReportRequisition', () => {
      cy.get(`[data-cy="reportName"]`).type('Program').should('have.value', 'Program');

      cy.get(`[data-cy="reportDate"]`).type('2022-06-04').blur().should('have.value', '2022-06-04');

      cy.get(`[data-cy="userPassword"]`).type('flexibility').should('have.value', 'flexibility');

      cy.get(`[data-cy="reportFileChecksum"]`).type('Avon Usability Causeway').should('have.value', 'Avon Usability Causeway');

      cy.get(`[data-cy="reportStatus"]`).select('FAILED');

      cy.get(`[data-cy="reportId"]`)
        .type('fa8a5725-33d6-4fd6-a1d3-1920d9035de5')
        .invoke('val')
        .should('match', new RegExp('fa8a5725-33d6-4fd6-a1d3-1920d9035de5'));

      cy.get(`[data-cy="reportTemplate"]`).select(1);

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        xlsxReportRequisition = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', xlsxReportRequisitionPageUrlPattern);
    });
  });
});
