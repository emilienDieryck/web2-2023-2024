var express = require('express');
var router = express.Router();

// Read the pizza identified by an id in the menu
router.get('/:id', (req, res) => {
    console.log(`GET /pizzas/${req.params.id}`);
  
    const indexOfPizzaFound = MENU.findIndex((pizza) => pizza.id == req.params.id);
  
    if (indexOfPizzaFound < 0) return res.sendStatus(404);
  
    res.json(MENU[indexOfPizzaFound]);
  });

module.exports = router;