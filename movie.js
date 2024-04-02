// const apiKey = "c43b7cbd";
fetch(`http://www.omdbapi.com/?apikey=c43b7cbd&`)
    .then(res => res.json())
    .then(data => console.log(data))

// console.log(fetch)
console.log('hello')

  
