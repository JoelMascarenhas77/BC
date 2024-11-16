// Function to get the cookie value
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
}

// Event listener for the patient form submission
document
  .getElementById("getPatientForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const patientId = document.getElementById("patientId").value;

    try {
      const response = await fetch(`/api/get-patient/${patientId}`);
      const result = await response.json();

      if (result.success) {
        const patient = result.patient;

        // Check if patient is valid and has a name
        if (patient.name) {
          document.getElementById("patientDetails").innerHTML = `
            <p><strong>Name:</strong> <span id="name">${patient.name}</span></p>
            <input type="hidden" id="init_v" value="${patient.init_v}">
            <input type="hidden" id="doctorNames" value="${patient.doctors.join(
              ", "
            )}">
            <input type="hidden" id="encKeys" value="${patient.enc_keys.join(
              ", "
            )}">
            <p><strong>Record:</strong></p>
            <textarea id="patientRecord" rows="4" cols="50" readonly>${
              patient.enc_record
            }</textarea>
            <div class="mt-3">
              <label for="privateKey" class="form-label">Private Key</label>
              <input type="text" id="privateKey" class="form-control" placeholder="Enter private key" required />
              <button id="decryptBtn" class="btn btn-secondary mt-2">Decrypt</button>
            </div>
          `;

          // Add event listener for the decrypt button
          document
            .getElementById("decryptBtn")
            .addEventListener("click", async function () {
              const privateKey = document.getElementById("privateKey").value;
              const patientRecord =
                document.getElementById("patientRecord").value;
              const iv = document.getElementById("init_v").value; // Get iv from hidden input

              const enc_keys = document
                .getElementById("encKeys")
                .value.split(",")
                .map((key) => key.trim());
              const doctorNames = document
                .getElementById("doctorNames")
                .value.split(",")
                .map((name) => name.trim());

              const account = getCookie("username");
              let index = doctorNames.indexOf(account);

              if (index === -1) {
                alert("Doctor not found in the list.");
                return;
              }

              // Prepare data to send to the API
              const apiUrl = "/record/deci"; // Replace with your API URL
              const payload = {
                privateKey: privateKey,
                patientRecord: patientRecord,
                iv: iv,
                encKey: enc_keys[index], // Send the enc_key for the current doctor
              };

              try {
                // Send the data to the API
                const response = await fetch(apiUrl, {
                  method: "POST", // or 'PUT' depending on your API design
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(payload),
                });

                if (!response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const result = await response.json();
                console.log("Response from API:", result);

                // Check if the response is successful and update the record
                if (result.success) {
                  // Update the patientRecord textarea with the decrypted message
                  document.getElementById("patientRecord").value =
                    result.decryptedMessage;
                } else {
                  alert("Decryption failed: " + result.error);
                }
              } catch (error) {
                console.error("Error:", error);
                alert("An error occurred: " + error.message);
              }
            });
        } else {
          alert("Patient does not have a valid name.");
        }
      } else {
        alert("Error retrieving patient: " + result.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred: " + error.message);
    }
  });
