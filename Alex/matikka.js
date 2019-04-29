/* ALEX M'S GUESSING GAME
 * Carefully crafted by Alex Martin with love.
 * The point of this game is to look at the image and
 * pick how many of a certain object you can find in the image.
 * The reason why it's so primitive and so easy with only 5 choices (one-five)
 * is because this game is designed for elementary school kids.
 * I don't want to demolish their fragile, developing brains with my
 * Where's Waldo tier images and questions.
 */

//GLOBAL VARIABLES - Needed throughout the code

var HTMLquestions = document.getElementById("quiz");
var HTMLanswers = document.getElementById("answers");
var HTMLoutput = document.getElementById("output");
var HTMLmedal = document.getElementById("medal");
var score = 0; //Score. Will be displayed post-game.
var questionLimit = 5; //What makes this code neat is the fact that you can add more questions later on and increase this number to show more questions per game session.
var questionNumber = 0;//Keeps track of how many questions the player has gone through. Will not be displayed at all.

var questionDB = [//The database of questions.
    {
        question: "Kuinka monta <b>lintua</b><br><img src='../Img/am/bird.png' alt=''/><br>on kuvassa?",
        answers: ["Yksi", "Kaksi", "Kolme", "Neljä", "Viisi"],
        correct: 4
    },
    {
        question: "Kuinka monta <b>merirosvolaivaa</b><br><img src='../Img/am/boat.png' alt=''/><br>on kuvassa?",
        answers: ["Yksi", "Kaksi", "Kolme", "Neljä", "Viisi"],
        correct: 2
    },
    {
        question: "Kuinka monta <b>pulloa</b><br><img src='../Img/am/bodl.png' alt=''/><br>on kuvassa?",
        answers: ["Yksi", "Kaksi", "Kolme", "Neljä", "Viisi"],
        correct: 0
    },
    {
        question: "Kuinka monta <b>pilveä</b><br><img src='../Img/am/cloud.png' alt=''/><br>on kuvassa?",
        answers: ["Yksi", "Kaksi", "Kolme", "Neljä", "Viisi"],
        correct: 2
    },
    {
        question: "Kuinka monta <b>kookospähkinää</b><br><img src='../Img/am/coconut.png' alt=''/><br>on kuvassa?",
        answers: ["Yksi", "Kaksi", "Kolme", "Neljä", "Viisi"],
        correct: 3
    },
    {
        question: "Kuinka monta <b>rapua</b><br><img src='../Img/am/crab.png' alt=''/><br>on kuvassa?",
        answers: ["Yksi", "Kaksi", "Kolme", "Neljä", "Viisi"],
        correct: 1
    },
    {
        question: "Kuinka monta <b>merirosvoa</b><br>on kuvassa?",
        answers: ["Yksi", "Kaksi", "Kolme", "Neljä", "Viisi"],
        correct: 1
    },
    {
        question: "Kuinka monta <b>kiveä</b><br><img src='../Img/am/rock.png' alt=''/><br>on kuvassa?",
        answers: ["Yksi", "Kaksi", "Kolme", "Neljä", "Viisi"],
        correct: 2
    },
    {
        question: "Kuinka monta <b>lapiota</b><br><img src='../Img/am/shovel.png' alt=''/><br>on kuvassa?",
        answers: ["Yksi", "Kaksi", "Kolme", "Neljä", "Viisi"],
        correct: 1
    },
    {
        question: "Kuinka monta <b>meritähteä</b><br><img src='../Img/am/starfish.png' alt=''/><br>on kuvassa?",
        answers: ["Yksi", "Kaksi", "Kolme", "Neljä", "Viisi"],
        correct: 1
    }
];

//function RNG(min, max) { //This is nothing but a remnant. Obsolete code. I like it. It will not be removed. Yet.
//  min = 0;
//max = questionDB.length;
//RNGIndex = Math.floor(Math.random() * (max - min) + min);
//}

//The functions are in order of operation: disableNRun is run first, conclusion is last.

function disableNRun() { //Disables the Start! button and starts the game
    $("#start").removeClass("badge-success").addClass("badge-secondary"); //I was told that we'd get verbally abused if we used pure JS instead of also using jQuery. Here's your jQuery code. I'm off the hook.
    document.getElementById("start").disabled = true;
    HTMLmedal.innerHTML = '';
    score = 0;
    questionNumber = 0;
    
    $("#entire").animate({
    opacity: 0
    }, 0);
    
    randomize();
    fadeIntro();
}

function fadeIntro() {
      $(".intro").animate({
        opacity: 0
    }, 500, function () {
        document.getElementsByClassName("intro").innerHTML = "";
    });

    $("#entire").animate({
        opacity: 1,
        top: "-=100"
    }, 500
            );
    
    $("#start").animate({
        opacity: 0,
        top: "-=100"
    }, 500
            );
}

