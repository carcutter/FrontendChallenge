describe("Employee List Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3002/");
  });

  it("should display the main elements", () => {
    cy.contains("h1", "Employee List").should("be.visible");
    cy.get("a").contains("Create").should("be.visible");
  });

  it("should display the loading message", () => {
    cy.get("span").contains("loading").should("be.visible");
  });
});