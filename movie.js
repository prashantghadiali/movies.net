const searchbar = document.getElementById("searchbar");
const movielist = document.getElementById("movie-list");
const movie = document.querySelectorAll(".movies");
const title = document.getElementsByTagName("h6");
const year = document.getElementById("year");
const form = document.getElementById("form");
const serch_poster = document.getElementById("ser_post");
let file_home = document.getElementsByTagName("main");


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
        console.log("movie item", movieItem);
        if(movieData[mid].Poster != "N/A" ){
            var mPoster = movieData[mid].Poster;
            console.log("poster", mPoster);
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
        console.log("movie list", movielist);
    }
}



// prom.then((response) =>{
//     console.log("get status: ", response.status);

//     return response.json();
//     }).then((response)=>{
//         console.log(response);
//         console.log("get Title: ", response.Title);
//         console.log("get Year: ", response.Year);
//         searchbar.addEventListener("click", ()=>{
            
//             title[0].innerText = response.Title;
//             year.innerText = response.Year;
//     });
// });

// function ser(){
//     let options = (searchbar.value).trim();
//     if(options.length > 0){
//         searchbar.movielist.remove();
//     }
// }



// form.addEventListener("submit", (e) => {
//     e.preventDefault();
//     file_home.innerHTML = '';

//     const searchTerm = search.value;

//     if (searchTerm) {
//         show(SEARCHAPI + searchTerm);
//         search.value = "";
//     }
// });
