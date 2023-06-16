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

describe('ExcelReportExport e2e test', () => {
  const excelReportExportPageUrl = '/excel-report-export';
  const excelReportExportPageUrlPattern = new RegExp('/excel-report-export(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  // const excelReportExportSample = {"reportName":"integrate Car Paradigm","reportPassword":"Computer efficient","reportTimeStamp":"2022-06-28T18:10:58.193Z","reportId":"83027e53-77c3-482f-99bf-8de4798fd733"};

  let excelReportExport;
  // let securityClearance;
  // let applicationUser;
  // let dealer;
  // let systemModule;
  // let reportDesign;
  // let algorithm;

  beforeEach(() => {
    cy.login(username, password);
  });

  /* Disabled due to incompatibility
  beforeEach(() => {
    // create an instance at the required relationship entity:
    cy.authenticatedRequest({
      method: 'POST',
      url: '/api/security-clearances',
      body: {"clearanceLevel":"Enhanced"},
    }).then(({ body }) => {
      securityClearance = body;
    });
    // create an instance at the required relationship entity:
    cy.authenticatedRequest({
      method: 'POST',
      url: '/api/application-users',
      body: {"designation":"63fd858d-a0ea-4aca-852f-a4d7ee5c5d29","applicationIdentity":"Bedfordshire Computers Path"},
    }).then(({ body }) => {
      applicationUser = body;
    });
    // create an instance at the required relationship entity:
    cy.authenticatedRequest({
      method: 'POST',
      url: '/api/dealers',
      body: {"dealerName":"synthesizing","taxNumber":"Grocery","identificationDocumentNumber":"redundant","organizationName":"improvement Technician neural","department":"microchip","position":"input","postalAddress":"Africa Practical","physicalAddress":"Investor","accountName":"Credit Card Account","accountNumber":"invoice reintermediate","bankersName":"transmit niches Key","bankersBranch":"Technician Bacon Plastic","bankersSwiftCode":"benchmark Outdoors enhance","fileUploadToken":"Freeway","compilationToken":"compress Som Rupee","remarks":"Li4vZmFrZS1kYXRhL2Jsb2IvaGlwc3Rlci50eHQ=","otherNames":"Euro"},
    }).then(({ body }) => {
      dealer = body;
    });
    // create an instance at the required relationship entity:
    cy.authenticatedRequest({
      method: 'POST',
      url: '/api/system-modules',
      body: {"moduleName":"Virginia override integrate"},
    }).then(({ body }) => {
      systemModule = body;
    });
    // create an instance at the required relationship entity:
    cy.authenticatedRequest({
      method: 'POST',
      url: '/api/report-designs',
      body: {"catalogueNumber":"3dd58faa-caf6-4b43-95be-f8e956ca1470","designation":"haptic cyan Soap","description":"Li4vZmFrZS1kYXRhL2Jsb2IvaGlwc3Rlci50eHQ=","notes":"Li4vZmFrZS1kYXRhL2Jsb2IvaGlwc3Rlci5wbmc=","notesContentType":"unknown","reportFile":"Li4vZmFrZS1kYXRhL2Jsb2IvaGlwc3Rlci5wbmc=","reportFileContentType":"unknown","reportFileChecksum":"payment"},
    }).then(({ body }) => {
      reportDesign = body;
    });
    // create an instance at the required relationship entity:
    cy.authenticatedRequest({
      method: 'POST',
      url: '/api/algorithms',
      body: {"name":"Sleek cross-platform Rustic"},
    }).then(({ body }) => {
      algorithm = body;
    });
  });
   */

  beforeEach(() => {
    cy.intercept('GET', '/api/excel-report-exports+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/excel-report-exports').as('postEntityRequest');
    cy.intercept('DELETE', '/api/excel-report-exports/*').as('deleteEntityRequest');
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

    cy.intercept('GET', '/api/report-statuses', {
      statusCode: 200,
      body: [],
    });

    cy.intercept('GET', '/api/security-clearances', {
      statusCode: 200,
      body: [securityClearance],
    });

    cy.intercept('GET', '/api/application-users', {
      statusCode: 200,
      body: [applicationUser],
    });

    cy.intercept('GET', '/api/dealers', {
      statusCode: 200,
      body: [dealer],
    });

    cy.intercept('GET', '/api/system-modules', {
      statusCode: 200,
      body: [systemModule],
    });

    cy.intercept('GET', '/api/report-designs', {
      statusCode: 200,
      body: [reportDesign],
    });

    cy.intercept('GET', '/api/algorithms', {
      statusCode: 200,
      body: [algorithm],
    });

  });
   */

  afterEach(() => {
    if (excelReportExport) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/excel-report-exports/${excelReportExport.id}`,
      }).then(() => {
        excelReportExport = undefined;
      });
    }
  });

  /* Disabled due to incompatibility
  afterEach(() => {
    if (securityClearance) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/security-clearances/${securityClearance.id}`,
      }).then(() => {
        securityClearance = undefined;
      });
    }
    if (applicationUser) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/application-users/${applicationUser.id}`,
      }).then(() => {
        applicationUser = undefined;
      });
    }
    if (dealer) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/dealers/${dealer.id}`,
      }).then(() => {
        dealer = undefined;
      });
    }
    if (systemModule) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/system-modules/${systemModule.id}`,
      }).then(() => {
        systemModule = undefined;
      });
    }
    if (reportDesign) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/report-designs/${reportDesign.id}`,
      }).then(() => {
        reportDesign = undefined;
      });
    }
    if (algorithm) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/algorithms/${algorithm.id}`,
      }).then(() => {
        algorithm = undefined;
      });
    }
  });
   */

  it('ExcelReportExports menu should load ExcelReportExports page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('excel-report-export');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('ExcelReportExport').should('exist');
    cy.url().should('match', excelReportExportPageUrlPattern);
  });

  describe('ExcelReportExport page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(excelReportExportPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create ExcelReportExport page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/excel-report-export/new$'));
        cy.getEntityCreateUpdateHeading('ExcelReportExport');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', excelReportExportPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      /* Disabled due to incompatibility
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/excel-report-exports',
          body: {
            ...excelReportExportSample,
            securityClearance: securityClearance,
            reportCreator: applicationUser,
            organization: dealer,
            department: dealer,
            systemModule: systemModule,
            reportDesign: reportDesign,
            fileCheckSumAlgorithm: algorithm,
          },
        }).then(({ body }) => {
          excelReportExport = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/excel-report-exports+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/excel-report-exports?page=0&size=20>; rel="last",<http://localhost/api/excel-report-exports?page=0&size=20>; rel="first"',
              },
              body: [excelReportExport],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(excelReportExportPageUrl);

        cy.wait('@entitiesRequestInternal');
      });
       */

      beforeEach(function () {
        cy.visit(excelReportExportPageUrl);

        cy.wait('@entitiesRequest').then(({ response }) => {
          if (response.body.length === 0) {
            this.skip();
          }
        });
      });

      it('detail button click should load details ExcelReportExport page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('excelReportExport');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', excelReportExportPageUrlPattern);
      });

      it('edit button click should load edit ExcelReportExport page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('ExcelReportExport');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', excelReportExportPageUrlPattern);
      });

      it.skip('edit button click should load edit ExcelReportExport page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('ExcelReportExport');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', excelReportExportPageUrlPattern);
      });

      it.skip('last delete button click should delete instance of ExcelReportExport', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('excelReportExport').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', excelReportExportPageUrlPattern);

        excelReportExport = undefined;
      });
    });
  });

  describe('new ExcelReportExport page', () => {
    beforeEach(() => {
      cy.visit(`${excelReportExportPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('ExcelReportExport');
    });

    it.skip('should create an instance of ExcelReportExport', () => {
      cy.get(`[data-cy="reportName"]`).type('Practical').should('have.value', 'Practical');

      cy.get(`[data-cy="reportPassword"]`).type('Puerto').should('have.value', 'Puerto');

      cy.setFieldImageAsBytesOfEntity('reportNotes', 'integration-test.png', 'image/png');

      cy.get(`[data-cy="fileCheckSum"]`)
        .type('../fake-data/blob/hipster.txt')
        .invoke('val')
        .should('match', new RegExp('../fake-data/blob/hipster.txt'));

      cy.setFieldImageAsBytesOfEntity('reportFile', 'integration-test.png', 'image/png');

      cy.get(`[data-cy="reportTimeStamp"]`).type('2022-06-29T07:14').blur().should('have.value', '2022-06-29T07:14');

      cy.get(`[data-cy="reportId"]`)
        .type('649ccc6e-43f8-4a3c-8cd2-80208ddde03b')
        .invoke('val')
        .should('match', new RegExp('649ccc6e-43f8-4a3c-8cd2-80208ddde03b'));

      cy.get(`[data-cy="securityClearance"]`).select(1);
      cy.get(`[data-cy="reportCreator"]`).select(1);
      cy.get(`[data-cy="organization"]`).select(1);
      cy.get(`[data-cy="department"]`).select(1);
      cy.get(`[data-cy="systemModule"]`).select(1);
      cy.get(`[data-cy="reportDesign"]`).select(1);
      cy.get(`[data-cy="fileCheckSumAlgorithm"]`).select(1);

      // since cypress clicks submit too fast before the blob fields are validated
      cy.wait(200); // eslint-disable-line cypress/no-unnecessary-waiting
      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        excelReportExport = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', excelReportExportPageUrlPattern);
    });
  });
});
