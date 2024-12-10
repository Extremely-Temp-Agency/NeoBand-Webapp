document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission
    const password = document.getElementById('password').value;
    if (password) {
        const contentContainer = document.getElementById('content-container');
        const saveLabelsButton = document.getElementById('save-labels');
        contentContainer.classList.remove('hidden');
        saveLabelsButton.classList.remove('hidden');
        generateTableRows('WRITE');
        generateTableRows('READ');
        loadSavedLabels(); // Populate fields from saved cookie
    }
});

document.getElementById('save-labels').addEventListener('click', function () {
    saveLabelsToCookie();
    alert('Labels saved successfully!');
});

function generateTableRows(columnId) {
    const column = document.querySelector(`.column:nth-child(${columnId === 'WRITE' ? 2 : 3}) tbody`);
    column.innerHTML = ''; // Clear existing rows
    for (let i = 1; i <= 15; i++) {
        const row = document.createElement('tr');

        // Block Column
        const blockCell = document.createElement('td');
        blockCell.textContent = `Block ${i}`;
        row.appendChild(blockCell);

        // Name Column
        const nameCell = document.createElement('td');
        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.placeholder = 'Name';
        nameInput.classList.add('name-input');
        nameInput.dataset.block = i; // Add block identifier
        nameCell.appendChild(nameInput);
        row.appendChild(nameCell);

        // Type Column
        const typeCell = document.createElement('td');
        const typeSelect = document.createElement('select');
        ['Text', 'Number', 'Raw Bytes'].forEach(optionText => {
            const option = document.createElement('option');
            option.value = optionText;
            option.textContent = optionText;
            typeSelect.appendChild(option);
        });
        typeCell.appendChild(typeSelect);
        row.appendChild(typeCell);

        // Value Column
        const valueCell = document.createElement('td');
        const valueInput = document.createElement('input');
        valueInput.type = 'text';
        valueInput.maxLength = 16;
        valueInput.placeholder = 'Value';
        valueCell.appendChild(valueInput);
        row.appendChild(valueCell);

        // Append the row to the table
        column.appendChild(row);
    }
}

function saveLabelsToCookie() {
    const nameInputs = document.querySelectorAll('#write-column .name-input');
    const labels = {}; // Initialize the labels object

    nameInputs.forEach(input => {
        const block = input.dataset.block; // Get block number from data attribute
        labels[block] = input.value || ''; // Save the input value or empty string
    });

    console.log("Labels to Save:", labels); // Debugging: Check the labels object

    // Save the labels object as a cookie
    document.cookie = `labels=${encodeURIComponent(JSON.stringify(labels))};path=/;max-age=31536000;`;
}

function loadSavedLabels() {
    console.log("Cookies Available:", document.cookie); // Debugging
    const nameInputs = document.querySelectorAll('#write-column .name-input');
    const cookie = document.cookie.split('; ').find(row => row.startsWith('labels='));
    if (cookie) {
        const labels = JSON.parse(decodeURIComponent(cookie.split('=')[1]));
        nameInputs.forEach(input => {
            const block = input.dataset.block;
            if (labels[block]) {
                input.value = labels[block];
            }
        });
    }
}

document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const password = document.getElementById('password').value;
    if (password) {
        const contentContainer = document.getElementById('content-container');
        const saveLabelsButton = document.getElementById('save-labels');
        contentContainer.classList.remove('hidden');
        saveLabelsButton.classList.remove('hidden');
        generateTableRows('WRITE');
        generateTableRows('READ');
        loadSavedLabels();
    }
});

document.getElementById('save-labels').addEventListener('click', function () {
    saveLabelsToCookie();
    alert('Labels saved successfully!');
});