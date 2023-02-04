function addNum(){
    let act=0;
    let b=0;
    
    act= f.inscr.value;
    b=act.charAt(act.length-1);

    if(b === '+' || b === '-' || b === '/' || b === '*'){
        f.inscr.value=act.substring(0,act.length-1);
        f.inscr.value+='+';
    }else {
        f.inscr.value+='+';
    }
}

function subNum(){
    let act=0;
    let b=0;
    
    act= f.inscr.value;
    b=act.charAt(act.length-1);

    if(b === '+' || b === '-' || b === '/' || b === '*'){
        f.inscr.value=act.substring(0,act.length-1);
        f.inscr.value+='-';
    }else {
        f.inscr.value+='-';
    }
}

function divNum(){
    let act=0;
    let b=0;
    
    act= f.inscr.value;
    b=act.charAt(act.length-1);

    if(b === '+' || b === '-' || b === '/' || b === '*'){
        f.inscr.value=act.substring(0,act.length-1);
        f.inscr.value+='/';
    }else {
        f.inscr.value+='/';
    }
}

function mulNum(){
    let act=0;
    let b=0;
    
    act= f.inscr.value;
    b=act.charAt(act.length-1);

    if(b === '+' || b === '-' || b === '/' || b === '*'){
        f.inscr.value=act.substring(0,act.length-1);
        f.inscr.value+='*';
    }else {
        f.inscr.value+='*';
    }
}