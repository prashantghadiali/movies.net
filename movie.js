const searchbar = document.getElementById("searchbar");
const movielist = document.getElementById("movie-list");
const movie = document.querySelectorAll(".movies");
const title = document.getElementsByTagName("h6");
const year = document.getElementById("year");
const form = document.getElementById("form");
const serch_poster = document.getElementById("ser_post");
let file_home = document.getElementsByTagName("main");
const appendedResult = document.getElementsByClassName("append");


async function loadApi(searchData){
    const prom = `https://omdbapi.com/?s=${searchData}&page=1&apikey=2982e8a6`;
    const resp = await fetch(`${prom}`);
    const data = await resp.json();
    if(data.Response == "True"){
        // if any of the data is in data arr then it will call this
        dataList(data.Search);
    }
    
}

function findBySearch(){
    let searchData = searchbar.value.trim();
    // getting the serch value to hit the api from this input data
    if (searchData.length > 0){
        movielist.classList.remove('hideClass');
        loadApi(searchData);
    } else {
        movielist.classList.add('hideClass');
    }
    console.log(searchData);
}


function dataList(movieData){
    movielist.innerHTML = "";
    for(let mid = 0; mid < movieData.length; mid++){
        let movieItem = document.createElement("div");
        movieItem.dataset.id = movieData[mid].imdbID;
        movieItem.classList.add('movies');
        // console.log("movie item", movieItem);
        if(movieData[mid].Poster != "N/A" ){
            var mPoster = movieData[mid].Poster;
            // console.log("poster", mPoster);
        } else{
            movieData[mid].Poster = "./image/movies.net.png"
        }
        movieItem.innerHTML = `
            <img src="${movieData[mid].Poster}" alt="poster" id="ser_post" srcset="">
            <br>
            <div class="movie-details ">
                <h6>${movieData[mid].Title}</h6>
                <p id="year">${movieData[mid].Year}</p>
            </div>
        `
        
        movielist.appendChild(movieItem)
        // console.log("movie list", movielist);
    }
    loadDetails();
}

function loadDetails(){
    const searchList = movielist.querySelectorAll(".movies");
    searchList.forEach(searchitem => {
        searchitem.addEventListener('click', async () => {
            // console.log(searchitem);
            movielist.classList.add('hideClass');
            searchbar.value = '';
            // fetch for clicked file
            const clickData = await fetch(`https://omdbapi.com/?i=${searchitem.dataset.id}&apikey=2982e8a6`)
            const clickDataDetails = await clickData.json();
            console.log("Data Selected",clickDataDetails);
            displaySelected(clickDataDetails);
            // displaySelectedMovies();
        })
    })
}

let append = document.getElementById("append");
var selectedId = "Id";
var selectedTitle = "Title";
var selectedPoster = "Poster";
var selectedPlot = "Plot";
var selectedYear = "Year";


function displaySelected(selected){
    // alert(`In Display Selected Function ${selected}`)
    localStorage.setItem(selectedId, selected.imdbID);
    localStorage.setItem(selectedTitle, selected.Title);
    localStorage.setItem(selectedPoster , selected.Poster);
    localStorage.setItem(selectedPlot , selected.Plot);
    localStorage.setItem(selectedYear , selected.Year);
    location.pathname = "/movie_page/movies.html";
}
displaySelected().then(response => {
    console.log(response);
}).catch(e => {
    console.log(e);
});


function displaySelectedMovies(){
    let append = document.getElementById("append");
    let appendItem = document.createElement("div");
    appendItem.classList.add('card');
    appendItem.classList.add('text-center');
    // console.log(appendItem);
    append.innerHTML = `
        <div class="card text-center">
            <div class="card-body">
                <img src="${(localStorage.Poster != "N/A") ? localStorage.Poster : "/image/movies.net.png"}" class="" alt="Poster">
                <br>
                <br>
                <h5 class="card-title">Title:&nbsp;${localStorage.Title}</h5>
                <p class="card-text"><b>Plot :</b>&nbsp;${localStorage.Plot}</p>
                <a href="#" class="btn btn-primary">Add To Favourits</a>
                <a href="/" class="btn btn-success">Back to Home</a>
            </div>
            <div class="card-footer text-muted">
                Year : ${localStorage.Year}
            </div>
        </div>
    `;
}
displaySelectedMovies().then(response => {
    console.log(response);
}).catch(e => {
    console.log(e);
});



// click outside of search list -> list disapeears
window.addEventListener("click", (e) => {
    if(e.target.className != "movie-list"){
        movielist.classList.add('hideClass');
    }
})