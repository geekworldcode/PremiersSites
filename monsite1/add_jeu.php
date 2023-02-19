<?php 

include('application_top.inc.php');
if($_GET['action']=='add'){
  if($_POST['ID']==""){
    $query="insert into jeux (`nom`,`editeur`,`explication`,`note`,`pegi`,`dates_sortie`,`image`,`dcrea`,`dmodif`,`valid`) values (
  '".$_POST['nom']."','".$_POST['editeur']."','".$_POST['explication']."','".$_POST['note']."','".$_POST['pegi']."','".$_POST['date']."','".$_POST['image']."',now(),now(),'1'
)";
  } else{
    $query="UPDATE jeux set 
    `nom`='".$_POST['nom']."',
    `editeur`='".$_POST['editeur']."',
    `explication`='".$_POST['explication']."',
    `note`='".$_POST['note']."',
    `image`='".$_POST['image']."',
    `dmodif`=now()  
    WHERE ID='".$_POST['ID']."'";
  }
$result=tep_db_query($query, $link);
}
if($_GET['action']=='modif'){
  $query="SELECT * FROM jeux WHERE ID='".$_GET['jeu']."'";
  $result=tep_db_query($query,$link);
  $row=tep_db_fetch_array($result);
}

?>
<form name="add_jeu" method="post" action="add_jeu.php?action=add">
  <input type="hidden" id="ID" name="ID" value="<?php echo $row['ID'];?>">
<label>nom du jeu</label>
<input id="nom" name="nom" type="text" value="<?php echo $row['nom'];?>">
<br>
<label>éditeur</label>
<input id="editeur" name="editeur" type="text" value="<?php echo $row['editeur'];?>">
<br>
<label>explication</label>
<textarea id="explication" name="explication" type="text"><?php echo $row['explication'];?>
</textarea>
<br>
<label>note</label>
<input id="note" name="note" type="number" max="20" value="<?php echo $row['note'];?>">
<br>
<label>pegi</label>
<select name="pegi" id="pegi">
<option value="3">Tout public</option>
<option value="10">3-10</option>
<option value="14">11-14</option>
<option value="17">15-17</option>
<option value="18">18+</option>
</select>
<br>
<label>date</label>
<input id="date" name="date" type="text" value="<?php echo $row['dates_sortie'];?>">
<br>
<label>image</label>
<input id="image" name="image" type="text" value="<?php echo $row['image'];?>">
<br>
<button type="cancel" value="Annuler">Annuler
</button>
<button type="submit" value="Valider">Valider
</button>
</form>