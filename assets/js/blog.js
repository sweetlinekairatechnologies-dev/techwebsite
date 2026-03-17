// galleryData is now loaded from data.js

const container = document.getElementById('gallery-container');
const filterContainer = document.getElementById('filter-container');

// Debug: Check if elements exist
if (!container) {
    console.error('Gallery container not found!');
}
if (!filterContainer) {
    console.error('Filter container not found!');
}
if (!galleryData) {
    console.error('Gallery data not loaded!');
} else {
    console.log('Gallery data loaded:', galleryData.length, 'items');
}

// Extract unique categories dynamically
const categories = ['All', ...new Set(galleryData.map(item => item.category))];
console.log('Categories:', categories);

// Render filter buttons
categories.forEach(category => {
    const btnHTML = '<button class="filter-btn ' + (category === 'All' ? 'active' : '') + '" data-filter="' + category + '">' + category + '</button>';
    filterContainer.insertAdjacentHTML('beforeend', btnHTML);
});

// Render cards function
function renderCards(filter) {
    console.log('Rendering cards for filter:', filter);
    container.innerHTML = ''; // Clear prior cards

    const filteredData = filter === 'All'
        ? galleryData
        : galleryData.filter(item => item.category === filter);

    console.log('Filtered data:', filteredData.length, 'items');

    filteredData.forEach(function (item, index) {
        console.log('Creating card for:', item.title);
        const cardElement = document.createElement('div');
        cardElement.className = 'col-12 col-md-6 col-lg-4';
        cardElement.innerHTML =
            '<div class="gallery-card">' +
            '<div class="card-img-wrapper">' +
            '<img src="' + item.img + '" alt="' + item.title + '" onerror="console.error(\'Image failed to load:\', this.src)">' +
            '<div class="category-badge">' +
            '<span class="dot" style="background-color: ' + item.dotColor + ';"></span>' +
            item.category +
            '</div>' +
            '</div>' +
            '<div class="card-title-text">' +
            item.title +
            '</div>' +
            '</div>';

        cardElement.querySelector('.gallery-card').addEventListener('click', function () {
            if (item.url) {
                window.location.href = item.url;
            } else {
                const index = galleryData.findIndex(d => d.title === item.title);
                window.location.href = 'post.html?id=' + index;
            }
        });

        container.appendChild(cardElement);
    });
    
    console.log('Cards rendered successfully');
}

// Initial render
console.log('Starting initial render...');
renderCards('All');

// Filter button click events
filterContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('filter-btn')) {
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');

        const filterValue = e.target.getAttribute('data-filter');
        console.log('Filter clicked:', filterValue);

        // Add a smooth fade transition during reflow layout
        container.style.opacity = 0;
        setTimeout(() => {
            renderCards(filterValue);
            container.style.opacity = 1;
        }, 200);
    }
});
