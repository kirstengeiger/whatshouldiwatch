// document.getElementById('suggest-button').addEventListener('click', function() {
// 	fetch('assets/data.json')
//         .then(response => response.json())
//         .then(data => {
// 			console.log(data)

//             // Generate a random index
//             const randomIndex = Math.floor(Math.random() * data.length);
            
//             // Retrieve the random entry from the array
//             const randomEntryData = data[randomIndex];

//             // Construct the HTML string for the random entry using a template literal
//             const randomEntryHTML = `
//                 <li>
//                     <h1>${randomEntryData.title}</h1>
//                     <img src="${randomEntryData.poster}">
//                     <p>${randomEntryData.imdbRating} out of 10</p>
//                     <p>${randomEntryData.genre}</p>
//                     <p><time>${randomEntryData.year}</time></p>
//                     <p>${randomEntryData.plot}</p>
//                     <p>Directed by ${randomEntryData.director}</p>
//                     <p>Starring ${randomEntryData.stars}</p>
//                     <p><em>${randomEntryData.runTime}</em></p>
//                     <p>Streaming on ${randomEntryData.streamPlatform} <a href="${randomEntryData.streamLink}">linked here</a></p>
//                 </li>
//             `;
            
//             // The `ul` where the items will be inserted
//             const dataList = document.getElementById('suggested-movie');
            
//             // Clear the existing content before adding the new random movie
//             dataList.innerHTML = '';
            
//             // Add the random entry HTML to the `ul`
//             dataList.insertAdjacentHTML('beforeend', randomEntryHTML);

//             // Now you can do whatever you want with the random entry data
//             console.log('Random Entry:', randomEntryData);
//         })
//         .catch(error => {
//             console.error('Error fetching data:', error);
//         });
// });

document.addEventListener('DOMContentLoaded', function() {
    let include2010s = false; // Flag to indicate whether to include only movies from the 2010s
    let include2000s = false; // Flag to indicate whether to include only movies from the 2000s

    // Add click event listener to the "2010s" year button
    document.querySelector('.year-button-2010s').addEventListener('click', function() {
        include2010s = !include2010s; // Toggle the flag
        include2000s = false; // Reset the flag for the 2000s
    });

    // Add click event listener to the "2000s" year button
    document.querySelector('.year-button-2000s').addEventListener('click', function() {
        include2000s = !include2000s; // Toggle the flag
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
});


// FROM PAST PROJECT
		// // Styling figcaption for onClick
		// let openButtons = document.querySelectorAll('.block figcaption')
		// openButtons.forEach((openButton) => {
		// 	openButton.onclick = () => {
		// 		let parentBlock = openButton.parentElement
		// 		parentBlock.classList.toggle('active')
		// 	}
		// })

		// // Styling close button
		// let closeButtons = document.querySelectorAll('.block .close-button')
		// closeButtons.forEach((closeButton) => {
		// 	closeButton.onclick = () => {
		// 		let parentBlock = closeButton.closest('.block')
		// 		parentBlock.classList.toggle('active')
		// 	}
		// })

		// // ------------------ AUDIO FILTER ------------------

		// // Select the "Audio" button by the button ID defined in HTML
		// const audioButton = document.getElementById('audio-button');
		// const audioButtonSmall = document.getElementById('audio-button-small');

		// // Track the state of the audio filter
		// let audioFilterActive = false;

		// // Function to toggle the style of the audio button
		// function toggleAudioButtonStyle(active) {
		// 	if (active) {
		// 		audioButton.classList.add('active'); // Add the 'active' class
		// 		audioButtonSmall.classList.add('active'); // Add the 'active' class
		// 	} else {
		// 		audioButton.classList.remove('active'); // Remove the 'active' class
		// 		audioButtonSmall.classList.remove('active'); // Remove the 'active' class
		// 	}
		// }

		// // Click event listener for the audio button
		// audioButton.addEventListener('click', () => {
		// 	// Toggle display of audio blocks and track filter state
		// 	const blocks = document.querySelectorAll('.block');

		// 	blocks.forEach(block => {
		// 		// Toggle the hidden class of the block
		// 		block.classList.toggle('hidden');

		// 		// Check if the block contains an audio attachment
		// 		const isAudioBlock = block.classList.contains('block--uploadedaudio');

		// 		// If the block is an audio block, display it; otherwise, hide it
		// 		block.style.display = audioFilterActive ? 'list-item' : (isAudioBlock ? 'list-item' : 'none');
		// 	});

		// 	// Toggle the filter state
		// 	audioFilterActive = !audioFilterActive;

		// 	// Update the style of the audio button
		// 	toggleAudioButtonStyle(audioFilterActive);
		// });

		// // Click event listener for the small audio button
		// audioButtonSmall.addEventListener('click', () => {
		// 	// Toggle display of audio blocks and track filter state
		// 	const blocks = document.querySelectorAll('.block');

		// 	blocks.forEach(block => {
		// 		// Toggle the hidden class of the block
		// 		block.classList.toggle('hidden');

		// 		// Check if the block contains an audio attachment
		// 		const isAudioBlock = block.classList.contains('block--uploadedaudio');

		// 		// If the block is an audio block, display it; otherwise, hide it
		// 		block.style.display = audioFilterActive ? 'list-item' : (isAudioBlock ? 'list-item' : 'none');
		// 	});

		// 	// Toggle the active state of the small audio button
		// 	audioFilterActive = !audioFilterActive;

		// 	// Update the style of the small audio button
		// 	toggleAudioButtonStyle(audioFilterActive);
		// });
