$(document).ready(function () {
  let instr = [];

  // send an AJAX POST-request with jQuery
  $.get("/api/instruments")
    // on success, run this callback
    .then(function (data) {
      // log the data we found
      console.log(data);
      instr = data;
    });

  $("#musicOpt").hide();
  $("#musicGenre").hide();
  $("#bandMate").hide();
  $("input[type=radio]").click(function () {
    if (this.id == "exampleRadios1" || "exampleRadios2") {
      $("#musicGenre").hide();
      $("#bandMate").hide();
      $("#musicOpt").show();

      for (let i = 0; i < instr.length; i++) {
        $("#exampleFormControlSelect1").append(
          new Option(instr[i].instrument, i)
        );
        // Repalce "i" with "instruments[i].whatever field is"
      }

      if (this.id == "exampleRadios3") {
        $("#musicOpt").hide();
        $("#musicGenre").show();
        $("#bandMate").show();
      }
    }
  });
});

// let pinArray = ["pin", "pin2" ,"pin3", "pin4"];
// let noteArray = ["../assets/notecard1.png", "../assets/notecard2.png", "../assets/notecard3.png", "../assets/notecard4.png", "../assets/notecard5.png", "../assets/notecard6.png"];
// let randNoteRotNum = 0;
// // let temp4 = ""; id="${temp4}" note sure if needed. Potentially something for the future. an id that would go into the parent div in case of needing to delete it, but do not think it is needed at the moment.
// let ranPinPosNum = 20;
// let randomPin = 0;
// let randomNote = 0;
// randomNote = Math.floor(Math.random() * 6);
// randomPin = Math.floor(Math.random() * 4);
// ranPinPosNum = Math.floor(Math.random() * 260) + 20;
// randNoteRotNum = Math.floor(Math.random() * (21 - -20)) + -20;
//     $( `<div class="col-s-4" style="padding-right:5%" >   
//             <br> <br>
//                 <div class="card border-0 shadow-none" style="background-color: transparent; border-color:transparent; transform: rotate(${randNoteRotNum}deg);">
//                     <img class="card-img-top" src="${noteArray[randomNote]}" alt="Card image" style="width: 300px; height:300px;">
      
//                     <div class="card-img-overlay text-black d-flex flex-column justify-content-center">
//                         <div class="${pinArray[randomPin]}" style="position:absolute; top:10px; right:${ranPinPosNum}px;"></div>
//                         <h4 class="card-title">Selling Guitar</h4>
//                         <h6 class="card-subtitle mb-2">demo name demo@fake.org 927 735 9164</h6>
//                         <p class="card-text">This is where you write your description of item. </p>
//                     </div>
//                 </div>
//         </div>` ).appendTo( '#stickyNotes' );