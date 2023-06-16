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

describe('PdfReportRequisition e2e test', () => {
  const pdfReportRequisitionPageUrl = '/pdf-report-requisition';
  const pdfReportRequisitionPageUrlPattern = new RegExp('/pdf-report-requisition(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const pdfReportRequisitionSample = {
    reportName: 'Steel',
    userPassword: 'panel Granite',
    ownerPassword: 'Handmade',
    reportId: '0918b941-bea5-48fd-9361-9695c66cc788',
  };

  let pdfReportRequisition;
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
        catalogueNumber: 'Hampshire Gorgeous Division',
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
    cy.intercept('GET', '/api/pdf-report-requisitions+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/pdf-report-requisitions').as('postEntityRequest');
    cy.intercept('DELETE', '/api/pdf-report-requisitions/*').as('deleteEntityRequest');
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
    if (pdfReportRequisition) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/pdf-report-requisitions/${pdfReportRequisition.id}`,
      }).then(() => {
        pdfReportRequisition = undefined;
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

  it('PdfReportRequisitions menu should load PdfReportRequisitions page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('pdf-report-requisition');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('PdfReportRequisition').should('exist');
    cy.url().should('match', pdfReportRequisitionPageUrlPattern);
  });

  describe('PdfReportRequisition page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(pdfReportRequisitionPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create PdfReportRequisition page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/pdf-report-requisition/new$'));
        cy.getEntityCreateUpdateHeading('PdfReportRequisition');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', pdfReportRequisitionPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/pdf-report-requisitions',
          body: {
            ...pdfReportRequisitionSample,
            reportTemplate: reportTemplate,
          },
        }).then(({ body }) => {
          pdfReportRequisition = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/pdf-report-requisitions+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/pdf-report-requisitions?page=0&size=20>; rel="last",<http://localhost/api/pdf-report-requisitions?page=0&size=20>; rel="first"',
              },
              body: [pdfReportRequisition],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(pdfReportRequisitionPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details PdfReportRequisition page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('pdfReportRequisition');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', pdfReportRequisitionPageUrlPattern);
      });

      it('edit button click should load edit PdfReportRequisition page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('PdfReportRequisition');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', pdfReportRequisitionPageUrlPattern);
      });

      it.skip('edit button click should load edit PdfReportRequisition page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('PdfReportRequisition');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', pdfReportRequisitionPageUrlPattern);
      });

      it('last delete button click should delete instance of PdfReportRequisition', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('pdfReportRequisition').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', pdfReportRequisitionPageUrlPattern);

        pdfReportRequisition = undefined;
      });
    });
  });

  describe('new PdfReportRequisition page', () => {
    beforeEach(() => {
      cy.visit(`${pdfReportRequisitionPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('PdfReportRequisition');
    });

    it('should create an instance of PdfReportRequisition', () => {
      cy.get(`[data-cy="reportName"]`).type('index').should('have.value', 'index');

      cy.get(`[data-cy="reportDate"]`).type('2022-05-20').blur().should('have.value', '2022-05-20');

      cy.get(`[data-cy="userPassword"]`).type('Avon frame Generic').should('have.value', 'Avon frame Generic');

      cy.get(`[data-cy="ownerPassword"]`).type('Cape').should('have.value', 'Cape');

      cy.get(`[data-cy="reportFileChecksum"]`).type('Bedfordshire').should('have.value', 'Bedfordshire');

      cy.get(`[data-cy="reportStatus"]`).select('SUCCESSFUL');

      cy.get(`[data-cy="reportId"]`)
        .type('ff480ec3-e5a4-4dd8-b01c-56d61842bb05')
        .invoke('val')
        .should('match', new RegExp('ff480ec3-e5a4-4dd8-b01c-56d61842bb05'));

      cy.get(`[data-cy="reportTemplate"]`).select(1);

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        pdfReportRequisition = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', pdfReportRequisitionPageUrlPattern);
    });
  });
});
