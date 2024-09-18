document.addEventListener('DOMContentLoaded', function() {
    const userRole = localStorage.getItem('userRole');
    document.getElementById('userRole').textContent = userRole;

    if (userRole === 'admin') {
        document.getElementById('adminSection').style.display = 'block';
        fetch('getClasses.php')
            .then(response => response.json())
            .then(data => {
                const table = document.getElementById('classData');
                data.forEach(row => {
                    const newRow = table.insertRow();
                    newRow.innerHTML = `<td>${row.class_name}</td><td>${row.boys_count}</td><td>${row.girls_count}</td><td>${row.total_count}</td><td>${row.entry_time}</td>`;
                });
            });
    } else if (userRole === 'teachers') {
        document.getElementById('teacherSection').style.display = 'block';
        document.getElementById('classForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const className = document.getElementById('className').value;
            const boys = document.getElementById('boys').value;
            const girls = document.getElementById('girls').value;

            fetch('submitClass.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ className, boys, girls })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    document.getElementById('notification').innerHTML = 'Class data submitted successfully';
                } else {
                    document.getElementById('notification').innerHTML = 'Error submitting class data';
                }
            });
        });
    }
});
