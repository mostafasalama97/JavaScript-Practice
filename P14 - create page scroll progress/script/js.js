let scroll = document.getElementById('scoller');
let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
console.log(document.documentElement.scrollHeight);
console.log(document.documentElement.clientHeight);
console.log(height);
window.addEventListener('scroll', ()=> {

    let scrolltop = document.documentElement.scrollTop;
    console.log(document.documentElement.scrollTop);
    scroll.style.width = `${(scrolltop / height) * 100}%`;
});