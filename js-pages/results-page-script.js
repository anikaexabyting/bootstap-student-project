const rowsPerPage = 5;
var curPage = 1;
var students = [];
document.addEventListener("DOMContentLoaded", function () {
  const spinner = document.getElementById("spinner");
  spinner.classList.add("d-block");

  fetch("/students.json")
    .then((res) => res.json())
    .then((data) => {
      setTimeout(() => {
        students = data;
        renderTableHeader();
        renderTable();
        renderPagination();
        spinner.classList.remove("d-block");
        spinner.classList.add("d-none");
      }, 3000);
    })
    .catch((error) => console.error(error));
});
function renderTableHeader() {
  const table = document.getElementById("student-table");
  table.innerHTML += `  
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Math</th>
          <th>English</th>
          <th>Bangla</th>
        </tr>
      </thead>`;
}

function renderPagination() {
  const paginatedData = document.getElementById("pagination");
  paginatedData.innerHTML = "";
  const totalPages = Math.ceil(students.length / rowsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    paginatedData.innerHTML += `      
        <li class="page-item ${
          i === curPage ? "active" : ""
        }" onclick="goToPage(${i})">
          <a class="page-link" href="#">${i}</a>
        </li>`;
  }
}

function renderTable() {
  const tableBody = document.getElementById("student-table-body");
  tableBody.innerHTML = "";

  const start = (curPage - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const slicedElements = students.slice(start, end);

  slicedElements.forEach((student) => {
    const row = tableBody.insertRow();
    row.insertCell().textContent = student.id;
    row.insertCell().textContent = student.name;
    row.insertCell().textContent = student.math;
    row.insertCell().textContent = student.english;
    row.insertCell().textContent = student.bangla;
  });
}
function goToPage(pageNo) {
  curPage = pageNo;
  renderTable();
  renderPagination();
}
