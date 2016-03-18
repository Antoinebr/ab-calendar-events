<?php

// ajouter une page au menu
add_action( 'admin_menu', 'register_my_validate_user_page' );
function register_my_validate_user_page() {
  add_menu_page( 'Newsletter', 'Newsletter', 'manage_options', 'ab-mail-list/admin.php', '', 'dashicons-groups', 11 );

}

?>
