<?php
require_once('../../config.php');
$PAGE->set_url(new moodle_url('/local/livequiz/quizrunner.php'));
$PAGE->set_context(context_system::instance());
$PAGE->set_title("Play quiz");
$PAGE->set_heading("Join a quiz");

//$PAGE->requires->js_call_amd('local_quiz/playquiz', 'init');

echo $OUTPUT->header();
// Din indholdskode her (HTML eller noget andet indhold).
echo $OUTPUT->footer();
