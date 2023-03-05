describe('Navigation', () => {
  describe('Static pages', () => {
    it('should navigate to the root page', () => {
      cy.visit('http://localhost:3000/');
    });
  });
});
