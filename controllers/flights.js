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
    res.redirect('/flights/new')
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
export{
  newFlights as new,
  create,
  index
}