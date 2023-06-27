// JavaScript for form validation and interactivity

// Form validation for the newsletter subscription
document.getElementById('newsletter-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
  
    // Retrieve the email input value
    var emailInput = document.getElementById('email-input');
    var email = emailInput.value;
  
    if (validateEmail(email)) {
      // Perform further processing, such as sending the email to the server
      alert('Subscription successful!');
      emailInput.value = ''; // Clear the input field
    } else {
      alert('Please enter a valid email address.');
    }
  });
  
  // Email validation function
  function validateEmail(email) {
    var regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  }
  