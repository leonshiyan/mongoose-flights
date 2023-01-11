import { Flight } from '../models/flight.js'

function newFlights(req,res){
  res.render("flights/new", {
    title: "Add Flight",
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
export{
  newFlights as new,
  create,
  index,
  show,
  deleteFlight as delete,
  edit,
  update
}