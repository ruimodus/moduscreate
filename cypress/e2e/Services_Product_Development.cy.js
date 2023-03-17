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
    productDevelopment: "",
    talkToExpert: "",
    dribbble: "",
    agileProduct: "",
    appDevelopment: "",
    appModernization: "",
    kickstart: "",
    guidebook: "",
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

  it("SERVICES - After reaching SERVICES, verify some elements and click on Learn More from the Product Development block", () => {
    cy.visit(urls.services);
    cy.get('a[href*="/services/product-development"]').as("learnMoreLink");
    cy.get("@learnMoreLink")
      .invoke("attr", "href")
      .then((href) => {
        urls.productDevelopment = href;
      });
    cy.get("@learnMoreLink").click({ force: true });
    cy.url().should("include", "/services/product-development");
  });

  it("PRODUCT DEVELOPMENT - On the Product Development page, click on Talk to Expert button on the top Banner", () => {
    cy.visit(baseUrl + urls.productDevelopment);
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

  it("PRODUCT DEVELOPMENT - On the Product Development page, click on the Explore Our Dribbble Portfolio under Delight your Users", () => {
    cy.visit(baseUrl + urls.productDevelopment);
    cy.get('a[href*="https://dribbble.com/moduscreate"]').as(
      "dribbblePortfolio"
    );
    cy.get("@dribbblePortfolio")
      .invoke("attr", "href")
      .then((href) => {
        urls.dribbble = href;
        cy.origin("https://dribbble.com/", () => {
          cy.visit("https://dribbble.com/moduscreate");
          cy.url().should("include", "dribbble.com");
        });
      });
  });

  it("PRODUCT DEVELOPMENT - Click on the AGILE PRODUCT DEVELOPMENT link on How we Built an APP in 6 weeks", () => {
    cy.visit(baseUrl + urls.productDevelopment);
    cy.get(
      'a[href*="https://moduscreate.com/blog/we-made-a-mobile-app-in-six-weeks-heres-how-you-can-too/"'
    ).as("agileProduct");
    cy.get("@agileProduct")
      .invoke("attr", "href")
      .then((href) => {
        urls.agileProduct = href;
      });
    cy.get("@agileProduct").click();
    cy.url().should("include", "/blog/");
  });

  it("AGILE PRODUCT DEVELOPMENT - Assert that some information is available on screen and click on the banner on Application Development", () => {
    cy.visit(urls.agileProduct);
    cy.get("h3").contains("1. Set a Goal");
    cy.get("h3").contains("2. Set Expectations");
    cy.get("h3").contains("3. Be Prepared to Iterate, Quickly");
    cy.get("h3").contains("4. Maintain Brand Consistency");

    cy.get(
      'a[href*="https://moduscreate.com/blog/category/development/"]:first'
    ).as("appDevelopment");
    cy.get("@appDevelopment")
      .invoke("attr", "href")
      .then((href) => {
        urls.appDevelopment = href;
      });

    cy.get("@appDevelopment").click();
    cy.url().should("include", "category/development");
  });

  it("DEVELOPMENT - Change the category and assert some of the links on the page", () => {
    cy.visit("https://moduscreate.com/blog/category/development/");
    cy.get("select")
      .select("development", { force: true })
      .invoke("val")
      .should("eq", "development");
    cy.get(
      'a[href*="https://moduscreate.com/blog/aws-cost-optimization-5-best-practices-for-your-business/"]:first'
    ).as("AWSlink");
    cy.get("@AWSlink").click();

    window.localStorage.setItem(
      "li_ignored",
      `[
      { id: 979239, time: ${Date.now()} },
    ]`
    );

    cy.visit("https://moduscreate.com/blog/category/development/");
    cy.get("select")
      .select("agile", { force: true })
      .invoke("val")
      .should("eq", "agile");

    cy.get(
      'a[href*="https://moduscreate.com/blog/15-features-laravel-8/"]:first'
    ).as("features");
    cy.get("@features").click();
  });

  it("APPLICATION DEVELOPMENT - Assert the Subscribe Fields at the bottom of the page and then fill them", () => {
    cy.visit(urls.appDevelopment);
    cy.get('input[name*="firstname"]').should("be.empty").as("firstname");
    cy.get('input[name*="lastname"]').should("be.empty").as("lastname");
    cy.get('input[name*="email"]').should("be.empty").as("email");
    cy.get("@firstname").type(contact.firstName);
    cy.get("@lastname").type(contact.lastName);
    cy.get("@email").type(contact.email);
  });

  it("DEVELOPMENT - Go to the Application Modernization link inside the Product Development ", () => {
    cy.visit(baseUrl + urls.productDevelopment);
    cy.get(
      'a[href*="https://moduscreate.com/services/product-development/application-modernization/"]'
    ).as("appModernization");
    cy.get("@appModernization")
      .invoke("attr", "href")
      .then((href) => {
        urls.appModernization = href;
      });
    cy.get("@appModernization").click();
    cy.url().should("include", "application-modernization");
  });

  it("DEVELOPMENT - Verify that it's possible to click on the TWEAG link on the page", () => {
    cy.visit(baseUrl + urls.productDevelopment);
    cy.origin("https://tweag.io", () => {
      cy.visit("https://tweag.io");
    });
  });

  it("DEVELOPMENT - Verify the Kickstart link on the Product Development Page", () => {
    cy.visit(baseUrl + urls.productDevelopment);
    cy.get('a[href*="https://moduscreate.com/product-kickstart/"]').as(
      "kickstart"
    );
    cy.get("@kickstart")
      .invoke("attr", "href")
      .then((href) => {
        urls.kickstart = href;
      });
    cy.get("@kickstart").click();
    cy.url().should("include", "product-kickstart");
    cy.get('a[href*="#product"]').click();
    cy.url().should("include", "#product");
    cy.visit(
      "https://moduscreate.com/services/product-development/product-kickstart/"
    );
    cy.get('a[href*="#design"]').click();
    cy.url().should("include", "#design");
    cy.visit(
      "https://moduscreate.com/services/product-development/product-kickstart/"
    );
    cy.get('a[href*="#engineering"]').click();
    cy.url().should("include", "#engineering");
  });

  it("PRODUCT DEVELOPMENT - Click on Read the Guide and validate the pages", () => {
    cy.visit(baseUrl + urls.productDevelopment);
    cy.get(
      'a[href*="https://moduscreate.com/insights/remote-product-development-guide/"]'
    ).as("guideBook");
    cy.get("@guideBook")
      .invoke("attr", "href")
      .then((href) => {
        urls.guidebook = href;
      });
    cy.get("@guideBook").click();
    cy.url().should("include", "remote-product-development-guide");
    cy.get('a[href*="#Introduction"]').click();
    cy.get('a[href*="#Toolset"]').click();
    cy.get('a[href*="#Goals"]').click();
    cy.get('a[href*="#Personas"]').click();
    cy.get('a[href*="#Journey"]').click();
    cy.get('a[href*="#Roadmap"]').click();
    cy.get('a[href*="#Wireframes"]').click();
    cy.get('a[href*="#Ecosystem"]').click();
    cy.get('a[href*="#Product"]').click();
    cy.get('a[href*="#Maintain"]').click();
    cy.get('a[href*="#Conclusion"]').click();
  });
});
