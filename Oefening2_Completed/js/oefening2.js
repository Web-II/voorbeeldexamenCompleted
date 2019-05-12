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
    constructor() {
        const schillen = [['K',2],['L',8],['M',18],['N',32],['O',32],['P',32],['Q',32]]
        this._bohrAtoommodel = new Map(schillen);
    }

    berekenElektronenconf(aantalElektronen) {        
        const elektronenconf= [];
        let resterendAantal=aantalElektronen;
        this._bohrAtoommodel.forEach((maxvalue, key) => {
            if (resterendAantal > maxvalue) {
                elektronenconf.push(new Schil(key,maxvalue));
                resterendAantal -= maxvalue;
            } else {
                elektronenconf.push(new Schil(key,resterendAantal));
                resterendAantal =0;
            }
        });
        this.toHtml(elektronenconf);
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
    };
};

window.onload = init;
