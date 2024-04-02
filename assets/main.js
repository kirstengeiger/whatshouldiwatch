const renderItems = (data) => {
    // The `ul` where the items will be inserted
    const dataList = document.getElementById('suggested-movie');

    // Loop through each item in the data array
    data.forEach((item) => {
        // Make a “template literal” as we have before, inserting your data
        let listItem =
            `
                <li>
                    <h1>${item.title}</h1>
                    <img src="${item.poster}">
					<p>${item.imdbRating} out of 10</p>
					<p>${item.genre}</p>
                    <p><time>${item.year}</time></p>
					<p>${item.plot}</p>
					<p>Directed by ${item.director}</p>
					<p>Starring ${item.stars}</p>
                    <p><em>${item.runTime}</em></p>
                    <p>Streaming on ${item.streamPlatform}<a href="${item.streamLink}"></a></p>
                </li>
            `;

        dataList.insertAdjacentHTML('beforeend', listItem); // Add it to the `ul`!
    });
};

// Fetch gets your (local) JSON file…
fetch('assets/data.json')
	.then(response => response.json())
	.then(data => {
		// And passes the data to the function, above!
		renderItems(data)
	})