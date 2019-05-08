function fetchRequest(url) {
    // Retourneert een promise object met de JSON response
    // omgezet naar 'native Javascript objects'
    return fetch(url).then(body => body.json());
}

class Menu {
    constructor(id, naam, type, omschrijving, samenstelling, prijs) {
        this._id = id;
        this._naam = naam;
        this._type = type;
        this._omschrijving = omschrijving;
        this._samenstelling = samenstelling;
        this._prijs = prijs;
    }

    get id() {
        return this._id;
    }
    get naam() {
        return this._naam;
    }
    get type() {
        return this._type;
    }
    get omschrijving() {
        return this._omschrijving;
    }
    get samenstelling() {
        return this._samenstelling;
    }
    get prijs() {
        return this._prijs;
    }
}

class MenusRepository {
    constructor() {
        this._menus = [];
        // Zet het volgende uit commentaar als het niet lukt om de menus op te halen uit de  JSON file
        /*
        this.menus = [new Menu(1, 'Voordeelmenu Cheese', 'Runds', 'Burger van rundvlees met cheddarkaas, ketchup, mosterd, uitjes en augurk op een speciaal hamburgerbroodje.', ['cheeseburger', 'grote friet', 'frisdrank', 'appel muffin'], 8.99)
            , new Menu(2, 'Voordeelmenu Double Cheese', 'Runds', 'Twee rundvlees burgers met twee plakken cheddarkaas, ketchup, mosterd, uitjes en augurk op een speciaal hamburgerbroodje.', ['doublecheese', 'medium friet', 'frisdrank'], 6.99)
            , new Menu(3, 'Voordeelmenu Vegetarisch', 'Vegetarisch', 'Een vegetarische Groenteburger met wortel, rode paprika, kleine erwten, groene bonen en ui, verse sla, tomaat en een frisse sandwichsaus op een sesambroodje.', ['groenteburger', 'grote friet', 'frisdrank', 'mcflurry kitkat'], 7.75)
            , new Menu(4, 'Voordeelmenu Chili McChicken', 'Kip', 'Broodje met krokante kip, frisse sla en sweet chilisaus.', ['chili mcchicken', 'kleine friet', 'frisdrank', 'appel muffin'], 6.99)
            , new Menu(5, 'Voordeelmenu Fish Filet', 'Vis', 'Visfilet met smeltkaas en tartaarsaus op een gestoomd broodje.', ['fish filet', 'medium friet', 'frisdrank', 'chocolate cookie'], 7.99)
            , new Menu(6, 'Voordeelmenu Hamburger Bacon', 'Runds', 'Hamburger Bacon: Burger van rundvlees met bacon (varkensvlees), ketchup, mosterd, uitjes en augurk op een speciaal hamburgerbroodje.', ['hamburger bacon', 'kleine friet', 'frisdrank', 'sidesalad', 'mcflurry stroopwafel'], 9.99)
            , new Menu(7, 'Voordeelmenu McWrap', 'Kip', 'Grote wrap met krokante kip, cheddar kaas, rucola, sla, tomaat en honing-mosterdsaus.', ['mcwrap honingmosterd', 'grote friet', 'frisdrank', 'appel muffin'], 9.49)
            , new Menu(8, 'Voordeelmenu Hamburger', 'Runds', 'Burger van rundvlees met ketchup, mosterd, uitjes en augurk op een speciaal hamburgerbroodje.', ['hamburger', 'medium friet', 'frisdrank', 'chocolate cookie'], 7.5)
            , new Menu(9, 'Voordeelmenu Chicken Sensation', 'Kip', 'Krokante kipfilet, honing-mosterdsaus, rode ui, ijsbergsla en tomaat op een sesam- en lijnzaadbroodje.', ['chicken sensation', 'kleine friet', 'frisdrank', 'appel muffin'], 8.5)
            , new Menu(10, 'Voordeelmenu McChicken', 'Kip', 'Malse kipfilet met een krokant laagje, sla en een frisse sandwichsaus op een sesambroodje.', ['mcchicken', 'grote friet', 'frisdrank', 'sidesalad', 'appel muffin'], 9.99)];
        */
    }

    get menus() {
        return this._menus;
    }

    addMenus(jsondata) {
        // Opvullen van de this._menus-array met Menu-objecten.
        this._menus = jsondata.map(
            menu =>
                new Menu(
                    menu.id,
                    menu.naam,
                    menu.type,
                    menu.omschrijving,
                    menu.samenstelling,
                    menu.prijs
                )
        );
    }

    getTypes() {
        // Retourneert een alfabetisch gesorteerde string-array met de menutypes.
        const setOfTypes = new Set(this._menus.map(menu => menu.type));
        return [...setOfTypes].sort();
    }

