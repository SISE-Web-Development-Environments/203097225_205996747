
$(document).ready(function () {
  changeTab('Welcome');


});

function changeTab(fieldName) {
    // Hide all elements with class="tabcontent" by default */
    var i, tabcontent;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Show the specific tab content
    document.getElementById(fieldName).style.display = "block";
    if(fieldName == 'Welcome'){
      window.scrollTo(0,30);
      reset();

    }
    if(fieldName == 'Register'){
      window.scrollTo(0,100);
      reset();

    }
    if(fieldName == 'Login'){
      reset();

    }
  }

  function openmodel(Name){
    $(Name).modal();
  }