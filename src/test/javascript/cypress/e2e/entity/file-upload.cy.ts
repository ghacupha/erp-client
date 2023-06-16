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

describe('FileUpload e2e test', () => {
  const fileUploadPageUrl = '/file-upload';
  const fileUploadPageUrlPattern = new RegExp('/file-upload(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const fileUploadSample = {
    description: 'Gardens pink Tools',
    fileName: 'harness',
    fileTypeId: 22543,
    dataFile: 'Li4vZmFrZS1kYXRhL2Jsb2IvaGlwc3Rlci5wbmc=',
    dataFileContentType: 'unknown',
  };

  let fileUpload;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/services/erpservice/api/file-uploads+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/services/erpservice/api/file-uploads').as('postEntityRequest');
    cy.intercept('DELETE', '/services/erpservice/api/file-uploads/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (fileUpload) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/services/erpservice/api/file-uploads/${fileUpload.id}`,
      }).then(() => {
        fileUpload = undefined;
      });
    }
  });

  it('FileUploads menu should load FileUploads page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('file-upload');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('FileUpload').should('exist');
    cy.url().should('match', fileUploadPageUrlPattern);
  });

  describe('FileUpload page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(fileUploadPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create FileUpload page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/file-upload/new$'));
        cy.getEntityCreateUpdateHeading('FileUpload');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', fileUploadPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/services/erpservice/api/file-uploads',
          body: fileUploadSample,
        }).then(({ body }) => {
          fileUpload = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/services/erpservice/api/file-uploads+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/services/erpservice/api/file-uploads?page=0&size=20>; rel="last",<http://localhost/services/erpservice/api/file-uploads?page=0&size=20>; rel="first"',
              },
              body: [fileUpload],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(fileUploadPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details FileUpload page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('fileUpload');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', fileUploadPageUrlPattern);
      });

      it('edit button click should load edit FileUpload page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('FileUpload');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', fileUploadPageUrlPattern);
      });

      it.skip('edit button click should load edit FileUpload page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('FileUpload');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', fileUploadPageUrlPattern);
      });

      it('last delete button click should delete instance of FileUpload', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('fileUpload').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', fileUploadPageUrlPattern);

        fileUpload = undefined;
      });
    });
  });

  describe('new FileUpload page', () => {
    beforeEach(() => {
      cy.visit(`${fileUploadPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('FileUpload');
    });

    it('should create an instance of FileUpload', () => {
      cy.get(`[data-cy="description"]`).type('Soft').should('have.value', 'Soft');

      cy.get(`[data-cy="fileName"]`).type('Planner').should('have.value', 'Planner');

      cy.get(`[data-cy="periodFrom"]`).type('2021-04-14').blur().should('have.value', '2021-04-14');

      cy.get(`[data-cy="periodTo"]`).type('2021-04-14').blur().should('have.value', '2021-04-14');

      cy.get(`[data-cy="fileTypeId"]`).type('25197').should('have.value', '25197');

      cy.setFieldImageAsBytesOfEntity('dataFile', 'integration-test.png', 'image/png');

      cy.get(`[data-cy="uploadSuccessful"]`).should('not.be.checked');
      cy.get(`[data-cy="uploadSuccessful"]`).click().should('be.checked');

      cy.get(`[data-cy="uploadProcessed"]`).should('not.be.checked');
      cy.get(`[data-cy="uploadProcessed"]`).click().should('be.checked');

      cy.get(`[data-cy="uploadToken"]`).type('implement deposit program').should('have.value', 'implement deposit program');

      // since cypress clicks submit too fast before the blob fields are validated
      cy.wait(200); // eslint-disable-line cypress/no-unnecessary-waiting
      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        fileUpload = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', fileUploadPageUrlPattern);
    });
  });
});
