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

                        let modaldiv = document.createElement("div");
                        modaldiv.className = "Modal_div";// Lav en styles.css stil til denne så den fylder 80% af skærmen hele skærmen.
                        // Den skal centres og overlappe på siden. Farve grå.
                        // Her smider du så alle de ting du gerne vil have.

                        let divToTimeLimit = document.createElement("div");
                        divToTimeLimit.className = "time_limit_div";

                        let checkToEnforceTimer = document.createElement('INPUT');
                        checkToEnforceTimer.setAttribute("type", "checkbox");

                        let inputFieldForTimeLimit = document.createElement('input');
                        inputFieldForTimeLimit.placeholder = "0";
                        inputFieldForTimeLimit.type = 'number';
                        inputFieldForTimeLimit.setAttribute('disabled', 'true');

                        divToTimeLimit.appendChild(checkToEnforceTimer);
                        divToTimeLimit.appendChild(inputFieldForTimeLimit);

                        checkToEnforceTimer.addEventListener('click', () => {
                            if (checkToEnforceTimer.checked) {
                                console.log("hello");
                                inputFieldForTimeLimit.removeAttr('disabled');
                            } else {
                                console.log("hej");
                                inputFieldForTimeLimit.setAttribute('disabled', 'true');
                            }
                        });

                        let fileInput = document.createElement('input');
                        fileInput.type = 'file';

                        let filePicker = document.createElement('button');
                        filePicker.addEventListener('click', () => {
                            fileInput.click();
                        });

                        filePicker.addEventListener('click', () => {
                            filePicker.click();
                        });

                        fileInput.addEventListener('change', () => {
                            const selectedFile = fileInput.files[0];
                            console.log(selectedFile);
                        });

                        let newQuestionInput = document.createElement('textarea');
                        newQuestionInput.placeholder = "Enter question";
                        newQuestionInput.className = "newQuestionInput";

                        let newQuestionButton = document.createElement('button');
                        newQuestionButton.textContent = "Add Answer";
                        newQuestionButton.className = "add_answer_button";

                        let divListAnswers = document.createElement("div");
                        divListAnswers.className = "answer_div";

                        newQuestionButton.addEventListener('click', () => {
                            let newAnswerContainer = document.createElement('div');
                            newAnswerContainer.className = "newAnswerDiv";

                            let newQuestionAnswer = document.createElement('input');
                            newQuestionAnswer.className = "answer_input";
                            newQuestionAnswer.placeholder = "Enter answer";

                            let checkBoxToAnswer = document.createElement('INPUT');
                            checkBoxToAnswer.setAttribute("type", "checkbox");

                            let deleteAnswer = document.createElement('button');
                            deleteAnswer.className = "deletedivbutton";

                            newAnswerContainer.appendChild(newQuestionAnswer);
                            newAnswerContainer.appendChild(deleteAnswer);
                            newAnswerContainer.appendChild(checkBoxToAnswer);
                            // newQuestionAnswer.addEventListener('dblclick', function() {
                            //     newQuestionAnswer.contentEditable = true;
                            //     newQuestionAnswer.focus();
                            // });
                            //
                            // newQuestionAnswer.addEventListener('blur', () => {
                            //     newQuestionAnswer.contentEditable = false;
                            // });
                            divListAnswers.appendChild(newAnswerContainer);
                        });
                        modaldiv.appendChild(fileInput);
                        modaldiv.appendChild(filePicker);
                        modaldiv.appendChild(newQuestionInput);
                        modaldiv.appendChild(divToTimeLimit);
                        modaldiv.appendChild(newQuestionButton);
                        modaldiv.appendChild(divListAnswers);
                        /*
                        Lav file uploader
                        Nye knapper skal have checkbox og delete knap
                        Lav discard og save knap
                        Discard knap skal have et tjek før den afsluttes
                         */

                        let deletemodaldiv = document.createElement("div");
                        deletemodaldiv.className = "deletedivbutton";
                        deletemodaldiv.addEventListener('click', () => {
                            modaldiv.remove();
                        });
                        modaldiv.appendChild(deletemodaldiv);
                        document.body.appendChild(modaldiv);
                        // Append new button to the parent element

                    });
                }
            });
        }
    };
});
