document.querySelectorAll('[data-delete-form]').forEach(function (form) {
  form.addEventListener('submit', function (event) {
    const confirmed = window.confirm('Voulez-vous vraiment supprimer cette offre ?');
    if (!confirmed) {
      event.preventDefault();
    }
  });
});
