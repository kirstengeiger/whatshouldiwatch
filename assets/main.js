    

// TRIED THE RENDERBLOCK RULE BUT IT WASN'T WORKING
// Function to render blocks based on the filter
// function renderBlocks(filter) {
//     const container = document.getElementById('container');
//     container.innerHTML = ''; // Clear container before rendering blocks
    
//     data.forEach(block => {
//         let show = false;
//         filter.forEach(value => {
//             if (value === block.year) {
//                 show = true;
//             }
//         });
//         if (show) {
//             // Create block HTML
//             const blockHTML = `
//                 <div class="block">
//                     <h2>${block.title}</h2>
//                     <p>Year: ${block.year}</p>
//                     <p>Director: ${block.director}</p>
//                     <img src="${block.poster}" alt="${block.title} Poster">
//                 </div>
//             `;
//             // Append block to container
//             container.insertAdjacentHTML('beforeend', blockHTML);
//         }
//     });
// }

// // Add change event listener to checkboxes
// document.querySelectorAll('.year-checkbox').forEach(checkbox => {
//     checkbox.addEventListener('change', () => {
//         const selectedYears = Array.from(document.querySelectorAll('.year-checkbox:checked')).map(checkbox => checkbox.value);
//         renderBlocks(selectedYears);
//     });
// });

// document.querySelectorAll('.check').forEach(el => {
//     el.addEventListener('change', () => {
//         const filter = [];
//         document.querySelectorAll('.check:checked').forEach(checkbox => {
//             filter.push(checkbox.value);
//         });
//         renderBlocks(filter);
//     });
// });

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

// DOESN'T SHOW THE MOVIE, NOT CONNECTED TO THE SUGGEST MOVIE BUTTON
// // Add click event listener to the "Suggest Movie" button
// document.getElementById('suggest-button').addEventListener('click', () => {
//     const selectedYears = Array.from(document.querySelectorAll('.year-checkbox:checked')).map(checkbox => checkbox.value);
    
//     fetch('assets/data.json')
//         .then(response => response.json())
//         .then(data => {
//             const filteredData = data.filter(item => selectedYears.includes(item.year));
//             if (filteredData.length > 0) {
//                 const randomIndex = Math.floor(Math.random() * filteredData.length);
//                 const randomEntryData = filteredData[randomIndex];

//                 const randomEntryHTML = `
//                     <li>
//                         <h1 class="title">${randomEntryData.title}</h1>
//                         <img src="${randomEntryData.poster}">
//                         <p class="imdbRating">${randomEntryData.imdbRating} out of 10</p>
//                         <p class="genre">${randomEntryData.genre}</p>
//                         <p class="yearReleased"><time>${randomEntryData.year}</time></p>
//                         <p class="plot">${randomEntryData.plot}</p>
//                         <p class="director">Directed by ${randomEntryData.director}</p>
//                         <p class="starring">Starring ${randomEntryData.stars}</p>
//                         <p class="runTime"><em>${randomEntryData.runTime}</em></p>
//                         <p class="streaming">Streaming on ${randomEntryData.streamPlatform} <a href="${randomEntryData.streamLink}">linked here</a></p>
//                     </li>
//                 `;

//                 const dataList = document.getElementById('suggested-movie');
//                 dataList.innerHTML = '';
//                 dataList.insertAdjacentHTML('beforeend', randomEntryHTML);

//                 console.log('Random Entry:', randomEntryData);
//             } else {
//                 console.log('No movies found for the selected years.');
//             }
//         })
//         .catch(error => {
//             console.error('Error fetching data:', error);
//         });
// });

// SHOWING ALL MOVIES, NOT THE ONES DEFINED IN CHECKBOX
// // Add click event listener to the "Suggest Movie" button
// document.getElementById('suggest-button').addEventListener('click', () => {
//     const selectedYears = Array.from(document.querySelectorAll('.year-checkbox:checked')).map(checkbox => checkbox.value);
    
//     fetch('assets/data.json')
//         .then(response => response.json())
//         .then(data => {
//             let filteredData = data;

//             // Filter based on selected years
//             if (selectedYears.length > 0) {
//                 filteredData = data.filter(item => {
//                     for (const yearRange of selectedYears) {
//                         const [startYear, endYear] = getDecadeRange(yearRange);
//                         if (item.year >= startYear && item.year <= endYear) {
//                             return true;
//                         }
//                     }
//                     return false;
//                 });
//             }

//             if (filteredData.length > 0) {
//                 const randomIndex = Math.floor(Math.random() * filteredData.length);
//                 const randomEntryData = filteredData[randomIndex];

//                 const randomEntryHTML = `
//                     <li>
//                         <h1 class="title">${randomEntryData.title}</h1>
//                         <!-- Add other movie details as needed -->
//                     </li>
//                 `;

//                 const dataList = document.getElementById('suggested-movie');
//                 dataList.innerHTML = '';
//                 dataList.insertAdjacentHTML('beforeend', randomEntryHTML);

//                 console.log('Random Entry:', randomEntryData);
//             } else {
//                 console.log('No movies found for the selected years.');
//             }
//         })
//         .catch(error => {
//             console.error('Error fetching data:', error);
//         });
// });

// // Function to get decade range
// function getDecadeRange(decade) {
//     const currentYear = new Date().getFullYear();
//     let startYear, endYear;
//     switch (decade) {
//         case '2010s':
//             startYear = 2010;
//             endYear = currentYear - 1; // Exclude the current year
//             break;
//         case '2020s':
//             startYear = 2020;
//             endYear = currentYear;
//             break;
//         // Add cases for other decades as needed
//         default:
//             startYear = 0;
//             endYear = 0;
//             break;
//     }
//     return [startYear, endYear];
// }