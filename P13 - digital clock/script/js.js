function clock(){
    let date = new Date();
    let hours = date.getHours();
    let mins = date.getMinutes();
    let sec = date.getSeconds();
    let flag = 'AM';

    if(hours == 0 ){
        hours = 12;
    } 
    if(hours > 12) {
        hours -= 12;
        flag = 'PM';
    }

    if(hours <10) hours = '0' + hours;
    if(mins <10) mins = '0' + mins;
    if(sec <10) sec = '0' + sec;
    document.querySelector('#clock').innerHTML = `${hours}: ${mins}: ${sec}: ${flag}: `;
    setTimeout(function(){
            clock();
    },1000)
}
clock();