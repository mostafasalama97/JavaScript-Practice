// Letters
const letters = "abcdefghijklmnopqrstuvwxyz";

//get array from letters
let letterArray = Array.from(letters);

//select letter container
let letterContainer = document.querySelector(".letters");

//generate letters //loop

letterArray.forEach(letter => {

    //create span
    let span = document.createElement("span");

    //create letter text node

    let theletter = document.createTextNode(letter);

    //append the letter to span
    span.appendChild(theletter)

    //add class on span

    span.className = 'letter-box';

    //append span to letter cony=tainer

    letterContainer.appendChild(span);
});

//==================================================

//object of words + categories
const words = {
    programming: ["php", "javascript", "go", "scala", "fortran", "r", "mysql", "python"],
    movies: ["Prestige", "Inception", "Parasite", "Interstellar", "Whiplash", "Memento", "Coco", "Up"],
    people: ["Albert Einstein", "Hitchcock", "Alexander", "Cleopatra", "Mahatma Ghandi"],
    countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"],
}

//get random property from this four

let allkeys = Object.keys(words); //method to bring all keys of object

//random number depends on key length
let randompropertnumber = Math.floor(Math.random()*allkeys.length); //random number from four array from 0-3
//category
let randompropname = allkeys[randompropertnumber]; //to generate random index from random four array in object word {people,programmin,countries,movies}
//category words
let randompropvalue = words[randompropname] ; //to generate random array "value" from object
//random number depend on words
let randomvaluenumber = Math.floor(Math.random()*randompropvalue.length); //to generate random index from chosen array

let randomvaluename = randompropvalue[randomvaluenumber];

// console.log(randomvaluename);

//set categoriy info

let cate = document.querySelector(".game-info .category span").innerHTML = randompropname;

//============================================================

//select letters guess element
let letterguesselement = document.querySelector('.letters-guess'); 

//the word that will be chosen we need store it in array to know number of character of it to store it in array and compare the user chosen with word character

//convert choosen word to array
let letterandspace = Array.from(randomvaluename); //make array of character from choosen word

//create span depend on word/letter
letterandspace.forEach(letter =>{
    //create empty span
    let emptyspan = document.createElement('span');

    //if letter is space
    if(letter === ' ') {
        //add class to span
        emptyspan.className = 'with-space';
    }

    //append span to the letter guess container
    letterguesselement.appendChild(emptyspan);
});


//select guess spans
let guessspans = document.querySelector('letters-guess span')




//handling clicking on letter

document.addEventListener('click',(e) => {
    if(e.target.className === 'letter-box'){

        e.target.classList.add('clicked')

        //get clicked letter from user
        let theclickedletter = e.target.innerHTML.toLowerCase();
        // console.log(theclickedletter);

        //the chosen word
        let thechosenword = Array.from(randomvaluename.toLowerCase());

        //start comparing the letter user chose with random word "character" that chosen randomly
        letterandspace.forEach((wordletter,wordindex)=>{
            //check: if the clicked letter equal to one of the chosen letter
            if(theclickedletter === wordletter){


                //loop on all guess span
                guessspans.forEach((span,spanindex) =>{

                    if(wordindex === spanindex){

                        span.innerHTML = theclickedletter; 

                    }
                });
                // console.log(`found at index number ${index}`);
            }
        });
    }
});





















