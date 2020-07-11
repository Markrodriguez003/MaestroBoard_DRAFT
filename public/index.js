$(document).ready(function(){
 $("#musicOpt").hide();
 $("#musicGenre").hide();
 $("#bandMate").hide();
    $('input[type=radio]').click(function(){
        if (this.id == "exampleRadios1" || "exampleRadios2") {
            $("#musicGenre").hide();
            $("#bandMate").hide();
            $("#musicOpt").show();
        if (this.id == "exampleRadios3"){
            $("#musicOpt").hide();
            $("#musicGenre").show();
            $("#bandMate").show();
        }
        }
       
    });
});



