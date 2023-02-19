<?php 
include('application_top.inc.php');
?>
<!DOCTYPE html>
<html>
  <?php
  $query="SELECT * FROM jeux WHERE ID='".$_GET['jeu']."'";
  $result=tep_db_query($query,$link);
  $row=tep_db_fetch_array($result);
  ?>

  <head>
    <link rel="stylesheet" href="css/style.css">
  </head>
  <body class="fond" id="fond">
    <div id="row1 ">
      <div id="div3" class="w_50">
        <img src="images/<?php echo $row['image'];?>" alt="<?php echo $row['nom'];?>" title="<?php echo $row['nom'];?>"  height="300px" width="400px" border="0">
      </div>
      <div class="w_50  col2 ">
        <h1 id="name" class="name center">
          <?php echo $row['nom'];?>
        </h1>
        <p class="f2">
          <?php echo $row['explication'];?>
        </p>
      </div>
  </div> <!-- Fin row1 -->
  <br />
  <div id="row2" class="row">
    <div id="" class="w_50 fs">
      <?php echo mysql_formatdate($row['dates_sortie'], 0);?>
    </div>
    <div id="fs" class="w_50 fs">
      <?php echo $row['note'];?>
    </div>
  </div>
<!-- Fin row2 -->
<div>
<button type="button" onclick="window.location.href='add_jeu.php?action=modif&jeu=<?php echo $row['ID']?>'">
            Modifier
</button>
</div>
  </body>
</html>