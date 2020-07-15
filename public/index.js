$(document).ready(function(){
 $("#musicOpt").hide();
 $("#musicGenre").hide();
 $("#bandMate").hide();
    $('input[type=radio]').click(function(){
        if (this.id == "exampleRadios1" || "exampleRadios2") {
            $("#musicGenre").hide();
            $("#bandMate").hide();
            $("#musicOpt").show();
            const instr = [
                { instrument: "Guitar" },
                { instrument: "Bass" },
                { instrument: "Drums" },
                { instrument: "Percussion" },
                { instrument: "Brass" },
                { instrument: "Woodwind" },
                { instrument: "Synthesizer" },
                { instrument: "Studio-Equipment" }
            ];
        
            for( let i = 0; i < instr.length; i ++){
                $("#exampleFormControlSelect1").append(new Option(instr[i].instrument, i))
                // Repalce "i" with "instruments[i].whatever field is"
            }
        
        
        
        
        
        
        //     $.get( "/api/instruments", function()  {
        // //console.log(instruments)
        // for( let i = 0; i < instr.length; i ++){
        //     $("#exampleFormControlSelect1").append(new Option(instr[i], i))
        //     // Repalce "i" with "instruments[i].whatever field is"
        // }
        
        // });
        if (this.id == "exampleRadios3"){
            $("#musicOpt").hide();
            $("#musicGenre").show();
            $("#bandMate").show();
        }
        }
       
    });

//     const instr = [
//         { instrument: "Guitar" },
//         { instrument: "Bass" },
//         { instrument: "Drums" },
//         { instrument: "Percussion" },
//         { instrument: "Brass" },
//         { instrument: "Woodwind" },
//         { instrument: "Synthesizer" },
//         { instrument: "Studio-Equipment" }
//     ];
// $.post( "/api/instruments", function()  {
// //console.log(instruments)
// for( let i = 0; i < instr.length; i ++){
//     $("#exampleFormControlSelect1").append(new Option(instr[i], i))
//     // Repalce "i" with "instruments[i].whatever field is"
// }

// });
// }

});



