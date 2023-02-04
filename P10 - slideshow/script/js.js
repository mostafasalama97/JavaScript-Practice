
let imego = document.querySelector('#slideshow');
let arr = ['img/cairo.jfif','img/alex.jpg','img/fd.jfif'];
let i =0;
// imego.setAttribute('src','arr[i]');

function slideshow(){

    imego.setAttribute('src','arr[i]');
    if(i == arr.legnth - 1){
            i=0;
    }else {
            i++;
    }
    setTimeout(function(){
        slideshow()
    },2000);

}

slideshow()