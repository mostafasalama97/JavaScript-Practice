function showit(){
    let theText = document.getElementById("myoption").value;
    let theImg = document.getElementById("myimage");

    if(theText == "google")
        {
            theImg.src="http://www.google.com/s2/favicons?domain=google.com";
        } 
    else if (theText == "yahoo") 
        {
            theImg.src="https://icons8.com/icon/81051/yahoo";
        } 
    else if 
        {
            theImg.src="https://icons8.com/icon/118495/facebook";
        }
     else
        {
            alert("no picture to show");
        }
}