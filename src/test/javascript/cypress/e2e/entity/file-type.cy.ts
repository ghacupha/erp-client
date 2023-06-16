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

describe('FileType e2e test', () => {
  const fileTypePageUrl = '/file-type';
  const fileTypePageUrlPattern = new RegExp('/file-type(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const fileTypeSample = { fileTypeName: 'Wisconsin Towels', fileMediumType: 'EXCEL_XLSB', fileType: 'FIXED_ASSET_ACQUISITION' };

  let fileType;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/services/erpservice/api/file-types+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/services/erpservice/api/file-types').as('postEntityRequest');
    cy.intercept('DELETE', '/services/erpservice/api/file-types/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (fileType) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/services/erpservice/api/file-types/${fileType.id}`,
      }).then(() => {
        fileType = undefined;
      });
    }
  });

  it('FileTypes menu should load FileTypes page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('file-type');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('FileType').should('exist');
    cy.url().should('match', fileTypePageUrlPattern);
  });

  describe('FileType page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(fileTypePageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create FileType page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/file-type/new$'));
        cy.getEntityCreateUpdateHeading('FileType');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', fileTypePageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/services/erpservice/api/file-types',
          body: fileTypeSample,
        }).then(({ body }) => {
          fileType = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/services/erpservice/api/file-types+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/services/erpservice/api/file-types?page=0&size=20>; rel="last",<http://localhost/services/erpservice/api/file-types?page=0&size=20>; rel="first"',
              },
              body: [fileType],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(fileTypePageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details FileType page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('fileType');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', fileTypePageUrlPattern);
      });

      it('edit button click should load edit FileType page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('FileType');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', fileTypePageUrlPattern);
      });

      it.skip('edit button click should load edit FileType page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('FileType');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', fileTypePageUrlPattern);
      });

      it('last delete button click should delete instance of FileType', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('fileType').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', fileTypePageUrlPattern);

        fileType = undefined;
      });
    });
  });

  describe('new FileType page', () => {
    beforeEach(() => {
      cy.visit(`${fileTypePageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('FileType');
    });

    it('should create an instance of FileType', () => {
      cy.get(`[data-cy="fileTypeName"]`).type('copy user-facing').should('have.value', 'copy user-facing');

      cy.get(`[data-cy="fileMediumType"]`).select('EXCEL_XML');

      cy.get(`[data-cy="description"]`).type('Fresh').should('have.value', 'Fresh');

      cy.setFieldImageAsBytesOfEntity('fileTemplate', 'integration-test.png', 'image/png');

      cy.get(`[data-cy="fileType"]`).select('PAYMENT_CATEGORY');

      // since cypress clicks submit too fast before the blob fields are validated
      cy.wait(200); // eslint-disable-line cypress/no-unnecessary-waiting
      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        fileType = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', fileTypePageUrlPattern);
    });
  });
});
