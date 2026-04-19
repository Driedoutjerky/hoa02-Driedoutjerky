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

const githubProfileSection = document.getElementById("github-profile");

async function loadGitHubProfile() {
    if (!githubProfileSection) {
        return;
    }

    const username = "driedoutjerky";

    try {
        const response = await fetch(`https://api.github.com/users/${username}`);

        if (!response.ok) {
            throw new Error("Failed to fetch GitHub profile.");
        }

        const data = await response.json();

        githubProfileSection.innerHTML = `
            <div class="github-profile-box">
                <img src="${data.avatar_url}" alt="${data.login} GitHub avatar">
                <div class="github-profile-text">
                    <h3>${data.name ? data.name : data.login}</h3>
                    <p>${data.bio ? data.bio : "No bio available."}</p>
                    <p><strong>Public repositories:</strong> ${data.public_repos}</p>
                    <p><strong>Followers:</strong> ${data.followers}</p>
                    <p><strong>Following:</strong> ${data.following}</p>
                    <a class="repo-link" href="${data.html_url}" target="_blank">Visit GitHub Profile</a>
                </div>
            </div>
        `;
    } catch (error) {
        githubProfileSection.innerHTML = `<p>Error loading profile information. NOOOOO!!!!!</p>`;
        console.error(error);
    }
}

loadGitHubProfile();

const repoList = document.getElementById("repo-list");

async function loadGitHubRepos() {
    if (!repoList) {
        return;
    }

    const username = "driedoutjerky";

    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated`);

        if (!response.ok) {
            throw new Error("Failed to fetch repositories.");
        }

        const repos = await response.json();

        if (repos.length === 0) {
            repoList.innerHTML = "<p>No public repositories found.</p>";
            return;
        }

        repoList.innerHTML = "";

        repos.forEach(function (repo) {
            const repoCard = document.createElement("article");
            repoCard.className = "card";

            repoCard.innerHTML = `
                <h3>${repo.name}</h3>
                <p>${repo.description ? repo.description : "No description provided."}</p>
                <p><strong>Primary language:</strong> ${repo.language ? repo.language : "Not specified"}</p>
                <p><strong>Stars:</strong> ${repo.stargazers_count}</p>
                <p><strong>Forks:</strong> ${repo.forks_count}</p>
                <a class="repo-link" href="${repo.html_url}" target="_blank">View Repository</a>
            `;

            repoList.appendChild(repoCard);
        });
    } catch (error) {
        repoList.innerHTML = "<p>Error loading repositories. Aw why.</p>";
        console.error(error);
    }
}

loadGitHubRepos();