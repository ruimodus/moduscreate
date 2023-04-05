describe("Open Modus Create website and try to cover all the options in the SERVICES department ", () => {
  let contact = {
    firstName: "Rui",
    lastName: "Barbosa",
    email: "rui.barbosa@moduscreate.com",
    companyName: "Rui Barbosa Services",
    industry: "IT",
    whatDo: "Atlassian",
    anythingElse: "This is a cypress automation test 123 !@#",
  };

  let playbookEmail = "civzrqdupujdhztoec@tcwlx.com";

  let baseUrl = "https://moduscreate.com";

  let urls = {
    services: "",
    strategy: "",
    talkToExpert: "",
    playBook: "",
    ourWork: "",
    featuredStudy: "",
    stateOfDigital: "",
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

  it("SERVICES - After reaching SERVICES, verify some elements and click on Learn More from the Strategy block", () => {
    cy.visit(urls.services);
    cy.get('a[href*="/services/strategy/"]').as("learnMoreLink");
    cy.get("@learnMoreLink")
      .invoke("attr", "href")
      .then((href) => {
        urls.strategy = href;
      });
    cy.get("@learnMoreLink").click();
    cy.url().should("include", "/services/strategy");
  });

  it("STRATEGY - On the Strategy page, verify some elements from the page and click on Talk to Expert button on the top Banner", () => {
    cy.visit(baseUrl + urls.strategy);
    cy.get("span[class*=fl-heading-text").contains("Product Strategy");
    cy.get("span[class*=fl-heading-text").contains("Omnichannel CX");
    cy.get("span[class*=fl-heading-text").contains("Transformation Assessment");
    cy.get("span[class*=fl-heading-text").contains("Architecture Planning");
    cy.get("span[class*=fl-heading-text").contains("Product Portfolio Review");
    cy.get("span[class*=fl-heading-text").contains("Cloud State Mapping");
    cy.get('a[href*="' + baseUrl + '/contact"]').as("contactUs");
    cy.get("@contactUs")
      .invoke("attr", "href")
      .then((href) => {
        urls.talkToExpert = href;
      });
    cy.get('span[class*="fl-button-text"]')
      .contains("Talk to an Expert")
      .click();
    cy.url().should("include", "/contact/");
  });

  it("CONTACT US - Opens the Contact Us page, checks if all fields are empty of have default values and fills them with info", () => {
    cy.visit(urls.talkToExpert);
    cy.get('input[name*="firstname"]').as("firstName").should("be.empty");
    cy.get('input[name*="lastname"]').as("lastName").should("be.empty");
    cy.get('input[name*="email"]').as("email").should("be.empty");
    cy.get('input[name*="company"]').as("company").should("be.empty");
    cy.get('input[name*="industry"]').as("industry").should("be.empty");
    cy.get('select[name*="what_can_we_do_for_you"]').as("whatCanWeDo");
    cy.get('textarea[name*="message"]').as("message").should("be.empty");

    cy.get("@firstName").type(contact.firstName);
    cy.get("@lastName").type(contact.lastName);
    cy.get("@email").type(contact.email);
    cy.get("@company").type(contact.companyName);
    cy.get("@industry").type(contact.industry);
    cy.get("@whatCanWeDo").select(contact.whatDo);
    cy.get("@message").type(contact.anythingElse);
  });

  it("STRATEGY - Goes back to Strategy page and goes to the Innovation Playbook page", () => {
    cy.visit(baseUrl + urls.strategy);
    cy.get('a[href*="' + baseUrl + '/insights/innovation-playbook/"]').as(
      "playBook"
    );
    cy.get("@playBook")
      .invoke("attr", "href")
      .then((href) => {
        urls.playBook = href;
      });
    cy.get('a[href*="' + baseUrl + '/insights/innovation-playbook/"]').invoke(
      "removeAttr",
      "target"
    );
    cy.get('span[class*="fl-button-text"]')
      .contains("Download Innovation Playbook")
      .click();
    cy.url().should("include", "innovation-playbook");
  });

  it("INNOVATION PLAYBOOK - Fill the email to download Innovation Playbook", () => {
    cy.visit(urls.playBook);
    cy.get('input[name*="email"]').as("playbookEmail").type(playbookEmail);
    cy.get('input[type*="submit"]')
      .contains("Download the Innovation Playbook")
      .click();
  });

  it('STRATEGY - After checking Innovation Playbook, go back to Strategy and this time check the "See Our Work" page', () => {
    cy.visit(baseUrl + urls.strategy);
    cy.get('a[class*="bx-pager-link"]').contains("1").click();
    cy.get('a[class*="bx-pager-link"]').contains("2").click();
    cy.get('a[class*="bx-pager-link"]').contains("3").click();
    cy.get('a[class*="bx-pager-link"]').contains("4").click();
    cy.get('a[class*="bx-pager-link"]').contains("5").click();
    cy.get('a[class*="bx-pager-link"]').contains("6").click();
    cy.get('a[href*="/work/"').as("ourWork");
    cy.get("@ourWork")
      .invoke("attr", "href")
      .then((href) => {
        urls.ourWork = href;
      });
    cy.get('span[class*="fl-button-text"]').contains("See Our Work").click();
    cy.url().should("include", "/work/");
  });

  it("OUR WORK - On the Our Work page, assert some links and click on the Featured one", () => {
    cy.visit(urls.ourWork);
    cy.get('a[href*="' + baseUrl + '/case-study/zeus-haskell/"]').contains(
      "Zeus Logics — Building a SaaS Platform with Haskell"
    );
    cy.get(
      'a[href*="' + baseUrl + '/case-study/audi-business-innovation-avp/"'
    ).as("featuredStudy");
    cy.get("@featuredStudy")
      .invoke("attr", "href")
      .then((href) => {
        urls.featuredStudy = href;
      });
    cy.get('a[class*="fl-post-feed-more"').contains("Read Case Study").click();
    cy.url().should("include", "/audi-business-innovation-avp/");
  });

  it("OUR WORK - Click on the Load More button", () => {
    cy.visit(urls.ourWork);
    cy.get('span[class*="fl-button-text"]').contains("Load More").click();
  });

  it("STRATEGY - Go to the Download Report Page", () => {
    cy.visit(baseUrl + urls.strategy);
    cy.get(
      'a[href*="' + baseUrl + '/insights/2022-digital-transformation-report/"]'
    ).as("stateOfDigital");
    cy.get("@stateOfDigital")
      .invoke("attr", "href")
      .then((href) => {
        urls.stateOfDigital = href;
      });
    cy.get(
      'a[href*="' + baseUrl + '/insights/2022-digital-transformation-report/"]'
    ).invoke("removeAttr", "target");
    cy.get('span[class*="fl-button-text"]').contains("Download Report").click();
    cy.url().should("include", "digital-transformation-report");
  });

  it("DIGITAL TRANSFORMATION - Set the email on the download field and click on Download", () => {
    cy.visit(urls.stateOfDigital);
    cy.get("#email-8a96bc13-0255-4fe7-8047-31ff666e85ed").as("email");
    cy.get("@email").type(contact.email);
    cy.get('input[type*="submit"]').contains("Download").click();
  });

  it("STRATEGY - Verify the More from Our Blogs links then go back and click on Read More Posts", () => {
    cy.visit(baseUrl + urls.strategy);
    cy.get(
      'a[href*="' +
        baseUrl +
        '/blog/new-tools-wont-solve-your-process-problems/"]'
    )
      .contains("New Tools Won")
      .click();
    cy.url().should("include", "/new-tools-wont");
    cy.visit(baseUrl + urls.strategy);
    cy.get(
      'a[href*="' + baseUrl + '/blog/product-thinking-the-art-of-outcomes/"]'
    )
      .contains("Product Thinking")
      .click();
    cy.url().should("include", "/product-thinking");
    cy.visit(baseUrl + urls.strategy);
    cy.get('span[class*="fl-button-text"]').contains("Read More Posts").click();
  });
});
