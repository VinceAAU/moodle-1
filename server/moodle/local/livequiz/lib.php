<?php
function livequiz_extend_navigation(global_navigation $nav) {
    $livequiznode = $nav->add('livequiz');
    $livequiznode->add('Quiz creator', new moodle_url('/local/livequiz/quizcreator.php'));
    $livequiznode->add('Quiz runner', new moodle_url('/local/livequiz/quizrunner.php'));
    $livequiznode->add('Quiz control', new moodle_url('/local/livequiz/quizcontrol.php'));
    $livequiznode->add('Quiz results', new moodle_url('/local/livequiz/quizresults.php'));
}