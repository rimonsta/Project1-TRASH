import "./styles.css";
import Typed from 'typed.js';

console.log("this is working");
const INTRO_STEPS = 1;

const obitForm = document.obitForm;
const itemName = document.getElementById('name');
const materialsNodeList = document.obitForm.material;
const boolsNodeList = document.obitForm.bool;
const ageInput = document.getElementById('age');
let age = ageInput.value;
const levelOfHell = document.getElementById('level');
const color = document.getElementById('color');

const submitter = document.getElementById('btn-submit');

const prevBtns = document.querySelectorAll('.btn-prev');
const nextBtns = document.querySelectorAll('.btn-next');
const formSteps = document.querySelectorAll('fieldset');
const buttons = document.querySelectorAll('.buttons');
const script = document.querySelectorAll('.reapr');
const intro = document.getElementById('intro');

const formTitle = document.getElementById('formTitle');
const ageObit = document.getElementById('ageObit');

const dinosaurImg = document.getElementById("dinosaurImg");
const plantImg = document.getElementById("plantImg");
const rockEarthImg = document.getElementById("rockEarthImg");
const animalImg = document.getElementById("animalImg");
const otherImg = document.getElementById("otherImg");
const images = document.querySelectorAll('svg');

document.addEventListener("DOMContentLoaded", (event) => {
    // console.log(event);
    let typed = new Typed('#typed', {
        stringsElement: '#untyped',
        typeSpeed: 50,
        showCursor: false,
        onComplete: function () {
            document.getElementById('btn-skip').innerHTML = 'NEXT';
        }
    });
});

ageInput.addEventListener("input", (event) => {
    showAge(event.target.value);
});
color.addEventListener("input", (event) => {
    changeColor(event.target.value);
});

// the following code for progressive disclosure from: https://www.youtube.com/watch?v=JFfVilQSius

let formStepsNum = 0;

nextBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        if(formStepsNum >= INTRO_STEPS) {
            if(inputValidation(btn.name)==1){
                formStepsNum++;
                updateFormSteps();
            } else {
                showError();
            }
        }
        else {
            formStepsNum++;
            updateFormSteps();
        }
    });
});

prevBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        formStepsNum--;
        updateFormSteps();
    });
});

function updateFormSteps() {
    // console.log(formStepsNum);
    formSteps.forEach(formStep => {
        formStep.classList.contains('active-step') && 
        formStep.classList.remove('active-step');
    });
    buttons.forEach(button => {
        button.classList.contains('active-step') && 
        button.classList.remove('active-step');
    });
    if (formStepsNum < INTRO_STEPS) {
        intro.classList.add('active-step');
        obitForm.classList.remove('active-step');
        script[formStepsNum].classList.add("active-step");
        buttons[formStepsNum].classList.add('active-step');
    } else {
        obitForm.classList.add('active-step');
        intro.classList.remove('active-step');
        formSteps[formStepsNum-INTRO_STEPS].classList.add('active-step');
        buttons[formStepsNum].classList.add('active-step');
    }
    
};

submitter.addEventListener("click", () => {
    formSteps.forEach(formStep => {
        formStep.classList.contains('active-step') && 
        formStep.classList.remove('active-step');
    });
    buttons.forEach(button => {
        button.classList.contains('active-step') && 
        button.classList.remove('active-step');
    });

    obitForm.style.display = "none";
    updateObit();
    document.querySelector('#obit').style.display = "block";
});

obitForm.addEventListener("submit", handleSubmit);

function handleSubmit(event){
    event.preventDefault();
}

function inputValidation(input){
    switch(input) {
        case 'material':
            let numChecks = 0;
            for (let i = 0; i < materialsNodeList.length; i++) {
                if (materialsNodeList[i].checked) {
                    numChecks++;
                }
            }
            if(numChecks == 0) return 0;
            else return 1;
        case 'name':
            if(!itemName.value) return 0;
            else return 1;
        default:
            return 1;
    }
}

function showAge(rangeVal) {
    let val = Math.floor(rangeVal);
    const ages = ['hours','days','weeks','months','years','decades','centuries','milleniums'];
    document.getElementById("rangeValue").innerHTML=ages[val];
};

function updateObit(){

    updateTitle(itemName);
    updateAgeObit(updateImages(document.obitForm.material));

    console.log("name: " + itemName.value);
    // console.log("level of hell: " + levelOfHell.value);
    console.log("materials: ");
    for (let i = 0; i < materialsNodeList.length; i++) {
        if (materialsNodeList[i].checked) {
            console.log(materialsNodeList[i].id);
        }
    }
    console.log("age: " + age);
    console.log("hex color: " + color.value);
}

function updateTitle(name){
    formTitle.innerHTML = "RIP " + name.value;
}

function updateImages(materials){
    let potentialLifetime = 0;

    if(materials[0].checked || materials[1].checked || materials[6].checked || materials[7].checked || materials[8].checked ){
        plantImg.style.display = "block";
        potentialLifetime +=7;
    } else {
        plantImg.style.display = "none";
    }

    if(materials[2].checked || materials[3].checked || materials[4].checked || materials[6].checked || materials[7].checked || materials[8].checked) {
        rockEarthImg.style.display = 'block';
        potentialLifetime +=2;
        
    } else {
        rockEarthImg.style.display = 'none';
    }

    if(materials[5].checked || materials[6].checked || materials[8].checked ) {
        dinosaurImg.style.display = 'block';
        potentialLifetime +=3;
    } else {
        dinosaurImg.style.display = 'none';
    }

    if(materials[6].checked || materials[8].checked) {
        animalImg.style.display = 'block';
        potentialLifetime +=5;
    } else {
        animalImg.style.display = 'none';
    }

    if(materials[8].checked) {
        otherImg.style.display = 'block';
        potentialLifetime +=3;
    } else {
        otherImg.style.display = 'none';
    }


    console.log("potential lifetime: " + potentialLifetime)
    return potentialLifetime;
}

function updateAgeObit(materialLifetime) {
    if (age <  materialLifetime) {
        ageObit.innerHTML = "they died too soon";
    } else {
        ageObit.innerHTML = "they lived a full life";
    }
}

function changeColor(color) {
    document.body.style.background = color;
    if(color != "#000000"){
        document.body.style.color = "#000000";
        images.forEach((img) => {
            img.style.fill = "#000000";
        });
    } else {
        document.body.style.color = "#FFFFFF";
        images.forEach((img) => {
            img.style.fill = "#FFFFFF";
        });
    }
}

function showError() {
    try {
        throw new Error('this is an error!');
      } catch (e) {
        console.error(e);
      }
}

// function calcAge(rangeVal){
//     let val = Math.floor(rangeVal);
//     let arbitraryAge = 0.0;
//     switch(val) {
//         case 0:
//             arbitraryAge = (rangeVal) * (48.0);
//             break;
//         case 1:
//             arbitraryAge = (2 + ((rangeVal-1.0) * 14));
//             break;
//         case 2:
//             arbitraryAge = 2 + ((rangeVal-2.0) * 8);
//             break;
//         case 3:
//             arbitraryAge = 2 + ((rangeVal-3.0) * 24);
//             break;
//         case 4:
//             arbitraryAge = 2 + ((rangeVal-4.0) * 20);
//             break;
//         case 5:
//             arbitraryAge = 2 + ((rangeVal-5.0) * 20);
//             break;
//         case 6:
//             arbitraryAge = 2 + ((rangeVal-6.0) * 20);
//             break;
//         case 7:
//             arbitraryAge = 2;
//             break;
//     }
// }
