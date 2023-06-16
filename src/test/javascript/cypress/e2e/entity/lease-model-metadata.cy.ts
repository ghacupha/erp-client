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

describe('LeaseModelMetadata e2e test', () => {
  const leaseModelMetadataPageUrl = '/lease-model-metadata';
  const leaseModelMetadataPageUrlPattern = new RegExp('/lease-model-metadata(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const leaseModelMetadataSample = {
    modelTitle: 'Mauritania Computer transmit',
    modelVersion: 83448,
    annualDiscountingRate: 13262,
    commencementDate: '2023-03-27',
    terminalDate: '2023-03-28',
  };

  let leaseModelMetadata;
  let leaseContract;
  let settlementCurrency;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    // create an instance at the required relationship entity:
    cy.authenticatedRequest({
      method: 'POST',
      url: '/api/lease-contracts',
      body: {
        bookingId: 'Finland',
        leaseTitle: 'Intelligent',
        identifier: '2d9b55ad-1320-4db1-bdda-bfb954d28532',
        description: 'Bermuda',
        commencementDate: '2023-01-09',
        terminalDate: '2023-01-09',
      },
    }).then(({ body }) => {
      leaseContract = body;
    });
    // create an instance at the required relationship entity:
    cy.authenticatedRequest({
      method: 'POST',
      url: '/api/settlement-currencies',
      body: {
        iso4217CurrencyCode: 'Ber',
        currencyName: 'Manat',
        country: 'Svalbard & Jan Mayen Islands',
        numericCode: 'withdrawal Square',
        minorUnit: 'Shirt reboot Generic',
        fileUploadToken: 'Tasty relationships CSS',
        compilationToken: 'iterate Chips',
      },
    }).then(({ body }) => {
      settlementCurrency = body;
    });
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/lease-model-metadata+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/lease-model-metadata').as('postEntityRequest');
    cy.intercept('DELETE', '/api/lease-model-metadata/*').as('deleteEntityRequest');
  });

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

    cy.intercept('GET', '/api/lease-contracts', {
      statusCode: 200,
      body: [leaseContract],
    });

    cy.intercept('GET', '/api/lease-model-metadata', {
      statusCode: 200,
      body: [],
    });

    cy.intercept('GET', '/api/settlement-currencies', {
      statusCode: 200,
      body: [settlementCurrency],
    });

    cy.intercept('GET', '/api/business-documents', {
      statusCode: 200,
      body: [],
    });

    cy.intercept('GET', '/api/security-clearances', {
      statusCode: 200,
      body: [],
    });

    cy.intercept('GET', '/api/transaction-accounts', {
      statusCode: 200,
      body: [],
    });
  });

  afterEach(() => {
    if (leaseModelMetadata) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/lease-model-metadata/${leaseModelMetadata.id}`,
      }).then(() => {
        leaseModelMetadata = undefined;
      });
    }
  });

  afterEach(() => {
    if (leaseContract) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/lease-contracts/${leaseContract.id}`,
      }).then(() => {
        leaseContract = undefined;
      });
    }
    if (settlementCurrency) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/settlement-currencies/${settlementCurrency.id}`,
      }).then(() => {
        settlementCurrency = undefined;
      });
    }
  });

  it('LeaseModelMetadata menu should load LeaseModelMetadata page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('lease-model-metadata');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('LeaseModelMetadata').should('exist');
    cy.url().should('match', leaseModelMetadataPageUrlPattern);
  });

  describe('LeaseModelMetadata page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(leaseModelMetadataPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create LeaseModelMetadata page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/lease-model-metadata/new$'));
        cy.getEntityCreateUpdateHeading('LeaseModelMetadata');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', leaseModelMetadataPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/lease-model-metadata',
          body: {
            ...leaseModelMetadataSample,
            leaseContract: leaseContract,
            liabilityCurrency: settlementCurrency,
            rouAssetCurrency: settlementCurrency,
          },
        }).then(({ body }) => {
          leaseModelMetadata = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/lease-model-metadata+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/lease-model-metadata?page=0&size=20>; rel="last",<http://localhost/api/lease-model-metadata?page=0&size=20>; rel="first"',
              },
              body: [leaseModelMetadata],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(leaseModelMetadataPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details LeaseModelMetadata page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('leaseModelMetadata');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', leaseModelMetadataPageUrlPattern);
      });

      it('edit button click should load edit LeaseModelMetadata page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('LeaseModelMetadata');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', leaseModelMetadataPageUrlPattern);
      });

      it.skip('edit button click should load edit LeaseModelMetadata page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('LeaseModelMetadata');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', leaseModelMetadataPageUrlPattern);
      });

      it('last delete button click should delete instance of LeaseModelMetadata', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('leaseModelMetadata').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', leaseModelMetadataPageUrlPattern);

        leaseModelMetadata = undefined;
      });
    });
  });

  describe('new LeaseModelMetadata page', () => {
    beforeEach(() => {
      cy.visit(`${leaseModelMetadataPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('LeaseModelMetadata');
    });

    it('should create an instance of LeaseModelMetadata', () => {
      cy.get(`[data-cy="modelTitle"]`).type('morph').should('have.value', 'morph');

      cy.get(`[data-cy="modelVersion"]`).type('60607').should('have.value', '60607');

      cy.get(`[data-cy="description"]`).type('Granite redundant Representative').should('have.value', 'Granite redundant Representative');

      cy.setFieldImageAsBytesOfEntity('modelNotes', 'integration-test.png', 'image/png');

      cy.get(`[data-cy="annualDiscountingRate"]`).type('69132').should('have.value', '69132');

      cy.get(`[data-cy="commencementDate"]`).type('2023-03-28').blur().should('have.value', '2023-03-28');

      cy.get(`[data-cy="terminalDate"]`).type('2023-03-28').blur().should('have.value', '2023-03-28');

      cy.get(`[data-cy="totalReportingPeriods"]`).type('66984').should('have.value', '66984');

      cy.get(`[data-cy="reportingPeriodsPerYear"]`).type('57659').should('have.value', '57659');

      cy.get(`[data-cy="settlementPeriodsPerYear"]`).type('77402').should('have.value', '77402');

      cy.get(`[data-cy="initialLiabilityAmount"]`).type('73616').should('have.value', '73616');

      cy.get(`[data-cy="initialROUAmount"]`).type('5116').should('have.value', '5116');

      cy.get(`[data-cy="totalDepreciationPeriods"]`).type('93861').should('have.value', '93861');

      cy.get(`[data-cy="leaseContract"]`).select(1);
      cy.get(`[data-cy="liabilityCurrency"]`).select(1);
      cy.get(`[data-cy="rouAssetCurrency"]`).select(1);

      // since cypress clicks submit too fast before the blob fields are validated
      cy.wait(200); // eslint-disable-line cypress/no-unnecessary-waiting
      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        leaseModelMetadata = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', leaseModelMetadataPageUrlPattern);
    });
  });
});
