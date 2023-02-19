<?php 
include('application_top.inc.php');
?>
<!DOCTYPE html>
<html>
<head>
<?php   
include ('header.inc.php'); 
?>
</head>
<body id="arcade" class="arcade"> 
       <div class="">
        <!-- <a href="page1.html" title="ma )page 1" target="_blank" >
            lien page 1
        </a>-->
        <button type="button" class="link" data-url='index.php?page=page2' data-target="";>
        <i class="fa fa-gamepad white" aria-hidden="true"></i>
        </button>
        <button type="button" onclick="window.open('https://www.voxgaming.fr/', '_blank')" > 
            <i class="fa fa-shopping-cart white" aria-hidden="true"></i>
        </button>
    </div>
    <?php 
    switch ($_GET['page']){
    
        case "page2":
            include ('page2.inc.php');
        break;
       
        case "page1":
            include ('page1.inc.php');
        break;
       
        default:
        echo ('page d\'accueil');
        break;
    }
    ?>

</body>
</html>