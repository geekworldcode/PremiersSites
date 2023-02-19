<?php 
/**
* The base configuration for website
*
 * * MySQL settings
* * Secret keys
* * Database table prefix
* * ABSPATH
* file includes/config.inc.php
*/

/** The name of the database */
define('DB_DATABASE', "monsite1");
/** MySQL database username */
define('DB_SERVER_USERNAME', "Vincent");
/** MySQL database password */
define('DB_SERVER_PASSWORD', "vermorel");
/** MySQL hostname */
define('DB_SERVER', "localhost");
/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');
/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', 'utf8_bin');

/**
 * Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = '';
$var = 'ma variable';
/** Absolute path to the website directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', dirname( __FILE__ ) . '/' );
}

