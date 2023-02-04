let btn = document.querySelector('#btn');
let box = document.getElementById('box');
let i = 0;
box.style.backgroundColor='green';

btn.addEventListener('click',function(){
    let arr = ['blue','yellow','white','red'];
   
        box.style.backgroundColor=arr[i];
        i++;
        
    

    if(i==4){
        i=0;
    }
    // for(let i = 0; i < arr.length ; i++){
    //     console.log(i);
    //     box.style.backgroundColor=arr[i];
    // }
        // box.style.backgroundColor='blue';
});

