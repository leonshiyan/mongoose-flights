import { Flight } from '../models/flight.js'

function newFlights(req,res){
  const newFlight = new Flight()
  const dt = newFlight.departs
  const departsDate = dt.toISOString().slice(0, 16);
  res.render("flights/new", {
    title: "Add Flight",
    departsDate: departsDate
  })
}
function create(req,res){
  // convert ontime's checkbox of nothing or "on" to boolean
  req.body.ontime = !!req.body.ontime
  
  Flight.create(req.body)
  .then(flight => {
    // remove empty properties
    for (let key in req.body) {
      if (req.body[key] === '') delete req.body[key]
    }
    res.redirect('/flights')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/flights/new')
  })
}
function index(req,res){
  Flight.find({})
  .then(flights => {
    res.render('flights/index', {
      flights: flights,
      title: 'All FLights'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}
function show(req, res) {
  Flight.findById(req.params.id)
  .then(flight => {
    res.render('flights/show', { 
      title: 'Flight Detail', 
      flight: flight,
    })    
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}
function deleteFlight(req,res){
  Flight.findByIdAndDelete(req.params.id)
  .then(flight => {
    res.redirect("/flights")
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}
function edit(req, res) {
  Flight.findById(req.params.id)
  .then(flight => {
    res.render("flights/edit", {
      title: "Edit Flight",
      flight, // same as: movie: movie
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}
function update(req,res){
  req.body.ontime = !!req.body.ontime
  for (let key in req.body) {
    if(req.body[key] === "") delete req.body[key]
  }
  
  Flight.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then(flight => {
    res.redirect(`/flights/${flight._id}`)
  })
  .catch(err => {
    console.log(err)
    res.redirect("/flights")
  })
}

function createTickets(req, res) {
  Flight.findById(req.params.id)
  .then(flight => {
    flight.tickets.push(req.body)
    flight.save()
    .then(() => {
      res.redirect(`/flights/${flight._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}
export{
  newFlights as new,
  create,
  index,
  show,
  deleteFlight as delete,
  edit,
  update,
  createTickets
}