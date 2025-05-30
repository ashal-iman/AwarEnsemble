// script.js
document.addEventListener('DOMContentLoaded', function () {
  const cards      = document.querySelectorAll('.feature-card');
  const checkboxes = document.querySelectorAll('.filter-bar input[type="checkbox"]');
  const searchBar  = document.getElementById('search');

  function filterCards() {
    // 1) Get checked filter values
    const activeFilters = Array.from(checkboxes)
      .filter(cb => cb.checked)
      .map(cb => cb.value.toLowerCase());

    // 2) Search term
    const searchQuery = searchBar.value.trim().toLowerCase();

    cards.forEach(card => {
      // 3) Does card text match search?
      const textMatch = card.textContent.toLowerCase().includes(searchQuery);

      // 4) Does card tags match ALL active filters?
      const tags = (card.dataset.tags || '').toLowerCase().split(/\s+/);
      const tagMatch = activeFilters.every(f => tags.includes(f));

      // 5) Show/hide
      card.style.display = (textMatch && tagMatch) ? '' : 'none';
    });
  }

  // Bind events & initial filter
  checkboxes.forEach(cb => cb.addEventListener('change', filterCards));
  searchBar.addEventListener('input', filterCards);
  filterCards();
});

