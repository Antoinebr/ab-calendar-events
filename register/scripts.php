<?php
function ab_cal_events_scripts() {


  wp_enqueue_script( 'mustache', "https://cdnjs.cloudflare.com/ajax/libs/mustache.js/2.2.1/mustache.min.js", false, '2.2.1', true );
  wp_enqueue_script( 'abce', plugins_url( '/js/app.js' , dirname(__FILE__) ), array('jquery','mustache'), '1.10.0', true );
  // Déclaration de la dépendance AJAX
  wp_localize_script('abce', 'ajaxurl', admin_url( 'admin-ajax.php' ) );

  wp_enqueue_style( 'abce-style', plugins_url( '/css/abce-style.css' , dirname(__FILE__) ) );

}

add_action( 'wp_enqueue_scripts', 'ab_cal_events_scripts' );
