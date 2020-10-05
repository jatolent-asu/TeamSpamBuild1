(function(){
    function build_quiz(){
      // store the HTML output
      const output = [];
  
      // for each question in quiz_questions.json...
      my_questions.forEach(
        (current_questions, question_number) => {
  
          // store the list multiple choice
          const answers = [];
  
          // and for each available answer...
          for(letter in current_questions.answers){
  
            // ...add an HTML radio button
            answers.push(
              `<label>
                <input type="radio" name="question${question_number}" value="${letter}">
                ${letter} :
                ${current_questions.answers[letter]}
              </label>`
            );
          }
  
          // add this question, its answers and its photo to the output
          output.push(
            `<div class="slide">
              <div class="question"> ${current_questions.question} </div>
              <div class="photo"> <img src=${current_questions.photo.src} alt=${current_questions.photo.alt} style="${current_questions.photo.style};"></div>
              <div class="answers"> ${answers.join("")} </div>
            </div>`
          );
        }
      );
  
      // finally combine our output list into one string of HTML and put it on the page
      quiz_container.innerHTML = output.join('');
    }
  
    function show_results(){
  
      // gather answer containers from our quiz
      const answer_containers = quiz_container.querySelectorAll('.answers');
  
      // keep track of user's answers
      let num_correct = 0;
  
      // for each question...
      my_questions.forEach( (current_questions, question_number) => {
  
        // find selected answer
        const answer_container = answer_containers[question_number];
        const selector = `input[name=question${question_number}]:checked`;
        const user_answer = (answer_container.querySelector(selector) || {}).value;
  
        // if answer is correct
        if(user_answer === current_questions.correctAnswer){
          // add to the number of correct answers
          num_correct++;
        }
      });
      
      //Find feedback for anwser
      var num1 = `${num_correct}`;
      var num2 = `${my_questions.length}`;
      var percentage =  num1/num2; 
      var feedback = String()
      if(percentage < .3){
        feedback = `Ouch, better luck next time!`;
      }
      else if(percentage > .85){
        feedback = `Nice Job! You did well!`;
      }
      else{
        feedback = `Looks like you are getting there. Keep practicing!`;
      }

       // store number of correct answers out of total
       var score = `You scored ${num_correct} out of ${my_questions.length} questions right.<br><br>` + feedback
       localStorage.setItem("score", score);

       // Simulate a mouse click:
       window.location.href = "resultspage.html";
      }


      function show_slide(n) {
        slides[current_slide].classList.remove('active-slide');
        slides[n].classList.add('active-slide');
        current_slide = n;
        if(current_slide === 0){
          previous_button.style.display = 'none';
        }
        else{
          previous_button.style.display = 'inline-block';
        }
        if(current_slide === slides.length-1){
          next_button.style.display = 'none';
          submit_button.style.display = 'inline-block';
        }
        else{
          next_button.style.display = 'inline-block';
          submit_button.style.display = 'none';
        }
      }
    
      function show_next_slide() {
        show_slide(current_slide + 1);
      }
    
      function show_previous_slide() {
        show_slide(current_slide - 1);
      }

      function shuffle(array) {
        var current_index = array.length, temporary_value, random_index;
      
        // While there remain elements to shuffle...
        while (0 !== current_index) {
      
          // Pick a remaining element...
          random_index = Math.floor(Math.random() * current_index);
          current_index -= 1;
      
          // And swap it with the current element.
          temporary_value = array[current_index];
          array[current_index] = array[random_index];
          array[random_index] = temporary_value;
        }
      
        return array;
      }
  
     
  // Variables
    const quiz_container = document.getElementById('quiz');
    const submit_button = document.getElementById('submit');
    const my_questions = shuffle(quiz_data);

  
    // Call build_quiz
    build_quiz();

     // Pagination
  const previous_button = document.getElementById("previous");
  const next_button = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let current_slide = 0;

  // Show the first slide
  show_slide(current_slide);

  // Event listeners
  submit_button.addEventListener('click', show_results);
  previous_button.addEventListener("click", show_previous_slide);
  next_button.addEventListener("click", show_next_slide);
})();
 