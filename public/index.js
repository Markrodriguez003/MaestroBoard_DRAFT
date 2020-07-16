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
