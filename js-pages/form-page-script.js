
// document.addEventListener("DOMContentLoaded", () => {
//   const navbarContainer = document.getElementById('navbar-container');

//   fetch('/html-pages/navbar.html')  // Correct path depending on your folder structure
//     .then(function(response) {
//       return response.text();
//     })
//     .then(function(htmlString) {
//       console.log(htmlString); // Logs fetched HTML
//       navbarContainer.innerHTML = htmlString; // Injects the HTML
//     })
//     .catch(function(err) {
//       console.log('Fetch Error', err);
//     });
// });

//select for states
const states = ["Dhaka", "Comilla", "Rajshahi"];
const stateSelect=document.getElementById('state-select');
states.forEach(state=>{
  const option=document.createElement('option');
  option.value=state;
  option.textContent=state;
  stateSelect.appendChild(option);
})
const showImage = (event) => {
  const imageDiv = document.getElementById("image-div");
  imageDiv.innerHTML = ""; // Clear previous image if any

  const image = document.createElement("img");
  image.alt = "Your image";
  image.className = "img-fluid";
  image.id = "image";
  image.src = URL.createObjectURL(event.target.files[0]);
  image.onload = () => URL.revokeObjectURL(image.src);

  imageDiv.appendChild(image);
};


const imagetoBase64String = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
///check on clicking
document.querySelectorAll(".subject-checkbox").forEach(cb => {
  cb.addEventListener("change", () => {
    const selected = Array.from(document.querySelectorAll(".subject-checkbox")).filter(c => c.checked);
    const subjectError = document.getElementById("subject-error");
    if (selected.length<2) {
      subjectError.classList.remove("d-none");
    
    }
   else  subjectError.classList.add("d-none");
  });
});
const validateSubjects = () => {
  const checkBoxes = document.querySelectorAll(".subject-checkbox");
  const selected = Array.from(checkBoxes).filter(cb => cb.checked);
  const errorDiv = document.getElementById("subject-error");

  if (selected.length < 2) {
    errorDiv.classList.remove("d-none");
    console.log(errorDiv)
    checkBoxes.forEach(cb => cb.classList.add("is-invalid"));
    return false;
  } else {
    errorDiv.classList.add("d-none");
    checkBoxes.forEach(cb => cb.classList.remove("is-invalid"));
    return true;
  }
};

(function () {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        event.preventDefault();
        validateSubjects();
        // Check all form fields for validity
        if (!form.checkValidity()||   !validateSubjects()) {
          event.stopPropagation(); // Stop further propagation if form is invalid
        }

        // Add validation styles to all form controls
        form.classList.add("was-validated");

        // Manually trigger validation feedback
        Array.prototype.slice.call(form.elements).forEach(function (input) {
          if (!input.checkValidity()) {
            input.classList.add("is-invalid");
          } else {
            input.classList.remove("is-invalid");
          }
        });

        if (form.checkValidity() && validateSubjects()) {
          formSubmit();
        }
      },
      false
    );
  });
})();

async function formSubmit() {
  const imageFile = document.getElementById("input-image").files[0];
  const imageBase64 = imageFile ? await imagetoBase64String(imageFile) : null;

  const checkBoxes = document.querySelectorAll(".subject-checkbox");
  const selectedSubjects = Array.from(checkBoxes)
    .filter((cb) => cb.checked)
    .map((cb) => cb.value);

  console.log("Selected Subjects:", selectedSubjects);

  const subjectError = document.getElementById("subject-error");
  if (selectedSubjects.length < 2) {
    subjectError.style.display = "block";
  
    return;
  } else {
    subjectError.style.display = "none";
  }

  const studentData = {
    firstName: document.getElementById("first-name").value.trim(),
    lastName: document.getElementById("last-name").value.trim(),
    fatherFirstName: document.getElementById("father-first-name").value.trim(),
    fatherLastName: document.getElementById("father-last-name").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    email: document.getElementById("email").value.trim(),
    dateOfBirth: document.getElementById("date-of-birth").value,
    gender: document.querySelector('input[name="gender"]:checked')?.id || "",
    image: imageBase64,
    subjects: selectedSubjects, 
    state:document.getElementById('state-select').value.trim()
  };

  const existingStudents = JSON.parse(localStorage.getItem("student")) || [];
  existingStudents.push(studentData);
  console.log(studentData);
  localStorage.setItem("student", JSON.stringify(existingStudents));

  const alert = document.getElementById("alert");
  alert.classList.remove("d-none");
  setTimeout(() => {
    alert.classList.add("d-none");
  }, 1000);

  document.querySelector("form").reset();
  document.querySelector("form").classList.remove("was-validated");

  const preview = document.getElementById("image");
  if (preview) preview.remove();
}

