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
                    button.addEventListener('click', () => {
                        let newButton = document.createElement('button');

                        let div = document.createElement("div");
                        div.className = "Modal_div";// Lav en styles.css stil til denne så den fylder 80% af skærmen hele skærmen.
                        // Den skal centres og overlappe på siden. Farve grå.
                        // Her smider du så alle de ting du gerne vil have.

                        let divToTimeLimit = document.createElement("div");
                        divToTimeLimit.className = "time_limit_div";

                        let checkToEnforceTimer = document.createElement('INPUT');
                        checkToEnforceTimer.setAttribute("type", "checkbox");

                        let inputFieldForTimeLimit = document.createElement('input');
                        inputFieldForTimeLimit.placeholder = "0";
                        inputFieldForTimeLimit.type = 'number';
                        inputFieldForTimeLimit.setAttribute('disabled', 'disabled');

                        divToTimeLimit.appendChild(checkToEnforceTimer);
                        divToTimeLimit.appendChild(inputFieldForTimeLimit);

                        checkToEnforceTimer.addEventListener('checked', () => {
                            inputFieldForTimeLimit.removeAttr('disabled');
                        });
                        // if (checkToEnforceTimer.checked) {
                        //     inputFieldForTimeLimit.removeAttr('disabled');
                        // }

                        let newQuestionInput = document.createElement('textarea');
                        newQuestionInput.placeholder = "Enter question";
                        newQuestionInput.className = "newQuestionInput";

                        let newQuestionButton = document.createElement('button');
                        newQuestionButton.textContent = "Add Answer";
                        newQuestionButton.className = "add_answer";

                        let divListAnswers = document.createElement("div");
                        divListAnswers.className = "answer_div";

                        newQuestionButton.addEventListener('click', () => {
                            let newAnswerDiv = document.createElement('div');
                            newAnswerDiv.className = "newAnswerDiv";

                            let newQuestionAnswer = document.createElement('input');
                            newQuestionAnswer.className = "answer_input";
                            newQuestionAnswer.placeholder = "Enter answer";

                            let checkBoxToAnswer = document.createElement('INPUT');
                            checkBoxToAnswer.setAttribute("type", "checkbox");

                            let deleteAnswer = document.createElement('button');
                            deleteAnswer.textContent = "Delete";

                            newQuestionAnswer.appendChild(deleteAnswer);
                            newAnswerDiv.appendChild(deleteAnswer);
                            newAnswerDiv.appendChild(checkBoxToAnswer);
                            // newQuestionAnswer.addEventListener('dblclick', function() {
                            //     newQuestionAnswer.contentEditable = true;
                            //     newQuestionAnswer.focus();
                            // });
                            //
                            // newQuestionAnswer.addEventListener('blur', () => {
                            //     newQuestionAnswer.contentEditable = false;
                            // });
                            divListAnswers.appendChild(newQuestionAnswer);
                        });
                        div.appendChild(newQuestionInput);
                        div.appendChild(divToTimeLimit);
                        div.appendChild(newQuestionButton);
                        div.appendChild(divListAnswers);
                        /*
                        Lav file uploader
                        Lav en ny knap som laver andre knapper
                        Nye knapper skal have checkbox og delete knap
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
