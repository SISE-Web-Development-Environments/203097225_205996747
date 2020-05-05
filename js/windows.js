
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
    /* if(fieldName == 'Welcome'){
      window.scrollTo(0,50);
    } */
  }

  function openmodel(Name){
    $(Name).modal();
  }