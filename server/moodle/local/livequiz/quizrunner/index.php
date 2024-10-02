<?php
require_once('../../../config.php');
$PAGE->set_url(new moodle_url('/local/livequiz/quizrunner'));
$PAGE->set_context(context_system::instance());
$PAGE->set_title("Play quiz");
$PAGE->set_heading("Join a quiz");

//$PAGE->requires->js_call_amd('local_quiz/playquiz', 'init');

echo $OUTPUT->header();

//Must have a submit button, obviously
interface answer {
	public function html() : string;
}

class multichoice_answer_possibility {
	public string $display;
	public string $value;

	public function __construct(string $display, string $value){
		$this->display	= $display;
		$this->value	= $value;
	}
}

class multichoice_answer implements answer { 
	private array $choices;

	public function __construct(array $choices){
		$this->choices = $choices;
	}

	public function html() : string { 
		$output = '<form action="quizrunner/wait.php" method="POST" class="answer multichoice">';

		foreach ($this->choices as $choice){
			$output .= "<button type='submit' name='submit' value='$choice->value'>$choice->display</button>";
		}

		$output .= '</form>';

		return $output;
	}
}



class question {
	public string $image;
	public string $prompt;
	public answer $answer;
	
	public function html(){
		return "
<div>
	<img src='$this->image'/>
	<div class='progress-bar'>??%</div>
	<div class='prompt'>
		<p>$this->prompt</p>
	</div>
	{$this->answer->html()}
		";
	}

	public function display(){
		echo $this->html();
	}
}

$question = new question();
$question->image = 'fish.png';
$question->prompt = 'Is fish fishing????';
$question->answer = new multichoice_answer(
	array(
		new multichoice_answer_possibility("Yes!!!!", "yes"),
		new multichoice_answer_possibility("No!!!!!", "no")
	)
);

$question->display();

// Din indholdskode her (HTML eller noget andet indhold).
echo $OUTPUT->footer();

