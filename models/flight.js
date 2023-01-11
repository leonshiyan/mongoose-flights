import mongoose from 'mongoose'

// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema

const flightSchema = new Schema({
  flightNumber: {
    type:String,
    required: true
  },
  origin: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  departureTime: {
    type: Date,
    required: true,
    default: function() {
      return new Date().getFullYear()
    }
  },
  arrivalTime: {
    type: Date,
    required: true
  },
  ontime: { 
    type:Boolean, 
    default:false
  }
}, {
  timestamps: true
})

const Flight = mongoose.model('Flight', flightSchema)

export {
  Flight
}