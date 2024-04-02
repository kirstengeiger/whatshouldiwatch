document.getElementById('suggest-button').addEventListener('click', function() {
    fetch('assets/data.json')
        .then(response => response.json())
        .then(data => {
            // Generate a random index
            const randomIndex = Math.floor(Math.random() * data.length);
            
            // Retrieve the random entry from the array
            const randomEntryData = data[randomIndex];

            // Construct the HTML string for the random entry using a template literal
            const randomEntryHTML = `
                <li>
                    <h1>${randomEntryData.title}</h1>
                    <img src="${randomEntryData.poster}">
                    <p>${randomEntryData.imdbRating} out of 10</p>
                    <p>${randomEntryData.genre}</p>
                    <p><time>${randomEntryData.year}</time></p>
                    <p>${randomEntryData.plot}</p>
                    <p>Directed by ${randomEntryData.director}</p>
                    <p>Starring ${randomEntryData.stars}</p>
                    <p><em>${randomEntryData.runTime}</em></p>
                    <p>Streaming on ${randomEntryData.streamPlatform} <a href="${randomEntryData.streamLink}">linked here</a></p>
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