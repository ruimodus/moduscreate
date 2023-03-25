describe("Open Modus Website, go to SERVICES and go READ CASE STUDY", () => {
  let baseUrl = "https://moduscreate.com";

  let urls = {
    services: "",
    platModernization: "",
    security: "",
  };

  before(() => {
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });
  });

  it("HOME PAGE - Opens Modus Create website and clicks on the SERVICES option", () => {
    cy.visit(baseUrl);

    cy.get('.nav-link[href*="' + baseUrl + '/services/"]:visible').as(
      "servicesLink"
    );
    cy.get("@servicesLink")
      .invoke("attr", "href")
      .then((href) => {
        urls.services = href;
      });
    cy.get("@servicesLink").click();
    cy.url().should("include", "/services");
  });

  it("SERVICES - After reaching SERVICES, verify some elements and click on READ CASE STUDY on Case Study block", () => {
    cy.visit(urls.services);
    cy.get('a[href*="/services/platform-modernization"]').as(
      "platModernization"
    );
    cy.get("@platModernization")
      .invoke("attr", "href")
      .then((href) => {
        urls.platModernization = href;
      });
    cy.get("@platModernization").click();
    cy.url().should("include", "/services/platform-modernization");
  });
  it("PLATFORM MODERNIZATION - Assert some items on the Platform Modernization page and go to Security", () => {
    cy.visit(baseUrl + urls.platModernization);
    cy.get('div[class*="fl-photo fl-photo-align-center"]').as(
      "breakTitleBanner"
    );
    cy.get('div[class*="fl-photo fl-photo-align-center"]').should("be.visible");

    cy.get('a[href*="https://moduscreate.com/services/security/"]').as(
      "security"
    );
    cy.get("@security")
      .invoke("attr", "href")
      .then((href) => {
        urls.security = href;
      });
    cy.get("@security").click();
    cy.url().should("include", "/services/platform-modernization/security/");
  });
  it("PLATFORM MODERNIZATION - Go to the Explore Partnerships page just to assert its working", () => {
    cy.visit(baseUrl + urls.platModernization);
    cy.get('a[href*="https://moduscreate.com/partners/"]')
      .find.value("Explore Partnerships →")
      .as("partners");
    cy.get("@partners").click();
    cy.url().should("include", "/partners");
  });
});
