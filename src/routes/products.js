
import { Router } from 'express'
import { db } from '../lib/db.js'
import { auth } from '../middleware/auth.js'
const r = Router()

r.get('/', (req,res)=>{
  db.all('SELECT id,name,price,img,description FROM products ORDER BY id DESC', [], (err, rows)=>{
    if(err) return res.status(500).json({error:'db_error'})
    res.json(rows)
  })
})

r.post('/', auth, (req,res)=>{
  const {name, price, img, description} = req.body
  db.run('INSERT INTO products(name,price,img,description) VALUES(?,?,?,?)', [name, price, img||'', description||''], function(err){
    if(err) return res.status(500).json({error:'db_error'})
    res.json({id:this.lastID})
  })
})

r.put('/:id', auth, (req,res)=>{
  const {name, price, img, description} = req.body
  db.run('UPDATE products SET name=?, price=?, img=?, description=? WHERE id=?', [name, price, img||'', description||'', req.params.id], function(err){
    if(err) return res.status(500).json({error:'db_error'})
    res.json({updated: this.changes})
  })
})

r.delete('/:id', auth, (req,res)=>{
  db.run('DELETE FROM products WHERE id=?', [req.params.id], function(err){
    if(err) return res.status(500).json({error:'db_error'})
    res.json({deleted: this.changes})
  })
})

export default r
