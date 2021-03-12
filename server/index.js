import express from "express";
import cors from "cors";
import mongoose from "mongoose";


const app = express();

app.use(express.json({ limit: "30mb", extended: true}));
app.use(express.urlencoded({ limit: "30mb", extended: true}));
app.use(cors());

// https://www.mongodb.com/cloud/atlas


