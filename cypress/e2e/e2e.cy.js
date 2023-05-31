import { createHorde } from 'gremlins.js';

describe('visit', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('visit homepage check', () => {
        cy.get(':nth-child(1) > .pokemon-name').should('contain', 'Bulbasaur');
    });

    it('check Bulbasaur page', () => {
        cy.get(':nth-child(1) > .pokemon-name').click();
        cy.get('#pokemon-name').should('contain', 'Bulbasaur');
    });

    it('check search bar', () => {
        cy.get('#search-bar').type('pikachu');
        cy.get('.pokemon-name').contains('Pikachu');
    });

    it('check next button', () => {
        cy.get('#next-button').click();
        cy.get('#pokedex-interval').contains('36 - 70');
    });

    it('check page limit equal 15', () => {
        cy.get('#limit-input').clear().type('15');
        cy.get(':nth-child(15) > .pokemon-name').contains('Beedrill');
    });
});

describe('Run gremlins.js inside a cypress test', () => {
    let horde;
    beforeEach(() => {
        cy.visit('/');
        cy.window().then((testedWindow) => {
            horde = createHorde({ window: testedWindow });
        });
    });
    it('should run gremlins.js', () => {
        horde.unleash();
        setTimeout(() => {
            horde.stop();
        }, 10000);
    });
});
