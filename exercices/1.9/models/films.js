const path = require('node:path');
const { parse , serialize } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '/../data/films.json');

const FILM = [
    {
        id: 1,
        title: "Killers of the Flower Moon (2023)",
        duration: 206,
        budget: 500000,
        link: 'https://www.imdb.com/title/tt5537002/?ref_=vp_vi_tt',
    },
    {
        id: 2,
        title: "Aquaman et le Royaume perdu (2023)",
        duration: 180,
        budget: 1000000,
        link: 'https://www.imdb.com/title/tt9663764/?ref_=vp_vi_tt',
    },
    {
        id: 3,
        title: "A Haunting in Venice (2023)",
        duration: 190,
        budget: 675000,
        link: 'https://www.imdb.com/title/tt29081468/?ref_=vp_vi_tt',
    }
];

function readAllFilms(orderBy) {
    const orderByDuration = orderBy?.includes('minimum-duration')
        ? orderBy
        : undefined;
    let filterduration;
    const films = parse(jsonDbPath, FILM);
    if(orderByDuration){
        if(typeof orderByDuration !== 'number' || orderByDuration <= 0){
            return ('wrong minimun duration');
        }
        filterduration = films.filter((film) => film.duration >= orderByDuration);   
    }    

    const allFilmsOrFilterDuration = filterduration ?? films;
    return allFilmsOrFilterDuration;
}
function readOneFilms(id){
    const idNumber = parseInt(id,10);
    const films = parse(jsonDbPath, FILM);
    const indexOfFilmFound = films.findIndex((film) => film.id === idNumber);
    if(indexOfFilmFound < 0) return undefined;

    return films[indexOfFilmFound];
}


function addNewFilms(title, duration , budget , link) {
    const films = parse(jsonDbPath, FILM); 

    if(typeof duration !== 'number' || duration <= 0) 
        return undefined;
    
    if(typeof budget !== 'number' || budget <= 0)
        return undefined;

    const createdFilm = {
        id: getNextId(),
        title,
        duration,
        budget,
        link
    };

    films.push(createdFilm);

    serialize(jsonDbPath, films);

    return createdFilm;
}

function getNextId() {
    const films = parse(jsonDbPath, FILM);
    const lastItemIndex = films?.length !== 0 ? films.length - 1 : undefined;
    if (lastItemIndex === undefined) return 1;
    const lastId = films[lastItemIndex]?.id;
    const nextId = lastId + 1;
    return nextId;
}

function deleteFilm(id) {
    const idNumber = parseInt(id, 10);
    const films = parse(jsonDbPath, FILM);
    const foundIndex = films.findIndex((film) => film.id === idNumber);
    if (foundIndex < 0) return undefined;
    const deletedfilms = films.splice(foundIndex, 1);
    const deletedPizza = deletedfilms[0];
    serialize(jsonDbPath, films);

    return deletedPizza;
}


module.exports = {
    readAllFilms,
    readOneFilms,
    addNewFilms,
    deleteFilm
}