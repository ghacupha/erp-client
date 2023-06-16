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

describe('AmortizationSequence e2e test', () => {
  const amortizationSequencePageUrl = '/amortization-sequence';
  const amortizationSequencePageUrlPattern = new RegExp('/amortization-sequence(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  // const amortizationSequenceSample = {"prepaymentAccountGuid":"83b4a822-230c-4f75-ba58-0242788cb12c","recurrenceGuid":"3765a995-91cc-456f-9ffc-f9d52590abf8","sequenceNumber":62093,"currentAmortizationDate":"2022-08-01","isCommencementSequence":true,"isTerminalSequence":false,"amortizationAmount":66846,"sequenceGuid":"ee020199-f288-4231-afd6-cd65f55c6839"};

  let amortizationSequence;
  // let prepaymentAccount;
  // let amortizationRecurrence;

  beforeEach(() => {
    cy.login(username, password);
  });

  /* Disabled due to incompatibility
  beforeEach(() => {
    // create an instance at the required relationship entity:
    cy.authenticatedRequest({
      method: 'POST',
      url: '/api/prepayment-accounts',
      body: {"catalogueNumber":"black Bedfordshire grey","particulars":"challenge unleash","notes":"Li4vZmFrZS1kYXRhL2Jsb2IvaGlwc3Rlci50eHQ=","prepaymentAmount":61509,"prepaymentGuid":"bdc4439e-11e5-4c16-a961-3e5feaeeff28"},
    }).then(({ body }) => {
      prepaymentAccount = body;
    });
    // create an instance at the required relationship entity:
    cy.authenticatedRequest({
      method: 'POST',
      url: '/api/amortization-recurrences',
      body: {"firstAmortizationDate":"2022-08-01","amortizationFrequency":"TRIMESTERS","numberOfRecurrences":18434,"notes":"Li4vZmFrZS1kYXRhL2Jsb2IvaGlwc3Rlci5wbmc=","notesContentType":"unknown","particulars":"Usability optical","isActive":true,"isOverWritten":false,"timeOfInstallation":"2022-08-01T20:01:54.638Z","recurrenceGuid":"cec76ab1-1754-4a4b-91f2-a4900d969dd2","prepaymentAccountGuid":"67f94517-0106-40eb-b652-d793ced56b79"},
    }).then(({ body }) => {
      amortizationRecurrence = body;
    });
  });
   */

  beforeEach(() => {
    cy.intercept('GET', '/api/amortization-sequences+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/amortization-sequences').as('postEntityRequest');
    cy.intercept('DELETE', '/api/amortization-sequences/*').as('deleteEntityRequest');
  });

  /* Disabled due to incompatibility
  beforeEach(() => {
    // Simulate relationships api for better performance and reproducibility.
    cy.intercept('GET', '/api/prepayment-accounts', {
      statusCode: 200,
      body: [prepaymentAccount],
    });

    cy.intercept('GET', '/api/amortization-recurrences', {
      statusCode: 200,
      body: [amortizationRecurrence],
    });

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

  });
   */

  afterEach(() => {
    if (amortizationSequence) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/amortization-sequences/${amortizationSequence.id}`,
      }).then(() => {
        amortizationSequence = undefined;
      });
    }
  });

  /* Disabled due to incompatibility
  afterEach(() => {
    if (prepaymentAccount) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/prepayment-accounts/${prepaymentAccount.id}`,
      }).then(() => {
        prepaymentAccount = undefined;
      });
    }
    if (amortizationRecurrence) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/amortization-recurrences/${amortizationRecurrence.id}`,
      }).then(() => {
        amortizationRecurrence = undefined;
      });
    }
  });
   */

  it('AmortizationSequences menu should load AmortizationSequences page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('amortization-sequence');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('AmortizationSequence').should('exist');
    cy.url().should('match', amortizationSequencePageUrlPattern);
  });

  describe('AmortizationSequence page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(amortizationSequencePageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create AmortizationSequence page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/amortization-sequence/new$'));
        cy.getEntityCreateUpdateHeading('AmortizationSequence');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', amortizationSequencePageUrlPattern);
      });
    });

    describe('with existing value', () => {
      /* Disabled due to incompatibility
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/amortization-sequences',
          body: {
            ...amortizationSequenceSample,
            prepaymentAccount: prepaymentAccount,
            amortizationRecurrence: amortizationRecurrence,
          },
        }).then(({ body }) => {
          amortizationSequence = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/amortization-sequences+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/amortization-sequences?page=0&size=20>; rel="last",<http://localhost/api/amortization-sequences?page=0&size=20>; rel="first"',
              },
              body: [amortizationSequence],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(amortizationSequencePageUrl);

        cy.wait('@entitiesRequestInternal');
      });
       */

      beforeEach(function () {
        cy.visit(amortizationSequencePageUrl);

        cy.wait('@entitiesRequest').then(({ response }) => {
          if (response.body.length === 0) {
            this.skip();
          }
        });
      });

      it('detail button click should load details AmortizationSequence page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('amortizationSequence');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', amortizationSequencePageUrlPattern);
      });

      it('edit button click should load edit AmortizationSequence page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('AmortizationSequence');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', amortizationSequencePageUrlPattern);
      });

      it.skip('edit button click should load edit AmortizationSequence page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('AmortizationSequence');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', amortizationSequencePageUrlPattern);
      });

      it.skip('last delete button click should delete instance of AmortizationSequence', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('amortizationSequence').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', amortizationSequencePageUrlPattern);

        amortizationSequence = undefined;
      });
    });
  });

  describe('new AmortizationSequence page', () => {
    beforeEach(() => {
      cy.visit(`${amortizationSequencePageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('AmortizationSequence');
    });

    it.skip('should create an instance of AmortizationSequence', () => {
      cy.get(`[data-cy="prepaymentAccountGuid"]`)
        .type('e2a0b445-0970-4449-a2ea-772e29a322a8')
        .invoke('val')
        .should('match', new RegExp('e2a0b445-0970-4449-a2ea-772e29a322a8'));

      cy.get(`[data-cy="recurrenceGuid"]`)
        .type('ea7d9cec-8b76-4d6e-a279-e9279b63e84a')
        .invoke('val')
        .should('match', new RegExp('ea7d9cec-8b76-4d6e-a279-e9279b63e84a'));

      cy.get(`[data-cy="sequenceNumber"]`).type('80443').should('have.value', '80443');

      cy.get(`[data-cy="particulars"]`).type('multi-tasking Lesotho').should('have.value', 'multi-tasking Lesotho');

      cy.get(`[data-cy="currentAmortizationDate"]`).type('2022-08-01').blur().should('have.value', '2022-08-01');

      cy.get(`[data-cy="previousAmortizationDate"]`).type('2022-08-01').blur().should('have.value', '2022-08-01');

      cy.get(`[data-cy="nextAmortizationDate"]`).type('2022-08-01').blur().should('have.value', '2022-08-01');

      cy.get(`[data-cy="isCommencementSequence"]`).should('not.be.checked');
      cy.get(`[data-cy="isCommencementSequence"]`).click().should('be.checked');

      cy.get(`[data-cy="isTerminalSequence"]`).should('not.be.checked');
      cy.get(`[data-cy="isTerminalSequence"]`).click().should('be.checked');

      cy.get(`[data-cy="amortizationAmount"]`).type('81036').should('have.value', '81036');

      cy.get(`[data-cy="sequenceGuid"]`)
        .type('a00b86fe-317c-4b2b-b70a-16c2612c991d')
        .invoke('val')
        .should('match', new RegExp('a00b86fe-317c-4b2b-b70a-16c2612c991d'));

      cy.get(`[data-cy="prepaymentAccount"]`).select(1);
      cy.get(`[data-cy="amortizationRecurrence"]`).select(1);

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        amortizationSequence = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', amortizationSequencePageUrlPattern);
    });
  });
});
