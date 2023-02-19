<?php 
/**
* The base application for website
*
* This file contains the following configurations:
*
* Functions list for database
*
* file includes/functions/database.fnc.php
*/

/** Database connect */
//if (!defined("DIRECT")) {  header("Location: https://gestion.ifl-france.fr"); }
  function tep_db_connect($server = DB_SERVER, $username = DB_SERVER_USERNAME, $password = DB_SERVER_PASSWORD, $database = DB_DATABASE, $link = 'db_link') {
    global $link;

    $link = mysqli_connect($server, $username, $password);

    if ($link) mysqli_select_db($link,$database);
    $result = mysqli_query($link,"SET NAMES utf8"); 
    return $link;
  }
function free_all_results(mysqli $dbCon)
{
    do {
        if ($res = $dbCon->store_result()) {
            $res->fetch_all(MYSQLI_ASSOC);
            $res->free();
        }
    } while ($dbCon->more_results() && $dbCon->next_result());
}
  
 /** Database query */ 

  function tep_db_query($query, $link) {
    global $link;
    $result = mysqli_query($link,"SET NAMES utf8"); 
   if (defined('STORE_DB_TRANSACTIONS') && (STORE_DB_TRANSACTIONS == 'true')) {
      error_log('QUERY ' . $query . "\n", 3, STORE_PAGE_PARSE_TIME_LOG);
    }

    $result = mysqli_query($link, $query) or 
    	tep_db_error($query, mysqli_errno($link), mysqli_error($link));

   if (defined('STORE_DB_TRANSACTIONS') && (STORE_DB_TRANSACTIONS == 'true')) {
       $result_error = mysqli_error($link);
       error_log('RESULT ' . $result . ' ' . $result_error . "\n", 3, STORE_PAGE_PARSE_TIME_LOG);
   }

    return $result;
  }

   function tep_db_multi_query($query, $link) {
    global $link;

   if (defined('STORE_DB_TRANSACTIONS') && (STORE_DB_TRANSACTIONS == 'true')) {
      error_log('QUERY ' . $query . "\n", 3, STORE_PAGE_PARSE_TIME_LOG);
    }

    $result = mysqli_multi_query($link, $query) or 
      tep_db_error($query, mysqli_errno(), mysqli_error());

   if (defined('STORE_DB_TRANSACTIONS') && (STORE_DB_TRANSACTIONS == 'true')) {
       $result_error = mysqli_error();
       error_log('RESULT ' . $result . ' ' . $result_error . "\n", 3, STORE_PAGE_PARSE_TIME_LOG);
   };
  free_all_results($link);

    return $result;
  }



 /** Database error */ 

    function tep_db_error($query, $errno, $error) { 
    die('<font color="#000000"><strong>' . $errno . ' - ' . $error . '<br /><br />' . $query . '<br /><br /><small><font color="#ff0000">[TEP STOP]</font></small><br /><br /></strong></font>');
  }


  /** Fecth array*/
    function tep_db_fetch_array($db_query) {
   // 	print_r (mysqli_fetch_array($db_query, MYSQLI_ASSOC));
    return mysqli_fetch_array($db_query, MYSQLI_ASSOC);
  }

/** NOmde d'enregistrement */
  function tep_db_num_rows($db_query) {
    return mysqli_num_rows($db_query);
  }

    function tep_db_input($string, $link = 'link') {
    global $link;

    if (function_exists('mysqli_real_escape_string')) {
      return mysqli_real_escape_string($link,$string);
    } elseif (function_exists('mysqli_escape_string')) {
      return mysqli_escape_string($string);
    }

    return addslashes($string);
  }


function tep_db_prepare_input($string) {
  if (is_string($string)) {
    return trim(tep_sanitize_string(stripslashes($string)));
  } elseif (is_array($string)) {
    reset($string);
    while (list($key, $value) = each($string)) {
      $string[$key] = tep_db_prepare_input($value);
  }
    return $string;
  } else {
    return $string;
  }
}


function lastauto($ID,$table){

  if ($ID=="" || $ID="new") { 
    $row = tep_db_fetch_array(tep_db_query("SHOW TABLE STATUS LIKE '".$table."'",$link));
    $agent_ID=$row['Auto_increment'];
  } else { $agent_ID=$_POST['ID']; 
  };
 return $agent_ID;
}

  function tep_sanitize_string($string) {
    $string=addslashes($string);
   // $patterns = array ('/ +/','/[<>]/');
   // $replace = array (' ', '_');
    //return preg_replace($patterns, $replace, trim($string));
    return $string;
  }


