<?php
// Register Custom Post Type
function cpt_session() {

  $labels = array(
    'name'                  => _x( 'Sessions', 'Post Type General Name', 'text_domain' ),
    'singular_name'         => _x( 'Session', 'Post Type Singular Name', 'text_domain' ),
    'menu_name'             => __( 'Sessions', 'text_domain' ),
    'name_admin_bar'        => __( 'Sessions', 'text_domain' ),
    'parent_item_colon'     => __( 'Sessions parente', 'text_domain' ),
    'all_items'             => __( 'Toutes les session', 'text_domain' ),
    'add_new_item'          => __( 'Ajouter une nouvelle Sessions', 'text_domain' ),
    'add_new'               => __( 'Ajouter une Session', 'text_domain' ),
    'new_item'              => __( 'Nouvelle Sessions', 'text_domain' ),
    'edit_item'             => __( 'Editer la Sessions', 'text_domain' ),
    'update_item'           => __( 'Mettre à jour la Sessions', 'text_domain' ),
    'view_item'             => __( 'Voir la session', 'text_domain' ),
    'search_items'          => __( 'Chercher une Session', 'text_domain' ),
    'not_found'             => __( 'Aucune sessions trouvées ', 'text_domain' ),
    'not_found_in_trash'    => __( 'Pas de sessions trouvé dans la poubelle', 'text_domain' ),
    'items_list'            => __( 'Liste des sessions', 'text_domain' ),
    'items_list_navigation' => __( 'Sessions liste de nav', 'text_domain' ),
    'filter_items_list'     => __( 'Filtrer les sessions', 'text_domain' ),
  );
  $args = array(
    'label'                 => __( 'Session', 'text_domain' ),
    'description'           => __( 'Sessions de formation', 'text_domain' ),
    'labels'                => $labels,
    'supports'              => array( ),
    'taxonomies'            => array( 'category', 'post_tag' ),
    'hierarchical'          => false,
    'public'                => true,
    'show_ui'               => true,
    'show_in_menu'          => true,
    'menu_position'         => 5,
    'show_in_admin_bar'     => true,
    'show_in_nav_menus'     => true,
    'can_export'            => true,
    'has_archive'           => true,
    'exclude_from_search'   => false,
    'publicly_queryable'    => true,
    'capability_type'       => 'page',
    'menu_icon'           => 'dashicons-calendar-alt',
  );
  register_post_type( 'sessions', $args );

}
add_action( 'init', 'cpt_session', 0 );

?>
