//decleration variables
let inele = document.getElementById('ip');
 let btnele = document.getElementById('btn');
 let para = document.getElementById('msg');

//add events to button

btnele.onclick = function() {
    let inputt = inele.value;
    
    if(inputt != ""){
        para.innerHTML += inputt ;
        para.innerHTML += `<br>`
        console.log(inputt);
        inele.value = "";
    }
}