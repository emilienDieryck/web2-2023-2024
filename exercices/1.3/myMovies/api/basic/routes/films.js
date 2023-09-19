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
    ? Number(req.query['minimun-duration']) 
    : undefined;
    console.log('minimun duration : ' + orderByDuration);

    if(typeof orderByDuration !== 'number' || orderByDuration <= 0)
        return res.json('wrong minimun duration');

    if(!orderByDuration) return res.json(films);

    const filmsfilter = films.filter((film) => film.duration >= orderByDuration);
    return res.json(filmsfilter);
});

module.exports = router;
