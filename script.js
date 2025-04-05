document.getElementById("attendanceForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const roll = document.getElementById("roll").value;

  // Send data to backend using fetch()
  fetch("http://localhost:3000/mark-attendance", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, roll })
  })
  .then(response => response.json())
  .then(data => {
    document.getElementById("message").innerText = data.message;
    document.getElementById("attendanceForm").reset();
  })
  .catch(error => {
    console.error("Error:", error);
    document.getElementById("message").innerText = "Something went wrong!";
  });
});

function toggleAttendance() {
  const container = document.getElementById("attendanceContainer");
  container.style.display = container.style.display === "none" ? "block" : "none";
}

function fetchAttendance() {
  fetch("http://localhost:3000/get-attendance")
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById("attendanceTableBody");
      tableBody.innerHTML = ""; // Clear old entries

      if (data.length === 0) {
        const row = document.createElement("tr");
        row.innerHTML = `<td colspan="3">No attendance records found.</td>`;
        tableBody.appendChild(row);
        return;
      }

      data.forEach(entry => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${entry.name}</td>
          <td>${entry.roll}</td>
          <td>${entry.date}</td>
        `;
        tableBody.appendChild(row);
      });
    })
    .catch(error => {
      console.error("Error fetching attendance:", error);
    });
}
