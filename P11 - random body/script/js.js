let btn = document.getElementById('btn');


btn.addEventListener('click',randomColor)
function randomColor(){
    let x = '#' + Math.random().toString(16).slice(2,8);
    document.body.style.backgroundColor = x;
}

randomColor()