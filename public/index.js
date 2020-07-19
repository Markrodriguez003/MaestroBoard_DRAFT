$(document).ready(function () {

  let instr = [];

  // send an AJAX POST-request with jQuery
  $.get("/api/instruments")
    // on success, run this callback
    .then(function (data) {
      // log the data we found
      instr = data;
    });

  $("#musicOpt").hide();
  $("#musicGenre").hide();
  $("#bandMate").hide();
  $("input[type=radio]").click(function () {
    if (this.id == "exampleRadios1" || "exampleRadios2") {
      // $("#musicGenre").hide();
      // $("#bandMate").hide();
      $("#musicOpt").show();

      for (let i = 0; i < instr.length; i++) {
        $("#instrumento").append(
          new Option(instr[i].instrument, i)
        );
        // Repalce "i" with "instruments[i].whatever field is"
      }

      if (this.id == "exampleRadios3") {
        $("#musicOpt").hide();
        // $("#musicGenre").show();
        // $("#bandMate").show();
      }
    }
  });

  $("#sbmtBtn").on("click", function (e) {

    e.stopPropagation();
    e.preventDefault();
    console.log("YOU CLICKED SUBMIT!")
    let instrNum = parseInt($(".sendUserInstrument").val()) + 1;
    let criNum = parseInt($("input[type='radio']:checked").val());
    let newUserPost = {
      userName: $(".userName").val(),
      userEmail: $(".userEmail").val(),
      userNumber: $(".userNumber").val(),
      postTitle: $(".postTitle").val(),
      postBody: $(".postBody").val(),
      fk_criteria: criNum,
      fk_instrument: instrNum,
    };
    console.log(newUserPost);
    $.post("api/post", newUserPost)
      .then(function ({ }) {
      });

  });

  //***************************************************************************************************/
  // ********************************* MYBOARD JQUERY/JS *******************************************//
  //***************************************************************************************************/

  $("#login-error-text").hide(); // Error text when user account not found. Be default it is hidden.
  $(".instrumentSelectHide").hide();

  let selectedOption = "";
  let selectedInstrOption = "";

  $("select.postSelectOptions").change(function () {
    selectedOption = $(this).children("option:selected").val();
    if (selectedOption === "instruments") {
      $(".instrumentSelectHide").show();

    } else {
      $(".instrumentSelectHide").hide();
    }
  });

  $("select.postInstrSelectOptions").change(function () {
    selectedInstrOption = $(this).children("option:selected").val();
  });


  $(".sortBtn").on("click", (e) => {
    console.log("selected option" + selectedOption);
    console.log("selected instr" + selectedInstrOption);
    e.stopPropagation();
    e.preventDefault();
    $(".deleteMe").remove();
    $(".addMe").append(` <div class="row s12 m3 l3 deleteMe">
    <div class=" container myBoardContainer mainBoardPosting">
    </div>
</div>`)
    if (selectedOption === "" || selectedOption === null) {
      requestAllPosts();

    } else if (selectedOption === "sell") {
      requestCriteriaSell();
    } else if (selectedOption == "buy") {
      requestCriteriaBuy();
    } else if (selectedOption === "dateDesc") {
      requestAllDescPosts();
    } else if (selectedOption === "dateAsc") {
      requestAllAscPosts();
    } else if (selectedOption === "instruments") {
      console.log("instrumento:" + selectedInstrOption);
      getInstrumentPosts(selectedInstrOption);
    }
  })

  // Will Submit user account to see if user account exists (pinging database with user email)
  $("#login-submit").on("click", (e) => {
    e.stopPropagation();
    e.preventDefault();
    $(".deleteMe").remove();
    $(".addMe").append(` <div class="row s12 m3 l3 deleteMe">
    <div class=" container myBoardContainer myBoardPosting">
    </div>
</div>`)
    requestPosts();
  })

  let pageURL = $(location).attr("href");;
  if (pageURL.includes("board") === true) {
    console.log("yep.ends with board");
    requestAllPosts();

  } else { console.log("no does not ends with board"); }

  console.log(pageURL);
  console.log(typeof (pageURL));

  // if(pageURL === "")
  //     requestAllPosts();


  // remove older posts 
  // $(".myBoardCard").remove();

  function requestAllPosts() {
    $.get(`/api/all`) // Makes the api call to backend to grab all posts that belong to user account (user email)
      .then(posts => {
        if (posts.length === 0) { // If not account exists
          console.log("No Posts exists!");
        } else {
          console.log("There are posts!!");
          populateMainBoard(posts);
        }
      });
  }

  function requestPosts() {
    let userEmail = $("#login-useremail").val(); // Grabs value from User Account field

    if (userEmail === null || userEmail === "") {
      console.log("No user account exists!");
      $("#login-error-text").show();
    } else {
      $.get(`/api/all/userEmail/${userEmail}`) // Makes the api call to backend to grab all posts that belong to user account (user email)
        .then(posts => {

          if (posts.length === 0) { // If not account exists
            console.log("No user account exists!");
            $("#login-error-text").show();
          } else { // If account exists
            $("#login-error-text").hide();
            // ? IMPLEMENT LOCAL STORAGE FOR AUTO RECALL / BOARD POST POPULATION
            populateBoard(posts);
          }
        });
    }
  }

  function requestAllDescPosts() {
    $.get(`/api/posts/all/dateDesc`) // Makes the api call to backend to grab all posts that belong to user account (user email)
      .then(posts => {
        if (posts.length === 0) { // If not account exists
          console.log("No Posts exists!");
        } else {
          console.log("There are desc posts!!");
          populateMainBoard(posts);
        }
      });
  }
  function requestAllAscPosts() {
    $.get(`/api/posts/all/dateAsc`) // Makes the api call to backend to grab all posts that belong to user account (user email)
      .then(posts => {
        if (posts.length === 0) { // If not account exists
          console.log("No Posts exists!");
        } else {
          console.log("There are asc posts!!");
          populateMainBoard(posts);
        }
      });
  }

  function requestCriteriaSell() {
    $.get(`/api/criteria/sell`) // Makes the api call to backend to grab all posts that belong to user account (user email)
      .then(posts => {
        if (posts.length === 0) { // If not account exists
          console.log("No Posts exists!");
        } else {
          console.log("There are asc posts!!");
          populateMainBoardCriSell(posts);
        }
      });
  }
  function requestCriteriaBuy() {
    $.get(`/api/criteria/Buy`) // Makes the api call to backend to grab all posts that belong to user account (user email)
      .then(posts => {
        if (posts.length === 0) { // If not account exists
          console.log("No Posts exists!");
        } else {
          console.log("There are asc posts!!");
          populateMainBoardCriSell(posts);
        }
      });
  }


  function getInstrumentPosts(instr) {
    $.get(`/api/posts/instrument/${instr}`) // Makes the api call to backend to grab all posts that belong to user account (user email)
      .then(posts => {
        if (posts.length === 0) { // If not account exists
          console.log("No Posts exists!");
        } else {
          console.log(`There are instrument ${instr} posts!!`);
          console.log("hqeu -->", JSON.stringify(posts));
          populateInstrMainBoard(posts);
        }
      });
  }

  // function requestCriteriaBuy(instr) {
  //   $.get(`/api/posts/all/buy/${instr}`) // Makes the api call to backend to grab all posts that belong to user account (user email)
  //     .then(posts => {
  //       if (posts.length === 0) { // If not account exists
  //         console.log("No Posts exists!");
  //       } else {
  //         console.log("There are asc posts!!");
  //         populateMainBoard(posts);
  //       }
  //     });
  // }


  function populateMainBoard(usersPosts) {

    const userLength = usersPosts.length;
    console.log(usersPosts[0]);

    const postColors = ["yellow", "pink", "purple", "red", "deep-purple", "indigo", "blue", "light-blue",
      "teal", "green", "light-green", "lime", "deep-orange", "brown"];

    const pushPin = ["myBoardPin1", "myBoardPin2", "myBoardPin3", "myBoardPin4", "myBoardPin5", "myBoardPin6", "myBoardPin7"];

    let i = 0;

    let objecto = "";
    for (; i < userLength; i++) {
      let userTitleText = usersPosts[i]["cb_Posts.postTitle"];
      let userBodyText = usersPosts[i]["cb_Posts.postBody"];
      // let userDate = usersPosts[i].createdAt.substr(0, 10);
      let userDate = usersPosts[i].createdAt;
      let userCriteria = usersPosts[i]["cb_Posts.fk_criteria"]
      let randoNum = Math.floor(Math.random() * 13);
      let randoNum2 = Math.floor(Math.random() * 7);
      let pColor = postColors[randoNum];
      let pPin = pushPin[randoNum2];
      console.log("criteria " + userCriteria);
      let uCrit;
      if (userCriteria === 1) {
        uCrit = "Looking to buy!"
      } else {
        uCrit = "Looking to sell!"
      }

      let objecto2 = `
     
    <div class="col s12 m6 l3 slide-top">
            <div class="card myBoardCard">
            <div class="card-image waves-effect waves-block waves-light"></div>
                <div class="card-content  ${pColor} lighten-1">
                <div class="${pPin}"></div>
                <small> Posted by: ${usersPosts[i].userName}</small>
                  <span class="card-title activator grey-text text-darken-4"><span class="postTitle">${userTitleText}</span><i class="material-icons right">more_vert</i></span>
                  <hr>
                  <p>${userBodyText}</p>
                </div>
                <div class="card-action">
                <small> ${uCrit}</small> <br>
                <small> Date posted: ${userDate} </small>
                </div>
                <div class="card-reveal ${pColor} accent-1">
                  <span class="card-title grey-text text-darken-4"><i class="material-icons right">close</i></span>
                  <div> <i class="small material-icons">contact_phone</i> </div>
                  <p class="contact-info"> Contact number: <span> ${usersPosts[i].userNumber}</span></p>
                  <hr>
                  <div> <i class="small material-icons">email</i> </div>
                  <p class="contact-info"> Contact email: <a href="mailto:${usersPosts[i].userEmail}"> ${usersPosts[i].userEmail}</a></p>
                  </p>
                </div>          
            </div>
      </div>
      
    `;

      objecto += objecto2;
    };

    $(".mainBoardPosting").append(objecto);

  }

  function populateMainBoardCriSell(usersPosts) {

    const userLength = usersPosts.length;
    console.log(usersPosts[0]);

    const postColors = ["yellow", "pink", "purple", "red", "deep-purple", "indigo", "blue", "light-blue",
      "teal", "green", "light-green", "lime", "deep-orange", "brown"];

    const pushPin = ["myBoardPin1", "myBoardPin2", "myBoardPin3", "myBoardPin4", "myBoardPin5", "myBoardPin6", "myBoardPin7"];

    let i = 0;

    let objecto = "";
    for (; i < userLength; i++) {
      let userTitleText = usersPosts[i].postTitle;
      let userBodyText = usersPosts[i].postBody;
      // let userDate = usersPosts[i].createdAt.substr(0, 10);
      let userDate = usersPosts[i].createdAt;
      let userCriteria = usersPosts[i].fk_criteria;
      let randoNum = Math.floor(Math.random() * 13);
      let randoNum2 = Math.floor(Math.random() * 7);
      let pColor = postColors[randoNum];
      let pPin = pushPin[randoNum2];
      console.log("criteria " + userCriteria);
      let uCrit;
      if (userCriteria === 1) {
        uCrit = "Looking to buy!"
      } else {
        uCrit = "Looking to sell!"
      }

      let objecto2 = `
     
    <div class="col s12 m6 l3 slide-top">
            <div class="card myBoardCard">
            <div class="card-image waves-effect waves-block waves-light"></div>
                <div class="card-content  ${pColor} lighten-1">
                <div class="${pPin}"></div>
                <small> Posted by: ${usersPosts[i]["cb_User.userName"]}</small>
                  <span class="card-title activator grey-text text-darken-4"><span class="postTitle">${userTitleText}</span><i class="material-icons right">more_vert</i></span>
                  <hr>
                  <p>${userBodyText}</p>
                </div>
                <div class="card-action">
                <small> ${uCrit}</small> <br>
                <small> Date posted: ${userDate} </small>
                </div>
                <div class="card-reveal ${pColor} accent-1">
                  <span class="card-title grey-text text-darken-4"><i class="material-icons right">close</i></span>
                  <div> <i class="small material-icons">contact_phone</i> </div>
                  <p class="contact-info"> Contact number: <span> ${usersPosts[i]["cb_User.userNumber"]}</span></p>
                  <hr>
                  <div> <i class="small material-icons">email</i> </div>
                  <p class="contact-info"> Contact email: <small> ${usersPosts[i]["cb_User.userEmail"]}</small></p>
                  </p>
                </div>          
            </div>
      </div>
      
    `;

      objecto += objecto2;
    };

    $(".mainBoardPosting").append(objecto);

  }
  function populateInstrMainBoard(usersPosts) {

    const userLength = usersPosts.length;
    console.log(usersPosts[0]);

    const postColors = ["yellow", "pink", "purple", "red", "deep-purple", "indigo", "blue", "light-blue",
      "teal", "green", "light-green", "lime", "deep-orange", "brown"];

    const pushPin = ["myBoardPin1", "myBoardPin2", "myBoardPin3", "myBoardPin4", "myBoardPin5", "myBoardPin6", "myBoardPin7"];

    let i = 0;

    let objecto = "";
    for (; i < userLength; i++) {
      let userTitleText = usersPosts[i].postTitle;
      let userBodyText = usersPosts[i].postBody;
      // let userDate = usersPosts[i].createdAt.substr(0, 10);
      let userDate = usersPosts[i].createdAt;
      let userCriteria = usersPosts[i].fk_criteria;
      let randoNum = Math.floor(Math.random() * 13);
      let randoNum2 = Math.floor(Math.random() * 7);
      let pColor = postColors[randoNum];
      let pPin = pushPin[randoNum2];
      console.log("criteria " + userCriteria);
      let uCrit;
      if (userCriteria === 1) {
        uCrit = "Looking to buy!"
      } else {
        uCrit = "Looking to sell!"
      }

      let objecto2 = `
     
    <div class="col s12 m6 l3 slide-top">
            <div class="card myBoardCard">
            <div class="card-image waves-effect waves-block waves-light"></div>
                <div class="card-content  ${pColor} lighten-1">
                <div class="${pPin}"></div>
                <small> Posted by: ${usersPosts[i]["cb_User.userName"]}</small>
                  <span class="card-title activator grey-text text-darken-4"><span class="postTitle">${userTitleText}</span><i class="material-icons right">more_vert</i></span>
                  <hr>
                  <p>${userBodyText}</p>
                </div>
                <div class="card-action">
                <small> ${uCrit}</small> <br>
                <small> Date posted: ${userDate} </small>
                </div>
                <div class="card-reveal ${pColor} accent-1">
                  <span class="card-title grey-text text-darken-4"><i class="material-icons right">close</i></span>
                  <div> <i class="small material-icons">contact_phone</i> </div>
                  <p class="contact-info"> Contact number: <span> ${usersPosts[i]["cb_User.userNumber"]}</span></p>
                  <hr>
                  <div> <i class="small material-icons">email</i> </div>
                  <p class="contact-info"> Contact email: <small> ${usersPosts[i]["cb_User.userEmail"]}</small></p>
                  </p>
                </div>          
            </div>
      </div>
      
    `;

      objecto += objecto2;
    };

    $(".mainBoardPosting").append(objecto);

  }


  // Function call that will populate board with posts by specific user account fed from the backend 
  function populateBoard(usersPosts) {

    const userLength = usersPosts.length;

    const postColors = ["yellow", "pink", "purple", "red", "deep-purple", "indigo", "blue", "light-blue",
      "teal", "green", "light-green", "lime", "deep-orange", "brown"];

    const pushPin = ["myBoardPin1", "myBoardPin2", "myBoardPin3", "myBoardPin4", "myBoardPin5", "myBoardPin6", "myBoardPin7"];

    let i = 0;

    let objecto = "";
    for (; i < userLength; i++) {
      let userTitleText = usersPosts[i]["cb_Posts.postTitle"];
      let userBodyText = usersPosts[i]["cb_Posts.postBody"];
      // let userDate = usersPosts[i].createdAt.substr(0, 10);
      let userDate = usersPosts[i].createdAt;
      let userCriteria = usersPosts[i]["cb_Posts.fk_criteria"]
      let randoNum = Math.floor(Math.random() * 13);
      let randoNum2 = Math.floor(Math.random() * 7);
      let pColor = postColors[randoNum];
      let pPin = pushPin[randoNum2];
      console.log("crittit" + userCriteria);
      let uCrit;
      if (userCriteria === 1) {
        uCrit = "Looking to buy!"
      } else {
        uCrit = "Looking to sell!"
      }

      let objecto2 = `
     
    <div class="col s12 m6 l3 slide-top">
            <div class="card myBoardCard">
            <div class="card-image waves-effect waves-block waves-light"></div>
                <div class="card-content  ${pColor} lighten-1">
                <div class="${pPin}"></div>
                <small> Posted by: ${usersPosts[i].userName}</small>
                  <span class="card-title activator grey-text text-darken-4"><span class="postTitle">${userTitleText}</span><i class="material-icons right">more_vert</i></span>
                  <hr>
                  <p>${userBodyText}</p>
                </div>
                <div class="card-action">
                <small> ${uCrit}</small> <br>
                <small> Date posted: ${userDate} </small>
                </div>
                <div class="card-reveal ${pColor} accent-1">
                  <span class="card-title grey-text text-darken-4"><i class="material-icons right">close</i></span>
                  <div> <i class="small material-icons">contact_phone</i> </div>
                  <p class="contact-info"> Contact number: <span> ${usersPosts[i].userNumber}</span></p>
                  <hr>
                  <div> <i class="small material-icons">email</i> </div>
                  <p class="contact-info"> Contact email: <a href="mailto:${usersPosts[i].userEmail}"> ${usersPosts[i].userEmail}</a></p>
                  </p>
                </div>          
            </div>
      </div>
      
    `;

      objecto += objecto2;
    };

    $(".myBoardPosting").append(objecto);

  }



}); // end of document

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
//                 <div class="card ${noteArray[randomNote]} border-0 shadow-none" style="background-color: transparent; border-color:transparent; transform: rotate(${randNoteRotNum}deg);">
//                     <img class="card-img-top" src="${noteArray[randomNote]}" alt="Card image" style="width: 300px; height:300px;">

//                     <div class="card-img-overlay text-black d-flex flex-column justify-content-center">
//                         <div class="${pinArray[randomPin]}" style="position:absolute; top:10px; right:${ranPinPosNum}px;"></div>
//                         <h4 class="card-title">Selling Guitar</h4>
//                         <h6 class="card-subtitle mb-2">demo name demo@fake.org 927 735 9164</h6>
//                         <p class="card-text">This is where you write your description of item. </p>
//                     </div>
//                 </div>
//         </div>` ).appendTo( '#stickyNotes' );