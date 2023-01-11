import { Router } from 'express'
import * as flightsCtrl from '../controllers/flights.js'

const router = Router()

// GET /flights/index
router.get('/',flightsCtrl.index)

// GET /flights/new
router.get('/new', flightsCtrl.new)

// GET /flights/:id
router.get('/:id', flightsCtrl.show)

// localhost:3000/flights/:id/edit
router.get("/:id/edit", flightsCtrl.edit)

// POST /flights
router.post('/', flightsCtrl.create)

// add for tickets
router.post('/:id/tickets', flightsCtrl.createTickets)

// DELETE /flights/:id
router.delete("/:id", flightsCtrl.delete)

// PUT /flights/:id
router.put("/:id", flightsCtrl.update)

export {
	router
}