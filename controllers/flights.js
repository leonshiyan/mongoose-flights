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
export{
  newFlights as new,
  create
}