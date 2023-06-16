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

describe('DeliveryNote e2e test', () => {
  const deliveryNotePageUrl = '/delivery-note';
  const deliveryNotePageUrlPattern = new RegExp('/delivery-note(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const deliveryNoteSample = { deliveryNoteNumber: 'collaborative hard auxiliary', documentDate: '2022-03-01' };

  let deliveryNote;
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
        dealerName: 'Berkshire',
        taxNumber: 'calculating system virtual',
        identificationDocumentNumber: 'auxiliary auxiliary Cambridgeshire',
        organizationName: 'Object-based Republic Towels',
        department: 'redefine 24/7',
        position: 'Fish',
        postalAddress: 'Brand',
        physicalAddress: 'Borders',
        accountName: 'Investment Account',
        accountNumber: 'Uruguayo AGP systems',
        bankersName: 'adapter Public-key',
        bankersBranch: 'mission-critical Practical',
        bankersSwiftCode: 'Intelligent',
        fileUploadToken: 'SCSI',
        compilationToken: 'Paraguay integrated',
        remarks: 'Li4vZmFrZS1kYXRhL2Jsb2IvaGlwc3Rlci50eHQ=',
        otherNames: 'Concrete communities Meadows',
      },
    }).then(({ body }) => {
      dealer = body;
    });
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/delivery-notes+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/delivery-notes').as('postEntityRequest');
    cy.intercept('DELETE', '/api/delivery-notes/*').as('deleteEntityRequest');
  });

  beforeEach(() => {
    // Simulate relationships api for better performance and reproducibility.
    cy.intercept('GET', '/api/placeholders', {
      statusCode: 200,
      body: [],
    });

    cy.intercept('GET', '/api/dealers', {
      statusCode: 200,
      body: [dealer],
    });

    cy.intercept('GET', '/api/business-stamps', {
      statusCode: 200,
      body: [],
    });

    cy.intercept('GET', '/api/purchase-orders', {
      statusCode: 200,
      body: [],
    });

    cy.intercept('GET', '/api/business-documents', {
      statusCode: 200,
      body: [],
    });
  });

  afterEach(() => {
    if (deliveryNote) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/delivery-notes/${deliveryNote.id}`,
      }).then(() => {
        deliveryNote = undefined;
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

  it('DeliveryNotes menu should load DeliveryNotes page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('delivery-note');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('DeliveryNote').should('exist');
    cy.url().should('match', deliveryNotePageUrlPattern);
  });

  describe('DeliveryNote page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(deliveryNotePageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create DeliveryNote page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/delivery-note/new$'));
        cy.getEntityCreateUpdateHeading('DeliveryNote');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', deliveryNotePageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/delivery-notes',
          body: {
            ...deliveryNoteSample,
            receivedBy: dealer,
            supplier: dealer,
          },
        }).then(({ body }) => {
          deliveryNote = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/delivery-notes+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/delivery-notes?page=0&size=20>; rel="last",<http://localhost/api/delivery-notes?page=0&size=20>; rel="first"',
              },
              body: [deliveryNote],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(deliveryNotePageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details DeliveryNote page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('deliveryNote');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', deliveryNotePageUrlPattern);
      });

      it('edit button click should load edit DeliveryNote page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('DeliveryNote');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', deliveryNotePageUrlPattern);
      });

      it.skip('edit button click should load edit DeliveryNote page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('DeliveryNote');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', deliveryNotePageUrlPattern);
      });

      it('last delete button click should delete instance of DeliveryNote', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('deliveryNote').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', deliveryNotePageUrlPattern);

        deliveryNote = undefined;
      });
    });
  });

  describe('new DeliveryNote page', () => {
    beforeEach(() => {
      cy.visit(`${deliveryNotePageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('DeliveryNote');
    });

    it('should create an instance of DeliveryNote', () => {
      cy.get(`[data-cy="deliveryNoteNumber"]`).type('sticky Points 1080p').should('have.value', 'sticky Points 1080p');

      cy.get(`[data-cy="documentDate"]`).type('2022-03-02').blur().should('have.value', '2022-03-02');

      cy.get(`[data-cy="description"]`).type('innovative Division California').should('have.value', 'innovative Division California');

      cy.get(`[data-cy="serialNumber"]`).type('Dollar').should('have.value', 'Dollar');

      cy.get(`[data-cy="quantity"]`).type('29867').should('have.value', '29867');

      cy.get(`[data-cy="remarks"]`)
        .type('../fake-data/blob/hipster.txt')
        .invoke('val')
        .should('match', new RegExp('../fake-data/blob/hipster.txt'));

      cy.get(`[data-cy="receivedBy"]`).select(1);
      cy.get(`[data-cy="supplier"]`).select(1);

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        deliveryNote = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', deliveryNotePageUrlPattern);
    });
  });
});
