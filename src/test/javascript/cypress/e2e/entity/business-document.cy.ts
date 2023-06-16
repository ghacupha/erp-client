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

describe('BusinessDocument e2e test', () => {
  const businessDocumentPageUrl = '/business-document';
  const businessDocumentPageUrlPattern = new RegExp('/business-document(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  // const businessDocumentSample = {"documentTitle":"empower","documentSerial":"023cb15b-8ac5-4784-9e2d-9d2b32d63476","attachmentFilePath":"networks Tuna navigating","documentFile":"Li4vZmFrZS1kYXRhL2Jsb2IvaGlwc3Rlci5wbmc=","documentFileContentType":"unknown","documentFileChecksum":"circuit"};

  let businessDocument;
  // let applicationUser;
  // let dealer;
  // let algorithm;
  // let securityClearance;

  beforeEach(() => {
    cy.login(username, password);
  });

  /* Disabled due to incompatibility
  beforeEach(() => {
    // create an instance at the required relationship entity:
    cy.authenticatedRequest({
      method: 'POST',
      url: '/api/application-users',
      body: {"designation":"cc87db4d-390c-465a-b28b-33a97f11061d","applicationIdentity":"Iowa"},
    }).then(({ body }) => {
      applicationUser = body;
    });
    // create an instance at the required relationship entity:
    cy.authenticatedRequest({
      method: 'POST',
      url: '/api/dealers',
      body: {"dealerName":"Games application","taxNumber":"Auto Research","identificationDocumentNumber":"clear-thinking","organizationName":"Baby","department":"adapter","position":"Clothing protocol yellow","postalAddress":"Connecticut Illinois","physicalAddress":"Hat copy","accountName":"Personal Loan Account","accountNumber":"Automotive Crossing","bankersName":"Dynamic","bankersBranch":"Principal Macedonia US","bankersSwiftCode":"invoice Shirt","fileUploadToken":"Small","compilationToken":"Mandatory SAS iterate","remarks":"Li4vZmFrZS1kYXRhL2Jsb2IvaGlwc3Rlci50eHQ=","otherNames":"Knolls Usability panel"},
    }).then(({ body }) => {
      dealer = body;
    });
    // create an instance at the required relationship entity:
    cy.authenticatedRequest({
      method: 'POST',
      url: '/api/algorithms',
      body: {"name":"Pants sticky"},
    }).then(({ body }) => {
      algorithm = body;
    });
    // create an instance at the required relationship entity:
    cy.authenticatedRequest({
      method: 'POST',
      url: '/api/security-clearances',
      body: {"clearanceLevel":"Executive"},
    }).then(({ body }) => {
      securityClearance = body;
    });
  });
   */

  beforeEach(() => {
    cy.intercept('GET', '/api/business-documents+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/business-documents').as('postEntityRequest');
    cy.intercept('DELETE', '/api/business-documents/*').as('deleteEntityRequest');
  });

  /* Disabled due to incompatibility
  beforeEach(() => {
    // Simulate relationships api for better performance and reproducibility.
    cy.intercept('GET', '/api/application-users', {
      statusCode: 200,
      body: [applicationUser],
    });

    cy.intercept('GET', '/api/dealers', {
      statusCode: 200,
      body: [dealer],
    });

    cy.intercept('GET', '/api/universally-unique-mappings', {
      statusCode: 200,
      body: [],
    });

    cy.intercept('GET', '/api/placeholders', {
      statusCode: 200,
      body: [],
    });

    cy.intercept('GET', '/api/algorithms', {
      statusCode: 200,
      body: [algorithm],
    });

    cy.intercept('GET', '/api/security-clearances', {
      statusCode: 200,
      body: [securityClearance],
    });

  });
   */

  afterEach(() => {
    if (businessDocument) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/business-documents/${businessDocument.id}`,
      }).then(() => {
        businessDocument = undefined;
      });
    }
  });

  /* Disabled due to incompatibility
  afterEach(() => {
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
    if (algorithm) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/algorithms/${algorithm.id}`,
      }).then(() => {
        algorithm = undefined;
      });
    }
    if (securityClearance) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/security-clearances/${securityClearance.id}`,
      }).then(() => {
        securityClearance = undefined;
      });
    }
  });
   */

  it('BusinessDocuments menu should load BusinessDocuments page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('business-document');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('BusinessDocument').should('exist');
    cy.url().should('match', businessDocumentPageUrlPattern);
  });

  describe('BusinessDocument page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(businessDocumentPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create BusinessDocument page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/business-document/new$'));
        cy.getEntityCreateUpdateHeading('BusinessDocument');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', businessDocumentPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      /* Disabled due to incompatibility
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/business-documents',
          body: {
            ...businessDocumentSample,
            createdBy: applicationUser,
            originatingDepartment: dealer,
            fileChecksumAlgorithm: algorithm,
            securityClearance: securityClearance,
          },
        }).then(({ body }) => {
          businessDocument = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/business-documents+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/business-documents?page=0&size=20>; rel="last",<http://localhost/api/business-documents?page=0&size=20>; rel="first"',
              },
              body: [businessDocument],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(businessDocumentPageUrl);

        cy.wait('@entitiesRequestInternal');
      });
       */

      beforeEach(function () {
        cy.visit(businessDocumentPageUrl);

        cy.wait('@entitiesRequest').then(({ response }) => {
          if (response.body.length === 0) {
            this.skip();
          }
        });
      });

      it('detail button click should load details BusinessDocument page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('businessDocument');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', businessDocumentPageUrlPattern);
      });

      it('edit button click should load edit BusinessDocument page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('BusinessDocument');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', businessDocumentPageUrlPattern);
      });

      it.skip('edit button click should load edit BusinessDocument page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('BusinessDocument');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', businessDocumentPageUrlPattern);
      });

      it.skip('last delete button click should delete instance of BusinessDocument', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('businessDocument').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', businessDocumentPageUrlPattern);

        businessDocument = undefined;
      });
    });
  });

  describe('new BusinessDocument page', () => {
    beforeEach(() => {
      cy.visit(`${businessDocumentPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('BusinessDocument');
    });

    it.skip('should create an instance of BusinessDocument', () => {
      cy.get(`[data-cy="documentTitle"]`).type('Nevada Awesome').should('have.value', 'Nevada Awesome');

      cy.get(`[data-cy="description"]`).type('Bridge').should('have.value', 'Bridge');

      cy.get(`[data-cy="documentSerial"]`)
        .type('1b1b4800-48a1-4305-8207-69ba7e9273ec')
        .invoke('val')
        .should('match', new RegExp('1b1b4800-48a1-4305-8207-69ba7e9273ec'));

      cy.get(`[data-cy="lastModified"]`).type('2022-10-18T14:20').blur().should('have.value', '2022-10-18T14:20');

      cy.get(`[data-cy="attachmentFilePath"]`).type('Lock Bedfordshire').should('have.value', 'Lock Bedfordshire');

      cy.setFieldImageAsBytesOfEntity('documentFile', 'integration-test.png', 'image/png');

      cy.get(`[data-cy="fileTampered"]`).should('not.be.checked');
      cy.get(`[data-cy="fileTampered"]`).click().should('be.checked');

      cy.get(`[data-cy="documentFileChecksum"]`).type('Pizza').should('have.value', 'Pizza');

      cy.get(`[data-cy="createdBy"]`).select(1);
      cy.get(`[data-cy="originatingDepartment"]`).select(1);
      cy.get(`[data-cy="fileChecksumAlgorithm"]`).select(1);
      cy.get(`[data-cy="securityClearance"]`).select(1);

      // since cypress clicks submit too fast before the blob fields are validated
      cy.wait(200); // eslint-disable-line cypress/no-unnecessary-waiting
      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        businessDocument = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', businessDocumentPageUrlPattern);
    });
  });
});
