<?php

function abce_calendar() {
  echo "<div class='agenda'>";
  include_once(ABCE.'templates/calendar.php');
  echo "</div>";
}

add_shortcode('calendar', 'abce_calendar');
