
import { db } from './lib/db.js'
import bcrypt from 'bcryptjs'
import fs from 'fs'
const schema = ` CREATE TABLE IF NOT EXISTS users(   id INTEGER PRIMARY KEY AUTOINCREMENT,   username TEXT UNIQUE,   password_hash TEXT,   role TEXT ); CREATE TABLE IF NOT EXISTS products(   id INTEGER PRIMARY KEY AUTOINCREMENT,   name TEXT,   price REAL,   img TEXT,   description TEXT ); CREATE TABLE IF NOT EXISTS orders(   id INTEGER PRIMARY KEY AUTOINCREMENT,   ref TEXT,   status TEXT,   items_json TEXT,   subtotal REAL,   shipping REAL,   total REAL,   customer_json TEXT,   created_at DATETIME DEFAULT CURRENT_TIMESTAMP ); CREATE TABLE IF NOT EXISTS payments(   id INTEGER PRIMARY KEY AUTOINCREMENT,   payref TEXT,   provider TEXT,   msisdn TEXT,   amount REAL,   status TEXT,   order_ref TEXT,   created_at DATETIME DEFAULT CURRENT_TIMESTAMP ); `

db.serialize(()=>{
  schema.split(';').forEach(stmt=>{
    const s = stmt.trim()
    if(s) db.run(s+';')
  })
  const pass = bcrypt.hashSync('admin123', 10)
  db.run('INSERT OR IGNORE INTO users(username,password_hash,role) VALUES(?,?,?)', ['admin', pass, 'admin'])
  db.run('INSERT INTO products(name,price,img,description) VALUES (?,?,?,?)',
    ['Casque Bluetooth',25,'/assets/p1.jpg','Son HD, autonomie 12h.'])
  db.run('INSERT INTO products(name,price,img,description) VALUES (?,?,?,?)',
    ['Farine de manioc',4,'/assets/p2.jpg','500g - Qualite premium.'])
  db.run('INSERT INTO products(name,price,img,description) VALUES (?,?,?,?)',
    ['Chemise homme',12,'/assets/p3.jpg','100% coton.'])
  console.log('Seed done. Admin: admin/admin123')
})
