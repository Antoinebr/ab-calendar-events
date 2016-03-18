<?php

add_action( 'wp_ajax_load_session', 'load_session' );
add_action( 'wp_ajax_nopriv_load_session', 'load_session' );
function load_session(){

  if(is_array($_POST['postId'])){
    $result = array();
    foreach ($_POST['postId'] as $postId) {

      $result[] = array('isMultiple'=> true, get_post($postId,'ARRAY_A'), get_post_meta ($postId));
    }
    echo json_encode($result);
    die(); exit();

  }else{

    if(isset($_POST['postId']) && $_POST['postId'] !== ""){
      $postId = htmlspecialchars($_POST['postId']);
      $postId  = intval($postId);
    }

    $result = array_merge(array('isMultiple'=> false,'url' => get_permalink($postId)),get_post($postId,'ARRAY_A'),get_post_meta ($postId));
    //$result[] = array('isMultiple'=> false, get_post($postId,'ARRAY_A'), get_post_meta ($postId));

    echo json_encode($result);
    die(); exit();

  }


}

?>
