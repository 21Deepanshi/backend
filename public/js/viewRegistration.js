document.addEventListener('DOMContentLoaded', function() {
    fetch('/api/view')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const tableBody = document.querySelector('#registrantsTable tbody');
            tableBody.innerHTML = ''; // Clear existing table data

            data.forEach(registration => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${registration.bvcId}</td>
                    <td>${registration.fullName}</td>
                    <td>${registration.address}</td>
                    <td>${registration.status}</td>
                    <td>$${registration.fee}</td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching registrations:', error));
});
