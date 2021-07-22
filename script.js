let cart = [];
let qntdPizza = 1;
let infoPizza = 0;

const qSelector = (element) => document.querySelector(element);
const qSelectorAll = (element) => document.querySelectorAll(element);

pizzaJson.map((item, index) => {
    let pizzaItem = qSelector('.models .pizza-item').cloneNode(true);

    pizzaItem.setAttribute('data-key', index);
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
    pizzaItem.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();

        let key = e.target.closest('.pizza-item').getAttribute('data-key');
        qntdPizza = 1;
        infoPizza = key;

        qSelector('.pizzaBig img').src = pizzaJson[key].img;
        qSelector('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;
        qSelector('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        qSelector('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;

        qSelector('.pizzaInfo--size.selected').classList.remove('selected');
        qSelectorAll('.pizzaInfo--size').forEach((size, sizeIndex) => {
            if (sizeIndex === 2) {
                size.classList.add('selected');
            }
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
        });

        qSelector('.pizzaInfo--qt').innerHTML = qntdPizza;

        qSelector('.pizzaWindowArea').style.opacity = 0;
        qSelector('.pizzaWindowArea').style.display = 'flex';
        setTimeout(() => {
            qSelector('.pizzaWindowArea').style.opacity = 1;
        }, 200);
    });

    qSelector('.pizza-area').append(pizzaItem);
});

function closeWindow() {
    qSelector('.pizzaWindowArea').style.opacity = 0;
    setTimeout(() => {
        qSelector('.pizzaWindowArea').style.display = 'none';
    }, 500);
}

qSelectorAll('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item) => {
    item.addEventListener('click', closeWindow);
});

qSelector('.pizzaInfo--qtmenos').addEventListener('click', () => {
    if (qntdPizza > 1) {
        qntdPizza--;
        qSelector('.pizzaInfo--qt').innerHTML = qntdPizza;
    } else
        closeWindow();
});

qSelector('.pizzaInfo--qtmais').addEventListener('click', () => {
    qntdPizza++;
    qSelector('.pizzaInfo--qt').innerHTML = qntdPizza;
});

qSelectorAll('.pizzaInfo--size').forEach((size, sizeIndex) => {
    size.addEventListener('click', (e) => {
        qSelector('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
    });
});

qSelector('.pizzaInfo--addButton').addEventListener('click', () => {
    let sizePizza = parseInt(qSelector('.pizzaInfo--size.selected').getAttribute('data-key'));

    let identifier = pizzaJson[infoPizza].id + '@' + sizePizza;
    let index = cart.findIndex((item) => item.identifier === identifier);

    if (index > -1) {
        cart[index].qntd += qntdPizza;
    } else {
        cart.push({
            identifier,
            id: pizzaJson[infoPizza].id,
            size: sizePizza,
            qntd: qntdPizza
        });
    }

    updateCart();
    closeWindow();
});

function updateCart() {
    if (cart.length > 0) {
        qSelector('aside').classList.add('show');
        qSelector('.cart').innerHTML = '';

        for (let i in cart) {
            let pizzaItem = pizzaJson.find((item) => item.id === cart[i].id);
            let cartItem = qSelector('.models .cart--item').cloneNode(true);

            let pizzaSizeName;
            switch (cart[i].size) {
                case 0:
                    pizzaSizeName = 'P';
                    break;
                case 1:
                    pizzaSizeName = 'M';
                    break;
                case 2:
                    pizzaSizeName = 'G';
                    break;
            }
            let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`;

            cartItem.querySelector('img').src = pizzaItem.img;
            cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName;
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qntd;

            qSelector('.cart').append(cartItem);
        }

    } else {
        qSelector('aside').classList.remove('show');
    }
}