    getMenusByType(type) {
        // Retourneert een array van Menu-objecten van een bepaald type.
        if (type === 'Alles') return this._menus;
        return this._menus.filter(
            menu => menu.type.toUpperCase() === type.toUpperCase()
        );
    }
}

class MenusApp {
    constructor() {
        this.getData();
        this._count = 0;
    }
    getData() {
        // Ophalen data en afbeelden initiële webpagina.
        fetchRequest('data/voordeelmenus.json')
            .then(jsondata => {
                this._menusRepository = new MenusRepository();
                this._menusRepository.addMenus(jsondata);
                console.log(this._menusRepository.menus);
                console.log(this._menusRepository.getTypes());
                console.log(this._menusRepository.getMenusByType('Kip'));
                this.typesToHtml();
                this.menusToHtml(document.getElementById('types').value);
                this.getCartFromStorage();
            })
            .catch(rejectvalue => {
                console.log(rejectvalue);
            });
    }

    typesToHtml() {
        // Voegt de verschillende types toe aan het Select-element (initieel bevat dit enkel de optie 'Alles').
        // En zorgt ervoor dat als je een type kiest in de keuzelijst enkel
        // de menu's van dit type getoond worden.
        const types = this._menusRepository.getTypes();
        types.forEach(type => {
            document
                .getElementById('types')
                .insertAdjacentHTML(
                    'beforeend',
                    `<option value=${type}>${type}</option>`
                );
        });

        document.getElementById('types').onchange = () => {
            this.menusToHtml(document.getElementById('types').value);
        };
    }

    addItemtoCart(menuElement) {
        // AAN DEZE METHODE MOET JE NIETS WIJZIGEN!
        // We houden enkel een teller bij in 'this._count'.
        this._count++;
        this.setCartInStorage();
        this.cartToHtml();
        // Tekst van het h2-element afbeelden nl. het bestelde item.
        alert(menuElement.firstElementChild.innerText);
    }

    setCartInStorage() {
        // De teller 'this._count' opslaan onder de naam 'Cart' in localStorage.
        localStorage.setItem('Cart', this._count);
    }

    getCartFromStorage() {
        // 'Cart' ophalen uit localStorage en in 'this._count' stoppen.
        if (localStorage.getItem('Cart')) {
            this._count = localStorage.getItem('Cart');
        }
        this.cartToHtml();
    }

    cartToHtml() {
        // De Cart (is enkel teller 'this._count'), weergeven op de webpagina.
        document.getElementById('shopping-cart').innerHTML = this._count;
    }

    menusToHtml(type) {
        // Voegt alle menu's van een bepaald type toe aan de Webpagina
        // en zorgt ervoor dat als er geklikt wordt op een AddCart-button
        // de methode addItemtoCart uitgevoerd wordt.
        const menus = this._menusRepository.getMenusByType(type);
        const menusElement = document.getElementById('menus');
        menusElement.innerHTML = '';

        menus.forEach(menu => {
            this.menuToHtml(menu);
        });
    }

    menuToHtml(menu) {
        const menusElement = document.getElementById('menus');

        //html creëren voor de items waaruit het menu bestaat
        const samenstellingHTML = menu.samenstelling.reduce(
            (accumulator, currentValue) =>
                (accumulator += `<li>${currentValue}</li>`),
            ''
        );
        //html creëren voor de images
        const imagesHTML = menu.samenstelling.reduce(
            (accumulator, currentValue) =>
                (accumulator += `<img src="images/${currentValue
                    .split(' ')
                    .join('_')}.png" alt="${currentValue}">`),
            ''
        );

        //overige html creëren en invoegen in de webpagina
        menusElement.insertAdjacentHTML(
            'beforeend',
            `<div class="eenmenu">
                <h2>${menu.naam}</h2>
                <div class="flex">
                    <section class="links">
                        <p>Dit menu bestaat uit:</p>
                        <ul>
                            ${samenstellingHTML}
                        </ul>
                        <button type="button"><i class="fas fa-cart-plus"></i></button>
                    </section>
                    <section class="center">
                        <p class="prijs">${menu.prijs}</p>
                        <p>${menu.omschrijving}</p>
                    </section>
                    <section class="rechts">
                        ${imagesHTML}
                    </section>
                </div>
            </div>`
        );

        // Als er op een button geklikt wordt moet het item toegevoegd worden aan het mandje.
        const menuElement = menusElement.lastElementChild;
        const button = menuElement.querySelector('button');
        button.onclick = () => {
            this.addItemtoCart(menuElement);
        };
    }
}

function init() {
    const menusApp = new MenusApp();
}

window.onload = init;
