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

// ------------------------------
// FORM VALIDATION
// ------------------------------

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
        emailError.textContent =
            "Please enter a valid email address.";
        return false;
    }

    emailError.textContent = "";
    return true;
}

// Check that the item details contain enough information
function validateItemDetails() {
    const details = itemDetailsInput.value.trim();

    if (details === "") {
        itemDetailsError.textContent =
            "Please enter your item details.";
        return false;
    }

    if (details.length < 10) {
        itemDetailsError.textContent =
            "Please enter at least 10 characters.";
        return false;
    }

    itemDetailsError.textContent = "";
    return true;
}

// Validate the entire form
function validateForm(event) {
    event.preventDefault();

    formSuccess.textContent = "";

    const validName = validateRequired(
        nameInput,
        nameError,
        "Name"
    );

    const validEmail = validateEmail();

    const validPickupDate = validateRequired(
        pickupDateInput,
        pickupDateError,
        "Pickup date"
    );

    const validRequestType = validateRequired(
        requestTypeInput,
        requestTypeError,
        "Request type"
    );

    const validItemDetails = validateItemDetails();

    if (
        !validName ||
        !validEmail ||
        !validPickupDate ||
        !validRequestType ||
        !validItemDetails
    ) {
        return;
    }

    formSuccess.textContent =
        "Your request is ready to be submitted.";
}


// ------------------------------
// BROWSER STORAGE
// ------------------------------

// Save the selected request type
function saveRequestType() {
    localStorage.setItem(
        "northStarRequestType",
        requestTypeInput.value
    );
}

// Load the previously selected request type
function loadRequestType() {
    const savedRequestType =
        localStorage.getItem("northStarRequestType");

    if (savedRequestType) {
        requestTypeInput.value = savedRequestType;
    }
}


// ------------------------------
// EVENT LISTENERS
// ------------------------------

// Save the request type whenever the user changes it
requestTypeInput.addEventListener("change", saveRequestType);

// Validate the form when it is submitted
form.addEventListener("submit", validateForm);

// Load the saved selection when the page opens
loadRequestType();
