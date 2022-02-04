import { entityItemSelector } from '../../support/commands';
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

describe('AgencyNotice e2e test', () => {
  const agencyNoticePageUrl = '/agency-notice';
  const agencyNoticePageUrlPattern = new RegExp('/agency-notice(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'admin';
  const password = Cypress.env('E2E_PASSWORD') ?? 'admin';
  const agencyNoticeSample = { referenceNumber: 'generating sensor', assessmentAmount: 27835, agencyStatus: 'CLEARED' };

  let agencyNotice: any;
  let settlementCurrency: any;
  let dealer: any;

  before(() => {
    cy.window().then(win => {
      win.sessionStorage.clear();
    });
    cy.visit('');
    cy.login(username, password);
    cy.get(entityItemSelector).should('exist');
  });

  beforeEach(() => {
    // create an instance at the required relationship entity:
    cy.authenticatedRequest({
      method: 'POST',
      url: '/api/settlement-currencies',
      body: {
        iso4217CurrencyCode: 'Erg',
        currencyName: 'Iraqi Dinar',
        country: 'Estonia',
        fileUploadToken: 'didactic matrix',
        compilationToken: 'cross-media',
      },
    }).then(({ body }) => {
      settlementCurrency = body;
    });
    // create an instance at the required relationship entity:
    cy.authenticatedRequest({
      method: 'POST',
      url: '/api/dealers',
      body: {
        dealerName: 'Program New',
        taxNumber: 'Investor',
        postalAddress: 'Village Customer',
        physicalAddress: 'generating',
        accountName: 'Money Market Account',
        accountNumber: 'New',
        bankersName: 'Rustic programming',
        bankersBranch: 'Incredible',
        bankersSwiftCode: 'Loan Concrete strategize',
        fileUploadToken: 'Integrated',
        compilationToken: 'Shoes',
      },
    }).then(({ body }) => {
      dealer = body;
    });
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/agency-notices+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/agency-notices').as('postEntityRequest');
    cy.intercept('DELETE', '/api/agency-notices/*').as('deleteEntityRequest');
  });

  beforeEach(() => {
    // Simulate relationships api for better performance and reproducibility.
    cy.intercept('GET', '/api/dealers', {
      statusCode: 200,
      body: [dealer],
    });

    cy.intercept('GET', '/api/settlement-currencies', {
      statusCode: 200,
      body: [settlementCurrency],
    });
  });

  afterEach(() => {
    if (agencyNotice) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/agency-notices/${agencyNotice.id}`,
      }).then(() => {
        agencyNotice = undefined;
      });
    }
  });

  afterEach(() => {
    if (settlementCurrency) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/settlement-currencies/${settlementCurrency.id}`,
      }).then(() => {
        settlementCurrency = undefined;
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
  });

  it('AgencyNotices menu should load AgencyNotices page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('agency-notice');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('AgencyNotice').should('exist');
    cy.url().should('match', agencyNoticePageUrlPattern);
  });

  describe('AgencyNotice page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(agencyNoticePageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create AgencyNotice page', () => {
        cy.get(entityCreateButtonSelector).click({ force: true });
        cy.url().should('match', new RegExp('/agency-notice/new$'));
        cy.getEntityCreateUpdateHeading('AgencyNotice');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click({ force: true });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', agencyNoticePageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/agency-notices',

          body: {
            ...agencyNoticeSample,
            settlementCurrency: settlementCurrency,
            assessor: dealer,
          },
        }).then(({ body }) => {
          agencyNotice = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/agency-notices+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [agencyNotice],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(agencyNoticePageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details AgencyNotice page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('agencyNotice');
        cy.get(entityDetailsBackButtonSelector).click({ force: true });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', agencyNoticePageUrlPattern);
      });

      it('edit button click should load edit AgencyNotice page', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('AgencyNotice');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click({ force: true });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', agencyNoticePageUrlPattern);
      });

      it('last delete button click should delete instance of AgencyNotice', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('agencyNotice').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click({ force: true });
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', agencyNoticePageUrlPattern);

        agencyNotice = undefined;
      });
    });
  });

  describe('new AgencyNotice page', () => {
    beforeEach(() => {
      cy.visit(`${agencyNoticePageUrl}`);
      cy.get(entityCreateButtonSelector).click({ force: true });
      cy.getEntityCreateUpdateHeading('AgencyNotice');
    });

    it('should create an instance of AgencyNotice', () => {
      cy.get(`[data-cy="referenceNumber"]`).type('Architect Music').should('have.value', 'Architect Music');

      cy.get(`[data-cy="referenceDate"]`).type('2022-02-03').should('have.value', '2022-02-03');

      cy.get(`[data-cy="taxCode"]`).type('Fish Centralized implement').should('have.value', 'Fish Centralized implement');

      cy.get(`[data-cy="assessmentAmount"]`).type('69287').should('have.value', '69287');

      cy.get(`[data-cy="agencyStatus"]`).select('NOT_CLEARED');

      cy.get(`[data-cy="settlementCurrency"]`).select(1);
      cy.get(`[data-cy="assessor"]`).select(1);

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        agencyNotice = response!.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should('match', agencyNoticePageUrlPattern);
    });
  });
});
