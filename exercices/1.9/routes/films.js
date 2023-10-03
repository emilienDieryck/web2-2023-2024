const express = require('express');

const router = express.Router();
const { serialize, parse } = require('../utils/json');
const { readAllFilms, readOneFilms, addNewFilms, deleteFilm } = require('../models/films');

const jsonDbPath = `${__dirname  }/../data/films.json`;

router.get('/', (req, res) => {
    const orderByDuration = readAllFilms(req?.query['minimum-duration']);
    return res.json(orderByDuration);
});

router.get('/:id', (req, res) => {
    console.log(`GET /films/${req.params.id}`);  
    const filmId = readOneFilms(req?.params?.id);
    if(filmId === undefined) return res.sendStatus(404);
    return res.json(filmId);
});

// add a new film
router.post('/', (req, res) => {
    const title = req?.body?.title?.lenght !== 0 ? req.body.title : undefined;
    const duration = req?.body?.duration ? Number(req.body.duration) : undefined;
    const budget = req?.body?.budget ? Number(req.body.budget) : undefined;
    const link = req?.body?.link?.lenght !== 0 ? req.body.link : undefined;

    if(!title || !duration || !budget || !link) return res.sendStatus(404);
    const newFilm = addNewFilms(title, duration, budget, link);
    if( newFilm === undefined ) return res.sendStatus(404);
    return res.json(newFilm)
});

router.delete('/:id', (req, res) => {
    console.log(`DELETE /films/${req.params.id}`);
    const deletedFilm = deleteFilm(req.params.id);

  if (!deletedFilm) return res.sendStatus(404);

  return res.json(deletedFilm);
  });


router.patch('/:id', (req, res) => {
    console.log(`PATCH /films/${req.params.id}`);
    
    const title = req?.body?.title?.lenght !== 0 ? req.body.title : undefined;
    const duration = req?.body?.duration ? Number(req.body.duration) : undefined;
    const budget = req?.body?.budget ? Number(req.body.budget) : undefined;
    const link = req?.body?.link?.lenght !== 0 ? req.body.link : undefined;

    const films = parse(jsonDbPath, FILM);
  
    if ((!title && !link) || title?.length === 0 || link?.length === 0) return res.sendStatus(400);
    if ((!duration && budget) || typeof duration !== 'number' || typeof budget !== 'number') return res.sendStatus(400);
  
    const foundIndex = films.findIndex(film => film.id === req.params.id);
  
    if (foundIndex < 0) return res.sendStatus(404);
  
    const updatedFilm = {...films[foundIndex], ...req.body};
  
    films[foundIndex] = updatedFilm;

    serialize(jsonDbPath, films);
  
    return res.json(updatedFilm);
  });


router.put('/:id' , (req, res) => {
    console.log(`PUT /films/${req.params.id}`);

    const title = req?.body?.title;
    const duration = req?.body?.duration;
    const budget = req?.body?.budget;
    const link = req?.body?.link;

    const films = parse(jsonDbPath, FILM);
  
    if ((!title && !link) || title?.length === 0 || link?.length === 0) return res.sendStatus(400);
    if ((!duration && budget) || typeof duration !== 'number' || typeof budget !== 'number') return res.sendStatus(400);
  
    const foundIndex = films.findIndex(film => film.id === req.params.id);

    if(foundIndex < 0){
        const newFilm = {
            id: req.params.id,
            title,
            duration,
            budget,
            link,
        };
    
    films.push(newFilm);

    serialize(jsonDbPath, films);

    return res.json(newFilm);
    };

    const updatedFilm = {...films[foundIndex], ...req.body};
    films[foundIndex] = updatedFilm;

    serialize(jsonDbPath, films);

    return res.json(updatedFilm);
    
});



module.exports = router;
