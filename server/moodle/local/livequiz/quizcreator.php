<?php
require_once('../../config.php');
require_once('form/createquizform.php');
require_login();

$PAGE->set_url(new moodle_url('/local/livequiz/quizcreator.php'));

$PAGE->requires->css(new moodle_url('/local/livequiz/styles.css'));

$PAGE->set_context(context_system::instance());
$PAGE->set_title("Make a quiz");
$PAGE->set_heading("Create a quiz");

echo $OUTPUT->header();

// Opret formular
$mform = new createquizform();



// Vis formularen
$mform->display();
$PAGE->requires->js_call_amd('local_livequiz/quizcreator', 'init');
echo $OUTPUT->footer();
