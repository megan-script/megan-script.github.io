
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const submitBtn = document.getElementById("submitBtn");
  const results = document.getElementById("formResults");

  if (!form || !submitBtn || !results) return;

  const fields = form.querySelectorAll("input");

    const phoneInput = document.getElementById("phone");

    phoneInput.addEventListener("input", function () {
    let digits = phoneInput.value.replace(/\D/g, "");

    if (digits.startsWith("370")) {
        digits = digits.slice(3);
    } else if (digits.startsWith("0")) {
        digits = digits.slice(1);
    }

    digits = digits.slice(0, 8);

    if (digits.length === 0) {
        phoneInput.value = "";
    } else if (digits.length <= 3) {
        phoneInput.value = "+370 " + digits;
    } else {
        phoneInput.value = "+370 " +
        digits.slice(0, 3) + " " + digits.slice(3);
    }
    });


  function validateForm() {
    const allValid = Array.from(fields).every(function (field) {
      return field.value.trim() !== "" && field.checkValidity();
    });

    submitBtn.disabled = !allValid;
  }

  
fields.forEach(function (field) {
  field.addEventListener("input", function () {
    validateForm();

    if (field.value.trim() === "") {
      field.style.borderColor = "#ced4da";
    } else if (field.checkValidity()) {
      field.style.borderColor = "#198754";
    } else {
      field.style.borderColor = "#dc3545";
    }
  });
});


  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;

    const ratings = ["rating1", "rating2", "rating3"].map(function (id) {
      return Number(document.getElementById(id).value);
    });

    const average = ratings.reduce(function (sum, rating) {
      return sum + rating;
    }, 0) / ratings.length;

    
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;

    results.textContent =
    "Name: " + firstName + " " + lastName + "\n" +
    "Email: " + email + "\n" +
    "Phone: " + phone + "\n" +
    "Address: " + address + "\n" +
    "Website Design: " + ratings[0] + "/10\n" +
    "Website Content: " + ratings[1] + "/10\n" +
    "Website Usability: " + ratings[2] + "/10\n" +
    "Average Rating: " + average.toFixed(1) + "/10";


const formData = {
  firstName: firstName,
  lastName: lastName,
  email: email,
  phone: phone,
  address: address,
  rating1: ratings[0],
  rating2: ratings[1],
  rating3: ratings[2]
};

console.log(formData);

results.style.whiteSpace = "pre-line";

}); 


  const clearBtn = document.getElementById("clearBtn");

  clearBtn.addEventListener("click", function () {
    form.reset();
    results.textContent = "";

    fields.forEach(function (field) {
      field.style.borderColor = "";
    });

    validateForm();
  });


validateForm();

}); 
