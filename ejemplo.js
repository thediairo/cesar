document.getElementById('addContactForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    formData.append('action', 'add');
    fetch('assets/php/backend.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('addModal').querySelector('.btn-close').click();
            fetchContacts();
        } else {
            alert(data.mensaje);
        }
    })
    .catch(error => console.error('Error adding contact:', error));
});

document.getElementById('editContactForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    formData.append('action', 'update');
    fetch('assets/php/backend.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('editModal').querySelector('.btn-close').click();
            fetchContacts();
        } else {
            alert(data.mensaje);
        }
    })
    .catch(error => console.error('Error updating contact:', error));
});

document.addEventListener('click', function (e) {
    if (e.target.classList.contains('deleteBtn') || e.target.closest('.deleteBtn')) {
        const id = e.target.dataset.id || e.target.closest('.deleteBtn').dataset.id;
        if (confirm('Are you sure you want to delete this contact?')) {
            const formData = new FormData();
            formData.append('action', 'delete');
            formData.append('id', id);
            fetch('assets/php/backend.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    fetchContacts();
                } else {
                    alert(data.mensaje);
                }
            })
            .catch(error => console.error('Error deleting contact:', error));
        }
    }
});

document.addEventListener('click', function (e) {
    if (e.target.classList.contains('editBtn') || e.target.closest('.editBtn')) {
        const id = e.target.dataset.id || e.target.closest('.editBtn').dataset.id;
        fetchContactById(id).then(contact => {
            document.getElementById('editId').value = contact.id;
            document.getElementById('editNombre').value = contact.nombre;
            document.getElementById('editAp').value = contact.ap;
            document.getElementById('editAm').value = contact.am;
            document.getElementById('editTelefono').value = contact.telefono;
            new bootstrap.Modal(document.getElementById('editModal')).show();
        });
    }
});

function fetchContacts() {
    const formData = new FormData();
    formData.append('action', 'fetch');
    fetch('assets/php/backend.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById('contactList').innerHTML = data;
    })
    .catch(error => console.error('Error fetching contacts:', error));
}

function fetchContactById(id) {
    return fetch('assets/php/backend.php', {
        method: 'POST',
        body: new URLSearchParams({
            action: 'fetchById',
            id: id
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            return data.contact;
        } else {
            throw new Error(data.mensaje);
        }
    })
    .catch(error => console.error('Error fetching contact:', error));
}

document.addEventListener('DOMContentLoaded', function () {
    fetchContacts();
});