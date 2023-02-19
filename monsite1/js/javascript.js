/*/r/n
Pour toutes les fonctions :
- Au retour Ajax
-- Si le champ reload=1 : Rechargement de la page
-- Si le champ url est renseigné, chargement de la page url
--  notifier("Modifications enregistrées", 1500, "success"); /* Affichage message retour ajax 
*/

$(document).ready(function() { /* document ready 1 */
    /********* Generalité *********/
    /* Select data sur focus */
    $(document).on('focus', 'input.tdedit,.edittd,.autoupdate', function(e) {
        $(this).select();
    });
    /* Desactiver la touche entrée sur champ tdedit */
    $(document).on('keydown', 'input.txtedit', function(e) {
        if (e.which == 13 && $('#Newdesc_produit').val() == '') {
            return false;
        }
    });
    /* Fin Desactiver la touche entrée sur champ tdedit */
    /* Selectionner champ sur focus avec class */
    $(document).on('focus', '.txtedit', function(e) {
        $(this).select();
        $('#msg_ajax').hide();
    });
    $(document).on('click', '.auto_complete', function() {
        $(this).select();
    });
    /* Fin Selection champ sur focus ou click  pour champ avec class .edittd */
    /* Affichage PDF on click champ avec class .viewpdf*/
    $('.viewpdf').on('click', function() {
        $('#showpdf').attr('src', $(this).data("file"));
    });
    $('.viewpdf2').on('click', function() {
        $('#showpdf').attr('src', $(this).data("file"));
    });
    /* Ouverture lightbox on click champ avec class .lightbox*/
    $('.lightbox').on('click', function() {
        $('#showimg').attr('src', $(this).data("file"));
    });
    /* Chagmeent de Tab sur pages */
    $(".tabs").click(function() {
        $("#tabs-active").val($(this).data("id"));
    });
    /* Affichage lightbox on click sur champ avec data-target="#lightbox2 */
    var $lightbox = $('#lightbox2');
    $('[data-target="#lightbox2"]').on('click', function(event) {
        var $img = $(this).find('img'),
            src = $img.attr('src'),
            alt = $img.attr('alt'),
            css = {
                'maxWidth': $(window).width() - 100,
                'maxHeight': $(window).height() - 100
            };
        $lightbox.find('.close').addClass('hidden');
        $lightbox.find('img').attr('src', src);
        $lightbox.find('img').attr('alt', alt);
        $lightbox.find('img').css(css);
    });
    $lightbox.on('shown.bs.modal', function(e) {
        var $img = $lightbox.find('img');
        $lightbox.find('.modal-dialog').css({ 'width': $img.width() });
        $lightbox.find('.close').removeClass('hidden');
    });

    /* recuperation date du jouste sur cliek chanmp avec class datenow */
    $(document).on('click', '.datenow', function() {
        var formattedDate = new Date();
        var d = formattedDate.getDate();
        var m = formattedDate.getMonth();
        m += 1; // JavaScript months are 0-11
        var y = formattedDate.getFullYear();
        $("input[name='" + $(this).data('test') + "']").val(getDate(formattedDate));
    });
    /* Fin recuperation date du jouste sur cliek chanmp avec class datenow */
    /* ouvrir URL sur click zone avec class .linkfiche et data-url ou .linkV2 et data-href */
    $(document).on('click', '.linkfiche', function() {
        window.location.href = $(this).data('url');
    });
    $(document).on('click', '.linkV2', function() {
        window.location.href = $(this).data('href');
    });

    /* Fin ouvrir URL sur click zone avec class .linkfiche et data-url ou .linkV2 et data-href */
    /********* Fin Generalité *********/

    // test page search
    if ($('#page_search').length > 0 && $('#page_search').data('keywords') != "") {
        //if () {
        var keywords = $('#page_search').data('keywords').toString().replace(/'/g, '-quote-');
        var searchin = $('#page_search').data('searchin').toString().replace(/'/g, '-quote-');
        //keywords=keywords.replace(/"/g,'-doublequote-');
        envoisearch(keywords.toString(), searchin.toString());
    }
    /* Deconnection via dailog+Ajax */
    $("#logoutBtn").click(function() {
        $("<div>Voulez vous vous deconnecter ?</div>").dialog({
            modal: true,
            buttons: {
                "OK": function() {
                    $(this).dialog("close");
                    AjaxLoginForm("logoutForm");
                },
                "Cancel": function() {
                    $(this).dialog("close");
                }
            }
        });
    });
    // Envoi Email  
    $('.submit').click(function(e) {
        e.preventDefault();
        var form = $(this).data('form');
        jQuery.validator.addMethod("custom_method_one", function(value, element) {
            if (this.optional(element)) {
                return true;
            }
            var emails = value.split(','),
                valid = true;
            for (var i = 0, limit = emails.length; i < limit; i++) {
                value = emails[i];
                valid = valid && jQuery.validator.methods.email.call(this, value, element);
            }
            return valid;
        }, "Format de courrier électronique non valide. Veuillez utiliser une virgule pour séparer plusieurs adresses électroniques.");
        $.validator.addMethod('multipleemailaddress', function(value, element, param) {
            if (this.optional(element)) // return true on optional element
                return true;
            var emails = value.split(/[;,]+/); // split element by , and ;
            valid = true;
            for (var i in emails) {
                value = emails[i];
                valid = valid &&
                    jQuery.validator.methods.email.call(this, $.trim(value), element);
            }
            return valid;
        });
        $.validator.addMethod("phone", function(phone_number, element) {
            phone_number = phone_number.replace(/\s+/g, "");
            return this.optional(element) || phone_number.length > 9 &&
                phone_number.match(/^\+[0-9]{11}$/);
        }, "Please specify a valid phone number");
        $("#" + form).validate({
            // Specify validation rules
            rules: {
                sendto: {
                    required: true,
                    custom_method_one: true
                },
                sendtocc: {
                    required: false,
                    custom_method_one: true
                },
                subject: {
                    required: true,
                },
            },
            // Specify validation error messages
            messages: {
                sendto: {
                    required: "Format de courrier électronique non valide",
                    custom_method_one: "Format de courrier électronique non valide. Veuillez utiliser une virgule pour séparer plusieurs adresses électroniques."
                },
                sendtocc: {
                    required: "Format de courrier électronique non valide",
                    custom_method_one: "Format de courrier électronique non valide. Veuillez utiliser une virgule pour séparer plusieurs adresses électroniques."
                },
                subject: {
                    required: "Sujet Obligatoire",
                }
            },
            submitHandler: function(form) {
                AjaxSubmitFormV2(form, "send_email.ajx.php")
            }
        });
    }); // fin Envoi Email
    // Envoi mail/sms groupé sur  groupage via bouton
    $(document).on('click', '.sendgroupage', function() {
        var url = "sendmail.ajx.php";
        switch ($(this).data('type').toUpperCase()) {
            case "SMS":
                url = "sendsms.ajx.php";
                break;
            default:
                var url = "sendmail.ajx.php";
                break;
        }
        var formdata = "ID=" + $(this).data('id') + "&sujet=" + $(this).data('sujet') + "&page=" + $(this).data('page') + "&option=" + $(this).data('option') + "&code_groupage=" + $('#code_groupage').val();
        $("<div>Voulez vous envoyer les factures pour les projets ?</div>").dialog({
            modal: true,
            buttons: {
                "OK": function() {
                    $(this).dialog("close");
                    $.ajax({
                        type: 'POST',
                        url: url,
                        dataType: "JSON",
                        data: formdata,
                        beforeSend: function() {
                            $('#sendmail').hide();
                            $('.sendgroupage').html('Envoi en cours');
                        },
                        success: function(msg) {
                            if (msg.result == "ok") {


                                $('.sendgroupage').html(msg.message).addClass('errorok');;
                                $('#mailformdivmessage').removeClass('error').addClass('errorok');
                                $('#mailformdivmessage').html(msg.message).show();
                                $('#mailform').html(msg.message).hide();
                                setTimeout(function() {

                                    $('.sendgroupage').html('Envoi factures').removeClass('errorok');;
                                    $('#sendmail').show();
                                }, 1500);

                            } else {
                                $('#mailformdivmessage').addClass('error').removeClass('errorok');
                                $('#mailformdivmessage').html(msg.message).show();

                            }
                            //   $('#mailformdivmessage').delay(3000).fadeOut();
                            $('#sendmail').attr("disabled", false);
                            $('#cancel').attr("disabled", false);
                            $('#sendmail').val('Envoyer Email');
                            setTimeout(function() {
                                $('#mailformdivmessage').hide();
                            }, 4000);

                        },
                        error: function(msg) {
                            //en cas d'erreur
                            alert("Erreur ajax :" + msg.message)
                        },

                    });
                },
                "Cancel": function() {
                    $(this).dialog("close");
                }
            }
        });






    });
    // Fin Envoi mail/sms groupé sur  groupage via bouton


}); /* Fin Document ready 2 */
/* test version mobile */
$(document).ready(function() {
    if (window.matchMedia("(max-width: 740px)").matches) {
        window.location.href = "https://gestion.ifl-france.fr/webapp/?page=nomobile";
    }

});
/* Check si iban */
$("#iban").blur(function() {
    var validiban = isValidIBANNumber($(this).val());
    if (validiban != "1") {
        $('#iban_error').html("Iban non valid").show;
    } else {
        $('#iban_error').toggle();
    }
});
/* Verification format email on change or blur pours les champs avec la class .emailcheck */
$(document).on('change, blur', '.emailcheck', function() {
    if ($(this).val() != "" && !IsEmail($(this).val())) {
        $(this).addClass('error').focus().select();
        $('.error_message.' + $(this).prop('name')).removeClass('hidden');
    } else {
        $(this).removeClass('error');
        $('.error_message.' + $(this).prop('name')).addClass('hidden');
    }
});
/* Fin Checking */

$(document).on('keydown', 'input#searchwords1', function(e) {
    if (e.which == 13) {
        e.preventDefault();
        var keywords = $('#page_search').data('keywords').toString().replace(/'/g, '-quote-');
        var searchin = $('#page_search').data('searchin').toString().replace(/'/g, '-quote-');
        var data = new FormData;
        data.append('keywords', keywords);
        data.append('searchin', searchin);
        if ($('#searchwords').val() != "") {
            $.ajax({
                type: 'POST',
                url: 'search.ajx.php',
                data: data,
                beforeSend: function() {
                    $('.submitBtn').attr("disabled", "disabled");
                    $('.modal-body').css('opacity', '.5');
                },
                success: function(msg) {
                    if (msg.error == 'ok') {
                        if (msg.url != "") {
                            window.location.href = (msg.url);
                        }
                    } else {
                        $('.statusMsg').html('<span style="color:red;">' + msg + '</span>');
                    }
                    $('.submitBtn').removeAttr("disabled");
                    $('.modal-body').css('opacity', '');
                }
            });
        }
    }
});
/* Fonction Envoi recherche par touche entree recherche via Ajax */
$(document).on('keydown', 'input#searchwords', function(e) {
    switch (e.which) {
        case 13:
            e.preventDefault();
            if ($('#searchwords').val() != "") {
                window.location.href = ($(this).data('link') + "&searchwords=" + $('#searchwords').val().replace(/\W/g, " ") + "&searchIN=" + $('#searchIN').val());
            }
            return false;
            break;
            // case 51:
        case 186:
            return false;
            break;
    }
});
/* Fin Fonction Envoi recherche par touche entree recherche via Ajax */
/* Envoi  recherhce su click champ avec class .search */
$(document).on('click', '.search', function(e) {
    if ($('#searchwords').val() != "") {
        //     alert($('#searchwords').val().replace(/\W/g, ""));
        window.location.href = ($(this).data('link') + "&searchwords=" + $('#searchwords').val().replace(/\W/g, " ") + "&searchIN=" + $('#searchIN').val());
    }
});
/* Fin Envoi  recherhce su click champ avec class .search */
$(document).on('click', '.searchold', function() {
    //var formData = new FormData();
    var data = $('#search').serialize();
    if ($('#searchwords').val() != "") {
        $.ajax({
            type: 'POST',
            url: 'search.ajx.php',
            data: data,
            beforeSend: function() {
                $('.submitBtn').attr("disabled", "disabled");
                $('.modal-body').css('opacity', '.5');
            },
            success: function(msg) {
                if (msg.error == 'ok') {
                    if (msg.url != "") {
                        window.location.href = (msg.url);
                    }
                } else {
                    $('.statusMsg').html('<span style="color:red;">' + msg + '</span>');
                }
                $('.submitBtn').removeAttr("disabled");
                $('.modal-body').css('opacity', '');
            }
        });
    }
});

/* Changement champs valid dans base de donnees sur clic objet avec class .validON*/
$(document).on('click', '.validON', function() {
    validON($(this));
});
/* Fin Changement champs valid dans base de donnees sur clic objet avec class .validON*/
$(document).on('change', 'input.adresse_depart', function() {
        $('#is_' + $(this).data('is')).val('1');
    })
    /* Autocomplete base de données via ajax sur changement champ avec class .autocomplete*/
$(document).on('change', '.autocomplete', function() {
    reload = $(this).data("reload");

    if (reload == "1") {
        $('#tabs-1').hide();
        $('#progress').show();
    }


    //typedata = $(this).data('type'),
    //    ID = $('option:selected', this).attr('value'),
    //    champ = $(this).data('champ'),
    //    value = $(this).data('value'),
    //    reload = $(this).data('reload'),
    //    type_retour = $(this).data('typeretour'),
    //    module_ID = $(this).data('moduleid'),
    //   alert($(this).data('type'));
    //  alert($(this).data('reload'));
    $.post("autocomplete.ajx.php", {
            typedata: $(this).data('type'),
            ID: $('option:selected', this).attr('value'),
            champ: $(this).data('champ'),
            value: $(this).data('value'),
            reload: $(this).data('reload'),
            module: $(this).data('module'),
            type_retour: $(this).data('typeretour'),
            module_ID: $(this).data('moduleid'),
            type_addresse: $(this).data('typeaddresse'),
        })
        .done(function(msg) {
            /*  if (msg.ok == 'ok' || msg.error == 'ok') {
                  $('.addresses').html(msg.response);
                  if (msg.ID != "") {
                      $('#is_' + typedata).val('1');
                      $('#' + typedata + '_name').val(msg.name);
                      $('#company.' + typedata).val(msg.company);
                      $('#' + typedata + '_adresse').val(msg.address);
                      $('#' + typedata + '_adresse2').val(msg.address2);
                      $('#' + typedata + '_zipcode').val(msg.zip_code);
                      $('#' + typedata + '_phone').val(msg.phone);
                      $('#' + typedata + '_mobile').val(msg.mobile);
                      $('#' + typedata + '_fax').val(msg.fax);
                      $('#' + typedata + '_city').val(msg.city);
                      $('#' + typedata + '_country ').val(msg.country);
                  }
              }*/
            if (reload == "1") {
                location.reload();
            }
        })
});
/* Fin Autocomplete base de données via ajax sur changement champ avec class .autocomplete*/
/* Autocomplete base de données via ajax sur changement champ avec class .autocomplete_groupage*/
$(document).on('change', '.autocomplete_groupage', function() {
    typedata = $(this).data('type'),
        ID = $('option:selected', this).attr('value'),
        champ = $(this).data('champ'),
        value = $(this).data('value'),
        reload = $(this).data('reload'),
        type_retour = $(this).data('typeretour'),
        $.post("autocomplete.ajx.php", {
            typedata: $(this).data('type'),
            ID: $('option:selected', this).attr('value'),
            champ: $(this).data('champ'),
            value: $(this).data('value'),
            reload: $(this).data('reload'),
            type_retour: $(this).data('typeretour'),
        })
        .done(function(msg) {
            if (msg.error = 'ok') {
                if (msg.ID != "") {
                    for (var i in msg.response) {
                        $('.' + msg.response[i].type_address.toLowerCase() + '_name').val(msg.response[i].name);
                        $('.' + msg.response[i].type_address.toLowerCase() + '_phone').val(msg.response[i].phone);
                        $('.' + msg.response[i].type_address.toLowerCase() + '_adresse').val(msg.response[i].address);
                        $('.' + msg.response[i].type_address.toLowerCase() + '_mobile').val(msg.response[i].mobile);
                        $('.' + msg.response[i].type_address.toLowerCase() + '_adresse2').val(msg.response[i].address2);
                        $('.' + msg.response[i].type_address.toLowerCase() + '_zip').val(msg.response[i].zip_code);
                        $('.' + msg.response[i].type_address.toLowerCase() + '_city').val(msg.response[i].city);
                    }
                }
            }
        })
});
/* Fin Autocomplete base de données via ajax sur changement champ avec class .autocomplete_groupage*/

function ShowProgressAnimation() {
    var pleaseWaitDialog = $("#progress").dialog({
        resizable: false,
        height: "auto",
        width: 150,
        modal: true,
        closeText: "",
        bgiframe: true,
        closeOnEscape: false,
        open: function(type, data) {
            $(this).parent().appendTo($("form:first"));
            $("body").css("overflow", "auto"); //IE scrollbar fix for long checklist templates
        }
    });
}

$(document).on('click', '.changeval', function() {
    if ($(this).data("reload") == "1") {
        $('#tabs-1').hide();
        $('#progress').show();
    }


    var champ = $(this).data("champ");

    var valeur = $(this).data("value");

    var type = $(this).data("type");
    var ID = $(this).data("id");
    var champid = $(this).data("champid");
    var table = $(this).data("table");
    var reload = $(this).data("reload");
    var formdata = "action=update&table=" + table + "&champ=" + champ + "&value=" + valeur + "&typedata=" + type + "&champid=" + champid + "&ID=" + ID + "&reload=" + reload;
    $.ajax({
        type: 'POST',
        url: 'autoupdate.ajx.php',
        data: formdata,
        beforeSend: function() {},
        success: function(msg) {
            if (reload == "1") {
                location.reload();
            }
        }
    });
});


/* Fin Focus sur TAB des modules */
$(document).on('click', '.inputdate', function() {
    $('#' + $(this).data('champ')).val($(this).data('date'));
});
$(document).on('click', '.fiche', function() {
    if ($(this).data("link") == "0") {} else {
        window.location.href = ($('#listeItems').data("url") + '&ID=' + $(this).data("id"));
    }
});
$(document).on('click', '.ckbCheckAll', function() {
    $("." + $(this).data('uncheck')).prop("checked", false);
    $("span." + $(this).data('type')).removeClass("hidden");
    $("span." + $(this).data('uncheck')).addClass("hidden");
    if ($(this).prop('checked') == true) {
        $("." + $(this).data('type')).prop("checked", true);
        $("." + $(this)).prop("checked", true);
    } else {
        $(".ckbCheckAll").prop("checked", false);
        $("." + $(this).data('type')).prop("checked", false);
    }
});
$(document).on('click', '.suppression, .listing, .archiver, .grouper', function() {

    if ($('input:checked[name=liste_select]').length > 0) {
        var action = $(this).attr("id");
        suppression("form", action);
    } else {
        alert("Veuillez cocher au moins 1 element");
    };
});

$(document).on('click', '.valider, .modifierAJX', function() {
        var formulaire = $(this);
        $("<div>" + $(this).data('question') + "</div>").dialog({
            title: formulaire.attr('alt'),
            modal: true,
            buttons: {
                "OK": function() {
                    $(this).dialog("close");
                    ////////////////////////////
                    $.post("autoupdate.ajx.php", {
                            typedata: formulaire.data('type'),
                            table: formulaire.data('table'),
                            ID: formulaire.data('id'),
                            action: 'update',
                            champ: formulaire.data('champ'),
                            value: formulaire.data('value'),
                            reload: formulaire.data('reload'),
                            logs: formulaire.data('logs'),
                            tabs: formulaire.data('tab'),
                        })
                        .done(function(msg) {
                            if (msg.result = "ok") {
                                if (msg.url != "") {
                                    window.location.href = msg.url;
                                } else {
                                    $('.msg').html(msg.message);
                                    $("#msg_ajax").removeClass('alert-danger').addClass('alert-success').show(500);
                                    setTimeout(function() {
                                        $('#msg_ajax').hide(500);
                                        return false;
                                    }, 3000);
                                }
                            }
                        })
                        .fail(function() {})
                        ////////////////////////////
                },
                "Cancel": function() {
                    $(this).dialog("close");
                }
            }
        });
    })
    /* Generation de documents PDF sur click pour class .generate */
$(document).on('click', '.generate', function() {
    AjaxGenerate($(this));
});
/* Fin Generation de documents PDF sur click pour class .generate */
/* changement de modele  sur changemnet pour class .choixmodele */
$(document).on('change', '.choixmodele', function() {
    $('#modele_document').attr('data-modele', $('option:selected', this).attr('value'));
});
/* Fin changement de modele  sur changemnet pour class .choixmodele */
/* Mise à jour ajax onchange sur class .updateAJX */
$(document).on('change', '.updateAJX', function() {

    var x = $(this).offset();
    var y = document.getElementById("window");
    var name = $(this).attr("name");
    var index = $(this).index("input");
    var champ = $(this).data('champ');
    var ID = $(this).data('id');
    $("input:eq(" + (index + 1) + ")").focus();
    if ($(this).data('value') == 'undefined' || $(this).data('value') == '') {
        value = $(this).data('value');
    } else {
        value = $(this).val();
    }
    if ($(this).data("selectvalue") == "txt") {
        value = $('option:selected', this).text();
        //     $('option:selected',this).text();
    }
    $.post("autoupdate.ajx.php", {
            typedata: $(this).data('type'),
            table: $(this).data('table'),
            //   ID: $(this).data('factureid'),
            ID: $(this).data('id'),
            action: 'update',
            champ: $(this).data('champ'),
            champid: $(this).data('champid'),
            typetransport: $(this).data('typetransport'),
            reload: $(this).data('reload'),
            value: value,
        })
        .done(function(msg) {
            /* if (msg.result = "ok") {
              $('#' + name + ID).addClass('errorok');
              $('.msg').html(msg.message);
              $("#msg_ajax").removeClass('alert-danger').addClass('alert-success').show(500);
              setTimeout(function() {
                $('#' + name + ID).removeClass('errorok');
              }, 1000);
              setTimeout(function() {
                $('#msg_ajax').hide(500);
                return false;
              }, 3000);
              */
            notifier(msg.message, 1500, "success", x)
            if (msg.reload = "1") { location.reload(); } else if (msg.url = "") { return false }


            /* }*/
        })
        .fail(function() {})
});
/* Fin Mise à jour ajax onchange sur class .updateAJX */
/* Mise à jour automatique sur champ avec class .inputdetail */
$(document).on('change ', '.inputdetail', function() {
    $.post("autoupdate.ajx.php", {
            typedata: $(this).data('type'),
            table: $(this).data('table'),
            //   ID: $(this).data('factureid'),
            ID: $(this).data('id'),
            action: 'update',
            champ: $(this).data('champ'),
            value: $(this).val(),
        })
        .done(function(msg) {
            if (msg.result = "ok") {
                $('.msg').html(msg.message);
                $("#msg_ajax").removeClass('alert-danger').addClass('alert-success').show(500);
                setTimeout(function() {
                    $('#msg_ajax').hide(500);
                    return false;
                }, 3000);
                if (msg.url = "") { return false }
            }
        })
        .fail(function() {})
});
/* Fin Mise à jour automatique sur champ avec class .inputdetail */

/* Mise à jour automatique sur click de bouton avec class .changeAJX */
$(document).on('click', 'button.changeAJX', function() {
        if ($('#' + $(this).data('champ')).val() == "") {
            $('.msg').html("Veuillez entrez une valeur");
            $("#msg_ajax").removeClass('alert-success').addClass('alert-danger').show(500);
            setTimeout(function() {
                $('#msg_ajax').hide(500);
                $("#msg_ajax").removeClass('alert-danger');
                return false;
            }, 3000);
        } else {
            $(this).addClass("hidden");
            $('#' + $(this).data('champ')).prop("disabled", true).addClass('form-disabled');
            $.post("autoupdate.ajx.php", {
                    typedata: $(this).data('type'),
                    table: $(this).data('table'),
                    ID: $(this).data('id'),
                    action: 'update',
                    champ: $(this).data('champ'),
                    value: $('#' + $(this).data('champ')).val(),
                })
                .done(function(msg) {
                    if (msg.result = "ok") {
                        $('.msg').html(msg.message);
                        $('.msg').html("Mise à jour faite");
                        $("#msg_ajax").removeClass('alert-danger').addClass('alert-success').show(500);
                        setTimeout(function() {
                            $('#msg_ajax').hide(500);
                            return false;
                        }, 3000);
                        if (msg.url = "") { return false }
                    }
                })
                .fail(function() {})
            return false;
        }
    })
    /* Fin Mise à jour automatique sur click de bouton avec class .changeAJX */
    /* activer champ sur click avec class .modifierdisabled */
$(document).on('click', '.modifierdisabled', function() {
        champ = $(this).data('champ');
        $('#' + champ).prop("disabled", false).removeClass("textedit online");
        $('#help' + champ).show();
    })
    /* Fin activer champ sur click avec class .modifierdisabled */
    /* Mise à jour automatique champ sur changement de select avec class .changeAJX*/
$(document).on('change', 'select.changeAJX', function() {
        var typedata = $(this).data('type');
        var table = $(this).data('table');
        var ID = $(this).data('factureid');
        var champs = $(this).data('champ');
        var value = $(this).val();
        var reload = $(this).data('reload');
        var message = $(this).data("question");
        var action = 'update';
        if (message == undefined) {
            message = "Voulez vous changer cette valeur?";
        }
        $("<div>" + message + "</div>").dialog({
            title: "Modification",
            modal: true,
            buttons: {
                "OK": function() {
                    //////////
                    var champ = $(this).data('champ');
                    var valeur = $(this).val();
                    $(this).addClass("hidden");
                    $('#' + champ).prop("disabled", true).addClass('form-disabled');
                    $.post("autoupdate.ajx.php", {
                            typedata: typedata,
                            table: table,
                            ID: ID,
                            action: action,
                            champ: champs,
                            value: value,
                            reload: reload
                        })
                        .done(function(msg) {
                            if (msg.result = "ok") {
                                if (msg.reload = "1") {
                                    location.reload();
                                } else {
                                    $('.msg').html(msg.message);
                                    $("#msg_ajax").show(500);
                                    setTimeout(function() {
                                        $('#msg_ajax').hide(500);
                                        return false;
                                    }, 3000);
                                }
                            }
                        })
                        .fail(function() {})
                    $(this).dialog("close");
                },
                "Cancel": function() {
                    $(this).dialog("close");
                }
            }
        });
    })
    /* Fin Mise à jour automatique champ sur changement de select avec class .changeAJX*/
    /*  Mise à jour automatique champ sur changement de input avec class .changeAJX*/
$(document).on('change', 'input.changeAJX', function() {
        if ($(this).data("casse") == "upper") {
            $(this).val($(this).val().toUpperCase());
        }
        var champ = $(this).data('champ');
        var valeur = $(this).val();
        //  $('#'+champ).prop("disabled", true).addClass('form-disabled');  
        $.post("autoupdate.ajx.php", {
                typedata: $(this).data('type'),
                table: $(this).data('table'),
                ID: $(this).data('factureid'),
                action: 'update',
                champ: $(this).data('champ'),
                value: $(this).val()
            })
            .done(function(msg) {
                if (msg.result = "ok") {
                    $('#' + champ).prop("disabled", true).addClass("textedit online");
                    $('#help' + champ).hide();
                    $('.msg').html(msg.message);
                    $("#msg_ajax").show(500);
                    setTimeout(function() {
                        $('#msg_ajax').hide(500);
                        return false;
                    }, 3000);
                }
            })
            .fail(function() {})
    })
    /*  Fin Mise à jour automatique champ sur changement de input avec class .changeAJX*/
$(document).on('click', '.addresse_optionnelle', function() {
    if ($(this).prop('checked')) {
        $("#" + $(this).data('type')).show();
    } else {
        $("#" + $(this).data('type')).hide();
    }
});
$(document).on('change', '.change', function() {
        var champ = $(this).data('champ');
        var valeur = $("#" + champ + " option:selected").text();
        $('.' + champ).addClass("hidden");
        $('#' + champ + '_view').val(valeur).removeClass("hidden");
    })
    /* Ajouter ligne option on click sur class .ajouterOptions */
$(document).on('click', '.ajouterOptions', function() {
    var submit_form = 0;
    msg = "";
    nb = 1;
    if ($('#libelle').val().length > 0) { submit_form += 1; } else { msg += "<li>Libellé Obligatoire</li>"; };
    erreurSaisie('#name', submit_form);
    if (submit_form == nb) {
        var name = $('#libelle').val();
        var code = $('#code').val();
        var option = $('#option').val();
        var type_form = $('#Type_form').val();
        var formdata = "Type_form=" + type_form + "&name=" + name + "&code=" + code + "&option=" + option;
        $.ajax({
            type: 'POST',
            url: 'submit_form.php',
            //   data:'facture_ID='+$("#facture_id"),
            data: formdata,
            beforeSend: function() {},
            success: function(msg) {
                if (msg.error == 'ok') {
                    window.location.href = (msg.url);
                } else {}
            }
        });
    } else {
        msg = "Veuillez corriger les erreurs\n" + msg;
        $('.msg').html(msg).show(500);
        setTimeout(function() {
            $('.msg').hide(500);
            return false;
        }, 4000);
    }
});
/* Fin Ajouter ligne option on click sur class .ajouterOptions */
$(document).on('click', '.modalCloneForm', function() {
    valeurs = $(this).data("id");
    table = $(this).data("table");
    type = $(this).data("type");
    url = $(this).data("url");
    tiers = $("#tiers").val();
    id_base = $(this).data("idbase");
    tabs = $(this).data("tabs");
    ID_client = $(this).data("idclient");
    if ($(this).data("action")) {
        action = $(this).data("action");
    } else {
        action = "suppression";
    }
    $.ajax({
        type: 'POST',
        url: 'submit_form.php',
        //    data : $("#form").serializeArray(),
        data: "Type_form=" + action + "&ID=" + valeurs + "&table=" + table + "&type=" + type + "&url=" + url + "&id_base=" + id_base + "&tabs=" + tabs + "&tiers=" + tiers + "&ID_client=" + ID_client,
        beforeSend: function() {
            $('.submitBtn').attr("disabled", "disabled");
            $('.modal-body').css('opacity', '.5');
        },
        success: function(msg) {
            if (msg.error == 'ok') {
                if (msg.url != "") {
                    window.location.href = (msg.url);
                } else {
                    location.reload();
                }
            } else {
                $('.statusMsg').html('<span style="color:red;">' + msg + '</span>');
            }
            $('.submitBtn').removeAttr("disabled");
            $('.modal-body').css('opacity', '');
        }
    });

});
/* Suppriomer ou cloner sur click class .supprimer,.cloner via Ajax */
$(document).on('click', '.supprimer,.cloner ', function() {
    valeurs = $(this).data("id");
    table = $(this).data("table");
    type = $(this).data("type");
    url = $(this).data("url");
    id_base = $(this).data("idbase");
    tabs = $(this).data("tabs");
    if ($(this).data("action")) {
        action = $(this).data("action");
    } else {
        action = "suppression";
    }
    $("<div>" + $(this).data("question") + "</div>").dialog({
        modal: true,
        buttons: {
            "OK": function() {
                $.ajax({
                    type: 'POST',
                    url: 'submit_form.php',
                    //    data : $("#form").serializeArray(),
                    data: "Type_form=" + action + "&ID=" + valeurs + "&table=" + table + "&type=" + type + "&url=" + url + "&id_base=" + id_base + "&tabs=" + tabs,
                    beforeSend: function() {
                        $('.submitBtn').attr("disabled", "disabled");
                        $('.modal-body').css('opacity', '.5');
                    },
                    success: function(msg) {
                        if (msg.error == 'ok') {
                            if (msg.url != "") {
                                window.location.href = (msg.url);
                            } else {
                                location.reload();
                            }
                        } else {
                            $('.statusMsg').html('<span style="color:red;">' + msg + '</span>');
                        }
                        $('.submitBtn').removeAttr("disabled");
                        $('.modal-body').css('opacity', '');
                    }
                });
                $(this).dialog("close");
            },
            "Cancel": function() {
                $(this).dialog("close");
            }
        }
    });
});
/* Suppriomer ou cloner sur click class .supprimer,.cloner via Ajax */
/* Desactiver touche Entrée sur champ avec class .txtedit */
$(".txtedit").keydown(function(event) {

    if (event.keyCode == 13) {
        event.preventDefault();
        return false;
    }
}, true); // "true" => phase de capture
/* Fin Desactiver touche Entrée sur champ avec class .txtedit */

/* Valider champ dans base de données sur touche Entree et Tab pour champ avec class .online via ajax */
$(document).on('keydown', '.online', function(event) {
        if (event.keyCode == "13" || event.keyCode == "9") {
            var valinit = $(this).data('init');
            if ($(this).val() != valinit) {
                $.post("autoupdate.ajx.php", {
                        typedata: $(this).data('type'),
                        table: $(this).data('table'),
                        ID: $(this).data('id'),
                        action: 'update',
                        champ: $(this).data('champ'),
                        value: $(this).val(),
                        reload: $(this).data('reload'),
                        init: $(this).data('init'),
                        calc: $(this).data('calc'),
                    })
                    .done(function(msg) {
                        if (msg.result == "ok") {
                            $(".online").blur();
                            //  $(this).data('init',$(this).val());
                            $('.msg').html(msg.message);
                            $("#msg_ajax").removeClass('alert-danger').addClass('alert-success').show(500);
                            setTimeout(function() {
                                $('#msg_ajax').hide(500);
                                return false;
                            }, 3000);
                            if (msg.url != "") {
                                window.location.href = msg.url;
                            } // else { }
                        } else {
                            $('.msg').html(msg.message);
                            $("#msg_ajax").removeClass('alert-success').addClass('alert-danger').show(500);
                            setTimeout(function() {
                                $('#msg_ajax').hide(500);
                                return false;
                            }, 3000);
                            $(ID).html(valinit);
                        }
                    })
                    .fail(function() {})
            }
        }
    })
    /* Fin Valider champ dans base de données sur touche Entree et Tab pour champ avec class .online via ajax */
    /* Valider champ dans base de données sur sortie de focus pour champ avec class .onlinett via ajax */
$(document).on('focusout', '.onlinett', function(e) {
        var valinit = $(this).data('init');
        if ($(this).val() != valinit) {
            $.post("autoupdate.ajx.php", {
                    typedata: $(this).data('type'),
                    table: $(this).data('table'),
                    ID: $(this).data('id'),
                    action: 'update',
                    champ: $(this).data('champ'),
                    value: $(this).val(),
                    reload: $(this).data('reload'),
                    init: $(this).data('init'),
                    calc: $(this).data('calc'),
                })
                .done(function(msg) {
                    if (msg.result == "ok") {
                        $('.msg').html(msg.message);
                        $("#msg_ajax").removeClass('alert-danger').addClass('alert-success').show(500);
                        setTimeout(function() {
                            $('#msg_ajax').hide(500);
                            return false;
                        }, 3000);
                        if (msg.url != "") {
                            window.location.href = msg.url;
                        } // else { }
                    } else {
                        $('.msg').html(msg.message);
                        $("#msg_ajax").removeClass('alert-success').addClass('alert-danger').show(500);
                        setTimeout(function() {
                            $('#msg_ajax').hide(500);
                            return false;
                        }, 3000);
                        $(ID).html(valinit);
                    }
                })
                .fail(function() {})
        }
    })
    /* Fin Valider champ dans base de données sur sortie de focus pour champ avec class .onlinett via ajax */
    /* Mise a jour automatique sour focusout pour champ avec class .txtedit via Ajax */
$(document).on('focusout', '.txtedit', function(e) {
    // var valinit=$(this).data('init');
    var ID = "#" + $(this).prev('.edit').data('champ') + $(this).data('id');
    var valinit = $(this).data('init');
    $(this).hide();
    // Hide and Change Text of the container with input elmeent
    $(this).prev('.edit').show();
    $(this).prev('.edit').text($(this).val());
    //var champedit=$(this).prev('.edit');
    if ($(this).val() > $(this).data('max') || $(this).val() < $(this).data('min')) {
        $('.msg').html("Valeur illégal");
        $("#msg_ajax").removeClass('alert-success').addClass('alert-danger').show(500);
        setTimeout(function() {
            $('#msg_ajax').hide(500);
            return false;
        }, 3000);
        $(this).val($(this).data('init'));
        $(this).val($(this).data('init'));
        $(this).prev('.edit').html($(this).data('init'));
    } else {
        if ($(this).val() != valinit) {
            $.post("autoupdate.ajx.php", {
                    typedata: $(this).data('type'),
                    table: $(this).data('table'),
                    ID: $(this).data('id'),
                    action: 'update',
                    champ: $(this).data('champ'),
                    value: $(this).val(),
                    reload: $(this).data('reload'),
                    init: $(this).data('init'),
                    calc: $(this).data('calc'),
                    idbase: $('#idbase').val(),
                    tablebase: $('#idbase').data('basetable'),
                })
                .done(function(msg) {
                    if (msg.result == "ok") {
                        $('.msg').html(msg.message);
                        $("#msg_ajax").removeClass('alert-danger').addClass('alert-success').show(500);
                        setTimeout(function() {
                            $('#msg_ajax').hide(500);
                            return false;
                        }, 3000);
                        if (msg.url != "") {
                            window.location.href = msg.url;
                        } // else { }
                    } else {
                        $('.msg').html(msg.message);
                        $("#msg_ajax").removeClass('alert-success').addClass('alert-danger').show(500);
                        setTimeout(function() {
                            $('#msg_ajax').hide(500);
                            return false;
                        }, 3000);
                        $(ID).html(valinit);
                    }
                })
                .fail(function() {})
        }
    } // end controle
});
/* Fin Mise a jour automatique sour focusout pour champ avec class .txtedit via Ajax */

$(document).on('click', '.modifier', function() {
    var champ = $(this).data('champ');
    $('#btn_' + champ).removeClass('hidden');
    switch ($(this).data('type')) {
        case "text":
            $('#' + champ).prop("disabled", false).removeClass('form-disabled');
            break;
        case "select":
            $('.' + champ).removeClass("hidden");
            $('#' + champ + '_view').addClass("hidden");
            break;
    }
});
/* Activer champ de saisie sur click dans zone avec class .edit */
$(document).on('click', '.edit', function() {
    $('.txtedit').hide();
    $(this).next('.txtedit').show().focus();
    $(this).hide();
});
/* Fin Activer champ de saisie sur click dans zone avec class .edit */
/* valider champ de saisie sur focusout dans zone avec class .texteditn via Ajax */
$(document).on('focusout', '.texteditn', function(e) {
    // Get edit id, field name and value
    var id = this.id;
    var split_id = id.split("_");
    var field_name = split_id[0];
    var edit_id = split_id[1];
    var value = $(this).val();
    // Hide Input element
    $(this).hide();
    $(this).prev('.edit').show();
    $(this).prev('.edit').text(value);

    $.ajax({
        url: 'update.php',
        type: 'post',
        data: { field: field_name, value: value, id: edit_id },
        success: function(response) {}
    });
});
/* Fin valider champ de saisie sur focusout dans zone avec class .texteditn via Ajax */

$(document).on('click', '.noclient', function(e) {
        $("#devis_adresse").toggle(500);
    })
    /* Retour arriere page sur click sur champ  a.back ou button.back */
$(document).on('click', 'a.back,button.back', function(e) {
        parent.history.back();
        return false;
    })
    /* Fin Retour arriere page sur click sur champ  a.back ou button.back */

$(document).on('click', '.insert_projet, .insert_devis_clients', function() {

    typedata = $(this).data('type');
    ID = $(this).data('id');
    message = $(this).data('message');
    data = "typedata=" + typedata + "&ID=" + ID;
    $("<div>" + message + "</div>").dialog({
        modal: true,
        buttons: {
            "OK": function() {
                $.ajax({
                    type: 'POST',
                    url: 'autocomplete.ajx.php',
                    data: data,
                    beforeSend: function() {
                        $('.submitBtn').attr("disabled", "disabled");
                        $('.modal-body').css('opacity', '.5');
                    },
                    success: function(msg) {
                        if (msg.error == 'ok') {
                            if (msg.url != "") {
                                window.location.href = (msg.url);
                            }
                        }
                    }
                });
                $(this).dialog("close");
            },
            "Cancel": function() {
                $(this).dialog("close");
            }
        }
    });
});

$(document).on('change', 'input[type=file]', function() {
    if ($(this).val != "") {
        $('.addFile').removeClass('hidden');
    } else {
        $('.addFile').addClass('hidden');
    }
});
/* Ajouter un fichier*/
$(document).on('click', '.addFile', function() {
    var formData = new FormData($("#FormFile")[0]);
    $.ajax({
        url: "submit_form.php",
        type: 'POST',
        data: formData,
        //     mimeType: "multipart/form-data",
        contentType: false,
        cache: false,
        processData: false,
        datatype: "application/json",
        success: function(msg, textStatus, jqXHR) {
            if (msg.error == 'ok') {
                if (msg.url != "") {
                    window.location.href = (msg.url);
                }
            }
        },
        error: function(msg, textStatus, errorThrown) {}
    });
});
/* Fin Ajouter un fichier*/
/* Ouverture ligthbox sur click sur class .modalFile avec source data-file */
$(document).on('click', '.modalFile', function() {
    $('.lightbox').attr('src', $(this).data('file'));
});
/* Fin Ouverture ligthbox sur click sur class .modalFile avec source data-file */
/* Créatino d'un groupge sur click avec class .demande_groupage avec confiramtion en dialog */
$(document).on('click', '.demande_groupage', function() {
    var valeurs = "";
    $('input:checked[name=liste_select]').each(function() {
        valeurs += $(this).val() + ',';
    });
    if (valeurs != "") {
        $("<div>Voulez vous créer un groupage pour les demandes " + valeurs + " ?</div>").dialog({
            title: "Création de groupage",
            modal: true,
            buttons: {
                "OK": function() {
                    $.ajax({
                        type: 'POST',
                        url: 'update.ajx.php',
                        data: "type=demande_groupage&dossiers=" + valeurs,
                        beforeSend: function() {},
                        success: function(msg) {
                            if (msg.message == 'ok') {
                                window.location.href = (msg.url);
                            } else {
                                $('.statusMsg').html('<span style="color:red;">' + msg + '.</span>').show();
                                $('.statusMsg').delay(3000).fadeOut();
                            }
                        }
                    });
                    $(this).dialog("close");
                },
                "Cancel": function() {
                    $(this).dialog("close");
                }
            }
        });
    } else {
        $("<div>Vous devez selectionner au moins une demande demande </div>").dialog({
            title: "Création de groupage",
            modal: true,
            buttons: {
                "OK": function() {
                    $(this).dialog("close");
                }
            }
        });
    }
});
/* Création d'un groupge sur click avec class .demande_groupage avec confiramtion en dialog */
/*  Téléchargement sur click sur class .telecharger */
$(document).on('click', '.telecharger', function() {
    telecharger("form", $(this).data('name'));
});
/*  Téléchargement sur click sur class .telecharger */
/* Annulation frappe sur champ avec class .disabledinput */
$(document).on('keypress', '.disabledinput', function() {
    return false;
    $(this).blur();
});
/* Annulatino frappe sur champ avec class .disabledinput */
$(document).on('click', '.addfileemail, #addfileemail', function() {
    if ($(this).prev('input').val() == "") {
        alert("ko");
    } else {}
});
/* Appliquer nouveau modele email sur change champ avec class modelmailselected */
$(document).on('change', '.modelmailselected', function() {
    var action = $("#email_modele_action").val();
    var table = $(this).data('table');
    var type = $(this).data('type');
    var page = $(this).data('page');
    var detail_ID = $(this).data('detailid');
    var ID = $(this).val();
    $("<div>Voulez vous appliquer ce modele  ?</div>").dialog({
        modal: true,
        buttons: {
            "OK": function() {
                $.ajax({
                    type: 'POST',
                    //     contentType: "application/json",
                    //      dataType: "json",
                    url: 'autoupdate.ajx.php',
                    //    data : $("#form").serializeArray(),
                    data: "action=" + action + "&table=" + table + "&page=" + page + "&detail_ID=" + detail_ID + "&ID=" + ID,
                    // contentType: "application/json",
                    dataType: "JSON",
                    beforeSend: function() {
                        $('.submitBtn').attr("disabled", "disabled");
                        $('.modal-body').css('opacity', '.5');
                    },
                    success: function(msg) {
                        if (msg.result == 'ok') {
                            if (msg.sujet != "") {
                                $("#sujet").val(msg.sujet);
                            }
                            //     $('#email_message').html(msg.texte);
                            //$('.ckeditor').ckeditor();
                            CKEDITOR.instances['email_message'].setData(msg.texte)
                        } else {
                            $('.statusMsg').html('<span style="color:red;">' + msg + '</span>');
                        }
                        $('.submitBtn').removeAttr("disabled");
                        $('.modal-body').css('opacity', '');
                    }
                });
                $(this).dialog("close");
            },
            "Cancel": function() {
                $(this).dialog("close");
            }
        }
    });
});
/* Fin Appliquer nouveau modele email sur change champ avec class modelmailselected */
/* Divers Validation formulaire plugin vallidator */
$(document).ready(function() {
    $.validator.addMethod('multipleemailaddress', function(value, element, param) {
        if (this.optional(element)) // return true on optional element
            return true;
        var emails = value.split(/[;,]+/); // split element by , and ;
        valid = true;
        for (var i in emails) {
            value = emails[i];
            valid = valid &&
                jQuery.validator.methods.email.call(this, $.trim(value), element);
        }
        return valid;
    });
    $.validator.addMethod('multiplesmsmobile', function(value, element, param) {
        if (this.optional(element)) // return true on optional element
            return true;
        var emails = value.split(/[;,]+/); // split element by , and ;
        valid = true;
        for (var i in emails) {
            value = emails[i];
            if (IsPhone(value) == false || value.length < 12) {
                valid = false;
                return false;
            }
        }
        return valid;
    }, "Veullez entrer un numéro de mobile au format international (ex : +33 601020304)");
    $("#mailform").validate({
        ignore: ".ignore",
        debug: false,
        rules: {
            destinataire: {
                required: true,
                multipleemailaddress: true,
            },
            destinatairesms: {
                required: true,
                multiplesmsmobile: true,
            },
            bc: {
                multipleemailaddress: true,
            },
            sujet: { required: true, },
            email_message: {
                required: function() { CKEDITOR.instances.email_message.updateElement() },
                minlength: 10,
            }
        }, // Fin rules
        messages: {
            destinataire: {
                required: "Merci d'entrer l'email du destinataire",
                multipleemailaddress: "Les emails doivent être au format name@domaine.com 22",
            },

            destinatairesms: {
                required: "Merci d'entrer le mobile",
                destinatairesms: "Les mobiles doivent être au format ",
            },
            bc: {
                multipleemailaddress: "Les emails doivent être au format name@domaine.com",
            },
            sujet: {
                required: "Merci d'entrer l'objet du mail",
            },
            email_message: {
                required: "Le message est obligatoire",
                minlength: "Le message est obligatoire",
            },
        },
        submitHandler: function(form) {
            SendForm("#mailform");
        }
    });
    $("#smsform").validate({
        ignore: [],
        debug: false,
        rules: {
            destinataire: {
                required: true,
                multiplesmsmobile: true,
            },
            sujet: { required: true, },
            email_message: {
                required: function() { CKEDITOR.instances.email_message.updateElement() },
                minlength: 10,
            }
        }, // Fin rules
        messages: {
            destinataire: {
                required: "Merci d'entrer le téléphone mobile du destinataire",
                multiplesmsmobile: "Les sms doivent être au format +000000000",
            },
            sujet: {
                required: "Merci d'entrer l'objet du SMS",
            },
            email_message: {
                required: "Le message est obligatoire",
                minlength: "Le message est obligatoire",
            },
        },
        submitHandler: function(form) {
            SendForm("#mailform");
        }
    });
});
/* Fin Divers Validation formulaire plugin vallidator */
$(document).on('click', '.checkbox', function() {
    if ($(this).is(':checked')) {
        $("." + $(this).attr('id')).addClass("hidden");
    } else {
        $("." + $(this).attr('id')).removeClass("hidden");
    }
});
$(document).on('click', '.delfichierjoint', function() {
    $("#fichier").toggle();
    $("#labelfichier").toggle();
    if ($("#fichier").is(":hidden")) {
        $(this).removeClass("fa-trash-alt").addClass("fa-file-invoice");
        $("#fichierjoint").val('');
    } else {
        $(this).removeClass("fa-file-invoice").addClass("fa-trash-alt");
        $("#fichierjoint").val($(this).data('file'));
    }
});
$(document).on('click', '.custom-modal', function(e) {
    $('#from').html($(this).data('from'));
    $('#date').html($(this).data('date'));
    $('#destinataire').html($(this).data('destinataire'));
    $('#fichier_joint').html($(this).data('fichier'));
    $($(this).data('target') + " .modal-body").html($(this).data('contenu'));
})

// Sélectionner tous les liens ayant l'attribut rel valant tooltip
// $(document).on('.classfortooltip').mouseover(function(e) {
$(document).ready(function() {
    $(function() {
        $(document).tooltip({
            content: function() {
                return $(this).prop('title')
            }
        });

    });

});
/* Telechargement de document avec confirmation dialog on click sur class .upload_file */
$(document).on('click', '.upload_file', function(e) {
    e.preventDefault();
    valeur = $(this).data('id');
    type = $(this).data('type');
    tabs = $(this).data('tabs');
    table = $(this).data('table');
    $("<div>Voulez vous télécharger ces documents ?</div>").dialog({
        modal: true,
        buttons: {
            "OK": function() {
                $.ajax({
                    type: 'POST',
                    url: 'submit_form.php',
                    data: "Type_form=telecharger&ID=" + valeur + "&type=" + type + "&tabs=" + tabs,
                    beforeSend: function() {
                        $('.submitBtn').attr("disabled", "disabled");
                        $('.modal-body').css('opacity', '.5');
                    },
                    success: function(msg) {
                        if (msg.error == 'ok') {
                            if (msg.url != "") {
                                window.open(msg.url);
                            } else {
                                location.reload();
                            }
                        } else {
                            $('.statusMsg').html('<span style="color:red;">' + msg + '</span>');
                        }
                        $('.submitBtn').removeAttr("disabled");
                        $('.modal-body').css('opacity', '');
                    }
                });
                $(this).dialog("close");
            },
            "Cancel": function() {
                $(this).dialog("close");
            }
        }
    });
});
/* Telechargement de document avec confirmation dialog on click sur class .upload_file */
/* Envoi de sms avec confirmation dialog on click sur class .envoisms via ajax*/
$(document).on('click', '.envoisms', function(e) {
        e.preventDefault();
        var page = $(this).data('page');
        var numero = $(this).data('mobile');
        var ID = $(this).data('id');
        $("<div>" + $(this).data('question') + "</div>").dialog({
            modal: true,
            title: "Envoi SMS",
            buttons: {
                "OK": function() {
                    $.ajax({
                        type: 'POST',
                        //     contentType: "application/json",
                        //      dataType: "json",
                        url: 'sendsms.ajx.php',
                        //    data : $("#form").serializeArray(),
                        data: "type_form=" + page + "&page=" + page + "&numero=" + numero + "&ID=" + ID,
                        beforeSend: function() {
                            $(this).attr("disabled", "disabled");
                        },
                        success: function(msg) {
                            if (msg.error == 'ok') {
                                if (msg.url != "") {
                                    window.location.href = (msg.url);
                                } else {}
                            } else {
                                $('.statusMsg').html('<span style="color:red;">' + msg + '</span>');
                            }
                            $(this).removeAttr("disabled");
                        }
                    });
                    $(this).dialog("close");
                },
                "Cancel": function() {
                    $(this).dialog("close");
                }
            }
        });
    })
    /* Envoi de sms avec confirmation dialog on click sur class .envoisms */
    /* Duplication objet on click sur class .dupliquer via ajax  */
$(document).on('click', '.dupliquer', function(e) {
        var message = $(this).data('message');
        var ID = $(this).data('id');
        var type = $(this).data('type');
        $("<div>Voulez vous dupliquer " + message + " ?</div>").dialog({
            modal: true,
            buttons: {
                "OK": function() {
                    $.ajax({
                        type: 'POST',
                        //     contentType: "application/json",
                        //      dataType: "json",
                        url: 'submit_form.php',
                        //    data : $("#form").serializeArray(),
                        data: "Type_form=clonage&type=" + type + "&ID=" + ID,
                        beforeSend: function() {},
                        success: function(msg) {
                            if (msg.error == 'ok') {
                                if (msg.url != "") {
                                    window.location.href = (msg.url);
                                } else {}
                            } else {
                                $('.statusMsg').html('<span style="color:red;">' + msg + '</span>');
                            }
                            $('.submitBtn').removeAttr("disabled");
                            $('.modal-body').css('opacity', '');
                        }
                    });
                    $(this).dialog("close");
                },
                "Cancel": function() {
                    $(this).dialog("close");
                }
            }
        });
    })
    /* Duplication objet on click sur class .dupliquer via ajax  */
    /* Ajouter facture on click sur class .addfature via ajax */
$(document).on('click', '.addfacture', function(e) {
    e.preventDefault();
    var data = "Type_form=" + $('#typeform').val();
    data += "&ID=" + $('#groupage_ID').val();
    data += "&factures_template=" + $('#modele :selected').val();
    $.ajax({
        type: 'POST',
        url: 'submit_form.php',
        data: data,
        beforeSend: function() {},
        success: function(msg) {
            if (msg.error == 'ok') {
                if (msg.url != "") {
                    window.location.href = (msg.url);
                } else {}
            } else {
                $('.statusMsg').html('<span style="color:red;">' + msg + '</span>');
            }
            $('.submitBtn').removeAttr("disabled");
            $('.modal-body').css('opacity', '');
        }
    });
});
/* Fin Ajouter facture on click sur class .addfature via ajax */
/* Validation format email on blur sur class .email */
$(document).on('blur', '.email', function(e) {
    if ($(this).val() != "") {
        if (!validateEmail($(this).val())) {
            $(this).addClass('errorSaisie focus').focus().select();
        } else {
            $(this).removeClass('errorSaisie focus');
        }
    } else {
        $(this).removeClass('errorSaisie focus');
    }
});
/* Validation format email on blur sur class .email */
/* Autocomplete avec rechargement de page on Change sur class .reload via Ajax */
$(document).on('change', '.reload', function(e) {
    var typedata = "modeleemail";
    var page = $(this).data('page');
    var view = $(this).data('view');
    var ID = $(this).data('id');
    var type = $('#modelmailselected').val();
    var nom = $('#nom').val();
    var sujet = $('#sujet').val();
    $.ajax({
        type: 'POST',
        url: 'autocomplete.ajx.php',
        data: 'typedata=' + typedata + '&page=' + page + '&view=' + view + '&ID=' + ID + '&sujet=' + sujet + '&type=' + type + '&nom=' + nom,
        beforeSend: function() {},
        success: function(msg) {
            window.location.href = (msg.url);
        }
    });
});
/* Fin Autocomplete avec rechargement de page on Change sur class .reload via Ajax */
/* Creation model email sur click sur class .addemailmodele via ajax */
$(document).on('click', '.addemailmodele', function(e) {
        var envoi = '1';
        var email = CKEDITOR.instances['email_message'].getData();
        // Test module
        if ($('#modelmailselected').val() == "") {
            $('#modelmailselected').addClass('errorSaisie error')
            $('#Errormodelmailselected').html("Champ obligatoire").show();
            envoi = "0";
        } else {
            $('#modelmailselected').removeClass('errorSaisie error')
            $('#Errormodelmailselected').hide();
        }
        // Test Nom
        if ($('#nom').attr('required') == "required" && $('#nom').val().length < $('#nom').attr('minlength')) {
            $('#nom').addClass('errorSaisie error')
            $('#ErrorNom').html("Champ obligatoire").show();
            envoi = "0";
        } else {
            $('#nom').removeClass('errorSaisie error')
            $('#ErrorNom').hide();
        }
        // Test Sujet
        if ($('#sujet').attr('required') == "required" && $('#sujet').val().length < $('#sujet').attr('minlength')) {
            $('#sujet').addClass('errorSaisie error')
            $('#Errorsujet').html("Champ obligatoire").show();
            envoi = "0";
        } else {
            $('#sujet').removeClass('errorSaisie error')
            $('#Errorsujet').hide();
        }
        // Test Sujet
        if (email == "") {
            $('#email_message').addClass('errorSaisie error')
            $('#Erroremail_message').html("Champ obligatoire").show();
            envoi = "0";
        } else {
            $('#email_message').removeClass('errorSaisie error')
            $('#Erroremail_message').hide();
        }
        if (envoi == '1') {
            AjaxSubmitForm("emailsform");
        }
    })
    /* Fin Creation model email sur click sur class .addemailmodele via ajax */
    /* Ouverture ou fermeture colonne d'aide on click sur class .aide */
$(document).on('click', '.aide', function(e) {
    if ($('.divaide').is(":hidden")) {
        $('#maincol').removeClass('col-lg-12').addClass('col-lg-10');
    } else {
        $('#maincol').removeClass('col-lg-10').addClass('col-lg-12');
    }
    $('.divaide').toggle();
});
/* Ouverture ou fermeture colonne d'aide on click sur class .aide */
/* Creation client on click sur class .insert_client */
$(document).on('click', '.insert_client', function() {

    typedata = $(this).data('type');
    ID = $(this).data('id');
    data = "typedata=" + typedata + "&ID=" + ID;
    $("<div>" + $(this).data('message') + "</div>").dialog({
        title: $(this).data('message'),
        modal: true,
        buttons: {
            "OK": function() {
                $.ajax({
                    type: 'POST',
                    url: 'autocomplete.ajx.php',
                    data: data,
                    beforeSend: function() {
                        $('.submitBtn').attr("disabled", "disabled");
                        $('.modal-body').css('opacity', '.5');
                    },
                    success: function(msg) {
                        if (msg.error == 'ok') {
                            if (msg.url != "") {
                                window.location.href = (msg.url);
                            }
                        }
                    }
                });
                $(this).dialog("close");
            },
            "Cancel": function() {
                $(this).dialog("close");
            }
        }
    });
});
/* Fin Creation client on click sur class .insert_client */
$(document).on('change', '.mailauto', function(e) {
    if ($(this).data('valinit') == "" && $(this).val() != "") {
        $("#mail_" + $(this).data('type')).val($(this).data('mailauto'))
    }
});
$(document).on('change', '.change', function(e) {
    if ($(this).is(':checked')) {
        $("." + $(this).data('change')).show();
    } else {
        $("." + $(this).data('change')).hide();
        $("#" + $(this).data('change') + "champ").val('');
    }
});
/* Verif email on change sur class .formemail */
$(document).on('change', '.formemail', function(e) {
    alert(validateEmail($(this).val()));
});
/* Fin  Verif email on change sur class .formemail */
/* Mise à jour automatique on change sur class */
$(document).on('change', 'input.tdedit, input.autoupdate,select.autoupdate,textarea.autoupdate', function() {

        var ok = "1";
        action = $(this).data('action');;
        typedata = $(this).data('type');
        champ = $(this).data('champ');
        table = $(this).data('table');
        reload = $(this).data('reload');
        id = $(this).data('id');
        value = $(this).val();
        calc = $(this).data('calc');
        var $this = $(this);

        if ($(this).attr('required') == "required" && value == "") {
            $(this).val($(this).data('init'));
            $(this).addClass('error');
            $(this).attr('placeholder', 'Champ Obligatoire').select();
            ok = "0";
        } else {
            $(this).removeClass('error');
        }

        if (ok == '1') {
            if ($(this).val() != "" && $(this).data('check') == "email" && !IsEmail($(this).val())) {
                $(this).val($(this).data('init'));
                $(this).addClass('error');
                $(this).attr('placeholder', 'Veuillez entrer un email valid').select();
                // $(this).val('Veuillez entrer un email valid').select();
                ok = "0";
            } else {
                $(this).removeClass('error');
            }

            if ($(this).val() != "" && $(this).data('check') == "phone" && !IsPhone($(this).val())) {
                $(this).val($(this).data('init'));
                $(this).addClass('error');
                $(this).attr('placeholder', 'Veuillez entrer un téléphone valide au format international ').select();

                ok = "0";
            } else {
                $(this).removeClass('error');
            }
        }
        if (reload == '1') {
            $("div.table-responsive").hide();
            $("div.table-responsive.reload").show();
        }
        if (ok == "1") {
            $this.addClass('errorok');
            $.ajax({
                url: "autoupdate.ajx.php",
                method: "POST",
                data: { action: action, typedata: typedata, table: table, champ: champ, reload: reload, ID: id, value: value, calc: calc },
                success: function(data) {
                    setTimeout(function() { $this.removeClass('errorok');; }, 1000);
                    if (reload == '1') {
                        location.reload();
                    }
                    if (reload == "generate") {
                        $('#autogenerate').click();
                    }
                }
            });
        }
    })
    /* Fin Mise à jour automatique on change sur class */

/* Recherche individuelle */
$(document).on('click', '.searchindi', function() {
    var data = $('#formsearch').serialize();
    if ($('#searchindi').val() != "") {
        $.ajax({
            type: 'POST',
            url: 'search.ajx.php',
            data: data,
            beforeSend: function() {
                $('.submitBtn').attr("disabled", "disabled");
                $('.modal-body').css('opacity', '.5');
            },
            success: function(msg) {
                if (msg.error == 'ok') {
                    if (msg.url != "") {
                        window.location.href = (msg.url);
                    }
                } else {
                    $('.statusMsg').html('<span style="color:red;">' + msg + '</span>');
                }
                $('.submitBtn').removeAttr("disabled");
                $('.modal-body').css('opacity', '');
            }
        });
    }
});
/* Fin  Recherche individuelle */
/* Classement table resultat avec class .row_position et mise à jour */
$(document).ready(function() {
        $(".row_position").sortable({
            delay: 150,
            stop: function() {
                table = $(this).data("table");
                var selectedData = new Array();
                $('.row_position>tr').each(function() {
                    selectedData.push($(this).attr("id"));
                });
                updateOrder(selectedData, table);
            }
        });
    })
    /* Fin Classement table resultat avec class .row_position et mise à jour */
    /* Classement table resultat avec class .tbody.reorder-list et mise à jour */
$(document).ready(function() {
    $("tbody.reorder-list").sortable({
        placeholder: "ui-state-highlight",
        update: function(event, ui) {
            var table = $(this).data("table");
            var champ = $(this).data("champ");
            var page_id_array = new Array();
            $('#projets_package tr').each(function() {
                page_id_array.push($(this).attr("id"));
            });
            $.ajax({
                url: "autoupdate.ajx.php",
                method: "POST",
                data: { action: "ordre", page_id_array: page_id_array, table: table, champ: champ },
                success: function(data) {
                    if (data.reload == '1') {
                        $("div.table-responsive").hide();
                        $("div.table-responsive.reload").show();
                        location.reload();
                    }
                }
            });
        }
    });
});
/* Fin Classement table resultat avec class .tbody.reorder-list et mise à jour */
$(document).ready(function() {
    var heights = $(".panel").map(function() {
            return $(this).height();
        }).get(),
        maxHeight = Math.max.apply(null, heights);
    $(".panel").height(maxHeight);
});
/*  Mise à jours profils (gestion de proffilfs) */
$(document).on('change', 'input.profils_droits', function() {
    typedata = $(this).data('type');
    champ = $(this).data('champ');
    table = $(this).data('table');
    reload = $(this).data('reload');
    code = $(this).data('code');
    profil = $(this).data('profil');
    value = $(this).val();
    if (value == "1") {
        $(this).val('0');
    } else {
        $(this).val('1');
    }
    $.ajax({
        url: "autoupdate.ajx.php",
        method: "POST",
        data: { action: "update_profils", code: code, profil: profil, table: table, champ: champ, typedata: typedata, value: value },
        success: function(data) {
            $('.statusMsg').html(data.msg).show().delay(2000).fadeOut();
        }
    });
});
/*  Fin Mise à jours profils (gestion de proffilfs) */
/* Avertissement 'Opération non autorisée' on click sur class .fa-lock, .fas.light_grey */
$(document).on('click', '.fa-lock, .fas.light_grey', function() {
        $("<div>Opération non autorisée</div>").dialog({
            closeOnEscape: true,
            title: "ATTENTION !",
            modal: true,
            draggable: false,
            height: 80,
            show: { effect: "fade", duration: 300 },
            hide: { effect: "fade", duration: 300 },
            open: function(event, ui) {
                var $this = $(this);
                setTimeout(function() { $this.dialog('close') }, 2000);
                $('.ui-dialog-titlebar-close').hide();
            }
        });
    })
    /* Fin Avertissement 'Opération non autorisée' on click sur class .fa-lock, .fas.light_grey */
    /* Mise à jour automatique on change sur class .customer_data */
$(document).on('change', '.customer_data', function() {
    typedata = $(this).data('type');
    champ = $(this).data('champ');
    table = $(this).data('table');
    ID = $(this).data('id');
    value = $(this).val();
    $.ajax({
        url: "autoupdate.ajx.php",
        method: "POST",
        data: { action: "update_user", typedata: typedata, ID: ID, table: table, champ: champ, value: value },
        success: function(data) {
            if ($(this).data('msg') != "0") {
                $('.statusMsguser span').html(data.msg);
                $('.statusMsguser').html(data.msg).show().delay(2000).fadeOut();
            }
        }
    });
});
/* Fin Mise à jour automatique on change sur class .customer_data */
$(document).on('click', '.changeadresse,.customer_data_change', function() {
    $('input').attr("disabled", true);
    $('select').attr("disabled", true);
    //$('button').html('Modifier').val('Modifier').removeClass('terminer').addClass('modifier');  
    if ($(this).val() == "Modifier") {
        $('button').html('Modifier').val('Modifier').removeClass('terminer').addClass('modifier');
        $(this).html('Terminer').val('Terminer').removeClass('modifier').addClass('terminer');
        $('.' + $(this).data('typeaddress')).attr("disabled", false).addClass('enabled');
    } else {
        $(this).html('Modifier').val('Modifier').removeClass('terminer').addClass('modifier');
        $('input').attr("disabled", true);
        $('select').attr("disabled", true);
    }
})
$(document).on('click', '.envoigroupe', function() {
    champ = $(this).data("champ");
    valeur = $(this).val();
    $(this).prop('checked') // Boolean true
    if ($(this).prop('checked')) {
        $('#' + champ).val(valeur);
    } else {
        $('#' + champ).val("");
    }
});
/* Test champ on change sur class .new_demande_package, .new_demande_reglement */
$(document).on('change', '.new_demande_package, .new_demande_reglement', function() {
    if ($(this).prop('required')) {
        switch ($(this).attr('type')) {
            case 'number':
                if ($(this).val() < $(this).attr('min')) {
                    $(this).addClass('error');
                } else {
                    $(this).removeClass('error');
                }
                break;
            case 'options':
                if ($(this).val() == "") {
                    $('#package_label select option ').addClass('errorok');
                } else {
                    $(this).removeClass('error');
                }
                break;
            case 'texte':
            case 'text':
                if ($(this).val() == "") {
                    $(this).addClass('error');
                } else {
                    $(this).removeClass('error');
                }
                break;
        }
    }
});
/* Fin Test champ on change sur class .new_demande_package, .new_demande_reglement */
/* Mise à jour automatique on click sur class button.formaddpackage, button.formaddreglement */
$(document).on('click', 'button.formaddpackage, button.formaddreglement', function() {
    var ok = 1;
    var typeadd = $(this).data('typeadd');
    var data = "";
    $("." + typeadd).each(function() {
        //    alert($(this).attr('name') + ':' + $(this).val() + "|");
        data += $(this).attr('name') + ':' + $(this).val() + "|";
        if ($(this).prop('required')) {
            switch ($(this).attr('type')) {
                case 'number':
                    if ($(this).val() < $(this).attr('min')) {
                        $(this).addClass('error');
                        ok = "0";
                    } else {
                        $(this).removeClass('error');
                    }
                    break;
                case 'options':
                case 'texte':
                case 'text':
                    if ($(this).val() == "") {
                        $(this).addClass('error');
                        ok = "0";
                    }
                    break;
            }
        }
    });
    if (ok == "1") {
        $.ajax({
            url: "autoupdate.ajx.php",
            method: "POST",
            data: { action: typeadd, table: $(this).data('table'), ID: $(this).data('id'), reload: $(this).data('reload'), data },
            success: function(data) {
                if (data.reload == "1") {
                    window.location.href = (data.url);
                }
            }
        });
    }
});
/* Fin Mise à jour automatique on click sur class button.formaddpackage, button.formaddreglement */
$(document).on('click', 'button.btnaddpackage,button.btnaddreglement, button.btnadddocument', function() {
    switch ($(this).val()) {
        case 'Annuler':
            $(this).val('Ajouter').text('Ajouter');
            $('.' + $(this).data("type")).addClass('hidden');
            $('input.' + $(this).data("type")).val("");
            $('select.' + $(this).data("type")).val("");
            break;
        case 'Ajouter':
            $(this).val('Annuler').text('Annuler');
            $('.' + $(this).data("type")).removeClass('hidden');
            break;
    }
});
/* Changement du formulaire suivant choix type package on change sur class .demande_package_label */
$(document).on('change', '.demande_package_label', function(e) {
        var option = remove_accents($(this).find('option:selected').text().toLowerCase());
        if (option == "vehicule") {
            $(this).closest('tr').find('#package_libelle').val(':');;
            $(this).closest('tr').find('#package_libelle').hide();
            $(this).closest('tr').find('span.' + option).show();
            // Case à cocher
        } else {
            $(this).closest('tr').find('#package_libelle').val('');
            $(this).closest('tr').find('#package_libelle').show();
            $(this).closest('tr').find('span.options').hide();
        }
    })
    /* Fin Changement du formulaire suivant choix type package on change sur class .demande_package_label */
    /* Creation facture de module on click sur class .addfactureModule */
$(document).on('click', '.addfactureModule', function(e) {
    e.preventDefault();
    var data = "Type_form=" + $(this).data('typeform');
    data += "&module=" + $('#module').val();
    data += "&ID=" + $('#demande_ID').val();
    data += "&factures_template=" + $('#modele :selected').val();
    $.ajax({
        type: 'POST',
        url: 'submit_form.php',
        data: data,
        beforeSend: function() {},
        success: function(msg) {
            if (msg.error == 'ok') {
                if (msg.url != "") {
                    window.location.href = (msg.url);
                } else {}
            } else {
                $('.statusMsg').html('<span style="color:red;">' + msg + '</span>');
            }
            $('.submitBtn').removeAttr("disabled");
            $('.modal-body').css('opacity', '');
        }
    });
});
/* Fin Creation facture de module on click sur class .addfactureModule */
$(document).on('click', 'input[name="pj[]"]', function(e) {
    if ($(this).prop('checked')) {
        $(this).next('span').addClass('bold');
    } else {
        $(this).next('span').removeClass('bold');
    }
});
$(document).on('change', '#searchIN', function(e) {
        $('#page_search').attr('data-searchin', $(this).val());
    })
    /* Clonage adresse on click sur class .address_clone */
$(document).on('click', '.address_clone', function(e) {

        var type_address = $(this).data('typeaddresse');
        var devis_id = $(this).data('devisid');
        var module = $(this).data('module');
        $('#' + type_address + "_address_name").val($('#billing_name').val());
        $('#' + type_address + "_address_address").val($('#billing_address').val());
        $('#' + type_address + "_address_address2").val($('#billing_address2').val());
        $('#' + type_address + "_address_zip_code").val($('#billing_zip_code').val());
        $('#' + type_address + "_address_city").val($('#billing_city').val());
        $('#' + type_address + "_address_phone").val($('#billing_phone').val());
        $('#' + type_address + "_address_mobile").val($('#billing_mobile').val());
        $('#' + type_address + "_address_country").val($('#billing_country  option:selected').val()).change();
        if ($(this).prop('checked')) {
            $.ajax({
                type: 'POST',
                url: 'autocomplete.ajx.php',
                data: { typedata: "duplicateaddresse", devis_id: devis_id, type_address: type_address, module: module },
                beforeSend: function() {},
                success: function(msg) {
                    $('.changesession').val("");
                    var sessions = msg.session.split("|");
                    $.each(sessions, function(key, value) {
                        var session_detail = value.split(":");
                        $('#' + session_detail[0]).val(session_detail[1]);
                    });
                }
            });
        }
    })
    /* Fin Clonage adresse on click sur class .address_clone */
    /* Formatage champ telephone on keyup sur class .phone */
$(document).on('keyup', '.phone', function(e) {
    $(this).val($(this).val().replace(/[^+ 0-9]/gi, ''));
});
/* Fin  Formatage champ telephone on keyup sur class .phone */
/* interdire chagememnt valeur champ on focus sur class .nomodif */
$(document).on('focus', '.nomodif', function(e) {
    var nextI = $("input").index(this) + 1,
        next = $("input").eq(nextI);
    next.focus();
});
/* Fin interdire chagememnt valeur champ on focus sur class .nomodif */
/* Mise à jour de lien on change sur class .updatelink */
$(document).on('change', '.updatelink', function(e) {
    $('.linkfk_projet').html($(this).val());
    if ($(this).val().length > 0) {
        $('.num_projets').removeClass('hidden');
    } else {
        $('.num_projets').addClass('hidden');
    }
    $('a#linkfk_projet').attr('href', $(this).data('url') + "&ID=" + parseInt($(this).val().substring(3, 100)));
});
/* Fin Mise à jour de lien on change sur class .updatelink */
/* Changement de modele on change sur class .changemodele */
$(document).on('change', '.changemodele', function(e) {
        action = $(this).data('action');
        typedata = $(this).data('typedata');
        type = $(this).data('type');
        originetype = $(this).data('originetype');
        origine = $(this).data('origine');
        champ = $(this).data('champ');
        table = $(this).data('table');
        reload = $(this).data('reload');
        id = $(this).data('id');
        value = $(this).val();
        $("<div>" + $(this).data('message').replace("%%CHOIX%%", $(this).find('option:selected').text()) + "</div>").dialog({
            title: "Changement de modèle",
            modal: true,
            buttons: {
                "Oui": function() {
                    $.ajax({
                        url: "autoupdate.ajx.php",
                        method: "POST",
                        data: { action: action, type: type, originetype: originetype, typedata: typedata, table: table, champ: champ, reload: reload, origine: origine, ID: id, value: value },
                        success: function(data) {
                            setTimeout(function() { $this.removeClass('errorok');; }, 1000);
                            if (reload == '1') {
                                location.reload();
                            }
                        }
                    });
                    $(this).dialog("close");
                },
                "Non": function() {
                    $(this).dialog("close");
                }
            }
        });
    })
    /* Fin changement de modele on change sur class .changemodele */
    /* Export*/
$(document).on('click', '.envoiexport', function(e) {
    type_form = $(this).data('typeform');
    type = $(this).data('type');
    date_debut = $("#date_debut").val();
    date_fin = $("#date_fin").val();
    $.ajax({
        type: 'POST',
        url: 'submit_form.php',
        data: "Type_form=" + type_form + "&type=" + type + "&date_debut=" + date_debut + "&date_fin=" + date_fin + "&order=datep",
        beforeSend: function() {
            $('.envoiexport').attr("disabled", "disabled");
        },
        success: function(msg) {
            if (msg.error == 'ok') {
                if (msg.download != "") {
                    window.open(msg.download);
                }
                $('.envoiexport').removeAttr("disabled");
            }
        }
    });
});
/* Ajouter client on click sur class .addclient */
$(document).on('click', '.addclient', function(e) {
    source = $(this).data("source");
    ID = $(this).data("id");
    reload = $(this).data("reload");
    $("<div>Voulez vous créer le client " + $(this).data("client") + " ?</div>").dialog({
        title: "Création Client",
        modal: true,
        buttons: {
            "OK": function() {
                $.ajax({
                    type: 'POST',
                    url: 'submit_form.php',
                    data: "Type_form=addclient&source=" + source + "&source_ID=" + ID + "&reload=" + reload,
                    beforeSend: function() {
                        $(this).hide();
                        $('.modal-body').css('opacity', '.5');
                    },
                    success: function(msg) {
                        if (msg.error == 'ok') {
                            if (msg.reload == "1") {
                                location.reload();
                            }
                        }
                    }
                });
                $(this).dialog("close");
            },
            "Cancel": function() {
                $(this).dialog("close");
            }
        }
    });
});
/* Fin Ajouter client on click sur class .addclient */
/*  Ajouter suivi client on click sur class .add_suivi */
$(document).on('click', '.add_suivi', function(e) {
        if ($('#suivi_note').val().trim().length > 2) {
            ID = $(this).data('id');
            value = $('#suivi_note').val();
            type_form = $(this).data('type');
            module = $(this).data('module');
            odd = $(this).data('odd');
            reload = "0";
            $.ajax({
                type: 'POST',
                url: 'submit_form.php',
                data: "Type_form=" + type_form + "&ID=" + ID + "&texte=" + value + "&module=" + module + "&odd=" + odd + "&reload=" + reload,
                beforeSend: function() {
                    $(this).hide();
                    $('.modal-body').css('opacity', '.5');
                },
                success: function(msg) {
                    if (msg.error == 'ok') {
                        $("#suivi tbody").prepend(msg.ligne);
                        $("#suivi_note").val("");
                        $('#suivi_note').removeClass('error').attr("placeholder", "");
                    }

                }
            });
        } else {
            $('#suivi_note').addClass('error').attr("placeholder", "Veuillez saisir du texte");
        }
    })
    /*  Fin Ajouter suivi client on click sur class .add_suivi */
    /* Ajouter facture d'effest personnel on click sur class .add_facture_effets */
$(document).on('click', '.add_facture_effets', function(e) {
    ID = $(this).data("projetid");
    reload = $(this).data("reload");
    typefact = $(this).data("typefact");
    amount = $(this).data("amount");
    Type_form = $(this).data("typeform");
    $("<div>Voulez vous vous creer une facture d'effets personels ?</div>").dialog({
        title: "Création facture",
        modal: true,
        buttons: {
            "OK": function() {
                $(this).dialog("close");
                $.ajax({
                    type: 'POST',
                    url: 'update.ajx.php',
                    data: "type=" + Type_form + "&ID=" + ID + "&type_facture=" + typefact + "&amount_fact=" + amount + "&reload=" + reload + "&projet_ID=" + ID,
                    beforeSend: function() {
                        $(this).hide();
                        $('.modal-body').css('opacity', '.5');
                    },
                    success: function(msg) {
                        if (msg.message == 'ok') {
                            if (msg.reload == "1") {
                                location.reload();
                            }
                        }

                    }
                });
            },
            "Cancel": function() {
                $(this).dialog("close");
            }
        }
    });
});
/* Fin Ajouter facture d'effest personnel on click sur class .add_facture_effets */
/* Creation facture on click sur class .createfacture */
$(document).on('click', '.createfacture', function(e) {
    ID = $(this).data("id");
    reload = $(this).data("reload");
    typefact = $(this).data("typefact");
    amount = $(this).data("amount");
    $.ajax({
        type: 'POST',
        url: 'submit_form.php',
        data: "Type_form=add_demande_facture&ID=" + ID + "&type_fact=" + typefact + "&amount_fact=" + amount + "&reload=" + reload,
        beforeSend: function() {
            $(this).hide();
            $('.modal-body').css('opacity', '.5');
        },
        success: function(msg) {
            if (msg.error == 'ok') {
                if (msg.reload == "1") {
                    location.reload();
                }
            }

        }
    });
});
/* Fin Creation facture on click sur class .createfacture */
/* Autocomplete sur champ input a partir de 3 caractéres on keyup sur class .auto_complete */
$(document).on('keyup', '.auto_complete', function() {
    if ($(this).val().length > 2) {
        typedata = $(this).data('typedata');
        type = $(this).data('type');
        code = $(this).val();
        $.ajax({
            url: "autocomplete.ajx.php",
            type: 'POST',
            data: { typedata: typedata, type: type, code: code },
            success: function(response) {
                $("div#suggestion-box").show();
                $("#suggestion-box").html(response.liste);
                $("#search-box").css("background", "#FFF");
                // $('#ID').val(response.ID);
            }
        });
    }
});
/* Fin Autocomplete sur champ input a partir de 3 caractéres on keyup sur class .auto_complete */
/* Selection de donnes sur auto_complte on click  class .selectautocomplete_list */
$(document).on('click', '.selectautocomplete_list', function() {
    $("#suggestion-box").html("");
    $("div#suggestion-box").hide();
    switch ($(this).data('type')) {
        case "client":
            /* si choix de client mise à jour champs via Ajax*/
            $('#nom_client').val($(this).data("name"));
            if ($('#nom_client').data("retour") != "") {
                $('#' + $('#nom_client').data("retour")).val($(this).attr("id"));
                $('#ID_client').val($(this).attr("id"));
            } else {
                $('#ID_client').val($(this).attr("id"));
            }
            typedata = "adresses";
            ID = $('#ID_client').val();
            type_retour = "options";
            projet_ID = $('#ID_projet').val();
            type_form = $('#Type_form').val();
            $.ajax({
                url: "autocomplete.ajx.php",
                type: 'POST',
                data: { typedata: typedata, type_retour: type_retour, ID: ID, projet_ID: projet_ID, type_form: type_form },
                success: function(msg) {
                    notifier("Mise à jour effectuée", 3000, "success");
                    $('.addresses').html(msg.response);
                }
            });
            break; /* Fin si choix de client mise à jour champs via Ajax*/
    }
})

$(document).on('click', 'button.plusclient', function() {
        if ($("#nom_client").val() != "") {
            $("#client_name").val($("#nom_client").val());
        } else {
            $("#client_name").val($("#adresse_depart_name").val());
        }
        $("#email").val($("#adresse_depart_email").val());
        $("#address1_dep").val($("#adresse_depart_adresse").val());
        $("#address2_dep").val($("#adresse_depart_adresse2").val());
        $("#telephone_dep").val($("#adresse_depart_phone").val());
        $("#mobile_dep").val($("#adresse_depart_mobile").val());
        $("#zipcode_dep").val($("#adresse_depart_zipcode").val());
        $("#city_dep").val($("#adresse_depart_city").val());
        $("#Pays_dep").val($("#adresse_depart_country").val());

        $("#address1_arr").val($("#adresse_arrivee_adresse").val());
        $("#address2_arr").val($("#adresse_arrivee_adresse2").val());
        $("#telephone_arr").val($("#adresse_arrivee_phone").val());
        $("#mobile_arr").val($("#adresse_arrivee_mobile").val());
        $("#zipcode_arr").val($("#adresse_arrivee_zipcode").val());
        $("#city_arr").val($("#adresse_arrivee_city").val());
        $("#Pays_arr").val($("#adresse_arrivee_country").val());
    })
    /* Filtre sur lite on keyup sur ID #filtre_liste */
$(document).on("keyup", "#filtre_liste", function() {
    var value = $(this).val().toLowerCase();
    $('#filtre_liste').val($(this).val().toUpperCase());
    $("#mytable tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
});
/* Fin Filtre sur lite on keyup sur ID #filtre_liste */


/* autoupdate champ vallid on click class .valid */

$(document).on('click', '.valid', function(e) {
    action = $(this).data('action');;
    typedata = $(this).data('type');
    champ = $(this).data('champ');
    table = $(this).data('table');
    reload = $(this).data('reload');
    id = $(this).data('id');
    value = $(this).attr('value');
    if (value == "0") {
        $(this).attr('value', 1);
    } else {
        $(this).attr('value', 0);
    }
    $.ajax({
        url: "autoupdate.ajx.php",
        method: "POST",
        data: { action: action, typedata: typedata, table: table, champ: champ, reload: reload, ID: id, value: value },
        success: function(data) {
            $("#" + id).removeClass("valid_color_0 valid_color_1").addClass("valid_color_" + data.newval);
            notifier(data.msg, 1500, "success");
            if (reload == '1') {
                location.reload();
            }
        }
    });
});
/* autoupdate champ vallid on click class .valid */

/************** Fonctions ****************/
/* Checking */
/* Check si email */
function IsEmail(email) {
    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!regex.test(email)) {
        return false;
    } else {
        return true;
    }
}
/* Check si telephone */
function IsPhone(phone) {
    var regex = /^(\+|00)[0-9\-\(\)\s]+$/;
    if (!regex.test(phone)) {
        return false;
    } else {
        return true;
    }
}
/* recuperation date avec formatage day + "-" + month + "-" + year*/
function getDate(d) {
    var day = d.getDate();
    var month = d.getMonth() + 1;
    var year = d.getFullYear();
    if (day < 10) {
        day = "0" + day;
    }
    if (month < 10) {
        month = "0" + month;
    }
    var date = day + "-" + month + "-" + year;
    return date;
}
/* Fin recuperation date avec formatage day + "-" + month + "-" + year*/
$(function() { /* Function 3 */
    /* Date picker */
    /* Date picker simple*/
    $(".datepicker").datepicker({
        altField: "#datepicker",
        closeText: 'Fermer',
        prevText: 'Précédent',
        nextText: 'Suivant',
        currentText: 'Aujourd\'hui',
        monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
        monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
        dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
        dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
        dayNamesMin: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
        weekHeader: 'Sem.',
        dateFormat: 'dd-mm-yy',
        mask: true,
        onSelect: function(date) {
            //     alert();
        }
    });
    /* Date picker reglement*/
    $(".datepickerReg").datepicker({
        maxDate: new Date(),
        altField: "#datepicker",
        closeText: 'Fermer',
        prevText: 'Précédent',
        nextText: 'Suivant',
        currentText: 'Aujourd\'hui',
        monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
        monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
        dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
        dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
        dayNamesMin: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
        weekHeader: 'Sem.',
        dateFormat: 'dd-mm-yy',
        onSelect: function(date) {
            var ok = "1";
            action = $(this).data('action');;
            typedata = $(this).data('type');
            champ = $(this).data('champ');
            table = $(this).data('table');
            reload = $(this).data('reload');
            id = $(this).data('id');
            value = $(this).val();
            var $this = $(this);
            $.ajax({
                url: "autoupdate.ajx.php",
                method: "POST",
                data: { action: action, typedata: typedata, table: table, champ: champ, reload: reload, ID: id, value: value },
                success: function(data) {
                    setTimeout(function() { $this.removeClass('errorok');; }, 1000);
                    if (reload == '1') {
                        location.reload();
                    }
                }
            });
        }
    }); /* Fin Date picker reglement*/

    $(document).on('change', '.datepickerautoupdate', function(e) {
        if ($(this).val() == "") {
            action = $(this).data('action');;
            typedata = $(this).data('type');
            champ = $(this).data('champ');
            table = $(this).data('table');
            reload = $(this).data('reload');
            id = $(this).data('id');
            value = $(this).val();
            var $this = $(this);
            champid = $(this).data('champid');
            typetransport = $(this).data('typetransport');
            format = $(this).data('format');


            $.ajax({
                url: "autoupdate.ajx.php",
                method: "POST",
                data: { action: action, typedata: typedata, table: table, champ: champ, reload: reload, ID: id, value: value, champid: champid, typetransport: typetransport, format: format },
                success: function(data) {
                    if (data.msg != "") {
                        notifier(data.msg, 2000, 'success');
                    }
                    if (reload == '1') {
                        location.reload();
                    }
                }
            });
        }

    })



    $(".datepickerautoupdate").datepicker({ /*  Datepicker avec autoupdate */
        altField: "#datepicker",
        closeText: 'Fermer',
        prevText: 'Précédent',
        nextText: 'Suivant',
        currentText: 'Aujourd\'hui',
        monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
        monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
        dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
        dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
        dayNamesMin: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
        weekHeader: 'Sem.',
        dateFormat: 'dd-mm-yy',
        onSelect: function(dateStr) {
            var ok = "1";
            action = $(this).data('action');;
            typedata = $(this).data('type');
            champ = $(this).data('champ');
            table = $(this).data('table');
            reload = $(this).data('reload');
            id = $(this).data('id');
            value = $(this).val();
            var $this = $(this);
            champid = $(this).data('champid');
            typetransport = $(this).data('typetransport');
            format = $(this).data('format');
            if ($(this).attr('required') == "required" && value == "") {
                $(this).val($(this).data('init'));
                $(this).css('border', '1px solid red');
                setTimeout(function() { $this.css('border', 'none') }, 1000);
                ok = "0";
            }

            if (reload == '1') {
                $("div.table-responsive").hide();
                $("div.table-responsive.reload").show();
            }
            if (ok == "1") {
                $this.addClass('errorok');
                $.ajax({
                    url: "autoupdate.ajx.php",
                    method: "POST",
                    data: { action: action, typedata: typedata, table: table, champ: champ, reload: reload, ID: id, value: value, champid: champid, typetransport: typetransport, format: format },
                    success: function(data) {
                        if (data.msg != "") {
                            notifier(data.msg, 2000, 'success');
                        }
                        if (reload == '1') {
                            location.reload();
                        }
                    }
                });
            }
        }
    }); /*  Datepicker avec autoupdate */
    /*  Fin Datepicker  */
}); /* Fin Function 3 */

/* Création de graphhique */
function showGraph(type, titre, style) {
    $.post("data.php?type_stat=" + type, function(data) {
        if (style == 'pie') { ind = "{label}:{y}"; } else { ind = "{y}"; }
        var chart = new CanvasJS.Chart("chart" + type, {
            theme: "light2",
            title: {
                fontSize: 14,
                text: titre
            },
            data: [{
                indexLabel: ind,
                type: style,
                dataPoints: data,
            }]
        });
        chart.render();
    });
} /* Fin Création de graphhique */
/* Function Soumission form ajax */
function AjaxSubmitForm(form) {
    for (instance in CKEDITOR.instances) {
        CKEDITOR.instances[instance].updateElement();
    }
    var formData = new FormData();
    var formF = $('#' + form).serialize();
    $.ajax({
        type: 'POST',
        url: 'submit_form.php',
        data: formF,
        beforeSend: function() {
            $('.submitBtn').attr("disabled", "disabled");
            $('.modal-body').css('opacity', '.5');
        },
        success: function(msg) {
            if (msg.error == 'ok') {
                $('#inputName').val('');
                $('#inputEmail').val('');
                $('#inputMessage').val('');
                notifier("Modifications enregistrées", 1500, "success"); /* Affichage message retour ajax */
                if (msg.url != "") {
                    window.location.href = (msg.url);
                }
            } else {

                notifier(msg.message, 1500, "error");
            }
            $('.submitBtn').removeAttr("disabled");
            $('.modal-body').css('opacity', '');
        }
    });
}
/* Fin Function Soumission form ajax */
/* Function login via ajax */
function AjaxLoginForm(form) {
    var formData = new FormData();
    var form = $('#' + form).serialize();
    $('.form-control').attr("disabled", "disabled");
    $.ajax({
        type: 'POST',
        url: 'login_form.php',
        data: form,
        beforeSend: function() {
            $('.submitBtn').attr("disabled", true);
            $('.modal-body').css('opacity', '0.5');
        },
        success: function(msg) {
            if (msg.error == 'ok') {
                $('#inputName').val('');
                $('#inputEmail').val('');
                $('#inputMessage').val('');
                $('.statusMsg').html('<span style="color:green;">' + msg.message + '</p>');
                location.reload();
            } else {
                $('.statusMsg').addClass("error").html('<span style="">' + msg.message + '.</span>').show();
                setTimeout(function() {
                    $('.statusMsg').removeClass("error").hide();
                    $('.form-control').attr("disabled", false);
                }, 3000);
                // }
            }
            $('.submitBtn').removeAttr("disabled");
            $('.modal-body').css('opacity', '');
        }
    });
}
/* Fin Function login via ajax ajax */

/* Fonction suppression de fichier via ajax */
function removefile(fichier) {
    $.ajax({
        type: 'POST',
        url: 'submit_form.php',
        data: "Type_form=supfile&file=" + fichier,
        beforeSend: function() {},
        success: function(msg) {}
    });
}
/* Fin Fonction suppression de fichier via ajax */
/* Fonction suppression data via ajax */
function suppression(form, action) {
    var valeurs = "";
    var type_form = action;
    var url = window.location.href.replaceAll("&", "|");
    if (action == "Supprimer") {
        type_form = "suppression";
    }
    $('input:checked[name=liste_select]').each(function() {
        if ($(this).data("supp") == "O" || type_form != "suppression") {
            valeurs += ($(this).val()) + ',';
            table = $(this).data('table');
            type = $(this).data('type');
            id_base = $(this).data('idbase');
            tabs = $(this).data('tabs');
        }
        if ($(this).data("supp") == "1" || type_form == "suppression") {
            valeurs += ($(this).val()) + ',';
            table = $(this).data('table');
            type = $(this).data('type');
            id_base = $(this).data('idbase');
            tabs = $(this).data('tabs');
        }
    });
    champ = $("#" + action).data('champ');
    var formData = new FormData();
    var form = $('#' + form).serialize();
    $("<div>Voulez vous " + action + " ?</div>").dialog({ // Dialog de confirmation
        title: action,
        modal: true,
        buttons: {
            "OK": function() {
                $.ajax({
                    type: 'POST',
                    url: 'submit_form.php',
                    data: "Type_form=" + type_form + "&ID=" + valeurs + "&table=" + table + "&champ=" + champ + "&type=" + type + "&id_base=" + id_base + "&tabs=" + tabs + "&url=" + url,
                    beforeSend: function() {
                        $('.submitBtn').attr("disabled", "disabled");
                        $('.modal-body').css('opacity', '.5');
                    },
                    success: function(msg) {
                        if (msg.error == 'ok') {
                            if (msg.download != "") {
                                window.open(msg.download);
                            } else
                            if (msg.url != "") {
                                window.location.href = (msg.url);
                            } else {
                                location.reload();
                            }
                        } else {
                            $('.statusMsg').html('<span style="color:red;">' + msg + '</span>');
                        }
                        $('.submitBtn').removeAttr("disabled");
                        $('.modal-body').css('opacity', '');
                    }
                });
                $(this).dialog("close");
            },
            "Cancel": function() {
                $(this).dialog("close");
            }
        }
    });
};
/* Fin Fonction suppression data via ajax */
/*  Fonction valilder/Devalider champ Valid de base de données via ajax */
function valid(form, champ) {
    var valeurs = "";
    $('input:checked[name=liste_select]').each(function() {
        valeurs += $(this).val() + ',';
        type = form.data('type');
    });
    id = valeurs;
    table = form.data('table');
    champ = form.data('champ');
    value = form.data('value');
    $("<div>Voulez vous modifier 12?</div>").dialog({ // Dialog de confirmation
        modal: true,
        buttons: {
            "OK": function() {
                $.ajax({
                    type: 'POST',
                    url: 'submit_form.php',
                    data: "Type_form=validation&ID=" + id + "&table=" + table + "&type=" + type + "&champ=" + champ + "&valeur=" + value,
                    beforeSend: function() {
                        $('.submitBtn').attr("disabled", "disabled");
                        $('.modal-body').css('opacity', '.5');
                    },
                    success: function(msg) {
                        if (msg.error == 'ok') {
                            location.reload();
                        } else {
                            $('.statusMsg').html('<span style="color:red;">' + msg + '</span>');
                        }
                        $('.submitBtn').removeAttr("disabled");
                        $('.modal-body').css('opacity', '');
                    }
                });
                $(this).dialog("close");
            },
            "Cancel": function() {
                $(this).dialog("close");
            }
        }
    });
};
/*  Fin Fonction valilder/Devalider champ Valid de base de données via ajax */
$(document).on('click', '.valid2', function() {
    if ($(this).data("valid") != "0") {
        valid($(this));
    }
});
/* Fonction recherche via Ajax */
function envoisearch(keyword, searchin) {
    var data = new FormData;
    data.append('keywords', keyword);
    data.append('searchin', searchin);
    if ($(keyword).val() != "") {
        $.ajax({
            type: 'POST',
            url: 'search.ajx.php',
            //    data : {'keyword:'+keyword},
            data: "keywords=" + keyword + "&searchin=" + searchin,
            cache: false,
            processData: false,
            beforeSend: function() {},
            success: function(msg) {
                $('#tablesearch').html();
                $('#tablesearch').hide();
                $('#tablesearch').html(msg.result);
                if ($('.resultsearch').length == "1") {
                    window.location.href = ($('.resultsearch').data('url'));
                    //      alert($('.resultsearch').data('url'));
                } else {
                    $('#tablesearch').show();
                }
            }
        });
    }
}
/* Fin Fonction recherche via Ajax */
/* Changement champs on/OFF dans base de donnees */
function validON(form) {
    valeurs = form.data('id');
    table = form.data('table');
    champ = form.data('champ');
    value = form.data('value');
    $("<div>" + form.data('message') + "</div>").dialog({
        modal: true,
        buttons: {
            "OK": function() {
                $.ajax({
                    type: 'POST',

                    url: 'submit_form.php',
                    data: "Type_form=validation&ID=" + valeurs + "&table=" + table + "&champ=" + champ + "&valeur=" + value,
                    beforeSend: function() {
                        $('.submitBtn').attr("disabled", "disabled");
                        $('.modal-body').css('opacity', '.5');
                    },
                    success: function(msg) {
                        if (msg.error == 'ok') {
                            location.reload();
                        } else {
                            $('.statusMsg').html('<span style="color:red;">' + msg + '</span>');
                        }
                        $('.submitBtn').removeAttr("disabled");
                        $('.modal-body').css('opacity', '');
                    }
                });
                $(this).dialog("close");
            },
            "Cancel": function() {
                $(this).dialog("close");
            }
        }
    });
};
/* Fonction modification champd base de donnéed via Ajax*/
function ActionData(form, action) {
    var id = $(form).data('id');
    var value = $(form).data('value');
    var champ = $(form).data('champ');
    $("<div>Voulez vous modifier ?</div>").dialog({
        modal: true,
        buttons: {
            "OK": function() {
                $.ajax({
                    type: 'POST',
                    url: 'submit_form.php',
                    dataType: "json",
                    data: "Type_form=" + action + "&table=" + $("#table").val() + "&ID=" + id + "&champ=" + champ + "&valid=" + value,
                    beforeSend: function() {
                        $('.submitBtn').attr("disabled", "disabled");
                        $('.modal-body').css('opacity', '.5');
                    },
                    success: function(msg) {
                        if (msg.error == 'ok') {
                            window.location.href = (msg.url);
                        } else {
                            $('.statusMsg').html('<span style="color:red;">' + msg + '</span>');
                        }
                        $('.submitBtn').removeAttr("disabled");
                        $('.modal-body').css('opacity', '');
                    }
                });
                $(this).dialog("close");
            },
            "Cancel": function() {
                $(this).dialog("close");
            }
        }
    });
};
/* Fonction modification champd base de donnéed via Ajax*/
/* Generation document PDF ajax */
function AjaxGenerate(doc_gen) {
    var formData = new FormData();
    reload = doc_gen.data("reload");
    $.ajax({
        type: 'GET',
        url: 'create_pdf.ajx.php',
        data: { modele: doc_gen.data('modele'), ID: doc_gen.data('doc'), tabactive: doc_gen.data('tab'), type: doc_gen.data('type') },
        beforeSend: function() {},
        success: function(responseData) {
            if (reload != "0") {
                window.location.href = (responseData.url);
            }
        }
    });
};
/* Fin Generation document PDF ajax */
/* reuperation url */
function getBaseURL() {
    if ($("base").length) {
        return $("base").attr("href");
    }
    return window.location.origin;
}
/* Fin reuperation url */
/* Ajouter class error */
function erreurSaisie(champ, v) {
    if (v == '0') {
        $(champ).addClass('errorSaisie');
    } else {
        $(champ).removeClass('errorSaisie');
    }
}
/* Fin Ajouter class error */
/* Focus sur TAB des modules */
function activeTabs(indexTab) {
    var tabactive = "#tabs-" + indexTab;
    $('#tabs').tabs();
    $('#tabs a[href="' + tabactive + '"').click();
}
/* Fin Changement champs valid dans base de donnees */
/* Affichage info bulle on mouseover sur class .help */
$(function() {
    $(".help").mouseover(function() {
        if ($(this).attr('title') == "") return false;
        $('body').append('<span class="infobulle"></span>');
        var bulle = $(".infobulle:last");
        bulle.append($(this).attr('title'));
        var posTop = $(this).offset().top - $(this).height() + 2;
        var posLeft = $(this).offset().left - $(this).width() / 2 - bulle.width() / 2;
        bulle.css({
            left: posLeft,
            top: posTop - 10,
            opacity: 0.99
        });
    })
    $(".help").mouseout(function() {
        var bulle = $('.infobulle:last');
        bulle.remove();
    });
});
/* Fin Affichage info bulle on mouseover sur class .help */
function updateOrderodl() {
    var item_order = new Array();
    $('tbody.reorder-gallery tr.main_order').each(function() {
        item_order.push($(this).attr("id"));
        table = $(this).data("table");
    });
    var order_string = 'table=' + table + '&order=' + item_order;
    $.ajax({
        type: "GET",
        url: "update_order.php",
        data: order_string,
        cache: false,
        success: function(data) {}
    });
}
/* v2 */
function AjaxSubmitFormV2(form, url) {
    var formData = new FormData();
    var formF = $('#' + form).serialize();
    $.ajax({
        type: 'POST',
        url: "send_email.ajx.php",
        //data:'contactFrmSubmit=1&name='+name+'&email='+email+'&message='+message,
        data: formF,
        beforeSend: function() {
            $('.submitBtn').attr("disabled", "disabled");
            $('.modal-body').css('opacity', '.5');
        },
        success: function(msg) {
            if (msg.error == 'ok') {
                $('#inputName').val('');
                $('#inputEmail').val('');
                $('#inputMessage').val('');
                $('.statusMsg').html('<span style="color:green;">Thanks for contacting us, we\'ll get back to you soon.</p>');
                //location.reload(); 
                //     window.location.href=(msg.url);    
            } else {
                $('.statusMsg').html('<span style="color:red;">' + msg + '.</span>').show();
                $('.statusMsg').delay(3000).fadeOut();
            }
            $('.submitBtn').removeAttr("disabled");
            $('.modal-body').css('opacity', '');
        }
    });
}
/* Fonction téléchargement*/
function telecharger(form, name) {
    if (name == "") {
        name = "liste_select";
    }
    var valeurs = "";
    $('input:checked[name=' + name + ']').each(function() {
        valeurs += ($(this).val()) + ',';
        table = $(this).data('table');
        type = $(this).data('type');
        id_base = $(this).data('idbase');
        tabs = $(this).data('tabs');
        code = name;
    });
    var formData = new FormData();
    var form = $('#' + form).serialize();
    $("<div>Voulez vous télécharger ces documents ?</div>").dialog({
        modal: true,
        buttons: {
            "OK": function() {
                $.ajax({
                    type: 'POST',
                    url: 'submit_form.php',
                    data: "Type_form=telecharger&ID=" + valeurs + "&table=" + table + "&type=" + type + "&id_base=" + id_base + "&tabs=" + tabs + "&name=" + code,
                    beforeSend: function() {
                        $('.submitBtn').attr("disabled", "disabled");
                        $('.modal-body').css('opacity', '.5');
                    },
                    success: function(msg) {
                        if (msg.error == 'ok') {
                            if (msg.url != "") {
                                window.open(msg.url);
                            } else {
                                location.reload();
                            }
                        } else {
                            $('.statusMsg').html('<span style="color:red;">' + msg + '</span>');
                        }
                        $('.submitBtn').removeAttr("disabled");
                        $('.modal-body').css('opacity', '');
                    }
                });
                $(this).dialog("close");
            },
            "Cancel": function() {
                $(this).dialog("close");
            }
        }
    });
};
/* Fonction téléchargement*/
/* fonction Envoir formulaire*/
function SendForm(form) {
    for (instance in CKEDITOR.instances) {
        CKEDITOR.instances[instance].updateElement();
    }
    var formData = $(form).serialize();
    var url = "sendmail.ajx.php";
    switch ($("#typeenvoi").val().toUpperCase()) {
        case "SMS":
            url = "sendsms.ajx.php";
            break;
        default:
            var url = "sendmail.ajx.php";
            break;
    }
    $.ajax({
        type: 'POST',
        url: url,
        dataType: "JSON",
        data: formData,
        beforeSend: function() {
            $('#sendmail').attr("disabled", true);
            $('#cancel').attr("disabled", true);
            $('#sendmail').val('en cours ...');
        },
        success: function(msg) {
            if (msg.result == "ok") {
                $('#mailformdivmessage').removeClass('error').addClass('errorok');
                $('#mailformdivmessage').html(msg.message).show();
                $('#mailform').html(msg.message).hide();
                setTimeout(function() {
                    window.location.href = (msg.url);;
                }, 1000);
            } else {
                $('#mailformdivmessage').addClass('error').removeClass('errorok');
                $('#mailformdivmessage').html(msg.message).show();

            }
            //   $('#mailformdivmessage').delay(3000).fadeOut();
            $('#sendmail').attr("disabled", false);
            $('#cancel').attr("disabled", false);
            $('#sendmail').val('Envoyer Email');
            setTimeout(function() {
                $('#mailformdivmessage').hide();
            }, 4000);
        },
        error: function(msg) {
            //en cas d'erreur
            alert("Erreur ajax :" + msg.message)
        },
    });
}
/* Fin fonction Envoi formulaire*/
/* Validation format email */
function validateEmail(email) {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailReg.test(email);
}
/* Fin Validation format email */
/* Fonction obsolete*/
function updateOrderOO(data) {
    $.ajax({
        url: "ajaxPro.php",
        type: 'post',
        data: { position: data },
        success: function() {
            alert('your change successfully saved');
        }
    })
}
/* Fonction obsolete*/
/* Changer order ligne de table dans base de données */
function updateOrder(data, table) {
    $.ajax({
        url: "autoupdate.ajx.php",
        type: 'post',
        data: { action: "ordre", table: table, page_id_array: data },
        success: function() {}
    })
}
/* Fin changer order ligne de table dans base de données */
/* Supprimer les accents sur chaine */
function remove_accents(strAccents) {
    var strAccents = strAccents.split('');
    var strAccentsOut = new Array();
    var strAccentsLen = strAccents.length;
    var accents = "ÀÁÂÃÄÅàáâãäåÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž";
    var accentsOut = "AAAAAAaaaaaaOOOOOOOooooooEEEEeeeeeCcDIIIIiiiiUUUUuuuuNnSsYyyZz";
    for (var y = 0; y < strAccentsLen; y++) {
        if (accents.indexOf(strAccents[y]) != -1) {
            strAccentsOut[y] = accentsOut.substr(accents.indexOf(strAccents[y]), 1);
        } else
            strAccentsOut[y] = strAccents[y];
    }
    strAccentsOut = strAccentsOut.join('');
    return strAccentsOut;
}
/* Fin Supprimer les accents sur chaine */
/* Affichage message de resultat de retour Ajax */
function notifier(message, duree, option = "success", position) {
    switch (option) {
        case "success":
            //    $(".notifier").addClass(option).css('top', position.top - 30);
            $(".notifier").addClass(option);
            break;
    }
    $(".notifier").text(message).addClass(option).show();
    setTimeout(function() { $(".notifier").text("").hide() }, duree);
};
/* Fin Affichage message de resultat de retour Ajax */
/************** Fin Fonctions ************/