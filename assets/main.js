document.addEventListener("DOMContentLoaded", function() {
    // Select the "Suggest Movie" buttons in both mobile and desktop versions
    const suggestButtonMobile = document.getElementById('suggest-button-mobile');
    const suggestButtonDesktop = document.getElementById('suggest-button-desktop');

    suggestButtonMobile.addEventListener('click', suggestMovie);
    suggestButtonDesktop.addEventListener('click', suggestMovie);
});

// Define the suggestMovie function to handle the "Suggest Movie" button click
function suggestMovie() {
    fetch('assets/data.json')
        .then(response => response.json())
        .then(data => {
            // Select a random movie from the data
            const randomIndex = Math.floor(Math.random() * data.length);
            const randomEntryData = data[randomIndex];

            const randomEntryHTML = `
                <li class="suggestion-mobile">
                    <section class="movie-info">
                        <section class="movie-top">
                            <section class="movie-poster">
                                <img class="poster" src="${randomEntryData.poster}">
                            </section>
                        </section>
                        <hr>
                        <section class="movie-bottom">
                            <h3>${randomEntryData.title}</h3>
                            <hr>
                            <section class="movie-statistics">
                                    <p class="imdbRating">⭑ ${randomEntryData.imdbRating}</p>
                                    <p class="genre">${randomEntryData.genre}</p>
                                    <p class="yearReleased"><time>${randomEntryData.year}</time></p>
                                    <p class="runTime"><em>${randomEntryData.runTime}</em></p>
                            </section>
                            <hr>
                            <p class="plot">${randomEntryData.plot}</p>
                            <hr>
                            <hr>
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
                                <hr>
                                <section class="movie-statistics">
                                        <p class="imdbRating">⭑ ${randomEntryData.imdbRating}</p>
                                        <p class="genre">${randomEntryData.genre}</p>
                                        <p class="yearReleased"><time>${randomEntryData.year}</time></p>
                                        <p class="runTime"><em>${randomEntryData.runTime}</em></p>
                                </section>
                                <hr>
                                <p class="plot">${randomEntryData.plot}</p>
                                <hr>
                                <section class="movie-people">
                                    <p class="director">Directed by ${randomEntryData.director}</p>
                                    <p class="starring">Starring ${randomEntryData.stars}</p>
                                </section>
                            </section>
                            <a href="${randomEntryData.streamLink}">
                                <section class="streaming-link">
                                    <p class="streaming">Streaming on ${randomEntryData.streamPlatform}</p>
                                </section>
                            </a>
                        </section>
                    </section>
                </li>
            `;

            const dataList = document.getElementById('suggested-movie');
            dataList.innerHTML = '';
            dataList.insertAdjacentHTML('beforeend', randomEntryHTML);

            console.log('Random Entry:', randomEntryData);
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