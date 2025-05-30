document.addEventListener('DOMContentLoaded', function () {
  const cards      = document.querySelectorAll('.feature-card');
  const checkboxes = document.querySelectorAll('.filter-bar input[type="checkbox"]');
  const searchBar  = document.getElementById('search');

  function filterCards() {
    const activeFilters = Array.from(checkboxes)
      .filter(cb => cb.checked)
      .map(cb => cb.value.toLowerCase());

    const searchQuery = searchBar.value.trim().toLowerCase();

    cards.forEach(card => {
      const textMatch = card.textContent.toLowerCase().includes(searchQuery);

      // Split tags by spaces or commas, remove empty strings
      const tags = (card.dataset.tags || '')
        .toLowerCase()
        .split(/[\s,]+/)
        .filter(tag => tag);

      // Check if every active filter is included in card's tags
      const tagMatch = activeFilters.every(f => tags.includes(f));

      card.style.display = (textMatch && tagMatch) ? '' : 'none';
    });
  }

  checkboxes.forEach(cb => cb.addEventListener('change', filterCards));
  searchBar.addEventListener('input', filterCards);
  filterCards();
});

