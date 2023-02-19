
    <div>
        <center>
            <p class="geekzone">
                La geek zone
            </p>
        </center>  
    </div>
    <div id="div1" class="arcade w_50";>
        page1
    </div>
    <div id="div2" class="sallearcade w_50";>
        page2
    </div>
    <?php 
$query="SELECT * FROM user WHERE valid='1'";
$result=tep_db_query($query,$link);

?>
    <div>
        <table width="80%" align='center'>
            <tr class="border_1 background_grey" width="80%">
                <th class="border_blue" width="25px">
                    id
                </th>
                <th class="border_blue" class="w_25">
                    nom
                </th>
                <th class="border_blue" class="w_25">
                    prenom
                </th>
                <th class="border_blue" width="25px">
                    age
                </th>
                <th class="noborder">
                    &nbsp;
                </th>
            </tr>
            <?php while($row=tep_db_fetch_array($result)) {
                ?>
            <tr class="border_1">
                <td class="border_red">
                   <?php echo $row['ID']; ?>
                </td>
                <td class="border_red">
                <?php echo $row['nom']; ?>
                </td>
                <td class="border_red">
                <?php echo $row['prenom'] ;?>
                </td>
                <td class="border_red">
                <?php echo $row['age'] ;?>
                </td>
                <td class="noborder">
                <?php echo $row['dcrea'] ;?>
                </td>
            </tr>
 
            <?php } ?>

        

        </table>
    </div>
