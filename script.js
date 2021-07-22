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

        qSelector('.pizzaWindowArea').style.opacity = 0;
        qSelector('.pizzaWindowArea').style.display = 'flex';
        setTimeout(() => {
            qSelector('.pizzaWindowArea').style.opacity = 1;
        }, 200);
    });

    qSelector('.pizza-area').append(pizzaItem);
});