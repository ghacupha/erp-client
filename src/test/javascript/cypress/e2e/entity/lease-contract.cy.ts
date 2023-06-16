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

describe('LeaseContract e2e test', () => {
  const leaseContractPageUrl = '/lease-contract';
  const leaseContractPageUrlPattern = new RegExp('/lease-contract(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const leaseContractSample = {
    bookingId: 'program Oklahoma',
    leaseTitle: 'maximize navigate Rustic',
    identifier: 'f50fa84a-2f44-4c9d-8578-f4381c9fadd2',
    commencementDate: '2023-01-09',
    terminalDate: '2023-01-08',
  };

  let leaseContract;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/lease-contracts+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/lease-contracts').as('postEntityRequest');
    cy.intercept('DELETE', '/api/lease-contracts/*').as('deleteEntityRequest');
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
  });

  it('LeaseContracts menu should load LeaseContracts page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('lease-contract');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('LeaseContract').should('exist');
    cy.url().should('match', leaseContractPageUrlPattern);
  });

  describe('LeaseContract page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(leaseContractPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create LeaseContract page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/lease-contract/new$'));
        cy.getEntityCreateUpdateHeading('LeaseContract');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', leaseContractPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/lease-contracts',
          body: leaseContractSample,
        }).then(({ body }) => {
          leaseContract = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/lease-contracts+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/lease-contracts?page=0&size=20>; rel="last",<http://localhost/api/lease-contracts?page=0&size=20>; rel="first"',
              },
              body: [leaseContract],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(leaseContractPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details LeaseContract page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('leaseContract');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', leaseContractPageUrlPattern);
      });

      it('edit button click should load edit LeaseContract page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('LeaseContract');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', leaseContractPageUrlPattern);
      });

      it.skip('edit button click should load edit LeaseContract page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('LeaseContract');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', leaseContractPageUrlPattern);
      });

      it('last delete button click should delete instance of LeaseContract', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('leaseContract').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', leaseContractPageUrlPattern);

        leaseContract = undefined;
      });
    });
  });

  describe('new LeaseContract page', () => {
    beforeEach(() => {
      cy.visit(`${leaseContractPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('LeaseContract');
    });

    it('should create an instance of LeaseContract', () => {
      cy.get(`[data-cy="bookingId"]`).type('calculate').should('have.value', 'calculate');

      cy.get(`[data-cy="leaseTitle"]`).type('Ukraine virtual').should('have.value', 'Ukraine virtual');

      cy.get(`[data-cy="identifier"]`)
        .type('33882258-5bb5-4e30-b343-c1d9b5eaf042')
        .invoke('val')
        .should('match', new RegExp('33882258-5bb5-4e30-b343-c1d9b5eaf042'));

      cy.get(`[data-cy="description"]`).type('Bacon Franc vortals').should('have.value', 'Bacon Franc vortals');

      cy.get(`[data-cy="commencementDate"]`).type('2023-01-09').blur().should('have.value', '2023-01-09');

      cy.get(`[data-cy="terminalDate"]`).type('2023-01-08').blur().should('have.value', '2023-01-08');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        leaseContract = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', leaseContractPageUrlPattern);
    });
  });
});
