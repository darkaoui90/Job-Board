require('dotenv').config() ; 
const express = require('express');
const mysql = require('mysql2/promise') ; 


const app = express();


const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});


app.get('/' , async(req,res)=>{

      try {
        const[offres] = await pool.query('SELECT * FROM offre');


        res.json(offres)
      }





});