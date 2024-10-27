document
  .getElementById("addPatientForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const ID = document.getElementById("patientID").value;
    const name = document.getElementById("patientName").value;
    const record = document.getElementById("patientRecord").value;
    const doctorAddresses = document
      .getElementById("doctorAddresses")
      .value.split(",")
      .map((addr) => addr.trim()); // Trim whitespace

    try {
      const response = await fetch("/api/add-patient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ID, name, record, doctors: doctorAddresses }),
      });
      const result = await response.json();

      if (result.success) {
        alert("Patient added successfully!");
      } else {
        alert("Error adding patient: " + result.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });
