const words =
  "Amina grew up surrounded by stories of prophets, tales of compassion, and the pursuit of knowledge. Her parents instilled in her a deep reverence for Allah, the merciful and all-knowing Creator. They taught her that Islam was not just a religion, but a way of life, offering guidance on how to be a good person, to treat others with kindness, and to seek justice in all matters.".split(
    " "
  );
const wordCounte = words.length;
// console.log(wordCounte);

function addClass(el,name){
    el.className +=' '+name
}

function removeClass(el,name){
    el.className =el.className.replace(name,'')
}
function randomWord() {
  const randomIndex = Math.ceil(Math.random() * wordCounte);
  // console.log(randomIndex);
  return words[randomIndex -1];
}
randomWord()

function formateWord(word) {
  var wordx=word?.split("").join(`</span> <span class="letter">`)
  // console.log(wordx);
  return `<div class="word"><span class="letter">${wordx}</span></div>`;
}
// .split("").join(`</span> <span class="letter">`)

function nemGame() {
  document.getElementById("words").innerHTML = "";
  for (let i = 0; i < 200; i++) {
    document.getElementById("words").innerHTML += formateWord(randomWord());
  }
  addClass(document.querySelector('.word'),'current');
  addClass(document.querySelector('.letter'),'current');
  // console.log(document.querySelector('.word'));
}
nemGame();

document.getElementById("game").addEventListener("keyup", (ev) => {
  const key = ev.key;
  const currentword=document.querySelector(".word.current");
  const currentLetter=document.querySelector(".letter.current");
  const correctLetter=document.querySelector(".letter.correct");
  const expected = currentLetter?.innerHTML || ' ';
  const isLetter = key.length === 1 && key !== ' ';
  const isSpace = key ===' ';
  const isBackspace = key ==='Backspace';
  const isFIrstLetter = currentLetter === currentword.firstChild;

  // console.log(key, expected);
  // console.log(currentword,currentLetter,correctLetter);



  if(isLetter){
    if(currentLetter){
      addClass(currentLetter, key ===expected ?'correct': 'incorrect');
      removeClass(currentLetter,'current'); 
      if(currentLetter.nextElementSibling){
        addClass(currentLetter.nextElementSibling,'current');
      }
      // console.log(currentLetter.nextElementSibling);

    }
  }

  if(isSpace){
    if(expected !== ''){  
      // this is more logic section
      // const letterinvalidete = document.querySelectorAll('.word.current');
      // letterinvalidete.forEach(letter =>{
      //   addClass(letter, 'incorrect')
      // })
      removeClass(currentword,'current');
      addClass(currentword.nextSibling, 'current');
      addClass(currentword.nextSibling.firstChild,'current')

      if(currentLetter){
        removeClass(currentLetter,'current')
      }
    }
  }
  if(isBackspace){
    if(currentLetter && isFIrstLetter){
      // move prev word current, last letter current 
      removeClass(currentword,'current');
      addClass(currentword.previousSibling,'current');
      removeClass(currentLetter,'current');
      // if(currentLetter.previousSibling.lastChild){
        
      // }
      addClass(currentLetter.previousSibling.lastChild,'current')
      removeClass(currentLetter.previousSibling.lastChild,'incorrect')
      removeClass(currentLetter.previousSibling.lastChild,'correct')
      // console.log("hii");
    }
    if(currentLetter && !isFIrstLetter){
      // move back one letter,  invalidate letter
      // removeClass(currentLetter,'current')
      removeClass(currentLetter,'current')
      addClass(currentLetter.previousElementSibling,'current')
      // console.log(currentLetter.previousElementSibling);
      // if(currentword.previousSibling){
      // // }
      removeClass(currentLetter.previousElementSibling,'incorrect')
      removeClass(currentLetter.previousElementSibling,'correct')
    }
    if(!currentLetter){
      addClass(currentword.lastChild,'current')
      removeClass(currentword.lastChild,'incorrect')
      removeClass(currentword.lastChild, 'correct')
    }
    // if(currentword && correctLetter){
      
    // }
  }
  if(currentword.getBoundingClientRect().top>130){
    const words = document.getElementById('words') 
    words.style.marginTop = '-25px';
    // alert("hii")
  }





  
  const nextletter = document.querySelector('.letter.current')
  const nextWord =document.querySelector('.word.current')
  const cursor = document.getElementById('cursor')
  if(nextletter){
    cursor.style.top = nextletter.getBoundingClientRect().top + 2 +'px';
    cursor.style.left = nextletter.getBoundingClientRect().left + 0 +'px';
  }else{
    cursor.style.top = nextWord.getBoundingClientRect().top + 2 +'px';
    cursor.style.left = nextWord.getBoundingClientRect().right +'px';
  }


});
