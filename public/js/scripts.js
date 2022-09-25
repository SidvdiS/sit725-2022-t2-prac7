const addSkillToApp = (skill) => {
  $.ajax({
    url: "/api/skills",
    data: skill,
    type: "POST",
    success: (result) => {
      location.reload();
    },
  });
};

const submitForm = () => {
  let formData = {};

  formData.img = $("#image").val();

  formData.desc = $("#desc").val();

  formData.url = $("#url").val();

  console.log("Form Data Submitted: ", formData);
  addSkillToApp(formData);
};

const addCards = (items) => {
  console.log(items);
  items.forEach((item) => {
    let itemToAppend =
      '<div class="col s12 l4">' +
      '<div class="card">' +
      '<div class="card-image">' +
      '<img src="' +
      item.img +
      '" height=100 />' +
      "</div>" +
      '<div class="card-content">' +
      "<p>" +
      item.desc +
      "</p>" +
      "</div>" +
      '<div class="card-action">' +
      '<a href="' +
      item.url +
      '">Visit</a>' +
      "</div>" +
      "</div>" +
      "</div>";
    $("#card-section").append(itemToAppend);
  });
};

const getSkills = () => {
  $.get("/api/skills", (response) => {
    if (response.statusCode == 200) {
      addCards(response.data);
    }
  });
};

// Pictures Slideshow using socket.io
imgSlideArray = [
  "../images/focus.jpg",
  "../images/slide1.jpg",
  "../images/slide2.jpg",
  "../images/slide3.jpg",
];

msgArray = [
  "Basic implementation of socket.io (Pictures Slide Show)",
  "Socket.io library allows communication between client and server.",
  "Used in chat application.",
  "Robust, Easy to use and implement",
];

let socket = io();

socket.on("slideShow", (msg) => {
  $("header").css({ "background-image": "url(" + imgSlideArray[msg] + ")" });
  $(".topic").text(msgArray[msg]);
});

$(document).ready(function () {
  $(".sidenav").sidenav();
  $(".modal").modal();
  getSkills();
});
