describe("Open Modus Website, go to SERVICES and go READ CASE STUDY", () => {
  let baseUrl = "https://moduscreate.com";

  let urls = {
    services: "",
    caseStudy: "",
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
    cy.get(
      'a[href*="https://moduscreate.com/case-study/audi-business-innovation-avp/"]'
    ).as("caseStudy");
    cy.get("@caseStudy")
      .invoke("attr", "href")
      .then((href) => {
        urls.caseStudy = href;
      });
    cy.get("@caseStudy").click();
    cy.url().should("include", "/case-study/");
  });

  it("CASE STUDY - Validates some elements of the page, click on the arrows on the GT Avp block and try to identify the Youtube embed", () => {
    cy.visit(urls.caseStudy);
    cy.get('img[class*="fl-slideshow-image-img"]').as("slideShow");
    cy.get("@slideShow").trigger("mouseenter").click();
    cy.get('a[class*="fl-slideshow-nav-next"]').click();
    cy.get('a[class*="fl-slideshow-nav-prev"]').click();
    cy.get('div[class*="fl-row-content-wrap"]').should("be.visible");
    //cy.get('button[class*="ytp-large-play-button ytp-button ytp-large-play-button-red-bg"]').click();
  });
});
