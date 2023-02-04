let btn = document.querySelector('#btn');
let ip = document.getElementById('input');

btn.addEventListener('click',function(){

//     switch (ip) {
//         case 'password':

//         ip.type="text";
//                 // check = true;
//             break;

//             case 'text':
//                 ip.type="password"
//                 // check = false;
//             break;
    
//         default:
//             break;
//     }
// });
    // input.type='text'
    if(ip.type == "password"){
        ip.type='text';
        btn.innerHTML='hide password'
    }else{
        ip.type='password';
        btn.innerHTML='show password'
    }

});



//first way
//-------------------------------------------
// btn.addEventListener('click',togglePassword);
// function togglePassword(){
// if(btn.getAttribute('data') == "show"){
//     ip.setAttribute('type','text');
//         btn.setAttribute('data','hide');
//         btn.innerHTML='Hide Password';
       
// } else {
//     ip.setAttribute('type','password');
//         btn.setAttributes('data','show');
//         btn.innerHTML='Show Password';
// }
// }


//second way to toggle password
//---------------------------------
// btn.onclick = function(){
//     if(btn.getAttribute('data') == "show"){
//         ip.setAttribute('type','text');
//             btn.setAttribute('data','hide');
//             btn.innerHTML='Hide Password';
           
//     } else {
//         ip.setAttribute('type','password');
//             btn.setAttributes('data','show');
//             btn.innerHTML='Show Password';
//     }
// }
