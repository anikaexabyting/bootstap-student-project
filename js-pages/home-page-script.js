
// document.addEventListener("DOMContentLoaded", () => {
//     const navbarContainer = document.getElementById('navbar-container');
  
//     fetch('/html-pages/navbar.html')  // Correct path depending on your folder structure
//       .then(function(response) {
//         return response.text();
//       })
//       .then(function(htmlString) {
//         console.log(htmlString); // Logs fetched HTML
//         navbarContainer.innerHTML = htmlString; // Injects the HTML
//       })
//       .catch(function(err) {
//         console.log('Fetch Error', err);
//       });
//   });
  
function getCards() {
    const studentsJson = localStorage.getItem("student");
    const studentArray = JSON.parse(studentsJson);
    const container = document.getElementById("card-container");
    container.innerHTML = "";
    
    studentArray?.forEach((student) => {
      const cardHTML = `<div class="card m-2" style="width: 18rem;">
        <img src="${student.image}" class="card-img-top" alt="Student Image">
        
        <div class="card-body">
          <h5 class="card-title">${student.firstName} ${student.lastName}</h5>
          <p class="card-text"><span class="fw-bold">Email: </span>${student.email}</p>
          <p class="card-text"><span class="fw-bold">Number: </span>${student.phone}</p>
          <a href="#" class="btn btn-primary">More Information</a>
        </div>
      </div>`;
      
      container.insertAdjacentHTML("beforeend", cardHTML);
    });
  }
  
  window.addEventListener("DOMContentLoaded", getCards);
  