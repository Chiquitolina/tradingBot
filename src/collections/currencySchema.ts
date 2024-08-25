import { Schema, model } from "mongoose";

export const currencySchema = new Schema({
    name: {
        type: String,
        require: true
    },
    timestamp :{
        type: Date,
        require: true
    },
    open: {
        open: Number,
        required: true
    },
    close: {
        close: Number,
        required: true
    },
    high: {
        close: Number,
        required: true
    },
    low: {
        close: Number,
        required: true
    },
    baseVolume: {
        close: Number,
        required: true
    },
    quoteVolume: {
        close: Number,
        required: true
    },
    bid: {
        close: Number,
        required: true
    },
    ask: {
        close: Number,
        required: true
    },
    change: {
        close: Number,
        required: true
    },
    percentage: {
        close: Number,
        required: true
    },
    vwap: {
        close: Number,
        required: true
    }
})