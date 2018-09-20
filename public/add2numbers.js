function kalkulator() {
    let number = document.querySelectorAll('input');
    let i1 = parseInt(number[0].value);
    let i2 = parseInt(number[1].value);
    number[2].value = i1 + i2;
}
let button = document.querySelector('button');
button.addEventListener('click', kalkulator);