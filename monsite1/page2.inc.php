
    <div>
        <center>
                <h1>
                    Jeux
                </h1>
        </center>  
    </div>
<!-- Liste des jeux -->
<?php 
$query="SELECT * FROM jeux";
$result=tep_db_query($query,$link);
?>
<div>
    <table>
        <tr>
            <th class="border_blue">
              ID
            </th>
            <th class="border_blue">
              Nom du jeu
            </th>
            <th class="border_blue">
              Editeur
            </th>
            <th class="border_blue">
              Explication
            </th>
            <th class="border_blue">
              Note
            </th>
            <th class="border_blue">
              Pegi
            </th>
            <th class="border_blue">
              Image
            </th>
            <th class="border_blue">
              Date de sortie
            </th>
            <th class="border_blue">
              Dcrea
            </th>
            <th class="border_blue">
              Valid
            </th>
            </tr>
        <?php
        while($row=tep_db_fetch_array($result)){
          ?>
          <tr>
            <td class="border_blue">
              <?php echo $row['ID'];?>
            </td>
            <td class="border_blue">
              <a href="jeux.php?jeu=<?php echo $row['ID'];?>">
                <?php echo $row['nom'];?>
              </a>
            </td>
            <td class="border_blue">
              <?php echo $row['editeur'];?>
            </td>            
            <td class="border_blue">
              <?php echo $row['explication'];?>
            </td>
            <td class="border_blue">
              <?php echo $row['note'];?>
            </td>
            <td class="border_blue">
              <?php echo $row['pegi'];?>
            </td>
            <td class="border_blue">
              <img src="images/<?php echo $row['image'];?>" class="image_mini" alt="<?php echo $row['nom'];?>" title="<?php echo $row['nom'];?>" />
            </td>
            <td class="border_blue">
              <?php echo mysql_formatdate($row['dates_sortie'], 1); ?>
              
            </td>
            <td class="border_blue">
              <?php echo mysql_formatdate($row['dcrea'], 1); ?>
              
            </td>
            <td class="border_blue">
              <?php echo mysql_valid($row['valid']); ?>
            </td>
        </tr>
          <?php
        }
        ?>
    </table>
</div>
<!-- Fin liste des jeux -->
<button type="button" onclick="window.location.href='add_jeu.php'">
            Ajouter
        </button>
