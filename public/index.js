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
    if (this.id == "buyInstr" || "sellInstr") {
      $("#musicGenre").hide();
      $("#bandMate").hide();
      $("#musicOpt").show();

      for (let i = 0; i < instr.length; i++) {
        $("#exampleFormControlSelect1").append(
          new Option(instr[i].instrument, i)
        );
        // Repalce "i" with "instruments[i].whatever field is"
      }

      // if (this.id == "exampleRadios3") {
      //   $("#musicOpt").hide();
      //   $("#musicGenre").show();
      //   $("#bandMate").show();
      // }
    }
  });
});



$("#sbmtBtn").on("click", function(e) {
   
  e.stopPropagation();
    e.preventDefault();
  let newUserPost = {
      userName: $(".userName").val(),
      userEmail: $(".userEmail").val(),
      userNumber: $(".userNumber").val(),
      postTitle: $(".userPost").val(),
      postBody: $(".userMessage").val(),
      fk_criteria: $(".buyInstr").val(),
      fk_instrument: $(".sellInstr").val(),
    };
    console.log(newUserPost);
    $.post("api/post", newUserPost)
    .then(function({}) {
    });

});


let postNotes = [];

$.get("/api/all")
.then(function (data) {
  console.log(data);
  postNotes = data;
});

function populateBoard(usersPosts) {
    console.log("Hellooooo " + usersPosts[0].userName);
    console.log("Hellooooo " + usersPosts[0]["cb_Posts.postBody"]);
    let userTitleText = usersPosts[0]["cb_Posts.postTitle"];
    let userBodyText = usersPosts[0]["cb_Posts.postBody"];

    $(".myBoardPosting").append(`

     <div class="row myBoardCard" id="stickyNotes">
            <div class="myBoardPin"></div>
            <p class="postText"> Posted by: ${usersPosts[0].userName}</p>
            <p class="postText"> Title: ${userTitleText}  </p>
            <p class="postText"> Body: ${userBodyText} </p>
            <p class="postText"> Contact: Phone# ${usersPosts[0].userNumber} </p>
            <p class="postText"> Email  @ ${usersPosts[0].userEmail} </p>

            <p class="postText">Sign up to start making and saving posts!</p>
        </div>

     `)
};




