/* ALEX M'S questionnaire GAME
 * Carefully crafted by Alex Martin with love.
 * The point of this game is to answer the effen' questions.
 * Basically the same code as the math game.
 * I don't care.
 * I played my cards correctly for once
 * and now I'm off the hook.
 * Heck all a' y'all.
 */

//GLOBAL VARIABLES - Needed throughout the code
var HTMLquestions = document.getElementById("quiz");
var HTMLanswers = document.getElementById("answers");
var HTMLoutput = document.getElementById("output");
var HTMLmedal = document.getElementById("medal");
var score = 0;//Score. Will be displayed post-game.
var questionLimit = 6; //What makes this code neat is the fact that you can add more questions later on and increase this number to show more questions per game session.
var questionNumber = 0;//Keeps track of how many questions the player has gone through. Will not be displayed at all.
    
var questionDB = [//The database of questions.
    {
        question: "<figure class='quizphoto2 centerify'><img src='../Img/am/flower2.jpeg' alt='placeholder'/><figcaption>'Fabelfroh'. Matricaria discoidea. 2004. CC BY-SA 3.0.</figcaption></figure><br>Mikä kasvi on kuvassa?",
        answers: ["Mustikka", "Piharatamo", "Pihasaunio", "Siankärsämö"],
        correct: 2
    },
    {
        question: "<figure class='quizphoto centerify'><img src='../Img/am/flower1.jpg' alt='placeholder'/><figcaption>Ernst Schütte. Breitwegerich. 2004. CC BY-SA 3.0.</figcaption></figure><br>Mikä kasvi on kuvassa?",
        answers: ["Piharatamo", "Siankärsämo", "Valko-apila", "Timotei"],
        correct: 0
    },
    {
        question: "<figure class='quizphoto2 centerify'><img src='../Img/am/flower3.jpg' alt='placeholder'/><figcaption>'Lorenzarius'. Achillea millefolium flowers. 2006. CC BY-SA 3.0.</figcaption></figure><br>Mikä kasvi on kuvassa?",
        answers: ["Kielo", "Valko-apila", "Siankärsämö", "Voikukka"],
        correct: 2
    },
    {
        question: "<figure class='quizphoto centerify'><img src='../Img/am/flower4.jpg' alt='placeholder'/></figure><br>Mikä kasvi on kuvassa?",
        answers: ["Timotei", "Syysmaitiainen", "Auringonkukka", "Voikukka"],
        correct: 1
    },
    {
        question: "<figure class='quizphoto2 centerify'><img src='../Img/am/flower5.jpg' alt='placeholder'/></figure><br>Mikä kasvi on kuvassa?",
        answers: ["Pihatatar", "Kielo", "Mustikka", "Valkoapila"],
        correct: 3
    },
    {
        question: "<figure class='quizphoto2 centerify'><img src='../Img/am/flower6.jpg' alt='placeholder'/><figcaption>Matthias Kabel. Löwenzahn. 2005. CC BY-SA 3.0.</figcaption></figure><br>Mikä kasvi on kuvassa?",
        answers: ["Syysmaitiainen", "Kielo", "Piharatamo", "Voikukka"],
        correct: 3
    },
    {
        question: "<figure class='quizphoto2 centerify'><img src='../Img/am/tree1.jpg' alt='placeholder'/></figure><br> Mikä puu on kuvassa?",
        answers: ["Koivu", "Syysmaitiainen", "Mänty", "Kuusi"],
        correct: 2
    },
    {
        question: "<figure class='quizphoto centerify'><img src='../Img/am/tree2.jpg' alt='placeholder'/></figure><br> Mikä puu on kuvassa?",
        answers: ["Vaahtera", "Kuusi", "Kataja", "Leppä"],
        correct: 1
    },
    {
        question: "<figure class='quizphoto2 centerify'><img src='../Img/am/tree3.jpg' alt='placeholder'/></figure><br> Mikä puu on kuvassa?",
        answers: ["Koivu", "Mänty", "Pihlaja", "Vaahtera"],
        correct: 0
    },
    {
        question: "<figure class='quizphoto2 centerify'><img src='../Img/am/tree4.JPG' alt='placeholder'/></figure><br> Mikä puu on kuvassa?",
        answers: ["Kuusi", "Kataja", "Vaahtera", "Pihlaja"],
        correct: 3
    },
    {
        question: "<figure class='quizphoto centerify'><img src='../Img/am/tree5.jpg' alt='placeholder'/><figcaption>Siim Ainsaar. Juniperus communis at Valjala on 2005-08-11. 2011. CC BY-SA 3.0.</figcaption></figure><br> Mikä puu on kuvassa?",
        answers: ["Kataja", "Mustikka", "Kuusi", "Pihlaja"],
        correct: 0
    },
    {
        question: "<figure class='quizphoto centerify'><img src='../Img/am/tree6.jpg' alt='placeholder'/></figure><br> Mikä puu on kuvassa?",
        answers: ["Leppä", "Vaahtera", "Koivu", "Kataja"],
        correct: 0
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

function randomize() {//Randomizes the questionDB array for random, non-repeating questions.
    shuffle(questionDB);
    checkLimit();
}
;

function checkLimit() { //Checks how many questions the player has gone through.
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
            HTMLanswers.innerHTML += '<div class="col-xs-6"><button id="answer" onclick="correct()" class="answer button badge badge-info">' + questionDB[questionNumber].answers[x] + "</button></div> ";
        } else {
            HTMLanswers.innerHTML += '<div class="col-xs-6"><button id="answer" onclick="wrong()" class="answer button badge badge-info">' + questionDB[questionNumber].answers[x] + "</button></div> ";
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
    if (score === 6) {
        HTMLoutput.innerHTML += "<br>Piraattipartio haluaa sinut heidän joukkoonsa! Olet etevä kasvien tunnistaja ja siten hyvä lisä heidän joukkoihinsa.";
        HTMLmedal.innerHTML += "<img src='../Img/am/medal.png' style='img-fluid' alt=''/>"
    } else if (score === 5) {
        HTMLoutput.innerHTML += "<br>Melkein kaikki oikein! Piraattipartion mielestä sinä olet jo mainio kasvien tunnistamisessa.";
    } else if (score === 4) {
        HTMLoutput.innerHTML += "<br>Aika hyvin! Piraattipartion mielestä olet aika hyvä tunnistamaan kasveja.";
    } else if (score === 3) {
        HTMLoutput.innerHTML += "<br>Kohtalainen suoritus! Piraattipartio kuitenkin haluaa sinun vielä harjoittelevan kasvien tunnistamista.";
    } else if (score === 2) {
        HTMLoutput.innerHTML += "<br>Tarvitset vielä harjoitusta kasvien tunnistuksessa! Kokeile uudestaan, niin Piraattipartio voi harkita sinun ottamista mukaan.";
    } else {
        HTMLoutput.innerHTML += "<br>Yritä uudestaan! Piraattipartio luottaa sinuun ja tietää, että sinä osaat vielä. Harjoittele lisää kasvien tunnistamista!";
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