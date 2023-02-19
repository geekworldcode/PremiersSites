<?php 
/**
 * The base application for website
 *
 * list de fonctions php 
 *
 * fichier :  includes/funtions/functions.inc.php
 */


/* Conversion date mysql en format xx-xx-xxxx */
function mysql_formatdate($data, $option = 0)
{
	$mysqldate = "";
	$phpdate = strtotime($data);
	if ($data != "") {
		$mysqldate = date('d-m-Y', $phpdate);
	}
	if ($option == "1") {
		$mysqldate .= date(' H:i', $phpdate);
	}
	return $mysqldate;
}
/* Fin Conversion date mysql en format xx-xx-xxxx */

function mysql_valid($data)
{
$valid_mysql = "Non";
if ($data == "1") {
	$valid_mysql = "Oui";
} 
return $valid_mysql;
}








?>