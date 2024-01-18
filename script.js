document.addEventListener('DOMContentLoaded', function () {
    const grigliaDiv = document.getElementById('griglia');
    const buttonGenera = document.getElementById('generaGriglia');
    const difficoltaSelect = document.getElementById('difficolta');

    let numeriBomba = [];
    let punteggio = 0;
    let gameOver = false;

    buttonGenera.addEventListener('click', function () {
        const difficolta = difficoltaSelect.value;

        // Inizialmente genera la griglia vuota
        generaGriglia(difficolta);

        // Genera numeri casuali per le bombe
        numeriBomba = generaNumeriBomba(difficolta);
        console.log("Numeri bomba:", numeriBomba);
    });

    function generaGriglia(difficolta) {
        grigliaDiv.innerHTML = '';
        punteggio = 0;
        gameOver = false;

        const numCaselle = getNumeroCaselle(difficolta);

        for (let i = 1; i <= numCaselle; i++) {
            const cella = document.createElement('div');
            cella.className = 'cella';
            cella.addEventListener('click', function () {
                if (!gameOver) {
                    handleClick(i);
                }
            });
            grigliaDiv.appendChild(cella);
        }

        grigliaDiv.style.gridTemplateColumns = `repeat(${Math.sqrt(numCaselle)}, 1fr)`;
    }

    function generaNumeriBomba(difficolta) {
        const numCaselle = getNumeroCaselle(difficolta);
        const numeriBomba = [];

        while (numeriBomba.length < 16) {
            const numeroRandom = Math.floor(Math.random() * numCaselle) + 1;
            if (!numeriBomba.includes(numeroRandom)) {
                numeriBomba.push(numeroRandom);
            }
        }

        return numeriBomba;
    }

    function handleClick(numeroCella) {
        const cellaCliccata = document.querySelector(`.cella:nth-child(${numeroCella})`);

        if (numeriBomba.includes(numeroCella)) {
            // Bomba colpita, gioco finito
            cellaCliccata.style.backgroundColor = 'red';
            gameOver = true;
            alert("Boom! Hai colpito una bomba. Il tuo punteggio è: " + punteggio);
        } else {
            // Cella sicura
            cellaCliccata.style.backgroundColor = 'lightblue';
            punteggio++;

            if (punteggio === getNumeroCaselle(difficolta) - numeriBomba.length) {
                // Tutte le celle non bomba sono state rivelate, gioco finito
                gameOver = true;
                alert("Hai vinto! Il tuo punteggio è: " + punteggio);
            }
        }
    }

    function getNumeroCaselle(difficolta) {
        if (difficolta === 'Facile') {
            return 100;
        } else if (difficolta === 'Medio') {
            return 81;
        } else {
            return 49;
        }
    }
});
