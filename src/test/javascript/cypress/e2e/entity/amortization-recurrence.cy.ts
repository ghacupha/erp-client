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

describe('AmortizationRecurrence e2e test', () => {
  const amortizationRecurrencePageUrl = '/amortization-recurrence';
  const amortizationRecurrencePageUrlPattern = new RegExp('/amortization-recurrence(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const amortizationRecurrenceSample = {
    firstAmortizationDate: '2022-08-01',
    amortizationFrequency: 'BI_MONTHLY',
    numberOfRecurrences: 1145,
    timeOfInstallation: '2022-08-01T12:38:51.839Z',
    recurrenceGuid: '32e99330-10cd-4089-a9c3-027e3f43fabb',
    prepaymentAccountGuid: 'e77f8486-e095-4b90-b743-46b9082ca8db',
  };

  let amortizationRecurrence;
  let depreciationMethod;
  let prepaymentAccount;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    // create an instance at the required relationship entity:
    cy.authenticatedRequest({
      method: 'POST',
      url: '/api/depreciation-methods',
      body: { depreciationMethodName: 'relationships function', description: 'Bacon', remarks: 'Li4vZmFrZS1kYXRhL2Jsb2IvaGlwc3Rlci50eHQ=' },
    }).then(({ body }) => {
      depreciationMethod = body;
    });
    // create an instance at the required relationship entity:
    cy.authenticatedRequest({
      method: 'POST',
      url: '/api/prepayment-accounts',
      body: {
        catalogueNumber: 'Crest web payment',
        particulars: 'Brooks',
        notes: 'Li4vZmFrZS1kYXRhL2Jsb2IvaGlwc3Rlci50eHQ=',
        prepaymentAmount: 68655,
        prepaymentGuid: '8cf9c638-e9dd-40f6-874d-54f8d346294e',
      },
    }).then(({ body }) => {
      prepaymentAccount = body;
    });
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/amortization-recurrences+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/amortization-recurrences').as('postEntityRequest');
    cy.intercept('DELETE', '/api/amortization-recurrences/*').as('deleteEntityRequest');
  });

  beforeEach(() => {
    // Simulate relationships api for better performance and reproducibility.
    cy.intercept('GET', '/api/placeholders', {
      statusCode: 200,
      body: [],
    });

    cy.intercept('GET', '/api/prepayment-mappings', {
      statusCode: 200,
      body: [],
    });

    cy.intercept('GET', '/api/universally-unique-mappings', {
      statusCode: 200,
      body: [],
    });

    cy.intercept('GET', '/api/depreciation-methods', {
      statusCode: 200,
      body: [depreciationMethod],
    });

    cy.intercept('GET', '/api/prepayment-accounts', {
      statusCode: 200,
      body: [prepaymentAccount],
    });
  });

  afterEach(() => {
    if (amortizationRecurrence) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/amortization-recurrences/${amortizationRecurrence.id}`,
      }).then(() => {
        amortizationRecurrence = undefined;
      });
    }
  });

  afterEach(() => {
    if (depreciationMethod) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/depreciation-methods/${depreciationMethod.id}`,
      }).then(() => {
        depreciationMethod = undefined;
      });
    }
    if (prepaymentAccount) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/prepayment-accounts/${prepaymentAccount.id}`,
      }).then(() => {
        prepaymentAccount = undefined;
      });
    }
  });

  it('AmortizationRecurrences menu should load AmortizationRecurrences page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('amortization-recurrence');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('AmortizationRecurrence').should('exist');
    cy.url().should('match', amortizationRecurrencePageUrlPattern);
  });

  describe('AmortizationRecurrence page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(amortizationRecurrencePageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create AmortizationRecurrence page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/amortization-recurrence/new$'));
        cy.getEntityCreateUpdateHeading('AmortizationRecurrence');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', amortizationRecurrencePageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/amortization-recurrences',
          body: {
            ...amortizationRecurrenceSample,
            depreciationMethod: depreciationMethod,
            prepaymentAccount: prepaymentAccount,
          },
        }).then(({ body }) => {
          amortizationRecurrence = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/amortization-recurrences+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/amortization-recurrences?page=0&size=20>; rel="last",<http://localhost/api/amortization-recurrences?page=0&size=20>; rel="first"',
              },
              body: [amortizationRecurrence],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(amortizationRecurrencePageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details AmortizationRecurrence page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('amortizationRecurrence');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', amortizationRecurrencePageUrlPattern);
      });

      it('edit button click should load edit AmortizationRecurrence page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('AmortizationRecurrence');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', amortizationRecurrencePageUrlPattern);
      });

      it.skip('edit button click should load edit AmortizationRecurrence page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('AmortizationRecurrence');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', amortizationRecurrencePageUrlPattern);
      });

      it('last delete button click should delete instance of AmortizationRecurrence', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('amortizationRecurrence').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', amortizationRecurrencePageUrlPattern);

        amortizationRecurrence = undefined;
      });
    });
  });

  describe('new AmortizationRecurrence page', () => {
    beforeEach(() => {
      cy.visit(`${amortizationRecurrencePageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('AmortizationRecurrence');
    });

    it('should create an instance of AmortizationRecurrence', () => {
      cy.get(`[data-cy="firstAmortizationDate"]`).type('2022-08-01').blur().should('have.value', '2022-08-01');

      cy.get(`[data-cy="amortizationFrequency"]`).select('BIANNUAL');

      cy.get(`[data-cy="numberOfRecurrences"]`).type('69662').should('have.value', '69662');

      cy.setFieldImageAsBytesOfEntity('notes', 'integration-test.png', 'image/png');

      cy.get(`[data-cy="particulars"]`).type('quantify').should('have.value', 'quantify');

      cy.get(`[data-cy="isActive"]`).should('not.be.checked');
      cy.get(`[data-cy="isActive"]`).click().should('be.checked');

      cy.get(`[data-cy="isOverWritten"]`).should('not.be.checked');
      cy.get(`[data-cy="isOverWritten"]`).click().should('be.checked');

      cy.get(`[data-cy="timeOfInstallation"]`).type('2022-08-01T22:12').blur().should('have.value', '2022-08-01T22:12');

      cy.get(`[data-cy="recurrenceGuid"]`)
        .type('a3c56124-1aaf-402f-bd0a-f26d94aacaac')
        .invoke('val')
        .should('match', new RegExp('a3c56124-1aaf-402f-bd0a-f26d94aacaac'));

      cy.get(`[data-cy="prepaymentAccountGuid"]`)
        .type('d8a831db-0491-4cf1-89f7-7c033415107a')
        .invoke('val')
        .should('match', new RegExp('d8a831db-0491-4cf1-89f7-7c033415107a'));

      cy.get(`[data-cy="depreciationMethod"]`).select(1);
      cy.get(`[data-cy="prepaymentAccount"]`).select(1);

      // since cypress clicks submit too fast before the blob fields are validated
      cy.wait(200); // eslint-disable-line cypress/no-unnecessary-waiting
      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        amortizationRecurrence = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', amortizationRecurrencePageUrlPattern);
    });
  });
});
