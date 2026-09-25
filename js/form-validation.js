// Get the form and its fields
const form = document.getElementById("request-form");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const pickupDateInput = document.getElementById("pickup-date");
const requestTypeInput = document.getElementById("request-type");
const itemDetailsInput = document.getElementById("item-details");

// Get the error message elements
const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");
const pickupDateError = document.getElementById("pickup-date-error");
const requestTypeError = document.getElementById("request-type-error");
const itemDetailsError = document.getElementById("item-details-error");
const formSuccess = document.getElementById("form-success");

// Check that a required field is not empty
function validateRequired(input, errorElement, fieldName) {
  if (input.value.trim() === "") {
    errorElement.textContent = `${fieldName} is required.`;
    return false;
  }

  errorElement.textContent = "";
  return true;
}

// Check that the email has a valid format
function validateEmail() {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emailInput.value.trim() === "") {
    emailError.textContent = "Email is required.";
    return false;
  }

  if (!emailPattern.test(emailInput.value.trim())) {
    emailError.textContent = "Please enter a valid email address.";
    return false;
  }

  emailError.textContent = "";
  return true;
}

// Check that the item details contain enough information
function validateItemDetails() {
  const details = itemDetailsInput.value.trim();

  if (details === "") {
    itemDetailsError.textContent = "Please enter your item details.";
    return false;
  }

  if (details.length < 10) {
    itemDetailsError.textContent = "Please enter at least 10 characters.";
    return false;
  }

  itemDetailsError.textContent = "";
  return true;
}

// Validate the entire form when the user submits it
function validateForm(event) {
  event.preventDefault();

  // Clear the previous success message
  formSuccess.textContent = "";

  const validName = validateRequired(nameInput, nameError, "Name");

  const validEmail = validateEmail();

  const validPickupDate = validateRequired(
    pickupDateInput,
    pickupDateError,
    "Pickup date",
  );

  const validRequestType = validateRequired(
    requestTypeInput,
    requestTypeError,
    "Request type",
  );

  const validItemDetails = validateItemDetails();

  // Stop the form from submitting if any field is invalid
  if (
    !validName ||
    !validEmail ||
    !validPickupDate ||
    !validRequestType ||
    !validItemDetails
  ) {
    return;
  }

  // Display a confirmation when all validation passes
  formSuccess.textContent = "Your request is ready to be submitted.";

  // In a real website, the form could now be sent to a server.
}

// Run validation when the form is submitted
form.addEventListener("submit", validateForm);
