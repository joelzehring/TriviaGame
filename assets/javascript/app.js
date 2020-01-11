$(document).ready(function(){ // start jQuery

    var quizCount = 0;
    var wins = 0;
    var losses = 0;
    var time = 10;
    var timer; 
    var challenges = [
      {
      q: "How do you pacify an angry bee hive?",
      a: "Campfire",
      options:["Campfire","Arrows","Torch","Diamonds"]
      },
      {
      q: "How many porkchops do pigs drop when they are killed?",
      a: "1-3",
      options:["7-9","4-6","0","1-3"]
      },
      {
      q: "What is a smoker used for?",
      a: "Cooking food faster",
      options:["Cooking food faster","Cooking food slower"]
      },
      {
      q: "Are there cows?",
      a: "Yes",
      options:["Yes","No"]
      },
      {
      q: "Are there drums?",
      a: "No",
      options:["Yes","No"]
      },
      {
      q: "Are there birds?",
      a: "Yes",
      options:["Yes","No"]
      },
    ]
    
    function newGame() {
      quizCount = 0;
      wins = 0;
      losses = 0;
    }
    
    function newRound() {
      $(".responses").empty();
      if (quizCount < challenges.length) {
        $(".instructions").text("Click the option to answer the question.");
        $(".question").text(challenges[quizCount].q);
    
        // populate response options
        for (var j = 0; j < challenges[quizCount].options.length; j++) {
          var option = $("<li>").addClass("option");
          option.addClass("option");
          option.text(challenges[quizCount].options[j]);
          if (option.text() == challenges[quizCount].a) {
            option.addClass("correct");
          }
          $(".responses").append(option);
        }
    
        time = 10;
        timer = setInterval(countdown,1000);
      }
    
      else {
        // End of quiz
        $(".question").empty();
        $(".instructions").text("You completed the quiz! Out of " + quizCount + " questions, you got " + wins + " right and " + losses + " wrong. Use the button to try again!");
        $(".timer").text(" ");
        clearInterval(timer);
        $(".btn-start").text("Try again").show(100);
      }
    }
    
    // Common operations for all responses
    function feedback(msg) {
      $(".instructions").text(msg);
        $(".timer").text(" ");
        clearInterval(timer);
        setTimeout(function(){
          newRound();},
          1500
        );
    }
    
    function countdown() {
      if (time > 0) {
        time--;
        $(".timer").text(time);
      }
      
      // user does not click an option in time
      else {
        clearInterval(timer);
        losses++;
        quizCount++;
        feedback("Out of time!");
      }
    }
    
    // user clicks button to start quiz
    $(".btn-start").click(function (){
      $(".btn-start").hide(100);
      newGame();
      newRound();
    });
      
    // user clicks button to answer question
    function handleResponse() {
    
      // user clicks correct option
      if ($(this).text() == challenges[quizCount].a) {
        wins++;
        quizCount++;
        feedback("You're right!");
        $(this).addClass("answer-win");
      }
    
      // user clicks incorrect option
      else if ($(this).text() !== challenges[quizCount].a) {
        feedback("Wrong answer!");
        $(this).addClass("answer-lose");
        var rightAnswer = $(".correct").addClass("answer-win");
        losses++;
        quizCount++;
      }
    }
    
    $(document).on("click", ".option", handleResponse);
    
    }); // end jQuery
