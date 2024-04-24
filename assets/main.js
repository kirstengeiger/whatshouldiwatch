document.addEventListener("DOMContentLoaded", function() {
    // Select the label elements in both desktop and mobile versions
    const labels = document.querySelectorAll('.intro-desktop .filter-year .label, .intro-mobile .filter-year .label');

    // Add click event listeners to all label elements
    labels.forEach(label => {
        label.addEventListener('click', function() {
            // Toggle the 'active' class on the parent <ul> element
            label.parentElement.classList.toggle('active');
        });
    });

    // Add change event listener to checkboxes
    document.querySelectorAll('.year-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const selectedYears = Array.from(document.querySelectorAll('.year-checkbox:checked')).map(checkbox => checkbox.value);
            console.log(selectedYears);
        });
    });

    // Add event listener to the "Suggest Movie" buttons in both mobile and desktop versions
    const suggestButtonMobile = document.getElementById('suggest-button-mobile');
    suggestButtonMobile.addEventListener('click', suggestMovie);

    const suggestButtonDesktop = document.getElementById('suggest-button-desktop');
    suggestButtonDesktop.addEventListener('click', suggestMovie);
});

// Define the suggestMovie function to handle the "Suggest Movie" button click
function suggestMovie() {
    // Retrieve selected years
    const selectedYears = Array.from(document.querySelectorAll('.year-checkbox:checked')).map(checkbox => checkbox.value);
    fetch('assets/data.json')
        .then(response => response.json())
        .then(data => {
            let filteredData = data;

            // Filter based on selected years
            if (selectedYears.length > 0) {
                filteredData = data.filter(item => {
                    for (const yearRange of selectedYears) {
                        const [startYear, endYear] = yearRange.split('-').map(Number);
                        if (item.year >= startYear && item.year <= endYear) {
                            return true;
                        }
                    }
                    return false;
                });
            }

            if (filteredData.length > 0) {
                const randomIndex = Math.floor(Math.random() * filteredData.length);
                const randomEntryData = filteredData[randomIndex];

                const randomEntryHTML = `
                    <li class="suggestion-mobile">
                        <section class="top-bar">
                            <button class="exit-button">X</button>
                            <button class="refresh-button">Suggest Movie</button>
                        </section>
                        <section class="movie-info">
                            <section class="movie-top">
                                <section class="movie-poster">
                                    <img class="poster" src="${randomEntryData.poster}">
                                </section>
                            </section>
                            <section class="movie-bottom">
                                <h1 class="title">${randomEntryData.title}</h1>
                                <section class="movie-statistics">
                                        <p class="imdbRating">⭑ ${randomEntryData.imdbRating}</p>
                                        <p class="genre">${randomEntryData.genre}</p>
                                        <p class="yearReleased"><time>${randomEntryData.year}</time></p>
                                        <p class="runTime"><em>${randomEntryData.runTime}</em></p>
                                </section>
                                <p class="plot">${randomEntryData.plot}</p>
                                <section class="movie-people">
                                    <p class="director">Directed by ${randomEntryData.director}</p>
                                    <p class="starring">Starring ${randomEntryData.stars}</p>
                                </section>
                            </section>
                        <section class="stream-link">
                            <p class="streaming"><a href="${randomEntryData.streamLink}">▶</a></p>
                        </section>
                    </li>

                    <li class="suggestion-desktop">
                    <section class="movie-info">
                        <section class="movie-below">
                            <section class="movie-left">
                                <img class="poster" src="${randomEntryData.poster}">
                            </section>
                            <section class="movie-right">
                                <h1 class="title">${randomEntryData.title}</h1>
                                <section class="movie-statistics">
                                        <p class="imdbRating">⭑ ${randomEntryData.imdbRating}</p>
                                        <p class="genre">${randomEntryData.genre}</p>
                                        <p class="yearReleased"><time>${randomEntryData.year}</time></p>
                                        <p class="runTime"><em>${randomEntryData.runTime}</em></p>
                                </section>
                                <p class="plot">${randomEntryData.plot}</p>
                                <section class="movie-people">
                                    <p class="director">Directed by ${randomEntryData.director}</p>
                                    <p class="starring">Starring ${randomEntryData.stars}</p>
                                </section>
                                <a href="${randomEntryData.streamLink}">
                                    <section class="streaming-link">
                                        <p class="streaming">Streaming on ${randomEntryData.streamPlatform}</p>
                                    </section>
                                </a>
                            </section>
                        </section>
                    </section
                </li>

                
                `;

                const dataList = document.getElementById('suggested-movie');
                dataList.innerHTML = '';
                dataList.insertAdjacentHTML('beforeend', randomEntryHTML);

                console.log('Random Entry:', randomEntryData);
            } else {
                console.log('No movies found for the selected years.');
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

// Function to handle click on exit button
function handleExitButtonClick(event) {
    const exitButton = event.target.closest('.exit-button');
    if (exitButton) {
        const listItem = exitButton.closest('.suggestion-mobile');
        if (listItem) {
            listItem.remove();
        }
    }
}

// Add click event listener to the document and delegate it to exit buttons
document.addEventListener('click', handleExitButtonClick);

// Add event listener to toggle movie section visibility
const suggestButton = document.getElementById('suggest-button-mobile');
const movieSection = document.querySelector('.movie');
suggestButton.addEventListener('click', function() {
    movieSection.classList.add('active'); // Add the "active" class to show the movie section
});
