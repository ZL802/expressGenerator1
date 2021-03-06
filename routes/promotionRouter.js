const express = require('express');
const Promotion = require('../models/promotion');
const authenticate = require('../authenticate');

const promotionRouter = express.Router();

promotionRouter.route('/')
.get((req, res, next) => {
    console.log('here')
    Promotion.find()
    .then(promotion => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(promotion);
    })
    .catch(err => next(err))
})
.post(authenticate.verifyUser, (req,res, next) => {
    Promotion.create(req.body)
    .then(promotion => {
    console.log('Promotion Created', promotion);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(promotion)  
    })
    .catch(err => next(err));
})

.put(authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end('PUT operations not supported on /promotions');
})

.delete(authenticate.verifyUser, (req, res, next) => {
    Promotion.deleteMany()
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err))
})

promotionRouter.route('/:promotionsId')
.get((req, res, next) => {
    Promotion.findById(req.params.promotionId)
    .then(promotion => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(promotion);
    })
    .catch(err => next(err));
})

.post(authenticate.verifyUser, (req, res) => {
    res.end(`Will add the promotion: ${req.body.name} with description ${req.body.description}`);
})

.put(authenticate.verifyUser, (req, res, next) => {
    Promotion.findByIdAndUpdate(req.params.promotionId, {
        $set: req.body
    }, { new: true})
    .then(promotion => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    })
    .catch(err => next(err));
})

.delete(authenticate.verifyUser, (req, res, next) => {
  Promotion.findByIdAndDelete(req.params.promotionId)
  .then(response => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(response);
  })
  .catch(err => next(err))
});

module.exports = promotionRouter;