var express = require('express');
var router = express.Router();

const films = [
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
        title: "'A Haunting in Venice' (2023)",
        duration: 190,
        budget: 675000,
        link: 'https://www.imdb.com/title/tt29081468/?ref_=vp_vi_tt',
    }
];

router.get('/', (req, res) => {
    const orderByDuration = req?.query 
        ? Number(req.query['minimum-duration']) 
        : undefined;
    console.log('minimun duration : ' + orderByDuration);

    if(typeof orderByDuration !== 'number' || orderByDuration <= 0)
        return res.json('wrong minimun duration');

    if(!orderByDuration) return res.json(films);

    const filmsfilter = films.filter((film) => film.duration >= orderByDuration);
    return res.json(filmsfilter);
});

router.get('/:id', (req, res) => {
    console.log(`GET /films/${req.params.id}`);

    const idIndexFilms = films.findIndex((film) => film.id == req.params.id);

    if(idIndexFilms < 0) res.sendStatus(404);

    res.json(films[idIndexFilms]);
});

router.post('/', (req, res) => {
    const title = req?.body?.title?.lenght !== 0 ? req.body.title : undefined;
    const duration = req?.body?.duration ? Number(req.body.duration) : undefined;
    const budget = req?.body?.budget ? Number(req.body.budget) : undefined;
    const link = req?.body?.link?.lenght !== 0 ? req.body.link : undefined;

    if(typeof duration !== 'number' || duration <= 0) 
        return res.sendStatus(404);

    if(typeof budget !== 'nummber' || budget <= 0)
        return res.sendStatus(404);

    const LastItemIndex = films?.lenght !== 0 ? films.length - 1 : 0;
    const lastId = LastItemIndex !== undefined ? films[LastItemIndex]?.id : 0;
    const nextId = lastId +1;

    const newFilm = {
        id: nextId,
        title: title,
        duration: duration,
        budget: budget,
        link: link,
    };

    films.push(newFilm);

    res.json(newFilm)

})

module.exports = router;
