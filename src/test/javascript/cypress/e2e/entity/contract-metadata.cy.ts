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

describe('ContractMetadata e2e test', () => {
  const contractMetadataPageUrl = '/contract-metadata';
  const contractMetadataPageUrlPattern = new RegExp('/contract-metadata(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const contractMetadataSample = {
    typeOfContract: 'STAFF',
    contractStatus: 'ACTIVE',
    startDate: '2023-03-21',
    terminationDate: '2023-03-20',
    contractTitle: 'Baby',
    contractIdentifier: 'db8c2c3e-6b97-418a-b594-74f09864c4ad',
    contractIdentifierShort: 'HTTP Computers Account',
  };

  let contractMetadata;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/contract-metadata+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/contract-metadata').as('postEntityRequest');
    cy.intercept('DELETE', '/api/contract-metadata/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (contractMetadata) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/contract-metadata/${contractMetadata.id}`,
      }).then(() => {
        contractMetadata = undefined;
      });
    }
  });

  it('ContractMetadata menu should load ContractMetadata page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('contract-metadata');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('ContractMetadata').should('exist');
    cy.url().should('match', contractMetadataPageUrlPattern);
  });

  describe('ContractMetadata page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(contractMetadataPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create ContractMetadata page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/contract-metadata/new$'));
        cy.getEntityCreateUpdateHeading('ContractMetadata');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', contractMetadataPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/contract-metadata',
          body: contractMetadataSample,
        }).then(({ body }) => {
          contractMetadata = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/contract-metadata+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/contract-metadata?page=0&size=20>; rel="last",<http://localhost/api/contract-metadata?page=0&size=20>; rel="first"',
              },
              body: [contractMetadata],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(contractMetadataPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details ContractMetadata page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('contractMetadata');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', contractMetadataPageUrlPattern);
      });

      it('edit button click should load edit ContractMetadata page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('ContractMetadata');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', contractMetadataPageUrlPattern);
      });

      it.skip('edit button click should load edit ContractMetadata page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('ContractMetadata');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', contractMetadataPageUrlPattern);
      });

      it('last delete button click should delete instance of ContractMetadata', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('contractMetadata').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', contractMetadataPageUrlPattern);

        contractMetadata = undefined;
      });
    });
  });

  describe('new ContractMetadata page', () => {
    beforeEach(() => {
      cy.visit(`${contractMetadataPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('ContractMetadata');
    });

    it('should create an instance of ContractMetadata', () => {
      cy.get(`[data-cy="description"]`).type('Oregon Functionality').should('have.value', 'Oregon Functionality');

      cy.get(`[data-cy="typeOfContract"]`).select('CUSTOMER');

      cy.get(`[data-cy="contractStatus"]`).select('INACTIVE');

      cy.get(`[data-cy="startDate"]`).type('2023-03-20').blur().should('have.value', '2023-03-20');

      cy.get(`[data-cy="terminationDate"]`).type('2023-03-21').blur().should('have.value', '2023-03-21');

      cy.get(`[data-cy="commentsAndAttachment"]`)
        .type('../fake-data/blob/hipster.txt')
        .invoke('val')
        .should('match', new RegExp('../fake-data/blob/hipster.txt'));

      cy.get(`[data-cy="contractTitle"]`).type('Corporate Groves Maryland').should('have.value', 'Corporate Groves Maryland');

      cy.get(`[data-cy="contractIdentifier"]`)
        .type('c342ad91-ae96-4917-bca9-5dad624d2747')
        .invoke('val')
        .should('match', new RegExp('c342ad91-ae96-4917-bca9-5dad624d2747'));

      cy.get(`[data-cy="contractIdentifierShort"]`).type('Steel deposit').should('have.value', 'Steel deposit');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        contractMetadata = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', contractMetadataPageUrlPattern);
    });
  });
});
