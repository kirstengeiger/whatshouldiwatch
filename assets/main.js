document.addEventListener("DOMContentLoaded", function() {
    // Select the label element
    const label = document.querySelector('.filter-year .label');

    // Add a click event listener to the label element
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

// Add click event listener to the "Suggest Movie" button
document.getElementById('suggest-button').addEventListener('click', () => {
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
                            <button class="refresh-button">↺</button>
                        </section>
                        <section class="movie-info">
                            <h1 class="title">${randomEntryData.title}</h1>
                            <img src="${randomEntryData.poster}">
                            <p class="imdbRating">Rating: ${randomEntryData.imdbRating} out of 10</p>
                            <p class="genre">${randomEntryData.genre}</p>
                            <p class="yearReleased"><time>${randomEntryData.year}</time></p>
                            <p class="plot">${randomEntryData.plot}</p>
                            <p class="director">Directed by ${randomEntryData.director}</p>
                            <p class="starring">Starring ${randomEntryData.stars}</p>
                            <p class="runTime"><em>${randomEntryData.runTime}</em></p>
                            <p class="streaming">Streaming on ${randomEntryData.streamPlatform} <a href="${randomEntryData.streamLink}">linked here</a></p>
                        </section>
                    </li>

                    <li class="suggestion-desktop">
                        <h1 class="title">${randomEntryData.title}</h1>
                        <img src="${randomEntryData.poster}">
                        <p class="imdbRating">Rating: ${randomEntryData.imdbRating} out of 10</p>
                        <p class="genre">${randomEntryData.genre}</p>
                        <p class="yearReleased"><time>${randomEntryData.year}</time></p>
                        <p class="plot">${randomEntryData.plot}</p>
                        <p class="director">Directed by ${randomEntryData.director}</p>
                        <p class="starring">Starring ${randomEntryData.stars}</p>
                        <p class="runTime"><em>${randomEntryData.runTime}</em></p>
                        <p class="streaming">Streaming on ${randomEntryData.streamPlatform} <a href="${randomEntryData.streamLink}">linked here</a></p>
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
});

    // Function to add event listener to the exit button
    function addExitButtonListener() {
        const exitButton = document.querySelector('.exit-button');
        exitButton.addEventListener('click', function() {
            // Hide the movie section
            movieSection.classList.remove('active');
        });
    }

// Add event listener to toggle movie section visibility
document.addEventListener("DOMContentLoaded", function() {
    const suggestButton = document.getElementById('suggest-button');
    const movieSection = document.querySelector('.movie');

    suggestButton.addEventListener('click', function() {
        movieSection.classList.add('active'); // Add the "active" class to show the movie section
    });
});
