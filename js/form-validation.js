

// Wait for the DOM to be ready
$(document).ready(function () {

  localStorage.setItem("p", "p");

  $.validator.addMethod("passwordOk", function (value) {
    return (value.match(/[A-z]/) && value.match(/\d/));
  });

  $.validator.addMethod("nameOk", function (value) {
    return (value.match(/[A-z]/) && !value.match(/\d/));
  });

  // Initialize form validation on the registration form.
  // It has the name attribute "registration"
  $("form[name='registrationForm']").validate({
    // Specify validation rules
    rules: {
      // The key name on the left side is the name attribute
      // of an input field. Validation rules are defined
      // on the right side
      username: {
        required: true,
        minlength: 2
      },
      firstName: {
        required: true,
        minlength: 2,
        nameOk: true
      },
      lastName: {
        required: true,
        minlength: 2,
        nameOk: true
      },
      email: {
        required: true,
        // Specify that email should be validated
        // by the built-in "email" rule
        email: true
      },
      password: {
        required: true,
        minlength: 6,
        passwordOk: true
      },
      birthDate: {
        required: true
      }
    },
    // Specify validation error messages
    messages: {
      username: {
        required: "Please Enter User Name",
        minlength: "Your Name Must Be At Least 2 Characters Long"
      },
      firstName: {
        required: "Please Enter Your First Name",
        nameOk: "Your Name Must Include Only Letters And At Least 2 Letters",
        minlength: "Your Name Must Be At Least 2 Characters Long"
      },
      lastName: {
        required: "Please Enter Your Last Name",
        nameOk: "Your Name Must Include only Letters And At Least 2 Letters",
        minlength: "Your Name Must Be At Least 2 Characters Long"
      },
      password: {
        required: "Please Provide A Password",
        minlength: "Your Password Must Be At Least 6 Characters Long",
        passwordOk: "Your Password Must Include At Least One Letter And One Digit"
      },
      email: "Please Enter A Valid Email Address",

      birthDate: "Please Enter A Your Birthdate"

    },
    // Make sure the form is submitted to the destination defined
    // in the "action" attribute of the form when valid
    submitHandler: function (form) {
      let uName = $('#registrationForm').find('input[name="username"]').val();
      let pwd = $('#registrationForm').find('input[name="password"]').val();
      localStorage.setItem(uName, pwd);
      form.submit();
    }
  });
});





