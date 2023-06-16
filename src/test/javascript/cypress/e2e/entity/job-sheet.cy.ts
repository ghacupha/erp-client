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

describe('JobSheet e2e test', () => {
  const jobSheetPageUrl = '/job-sheet';
  const jobSheetPageUrlPattern = new RegExp('/job-sheet(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const jobSheetSample = { serialNumber: 'Communications Global' };

  let jobSheet;
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
        dealerName: 'Games',
        taxNumber: 'Utah',
        identificationDocumentNumber: 'migration',
        organizationName: 'Intranet',
        department: 'Soap input',
        position: 'wireless',
        postalAddress: 'B2B e-markets object-oriented',
        physicalAddress: 'whiteboard',
        accountName: 'Auto Loan Account',
        accountNumber: 'tan',
        bankersName: 'Intelligent generate users',
        bankersBranch: 'copying',
        bankersSwiftCode: 'Rustic Fresh',
        fileUploadToken: 'card calculating eco-centric',
        compilationToken: 'bandwidth-monitored envisioneer',
        remarks: 'Li4vZmFrZS1kYXRhL2Jsb2IvaGlwc3Rlci50eHQ=',
        otherNames: 'Solutions bluetooth',
      },
    }).then(({ body }) => {
      dealer = body;
    });
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/job-sheets+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/job-sheets').as('postEntityRequest');
    cy.intercept('DELETE', '/api/job-sheets/*').as('deleteEntityRequest');
  });

  beforeEach(() => {
    // Simulate relationships api for better performance and reproducibility.
    cy.intercept('GET', '/api/dealers', {
      statusCode: 200,
      body: [dealer],
    });

    cy.intercept('GET', '/api/business-stamps', {
      statusCode: 200,
      body: [],
    });

    cy.intercept('GET', '/api/placeholders', {
      statusCode: 200,
      body: [],
    });

    cy.intercept('GET', '/api/payment-labels', {
      statusCode: 200,
      body: [],
    });

    cy.intercept('GET', '/api/business-documents', {
      statusCode: 200,
      body: [],
    });
  });

  afterEach(() => {
    if (jobSheet) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/job-sheets/${jobSheet.id}`,
      }).then(() => {
        jobSheet = undefined;
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

  it('JobSheets menu should load JobSheets page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('job-sheet');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('JobSheet').should('exist');
    cy.url().should('match', jobSheetPageUrlPattern);
  });

  describe('JobSheet page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(jobSheetPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create JobSheet page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/job-sheet/new$'));
        cy.getEntityCreateUpdateHeading('JobSheet');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', jobSheetPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/job-sheets',
          body: {
            ...jobSheetSample,
            biller: dealer,
          },
        }).then(({ body }) => {
          jobSheet = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/job-sheets+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/job-sheets?page=0&size=20>; rel="last",<http://localhost/api/job-sheets?page=0&size=20>; rel="first"',
              },
              body: [jobSheet],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(jobSheetPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details JobSheet page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('jobSheet');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', jobSheetPageUrlPattern);
      });

      it('edit button click should load edit JobSheet page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('JobSheet');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', jobSheetPageUrlPattern);
      });

      it.skip('edit button click should load edit JobSheet page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('JobSheet');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', jobSheetPageUrlPattern);
      });

      it('last delete button click should delete instance of JobSheet', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('jobSheet').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', jobSheetPageUrlPattern);

        jobSheet = undefined;
      });
    });
  });

  describe('new JobSheet page', () => {
    beforeEach(() => {
      cy.visit(`${jobSheetPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('JobSheet');
    });

    it('should create an instance of JobSheet', () => {
      cy.get(`[data-cy="serialNumber"]`).type('matrix copying brand').should('have.value', 'matrix copying brand');

      cy.get(`[data-cy="jobSheetDate"]`).type('2022-03-19').blur().should('have.value', '2022-03-19');

      cy.get(`[data-cy="details"]`).type('content-based harness Principal').should('have.value', 'content-based harness Principal');

      cy.get(`[data-cy="remarks"]`)
        .type('../fake-data/blob/hipster.txt')
        .invoke('val')
        .should('match', new RegExp('../fake-data/blob/hipster.txt'));

      cy.get(`[data-cy="biller"]`).select(1);

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        jobSheet = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', jobSheetPageUrlPattern);
    });
  });
});
