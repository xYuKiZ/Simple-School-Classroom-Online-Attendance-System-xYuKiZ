document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('loginForm').style.display = 'none';

            if (data.role === 'admin') {
                document.getElementById('classData').style.display = 'block';
                fetchClassData();
            } else if (data.role === 'teacher') {
                document.getElementById('dataEntry').style.display = 'block';
            }
        } else {
            alert('Invalid username or password');
        }
    });
});

function fetchClassData() {
    fetch('get_class_data.php')
    .then(response => response.json())
    .then(data => {
        const tbody = document.getElementById('classTableBody');
        tbody.innerHTML = '';
        data.forEach(row => {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td>${row.class_name}</td><td>${row.boys}</td><td>${row.girls}</td><td>${row.timestamp}</td>`;
            tbody.appendChild(tr);
        });
    });
}

document.getElementById('classForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const className = document.getElementById('className').value;
    const boys = document.getElementById('boys').value;
    const girls = document.getElementById('girls').value;

    fetch('submit_class.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ className, boys, girls }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Class data entered successfully');
            document.getElementById('classForm').reset();
        } else {
            alert('Error submitting class data');
        }
    });
});
