document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.clickable-row').forEach(function (row) {
    row.style.cursor = 'pointer';
    // click con mouse
    row.addEventListener('click', function () {
      window.location.href = this.dataset.href;
    });
  });
});
