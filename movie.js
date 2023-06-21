const searchbar = document.getElementById("searchbar");
const movielist = document.getElementById("movie-list");
const movie = document.querySelectorAll(".movies");
const title = document.getElementsByTagName("h6");

let prom = fetch("http://www.omdbapi.com/?i=tt3896198&apikey=2982e8a6");

prom.then((response) =>{
    console.log("get status: ", response.status);
    return response.json();
}).then((response)=>{
    console.log(response);
    console.log("get Title: ", response.Title);
    console.log("get Year: ", response.Year);
})