function randomize() {//Randomizes the questionDB array for random, non-repeating questions. 5 questions will be drawn.
    shuffle(questionDB);
    checkLimit();
}
;

function checkLimit() { //Checks now many questions the player has gone through.
    if (questionNumber < questionLimit) {
        generate();
        $("#entire").animate({
            opacity: 1
        }, 500, function () {
            generate();
        });
    } else {
        conclusion();
    }
}

function shuffle(a) {//The array randomizer, kindly provided by a generous benefactor from the internet.
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

function generate() {//Generates and displays the question and the answers. Currently it marks the correct answer in green, and that's because the code is in debug mode. The site will be visually fixed.

    HTMLquestions.innerHTML = "";
    HTMLanswers.innerHTML = "";
    HTMLoutput.innerHTML = "";
    HTMLquestions.innerHTML = questionDB[questionNumber].question;
    for (var x = 0; x < questionDB[questionNumber].answers.length; x++) {
        if (x === questionDB[questionNumber].correct) {
            HTMLanswers.innerHTML += '<button id="answer" onclick="correct()" class="answer button badge badge-success">' + questionDB[questionNumber].answers[x] + "</button> ";
        } else {
            HTMLanswers.innerHTML += '<button id="answer" onclick="wrong()" class="answer button badge badge-success">' + questionDB[questionNumber].answers[x] + "</button> ";
        }
        document.getElementById("answer").disabled = false;
    }
}

function correct() {//What will the code do if the player gets the right answer?
    score += 1;
    questionNumber += 1;
    HTMLoutput.innerHTML = "Oikein!";
    document.getElementsByClassName("answer").disabled = true;
    setTimeout(again, 2000);
}

function wrong() {//What will the code do if the player gets the wrong answer?
    questionNumber += 1;
    HTMLoutput.innerHTML = "Väärin!";
    document.getElementsByClassName("answer").disabled = true;
    setTimeout(again, 2000);
}

var again = function () {//Why this is its own function instead of executing checkLimit() in correct() and wrong() is because I want to animate a fade-out for the question before it changes.
    HTMLoutput.innerHTML = "";
    $("#entire").animate({
        opacity: 0
    }, 500, function () {
        checkLimit();
    });
};

function conclusion() {//Post-game results.
    HTMLquestions.innerHTML = "";
    HTMLanswers.innerHTML = "";
    HTMLoutput.innerHTML = "Sait " + score + "/" + questionLimit +  " pistettä!";
    if (score === 5) {
        HTMLoutput.innerHTML += "<br>Sinulla on merten tarkin silmä! Piraattipartio haluaa sinut joukkoihinsa pikimmiten! Merten suurin aarre odottaa teitä...";
        HTMLmedal.innerHTML += "<img src='../Img/am/medal.png' style='img-fluid' alt=''/>"
    } else if (score === 4) {
        HTMLoutput.innerHTML += "<br>Melkein kaikki oikein! Piraattipartio uskoo, että olet jo etevä lukemaan karttoja noin tarkalla silmällä.";
    } else if (score === 3) {
        HTMLoutput.innerHTML += "<br>Aika hyvin! Piraattipartion mielestä olet aika hyvä etsimään kuvasta esineitä.";
    } else if (score === 2) {
        HTMLoutput.innerHTML += "<br>Kohtalainen suoritus! Piraattipartio kuitenkin haluaa sinun vielä harjoittelevan lisää.";
    } else if (score === 1) {
        HTMLoutput.innerHTML += "<br>Tarvitset vielä harjoitusta ennen kuin Piraattipartio ottaa sinut mukaan kartanlukijaksi!";
    } else {
        HTMLoutput.innerHTML += "<br>Yritä uudestaan! Piraattipartio luottaa sinuun ja tietää, että sinä osaat vielä. Harjoittele lisää!";
    }
    
    $("#start").removeClass("badge-secondary").addClass("badge-success");
    document.getElementById("start").disabled = false;

    $("#entire").animate({
        opacity: 1,
        top: "+=100"
    }, 500);
    $("#start").animate({
        opacity: 1,
        top: "+=100"
    }, 500
            );
}




//What you see here below is a piece of code that made me feel like an engineer.
//It's a code I made that should pick random numbers and push them in an array
//while avoiding repeating numbers.
//Please take good care of it.

//function RNGMk2(min, max) {
// min = 0;
//  max = questionDB.length;
//  for (var x = 0; x < questionLimit; x++) {
//      var rnd = Math.floor(Math.random() * (max - min) + min);
//      if (rnd !== prevRnd) {
//         var prevRnd = rnd;
//          questionOrder.push(rnd);
//      } else {
//          x--;
//     }
//}
//}