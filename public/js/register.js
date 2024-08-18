document.getElementById("registrationForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    // Get form values
    const bvcId = document.getElementById("bvcId").value.trim();
    const fullName = document.getElementById("fullName").value.trim();
    const address = document.getElementById("address").value.trim();
    const status = document.querySelector('input[name="status"]:checked').value;

    // Validate form inputs
    if (!bvcId || !fullName || !address || !status) {
        alert("Please fill in all fields.");
        return;
    }

    // Determine the fee based on status
    let fee = 0;
    if (status === "Student") {
        fee = 10;
    } else if (status === "Staff") {
        fee = 50;
    } else if (status === "Volunteer") {
        fee = 0;
    }

    // Create registration object
    const registrationDetails = {
        bvcId: bvcId,
        fullName: fullName,
        address: address,
        status: status,
        fee: fee
    };

    // Send registration data to the server
    fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(registrationDetails)
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Registration successful') {
            document.getElementById('confirmationDetails').innerHTML = `
                <h3>Registration Confirmation</h3>
                <p>BVC ID: ${data.registrationData.bvcId}</p>
                <p>Full Name: ${data.registrationData.fullName}</p>
                <p>Address: ${data.registrationData.address}</p>
                <p>Status: ${data.registrationData.status}</p>
                <p>Fee: $${data.registrationData.fee}</p>
            `;
            document.getElementById("confirmationMessage").style.display = "block";
            // Clear form fields after submission
            document.getElementById("registrationForm").reset();
        } else {
            alert(data.message);
        }
    })
    .catch(error => console.error('Error:', error));
});

