
import { Router } from 'express'
import { db } from '../lib/db.js'

const r = Router()

r.post('/', (req,res)=>{
  const { items, subtotal, shipping, total, customer } = req.body
  const ref = 'AMV'+Date.now()
  db.run('INSERT INTO orders(ref,status,items_json,subtotal,shipping,total,customer_json) VALUES(?,?,?,?,?,?,?)',
    [ref, 'PENDING', JSON.stringify(items||[]), subtotal||0, shipping||0, total||0, JSON.stringify(customer||{})],
    function(err){
      if(err) return res.status(500).json({error:'db_error'})
      res.json({order_id: this.lastID, ref})
    }
  )
})

r.get('/:id', (req,res)=>{
  db.get('SELECT * FROM orders WHERE id=?', [req.params.id], (err,row)=>{
    if(err) return res.status(500).json({error:'db_error'})
    if(!row) return res.status(404).json({error:'not_found'})
    res.json(row)
  })
})

export default r
