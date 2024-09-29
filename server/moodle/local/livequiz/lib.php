<?php
// This file is part of Moodle Course Rollover Plugin
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * @package     local_livequiz
 * @author       CARL
 * @license     http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 * @var stdClass $plugin
 */


 function local_livequiz_extend_navigation(global_navigation $nav) {
    $quiznode = $nav->add('livequiz');
    $quiznode->add('Create quiz', new moodle_url('/local/livequiz/quizcreator.php'));
    $quiznode->add('Play quiz', new moodle_url('/local/livequiz/quizrunner.php'));
    $quiznode->add('View quiz', new moodle_url('/local/livequiz/quizcontrol.php'));
    $quiznode->add('View quiz stats', new moodle_url('/local/livequiz/quizstats.php'));
}


