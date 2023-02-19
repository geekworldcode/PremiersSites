/* Script J query perso de vincent 
fichier : js/script_vincent.js
*/

$(document).ready(function() {

    $(document).on('click', '.link', function(e) {
        alert("Attention tu rentres dans une zone de geeks !");
      //  $(this).html('Jeux 2');
        window.location.href=$(this).data('url');

    });

});
