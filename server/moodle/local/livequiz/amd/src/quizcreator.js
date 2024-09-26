
define(['jquery'], function ($) {
    return {
        init: function () {
            $(document).ready(function () { // Ensure DOM is fully loaded
                console.log("Make quiz JS loaded");

                open_question_creation_modal();

                function open_question_creation_modal() {
                    // Corrected button ID
                    let add_question_button = document.getElementById("id_buttonaddquestion"); // Links to button that creates questions

                    if (add_question_button === null) {
                        console.log("Button not found");
                    } else {
                        console.log("Button is found and locked in");
                        console.log(add_question_button);

                        // Attach event listener correctly
                        add_question_button.addEventListener('click', () => {
                            let new_modal_button = document.createElement('button');

                            let modal_div = document.createElement("div");
                            modal_div.className = "Modal_div"; // Styles for this modal div to be handled in styles.css

                            let question_input = document.createElement('textarea');
                            question_input.placeholder = "Enter question";
                            question_input.className = "newQuestionInput";

                            let answers_div = document.createElement("div");
                            answers_div.className = "answer_div";

                            function create_timer_element() {
                                let timer_div = document.createElement("div");
                                timer_div.className = "time_limit_div";

                                let timer_checkbox = document.createElement('input');
                                timer_checkbox.setAttribute("type", "checkbox");

                                let timer_input = document.createElement('input');
                                timer_input.placeholder = "0";
                                timer_input.type = 'number';
                                timer_input.setAttribute('disabled', 'true');

                                timer_div.appendChild(timer_checkbox);
                                timer_div.appendChild(timer_input);

                                timer_checkbox.addEventListener('change', () => {
                                    if (timer_checkbox.checked) {
                                        timer_input.removeAttribute('disabled');
                                    } else {
                                        timer_input.setAttribute('disabled', 'true');
                                        timer_input.value = 0;
                                    }
                                });

                                return timer_div;
                            }

                            function create_answer_button(parent_element) {
                                let add_answer_button = document.createElement('button');
                                add_answer_button.textContent = "Add Answer";
                                add_answer_button.className = "add_answer_button";
                                let answer_count = 0;

                                add_answer_button.addEventListener('click', () => {
                                    if (answer_count < 8) {
                                        let answer_container = document.createElement('div');
                                        answer_container.className = "newAnswerDiv";

                                        let answer_input = document.createElement('input');
                                        answer_input.className = "answer_input";
                                        answer_input.placeholder = "Enter answer";

                                        let answer_checkbox = document.createElement('input');
                                        answer_checkbox.setAttribute("type", "checkbox");

                                        let delete_answer_button = document.createElement('button');
                                        delete_answer_button.className = "delete_answer_button";
                                        delete_answer_button.textContent = "X";

                                        answer_container.appendChild(answer_input);
                                        answer_container.appendChild(delete_answer_button);
                                        answer_container.appendChild(answer_checkbox);

                                        parent_element.appendChild(answer_container);
                                        answer_count++;

                                        delete_answer_button.addEventListener('click', () => {
                                            answer_container.remove();
                                            answer_count--;
                                        });
                                    }
                                });
                                return add_answer_button;
                            }

                            let add_answer_button = create_answer_button(answers_div);
                            let page = document.getElementById("page-local-livequiz-quizcreator");

                            function save_question() {
                                let save_question_button = create_element("save_question_button",
                                    'button', "save_button", "Save question");

                                save_question_button.addEventListener('click', () => {
                                    let question_for_main_page = create_element("question_for_main_page",
                                       'button', 'question_for_main_page', question_input.value);
                                    console.log(question_input.value.trim().length)
                                    if (question_input.value.trim() === "") {
                                        console.log("Could not save if no question is added.")
                                    } else {
                                        page.appendChild(question_for_main_page);
                                        modal_div.remove();
                                    }
                                })

                                return save_question_button
                            }
                            let save_question_button = save_question();


                            modal_div.appendChild(question_input);

                            let file_picker_button = create_file_picker();
                            modal_div.appendChild(file_picker_button);

                            let timer_element = create_timer_element();
                            modal_div.appendChild(timer_element);

                            modal_div.appendChild(add_answer_button);
                            modal_div.appendChild(answers_div);
                            modal_div.appendChild(save_question_button);

                            let discard_button = create_discard_button();
                            modal_div.appendChild(discard_button);

                            page.appendChild(modal_div);
                        });
                    }
                }

                function create_discard_button() {
                    let discard_button = document.createElement("div");
                    discard_button.className = "discardButton";
                    discard_button.textContent = "Discard";

                    discard_button.addEventListener('click', () => {
                        let toast_cancel_div = create_element("toast_cancel_modal_div", 'div',
                            "toast_cancel_modal_div", "Are you sure you want to delete this question?");

                        let cancel_button = document.createElement('button');
                        cancel_button.textContent = "Cancel delete";

                        let delete_button = document.createElement('button');
                        delete_button.className = "no_delete_button";
                        delete_button.textContent = "Delete";

                        toast_cancel_div.appendChild(cancel_button);
                        toast_cancel_div.appendChild(delete_button);

                        let modal_div = document.querySelector('.Modal_div');

                        modal_div.appendChild(toast_cancel_div);

                        delete_button.addEventListener('click', () => {
                            modal_div.remove();
                        });

                        cancel_button.addEventListener('click', () => {
                            toast_cancel_div.remove();
                        });
                    });

                    return discard_button;
                }

                function create_file_picker() {
                    let file_input = document.createElement('input');
                    file_input.type = 'file';

                    let file_picker_button = create_element('file_picker_button', 'button',
                        'file_picker', 'Choose File');

                    file_picker_button.addEventListener('click', () => {
                        file_input.click();
                    });
                    return file_picker_button;
                }

                function create_element(element_name, type, class_name, content) {
                    element_name = document.createElement(type);
                    element_name.className = class_name;
                    element_name.textContent = content;

                    return element_name;
                }
            });
        }
    };
});
