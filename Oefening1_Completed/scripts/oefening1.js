// Gebruik in deze oefening steeds forEach, filter, map en reduce voor het doorlopen van een array
// in plaats van een klassieke for–lus.

// 1. Wat is het resultaat van de volgende uitdrukking? Leg kort uit.
if (5) {
    console.log(`I like JavaScript`);
}
// Antwoord: 'I Like JavaScript' verschijnt in de console.
// Alle gewone getallen in JavaScript zijn 'truthy' behalve 0.

// 2. Overloop alle elementen van de onderstaande array.
// Schrijf die elementen naar de console die van het type number zijn.
// Maak gebruik van forEach.
const vanalles = [1, 40, 'bob', [], false, 89];
vanalles.forEach(element => {
    if (typeof element == 'number') console.log(element);
});

// 3. Schrijf hieronder code om "Jana" op te zoeken en te verwijderen uit de array vrienden, zodat de array
// vrienden er nadien als volgt uitziet: ["Tom", "Stijn", "Emma", "Eva"]
let vrienden = ['Tom', 'Stijn', 'Jana', 'Emma', 'Eva'];
const positieJana = vrienden.indexOf('Jana');
vrienden.splice(positieJana, 1);
console.log(vrienden);

// 4. Zet onderstaande code uit commentaar
// en vervang ??? door de gepaste uitdrukking zodat het resultaat in de console 1 en 4 is.

function display(a, ...b) {
    console.log(a); // 1
    console.log(b[2]); // 4
}
display(1, 2, 3, 4);

// 5. Zet onderstaande code uit commentaar. Deze code geeft een fout als ze uitgevoerd wordt.
// Los deze fout op. De lijnen verwijderen is geen goede oplossing.

class Student {}
let myStudent = new Student();

// 6. Een werknemer heeft een naam, een aantalDagenVakantie en een aantalDagenVakantieOpgenomen.
// Schrijf een klasse Werknemer en voorzie getters en setters voor naam, aantalDagenVakantie en aantalDagenVakantieOpgenomen.
// Voeg tevens een methode aantalDagenVakantieResterend toe aan de klasse die het aantal resterende vakantiedagen retourneert.
// Creëer een object werknemer en test de methode uit door de resultaatwaarde van de methode in de console weg te schrijven.

class Werknemer {
    constructor(naam, aantalDagenVakantie, aantalDagenVakantieOpgenomen) {
        this.naam = naam;
        this.aantalDagenVakantie = aantalDagenVakantie;
        this.aantalDagenVakantieOpgenomen = aantalDagenVakantieOpgenomen;
    }

    get naam() {
        return this._naam;
    }
    set naam(value) {
        this._naam = value;
    }
    get aantalDagenVakantie() {
        return this._aantalDagenVakantie;
    }
    set aantalDagenVakantie(value) {
        this._aantalDagenVakantie = value;
    }
    get aantalDagenVakantieOpgenomen() {
        return this._aantalDagenVakantieOpgenomen;
    }
    set aantalDagenVakantieOpgenomen(value) {
        this._aantalDagenVakantieOpgenomen = value;
    }

    aantalDagenVakantieResterend() {
        return this._aantalDagenVakantie - this._aantalDagenVakantieOpgenomen;
    }
}

const werknemer = new Werknemer('Jan', 24, 10);
console.log(werknemer.aantalDagenVakantieResterend());

// 7. Vertrek van de volgende object literal. Voeg na het const statement een statement
//     toe dat een extra property 'latijnse naam' toevoegt met de waarde 'Rosa rugosa'.

const roos = {
    naam: 'Rimpelroos',
    hoogte: 150
};

roos['latijnse naam'] = 'Rosa Rugosa';
console.log(roos);

// 8. Declareer een variabele geefHoofdletter die een functie als waarde heeft. Deze functie
// heeft twee parameters genaamd tekst en positie
// en retourneert de uppercase van de letter op de gevraagde positie in de tekst.
// Voor de positie begin je niet te tellen vanaf 0, maar vanaf 1.
// Test de functie uit, door het console.log-statement uit commentaar te zetten.

const geefHoofdletter = function(tekst, positie) {
    return tekst[positie - 1].toUpperCase();
};
console.log(geefHoofdletter('abc', 2)); // B

// 9. Maak de som van de getallen op de even posities in de array. Ook hier moet je beginnen
// tellen vanaf 1.
const myArray = [3, 2, 11, 3, 3, 1];
const somGetallen = myArray.reduce(
    (accumulator, element, index) =>
        (index + 1) % 2 === 0 ? accumulator + element : accumulator,0);
console.log(somGetallen); //6

// 10. Tel het aantal paragrafen in index.html waarbij de paragraaftekst
// de letters 'de' bevat en schrijf het aantal naar de console.
const paragraafArray = [...document.getElementsByTagName('p')];
const aantal = paragraafArray.reduce(
    (accumulator, element) =>
        element.innerText.includes('de') ? (accumulator + 1) : accumulator,0);
console.log(aantal); // 3

// 11. Vervang de tekst van de laatste paragraaf in index.html nl. 'Vierde paragraaf'
// door 'Laatste paragraaf'.
const paragrafen = document.getElementsByTagName('p');
const laatsteParagraaf = paragrafen[paragrafen.length - 1];
laatsteParagraaf.innerHTML = 'Laatste paragraaf';

// 12. Schrijf de resolvevalue van onderstaande promise naar de console.
const promise = fetch('resultaat.txt').then(response => response.text());
promise.then(value => console.log(value)); // I am the resolvevalue
