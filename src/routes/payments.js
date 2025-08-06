
import { Router } from 'express'
import { db } from '../lib/db.js'

const r = Router()

// Initiate payment (mock): provider, msisdn, amount, order_ref
r.post('/initiate', (req,res)=>{
  const { provider, msisdn, amount, order_ref } = req.body
  const payref = 'PAY'+Date.now()
  // In production: call provider SDK/API here and store pending record
  db.run('INSERT INTO payments(payref,provider,msisdn,amount,status,order_ref) VALUES(?,?,?,?,?,?)',
    [payref, provider, msisdn, amount, 'PENDING', order_ref],
    function(err){
      if(err) return res.status(500).json({error:'db_error'})
      res.json({payref, instructions: `Completez le paiement via ${provider}. Ref: ${payref}`})
    })
})

// Webhook/callback (mock): confirm payment and update order
r.post('/callback', (req,res)=>{
  const { payref, status } = req.body // status: SUCCESS|FAILED
  db.get('SELECT * FROM payments WHERE payref=?', [payref], (err,p)=>{
    if(err || !p) return res.status(404).json({error:'not_found'})
    db.run('UPDATE payments SET status=? WHERE payref=?', [status, payref])
    db.run('UPDATE orders SET status=? WHERE ref=?', [status==='SUCCESS'?'PAID':'FAILED', p.order_ref])
    return res.json({ok:true})
  })
})

export default r
