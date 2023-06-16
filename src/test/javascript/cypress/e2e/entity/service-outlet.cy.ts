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

describe('ServiceOutlet e2e test', () => {
  const serviceOutletPageUrl = '/service-outlet';
  const serviceOutletPageUrlPattern = new RegExp('/service-outlet(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const serviceOutletSample = { outletCode: 'Pakistan Director Netherlands', outletName: 'infomediaries Colorado' };

  let serviceOutlet;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/service-outlets+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/service-outlets').as('postEntityRequest');
    cy.intercept('DELETE', '/api/service-outlets/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (serviceOutlet) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/service-outlets/${serviceOutlet.id}`,
      }).then(() => {
        serviceOutlet = undefined;
      });
    }
  });

  it('ServiceOutlets menu should load ServiceOutlets page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('service-outlet');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('ServiceOutlet').should('exist');
    cy.url().should('match', serviceOutletPageUrlPattern);
  });

  describe('ServiceOutlet page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(serviceOutletPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create ServiceOutlet page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/service-outlet/new$'));
        cy.getEntityCreateUpdateHeading('ServiceOutlet');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', serviceOutletPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/service-outlets',
          body: serviceOutletSample,
        }).then(({ body }) => {
          serviceOutlet = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/service-outlets+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/service-outlets?page=0&size=20>; rel="last",<http://localhost/api/service-outlets?page=0&size=20>; rel="first"',
              },
              body: [serviceOutlet],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(serviceOutletPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details ServiceOutlet page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('serviceOutlet');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', serviceOutletPageUrlPattern);
      });

      it('edit button click should load edit ServiceOutlet page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('ServiceOutlet');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', serviceOutletPageUrlPattern);
      });

      it.skip('edit button click should load edit ServiceOutlet page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('ServiceOutlet');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', serviceOutletPageUrlPattern);
      });

      it('last delete button click should delete instance of ServiceOutlet', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('serviceOutlet').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', serviceOutletPageUrlPattern);

        serviceOutlet = undefined;
      });
    });
  });

  describe('new ServiceOutlet page', () => {
    beforeEach(() => {
      cy.visit(`${serviceOutletPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('ServiceOutlet');
    });

    it('should create an instance of ServiceOutlet', () => {
      cy.get(`[data-cy="outletCode"]`).type('reboot').should('have.value', 'reboot');

      cy.get(`[data-cy="outletName"]`).type('holistic Hat Pike').should('have.value', 'holistic Hat Pike');

      cy.get(`[data-cy="town"]`).type('payment COM Fall').should('have.value', 'payment COM Fall');

      cy.get(`[data-cy="parliamentaryConstituency"]`).type('driver').should('have.value', 'driver');

      cy.get(`[data-cy="gpsCoordinates"]`).type('Sausages Libyan aggregate').should('have.value', 'Sausages Libyan aggregate');

      cy.get(`[data-cy="outletOpeningDate"]`).type('2022-03-01').blur().should('have.value', '2022-03-01');

      cy.get(`[data-cy="regulatorApprovalDate"]`).type('2022-03-01').blur().should('have.value', '2022-03-01');

      cy.get(`[data-cy="outletClosureDate"]`).type('2022-03-01').blur().should('have.value', '2022-03-01');

      cy.get(`[data-cy="dateLastModified"]`).type('2022-03-01').blur().should('have.value', '2022-03-01');

      cy.get(`[data-cy="licenseFeePayable"]`).type('42387').should('have.value', '42387');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        serviceOutlet = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', serviceOutletPageUrlPattern);
    });
  });
});
