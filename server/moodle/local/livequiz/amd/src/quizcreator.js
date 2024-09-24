define(['jquery'], function ($) {
    return {
        init: function () {
            $(document).ready(function () { // Ensure DOM is fully loaded
                console.log("Make quiz JS loaded");

                // Corrected button ID
                let button = document.getElementById("id_buttonaddquestion");

                if (button === null) {
                    console.log("button not found");
                } else {
                    console.log("Button is found and locked in");
                    console.log(button);

                    // Attach event listener correctly
                    button.addEventListener('click', function() {
                        let newButton = document.createElement('button');

                        let div = document.createElement("div");
                        div.className = "Modal_div";// Lav en styles.css stil til denne så den fylder 80% af skærmen hele skærmen.
                        // Den skal centres og overlappe på siden. Farve grå.
                        // Her smider du så alle de ting du gerne vil have.

                        let newQuestionInput = document.createElement('input');
                        newQuestionInput.placeholder = "Enter question";
                        newQuestionInput.className="newQuestionInput";

                        let newQuestionButton = document.createElement('button');
                        newQuestionButton.textContent = "Add Answer";

                        let divAnswers = document.createElement("div");
                        divAnswers.className = "answer_div";
                        newQuestionButton.addEventListener('click', function() {
                            let newQuestionAnswer = document.createElement('button');
                            console.log("Her");
                            newQuestionAnswer.className("answer_input");
                            console.log("Her");
                            newQuestionAnswer.placeholder = "Enter answer";
                            // let checkBoxToAnswer = documentElement.createElement('select');
                            newQuestionAnswer.addEventListener('dblClick', function() {
                                newQuestionAnswer.contentEditable = true;
                                newQuestionAnswer.focus();
                            });

                            newQuestionAnswer.addEventListener('blur', function() {
                                newQuestionAnswer.contentEditable = false;
                            });
                            newQuestionButton.appendChild(newQuestionAnswer);
                            divAnswers.appendChild(newQuestionAnswer);
                        });
                        div.appendChild(newQuestionInput);
                        div.appendChild(newQuestionButton);
                        div.appendChild(divAnswers);
                        /*
                        Lav input field til text af spørgsmål
                        Lav file uploader
                        Lav en ny knap som laver andre knapper
                        Nye knapper skal have checkbox og delete knap
                        Lav en checkbox som skal tjekkes før tekst kan indsættes i dens input field
                        Lav discard og save knap
                        Discard knap skal have et tjek før den afsluttes
                         */

                        document.body.appendChild(div);
                        // Append new button to the parent element

                    });
                }
            });
        }
    };
});
