const qSelector = (element) => document.querySelector(element);
const qSelectorAll = (element) => document.querySelectorAll(element);

pizzaJson.map((item, index) => {
    let pizzaItem = qSelector('.models .pizza-item').cloneNode(true);

    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
    pizzaItem.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();
        qSelector('.pizzaWindowArea').style.opacity = 0;
        qSelector('.pizzaWindowArea').style.display = 'flex';
        setTimeout(() => {
            qSelector('.pizzaWindowArea').style.opacity = 1;
        }, 200);
    });

    qSelector('.pizza-area').append(pizzaItem);
});