const mongoose = require('mongoose')
const transactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    plan: {
        type: String,
        enum: ['Basic', 'Advanced', 'Business'],
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    credits: {
        type: Number,
        required: true
    },
    payment : {
        type : Boolean,
        default : false
    },

    
})
const transactionModel = mongoose.models.transaction || mongoose.model('transaction', transactionSchema)

module.exports = transactionModel