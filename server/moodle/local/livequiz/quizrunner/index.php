<?php
require_once('../../../config.php');

require_once('question.php');
require_once('answer/slider.php');


$PAGE->set_url(new moodle_url('/local/livequiz/quizrunner'));
$PAGE->set_context(context_system::instance());
$PAGE->set_title("Play quiz");
$PAGE->set_heading("Join a quiz");

echo $OUTPUT->header();

$question = new question();
$question->image = 'fish.png';
$question->prompt = 'Is fish fishing????';
/*$question->answer = new multichoice(
	array(
		new multichoice_choice("Yes!!!!", "yes"),
		new multichoice_choice("No!!!!!", "no"),
		new multichoice_choice("Mayhaps...", "perchance")
	)
);*/
$question->answer = new slider(0, 10);

$question->display();

// Din indholdskode her (HTML eller noget andet indhold).
echo $OUTPUT->footer();

