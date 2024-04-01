const apiKey = "c43b7cbd";
const queryURL = `http://www.omdbapi.com/?apikey=${apiKey}&`;

fetch(queryURL)
  .then((response) => response.json())
  .then((data) => {
    let title = data.Title; // Assuming you want to extract the title from the response
    console.log(title);
  })
  .catch((error) => {
    console.error('Error fetching data:', error);
  });
