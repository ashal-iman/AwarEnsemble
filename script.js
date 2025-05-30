// Run after content is loaded
document.addEventListener('DOMContentLoaded', function () {
  const cards = document.querySelectorAll('.feature-card');
  const checkboxes = document.querySelectorAll('.filter-bar input[type="checkbox"]');
  const searchBar = document.querySelector('input[type="text"]');

  function filterCards() {
    const activeFilters = Array.from(checkboxes)
      .filter(checkbox => checkbox.checked)
      .map(checkbox => checkbox.nextSibling.textContent.trim().toLowerCase());

    const searchQuery = searchBar.value.trim().toLowerCase();

    cards.forEach(card => {
      const cardText = card.textContent.toLowerCase();
      const matchesSearch = cardText.includes(searchQuery);
      const matchesFilters = activeFilters.every(filter => cardText.includes(filter));

      if (matchesSearch && matchesFilters) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  }

  checkboxes.forEach(cb => cb.addEventListener('change', filterCards));
  searchBar.addEventListener('input', filterCards);
});
