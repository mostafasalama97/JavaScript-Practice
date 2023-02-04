let r = document.getElementById('row');
let c = document.getElementById('col');
let btn = document.getElementById('btn');

btn.addEventListener('click',creatTable);

function creatTable() {
    let body = document.body
    let table = document.createElement('table');

    for(let i = 0 ; i < +r.value ; i++) {
        let tr = document.createElement('tr');
        table.appendChild(tr);
        for(let j = 0 ; j < +c.value ; j++){
            let td = document.createElement('td');
            let txt = document.createTextNode("table created");
            td.appendChild(txt);
            tr.appendChild(td);
        }
    }
body.appendChild(table);
}

creatTable()