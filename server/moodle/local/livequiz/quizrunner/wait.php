<?php
require_once('../../../config.php');
$PAGE->set_url(new moodle_url('/local/livequiz/quizrunner'));
$PAGE->set_context(context_system::instance());
$PAGE->set_title("Play quiz");
$PAGE->set_heading("Join a quiz");

//$PAGE->requires->js_call_amd('local_quiz/playquiz', 'init');

echo $OUTPUT->header();
?> 

<h2>Please Wait!</h2>

<?php
echo $_POST["submit"];
echo $OUTPUT->footer();
