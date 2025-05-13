

function showStudentDetails(index) {
  const studentsJson = localStorage.getItem("student");
  const studentArray = JSON.parse(studentsJson);

  const student = studentArray[index];


  const modalBody = document.getElementById("modal-student");
  const subjectsHTML =
    student.subjects?.map((subject) => `<li>${subject}</li>`).join("") ||
    "<li>No subjects selected</li>";

  modalBody.innerHTML = `
      <img src="${student.image}" class="img-fluid mb-3" alt="Student Image">
      <p><strong>First Name:</strong> ${student.firstName}</p>
      <p><strong>Last Name:</strong> ${student.lastName}</p>
      <p><strong>Email:</strong> ${student.email}</p>
      <p><strong>Phone:</strong> ${student.phone}</p>
      <p><strong>Date of Birth:</strong> ${student.dateOfBirth || "N/A"}</p>
      <p><strong>Subjects:</strong></p>
      <ul>${subjectsHTML}</ul>
  `;

  const modalElement = document.getElementById("studentModal");
  const modal = new bootstrap.Modal(modalElement);
  modal.show();
}
function getPlaceholderCard() {
  return `
    <div class="card m-2" style="width: 18rem;" aria-hidden="true">

      <div class="card-body">
        <h5 class="card-title placeholder-glow">
          <span class="placeholder col-6"></span>
        </h5>
        <p class="card-text placeholder-glow">
          <span class="placeholder col-7"></span>
          <span class="placeholder col-4"></span>
          <span class="placeholder col-4"></span>
          <span class="placeholder col-6"></span>
          <span class="placeholder col-8"></span>
        </p>
        <a class="btn btn-primary disabled placeholder col-6" aria-disabled="true"></a>
      </div>
    </div>`;
}
document.addEventListener("DOMContentLoaded", function (event) {
  const dataTexts = [
    "Inspiring a Love for Learning...",
    "Where Every Student Thrives...",
    "Building Bright Futures Together...",
  ];
  function typeWritting(text, i, fnCallback) {
    if (i < text.length) {
      document.querySelector(".typewritting-text").innerHTML =
        text.substring(0, i + 1) +
        `<span aria-hidden="true" class="typewritting-cursor"></span>`;
      setTimeout(function () {
        typeWritting(text, i + 1, fnCallback);
      }, 100);
    } else if (typeof fnCallback === "function") {
      setTimeout(fnCallback, 1000);
    }
  }

  function startTextAnimation(i) {
    if (typeof dataTexts[i] == "undefined") {
      setTimeout(function () {
        startTextAnimation(0);
      }, 2000);
    } else if (i < dataTexts.length) {
      typeWritting(dataTexts[i], 0, function () {
        startTextAnimation(i + 1);
      });
    }
  }
  startTextAnimation(0);
});
function getCards() {
  const container = document.getElementById("card-container");
  container.innerHTML = "";
  for (let i = 0; i < 10; i++) {
    container.insertAdjacentHTML("beforeend", getPlaceholderCard());
  }

  setTimeout(() => {
    const studentsJson = localStorage.getItem("student");
    const studentArray = JSON.parse(studentsJson);
    container.innerHTML = "";

    studentArray?.forEach((student, index) => {
      const cardHTML = `<div class="card m-2" style="width: 18rem;">
        <img src="${student.image}" class="card-img-top" alt="Student Image">

        <div class="card-body">
          <h5 class="card-title">${student.firstName} ${student.lastName}</h5>
          <p class="card-text"><span class="fw-bold">Email: </span>${student.email}</p>
          <p class="card-text"><span class="fw-bold">Number: </span>${student.phone}</p>
          <a href="#" class="btn btn-primary" onclick="showStudentDetails(${index})">More Information</a>
        </div>
      </div>`;
      container.insertAdjacentHTML("beforeend", cardHTML);
    });
  }, 3000); 
}

window.addEventListener("DOMContentLoaded", getCards);
