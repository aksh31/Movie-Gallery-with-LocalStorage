let cl = console.log;

// All Declaration in the page
// ===========================================================================

const showModal = document.getElementById("showModal");
const myModal = document.getElementById("myModal");
const backDrop = document.getElementById("backDrop");
const myClose = Array.from(document.querySelectorAll(".myClose"));
const movieForm = document.getElementById("movieForm");
const title = document.getElementById("title");
const imgUrl = document.getElementById("imgUrl");
const rating = document.getElementById("rating");
const addMovie = document.getElementById("addMovie");
const updateMovie = document.getElementById("updateMovie");
const myMovie = document.getElementById("myMovie");
let movieArray = [];

// ============================================================================

// All Functionality incliuding functions and Event Handlers

if (localStorage.getItem("setData")) {
    movieArray = JSON.parse(localStorage.getItem("setData"));
    templating(movieArray);
}

function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

//====================================== For Getting Data ========================================

const getMovieHandler = (eve) => {
    let obj = {
        title: title.value,
        imgUrl: imgUrl.value,
        rating: rating.value,
        id: uuidv4(),
    }
    movieArray.push(obj);
    localStorage.setItem("setData", JSON.stringify(movieArray));
    templating(movieArray);
    // title.value = '';
    // imgUrl.value = '';
    // rating.value = '';
    movieForm.reset();
    toggleToShow();
}

//====================================== For Edit ========================================

const onEditHandler = (eve) => {
    // cl("edited")
    let getID = eve.dataset.id;
    cl(getID);
    localStorage.setItem("setID", getID);
    let getEditedMovie = movieArray.find(movie => movie.id === getID);
    cl(getEditedMovie);
    toggleToShow();
    title.value = getEditedMovie.title;
    imgUrl.value = getEditedMovie.imgUrl;
    rating.value = getEditedMovie.rating;
    toggleButtons();
}

//====================================== For Update ========================================

const onUpdateMovieHandler = eve => {
    let updateID = localStorage.getItem("setID");
    cl(updateID)
    movieArray.forEach(movie => {
        if (movie.id === updateID) {
            movie.title = title.value;
            movie.imgUrl = imgUrl.value;
            movie.rating = rating.value;
        }
    })
    localStorage.setItem("setData", JSON.stringify(movieArray));
    templating(movieArray);
    title.value = '';
    imgUrl.value = '';
    rating.value = '';
    toggleButtons();
    toggleToShow();
}

//====================================== For Delete ========================================

const onDeleteHandler = eve => {
    if (confirm("Are you sure want to delete !!!") === true){
        let deletedID = eve.dataset.id;
        cl(deletedID);
        let newMovieArray = movieArray.filter(movie => movie.id !== deletedID);
        localStorage.setItem("setData", JSON.stringify(newMovieArray));
        templating(newMovieArray);
        location.reload();
    }
}

//====================================== For Templating ========================================

function templating(arr) {
    let result = '';
    arr.forEach(ele => {
        result +=
            `<div class="col-md-4">
            <div class="card mb-4">
                <div class="card-body">
                    <h4>
                        ${ele.title}
                    </h4>
                        <img src="${ele.imgUrl}" alt="${ele.title}" class="gallaryImg img-fluid">
                    <span>${ele.rating}/5</span>
                    <span class="icons">
                        <i class="far fa-edit" data-id=${ele.id} onclick="onEditHandler(this)"></i>
                        <i class="fas fa-trash" data-id=${ele.id} onclick="onDeleteHandler(this)"></i>
                    </span>
                </div>
            </div>
        </div>`;
    })
    myMovie.innerHTML = result;
}

const onModalHandler = (eve) => {
    toggleToShow();
}

const onCloseToHandler = (e) => {
    toggleToShow();
}

//====================================== For Repeated Code ========================================

function toggleToShow() {
    backDrop.classList.toggle("show");
    myModal.classList.toggle("show");
}

function toggleButtons() {
    addMovie.classList.toggle("d-none");
    updateMovie.classList.toggle("d-none");
}


// ===========================================================================

// All Event Listners

showModal.addEventListener("click", onModalHandler);

myClose.forEach(btn => {
    btn.addEventListener("click", onCloseToHandler)
});

movieForm.addEventListener("submit", getMovieHandler);

updateMovie.addEventListener("click", onUpdateMovieHandler);

// ===========================================================================
