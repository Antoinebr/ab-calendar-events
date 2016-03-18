<?php
/**
* Plugin Name: AB calendar Events
* Plugin URI: http://antoinebrossault.com
* Description: Ce plugin permet créer un calendrier d'evenements
* Version: 1
* Author: Antoine Brossault
*/



define( 'ABCE', plugin_dir_path( __FILE__ ) );

/**
* Register page admin
*/
//require 'register/admin_page.php';

/**
* Register CPT session
*/
require 'register/cpt_session.php';
require 'register/acf_fields.php';
require 'register/sc_calendar.php';


/**
* Chargement du widget
*/
//require 'widget/widget_newsletter.php';


/**
* Chargement des actions AJAX
*/
require 'ajax/get_session.php';
require 'ajax/load_session.php';


/**
* Chargement du script js
*/
require 'register/scripts.php';
