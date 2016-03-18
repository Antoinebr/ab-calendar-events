<?php


add_action( 'wp_ajax_get_session', 'get_session' );
add_action( 'wp_ajax_nopriv_get_session', 'get_session' );
function get_session(){

  $dateStart =  intval(date("Ymd"));

  // args
  $args = array(
    'numberposts'	=> -1,
    'post_type'		=> 'sessions',
    'posts_per_page' => 99999,
    'meta_query'	=> array(
      'key' => 'session_date',
      'value' => array($dateStart,99999999999999999), // par defaut on demande les dates entre maintenant et l'infini
      'type' => 'numeric',
      'compare' => 'BETWEEN'
    )
  );


  // query
  $the_query = new WP_Query( $args );
  $formations = array();
  if( $the_query->have_posts() ):
    while ( $the_query->have_posts() ) : $the_query->the_post();

    $title = get_the_title();

    
    $formations[] = array('id' => get_the_ID(), 'date' => get_field('session_date'), 'title' => $title );

  endwhile; endif;


  echo json_encode($formations);
  die();exit();
}
?>
