class Schil {
    constructor(naam, aantalElektronen) {
        this._naam = naam;
        this._aantalElektronen = aantalElektronen;
    }
    get naam() {
        return this._naam;
    }
    get aantalElektronen() {
        return this._aantalElektronen;
    }
}

class ElektronenApp {
    constructor(window) {}

    berekenElektronenconf(aantalElektronen) {
        const bohrAtoommodel = new Map();
        bohrAtoommodel.set('K', 2);
        bohrAtoommodel.set('L', 8);
        bohrAtoommodel.set('M', 18);
        bohrAtoommodel.set('N', 32);
        bohrAtoommodel.set('O', 32);
        bohrAtoommodel.set('P', 32);
        bohrAtoommodel.set('Q', 32);
        
        const elektronenconf= [];

        let resterendAantal=aantalElektronen;
        bohrAtoommodel.forEach((maxvalue, key) => {
            if (resterendAantal > maxvalue) {
                elektronenconf.push(new Schil(key,maxvalue));
                resterendAantal -= maxvalue;
            } else {
                elektronenconf.push(new Schil(key,resterendAantal));
                resterendAantal =0;
            }
        });
        return elektronenconf;
    }

    toHtml(configuratie) {
        console.log(configuratie);
        document.getElementById('resultaat').innerHTML = '';
        configuratie.forEach(schil => {
            document
                .getElementById('resultaat')
                .insertAdjacentHTML(
                    'beforeend',
                    `<p><strong>${schil.naam}</strong>: ${
                        schil.aantalElektronen
                    }`
                );
        });
    }
}

const init = function() {
    const elektronenApp = new ElektronenApp(this);
    document.getElementById('bereken').onclick = () => {
        const aantalElektronen = parseInt(
            document.getElementById('aantalElektronen').value
        );
        const conf = elektronenApp.berekenElektronenconf(aantalElektronen);
        elektronenApp.toHtml(conf);
    };
};

window.onload = init;
