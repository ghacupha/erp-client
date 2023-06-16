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

describe('ReportDesign e2e test', () => {
  const reportDesignPageUrl = '/report-design';
  const reportDesignPageUrlPattern = new RegExp('/report-design(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  // const reportDesignSample = {"catalogueNumber":"3377f97d-0027-44ab-af77-a4bb05a7544a","designation":"Communications Borders"};

  let reportDesign;
  // let securityClearance;
  // let applicationUser;
  // let dealer;
  // let systemModule;
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
      body: {"clearanceLevel":"SMTP redundant deposit"},
    }).then(({ body }) => {
      securityClearance = body;
    });
    // create an instance at the required relationship entity:
    cy.authenticatedRequest({
      method: 'POST',
      url: '/api/application-users',
      body: {"designation":"a827ebcb-f019-4e97-bed0-9ad1cb22564a","applicationIdentity":"connect"},
    }).then(({ body }) => {
      applicationUser = body;
    });
    // create an instance at the required relationship entity:
    cy.authenticatedRequest({
      method: 'POST',
      url: '/api/dealers',
      body: {"dealerName":"ivory","taxNumber":"Buckinghamshire","identificationDocumentNumber":"24/365 Fish Chicken","organizationName":"Row Square","department":"Liaison","position":"program","postalAddress":"connecting Riel Savings","physicalAddress":"SQL Small","accountName":"Personal Loan Account","accountNumber":"maximized Mouse","bankersName":"Bacon","bankersBranch":"Plastic Walks","bankersSwiftCode":"New Checking","fileUploadToken":"Unbranded Court networks","compilationToken":"Tonga","remarks":"Li4vZmFrZS1kYXRhL2Jsb2IvaGlwc3Rlci50eHQ=","otherNames":"networks bottom-line salmon"},
    }).then(({ body }) => {
      dealer = body;
    });
    // create an instance at the required relationship entity:
    cy.authenticatedRequest({
      method: 'POST',
      url: '/api/system-modules',
      body: {"moduleName":"program"},
    }).then(({ body }) => {
      systemModule = body;
    });
    // create an instance at the required relationship entity:
    cy.authenticatedRequest({
      method: 'POST',
      url: '/api/algorithms',
      body: {"name":"Aruban"},
    }).then(({ body }) => {
      algorithm = body;
    });
  });
   */

  beforeEach(() => {
    cy.intercept('GET', '/api/report-designs+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/report-designs').as('postEntityRequest');
    cy.intercept('DELETE', '/api/report-designs/*').as('deleteEntityRequest');
  });

  /* Disabled due to incompatibility
  beforeEach(() => {
    // Simulate relationships api for better performance and reproducibility.
    cy.intercept('GET', '/api/universally-unique-mappings', {
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

    cy.intercept('GET', '/api/placeholders', {
      statusCode: 200,
      body: [],
    });

    cy.intercept('GET', '/api/system-modules', {
      statusCode: 200,
      body: [systemModule],
    });

    cy.intercept('GET', '/api/algorithms', {
      statusCode: 200,
      body: [algorithm],
    });

  });
   */

  afterEach(() => {
    if (reportDesign) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/report-designs/${reportDesign.id}`,
      }).then(() => {
        reportDesign = undefined;
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

  it('ReportDesigns menu should load ReportDesigns page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('report-design');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('ReportDesign').should('exist');
    cy.url().should('match', reportDesignPageUrlPattern);
  });

  describe('ReportDesign page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(reportDesignPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create ReportDesign page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/report-design/new$'));
        cy.getEntityCreateUpdateHeading('ReportDesign');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', reportDesignPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      /* Disabled due to incompatibility
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/report-designs',
          body: {
            ...reportDesignSample,
            securityClearance: securityClearance,
            reportDesigner: applicationUser,
            organization: dealer,
            department: dealer,
            systemModule: systemModule,
            fileCheckSumAlgorithm: algorithm,
          },
        }).then(({ body }) => {
          reportDesign = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/report-designs+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/report-designs?page=0&size=20>; rel="last",<http://localhost/api/report-designs?page=0&size=20>; rel="first"',
              },
              body: [reportDesign],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(reportDesignPageUrl);

        cy.wait('@entitiesRequestInternal');
      });
       */

      beforeEach(function () {
        cy.visit(reportDesignPageUrl);

        cy.wait('@entitiesRequest').then(({ response }) => {
          if (response.body.length === 0) {
            this.skip();
          }
        });
      });

      it('detail button click should load details ReportDesign page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('reportDesign');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', reportDesignPageUrlPattern);
      });

      it('edit button click should load edit ReportDesign page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('ReportDesign');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', reportDesignPageUrlPattern);
      });

      it.skip('edit button click should load edit ReportDesign page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('ReportDesign');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', reportDesignPageUrlPattern);
      });

      it.skip('last delete button click should delete instance of ReportDesign', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('reportDesign').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', reportDesignPageUrlPattern);

        reportDesign = undefined;
      });
    });
  });

  describe('new ReportDesign page', () => {
    beforeEach(() => {
      cy.visit(`${reportDesignPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('ReportDesign');
    });

    it.skip('should create an instance of ReportDesign', () => {
      cy.get(`[data-cy="catalogueNumber"]`)
        .type('f24ec5b7-6815-4b69-8aad-b8692d2e562d')
        .invoke('val')
        .should('match', new RegExp('f24ec5b7-6815-4b69-8aad-b8692d2e562d'));

      cy.get(`[data-cy="designation"]`).type('Administrator').should('have.value', 'Administrator');

      cy.get(`[data-cy="description"]`)
        .type('../fake-data/blob/hipster.txt')
        .invoke('val')
        .should('match', new RegExp('../fake-data/blob/hipster.txt'));

      cy.setFieldImageAsBytesOfEntity('notes', 'integration-test.png', 'image/png');

      cy.setFieldImageAsBytesOfEntity('reportFile', 'integration-test.png', 'image/png');

      cy.get(`[data-cy="reportFileChecksum"]`).type('Loan matrix gold').should('have.value', 'Loan matrix gold');

      cy.get(`[data-cy="securityClearance"]`).select(1);
      cy.get(`[data-cy="reportDesigner"]`).select(1);
      cy.get(`[data-cy="organization"]`).select(1);
      cy.get(`[data-cy="department"]`).select(1);
      cy.get(`[data-cy="systemModule"]`).select(1);
      cy.get(`[data-cy="fileCheckSumAlgorithm"]`).select(1);

      // since cypress clicks submit too fast before the blob fields are validated
      cy.wait(200); // eslint-disable-line cypress/no-unnecessary-waiting
      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        reportDesign = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', reportDesignPageUrlPattern);
    });
  });
});
