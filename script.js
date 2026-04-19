const themeToggleButton = document.getElementById("theme-toggle");

if (themeToggleButton) {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-theme");
    }

    themeToggleButton.addEventListener("click", function () {
        document.body.classList.toggle("dark-theme");

        if (document.body.classList.contains("dark-theme")) {
            localStorage.setItem("theme", "dark");
        } else {
            localStorage.setItem("theme", "light");
        }
    });
}

const categoryFilter = document.getElementById("category-filter");
const projectSearch = document.getElementById("project-search");
const projectCards = document.querySelectorAll(".project-card");

function filterProjects() {
    if (!categoryFilter || !projectSearch || projectCards.length === 0) {
        return;
    }

    const selectedCategory = categoryFilter.value.toLowerCase();
    const searchKeyword = projectSearch.value.toLowerCase().trim();

    projectCards.forEach(function (card) {
        const cardCategory = card.dataset.category.toLowerCase();
        const cardText = card.textContent.toLowerCase();
        const cardKeywords = card.dataset.keywords.toLowerCase();

        const categoryMatches =
            selectedCategory === "all" || cardCategory === selectedCategory;

        const keywordMatches =
            searchKeyword === "" ||
            cardText.includes(searchKeyword) ||
            cardKeywords.includes(searchKeyword);

        if (categoryMatches && keywordMatches) {
            card.classList.remove("hidden");
        } else {
            card.classList.add("hidden");
        }
    });
}

if (categoryFilter && projectSearch) {
    categoryFilter.addEventListener("change", filterProjects);
    projectSearch.addEventListener("input", filterProjects);
}