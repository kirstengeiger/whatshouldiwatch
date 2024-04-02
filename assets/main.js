document.addEventListener('DOMContentLoaded', function() {
    let include2020s = false; // Flag to indicate whether to include only movies from the 2020s
	let include2010s = false; // Flag to indicate whether to include only movies from the 2010s
    let include2000s = false; // Flag to indicate whether to include only movies from the 2000s

	// Add click event listener to the "2020s" year button
    document.querySelector('.year-button-2020s').addEventListener('click', function() {
        include2020s = !include2020s; // Toggle the flag
		include2010s = false;
        include2000s = false; 
    });

    // Add click event listener to the "2010s" year button
    document.querySelector('.year-button-2010s').addEventListener('click', function() {
        include2010s = !include2010s; // Toggle the flag
		include2020s = false;
        include2000s = false;
    });

    // Add click event listener to the "2000s" year button
    document.querySelector('.year-button-2000s').addEventListener('click', function() {
        include2000s = !include2000s; // Toggle the flag
		include2020s = false;
        include2010s = false; // Reset the flag for the 2010s
    });

    // Add click event listener to the "Suggest Movie" button
    document.getElementById('suggest-button').addEventListener('click', function() {
        fetch('assets/data.json')
            .then(response => response.json())
            .then(data => {
                // Filter data based on the include2010s and include2000s flags
                let filteredData = data;
                if (include2010s) {
                    filteredData = filteredData.filter(item => item.year >= 2010 && item.year <= 2019);
                } else if (include2000s) {
                    filteredData = filteredData.filter(item => item.year >= 2000 && item.year <= 2009);
                }

                // Generate a random index for the filtered data
                const randomIndex = Math.floor(Math.random() * filteredData.length);

                // Retrieve the random entry from the filtered data
                const randomEntryData = filteredData[randomIndex];

                // Construct the HTML string for the random entry using a template literal
                const randomEntryHTML = `
                    <li>
                        <h1 class="title">${randomEntryData.title}</h1>
                        <img src="${randomEntryData.poster}">
                        <p class="imdbRating">${randomEntryData.imdbRating} out of 10</p>
                        <p class="genre">${randomEntryData.genre}</p>
                        <p class="yearReleased"><time>${randomEntryData.year}</time></p>
                        <p class="plot">${randomEntryData.plot}</p>
                        <p class="director">Directed by ${randomEntryData.director}</p>
                        <p class="starring">Starring ${randomEntryData.stars}</p>
                        <p class="runTime"><em>${randomEntryData.runTime}</em></p>
                        <p class="streaming">Streaming on ${randomEntryData.streamPlatform} <a href="${randomEntryData.streamLink}">linked here</a></p>
                    </li>
                `;

                // The `ul` where the items will be inserted
                const dataList = document.getElementById('suggested-movie');

                // Clear the existing content before adding the new random movie
                dataList.innerHTML = '';

                // Add the random entry HTML to the `ul`
                dataList.insertAdjacentHTML('beforeend', randomEntryHTML);

                // Now you can do whatever you want with the random entry data
                console.log('Random Entry:', randomEntryData);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    });
});


