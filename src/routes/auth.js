
import { Router } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { db } from '../lib/db.js'

const r = Router()

r.post('/login', (req,res)=>{
  const {username, password} = req.body
  db.get('SELECT * FROM users WHERE username=?', [username], (err, row)=>{
    if(err) return res.status(500).json({error:'db_error'})
    if(!row) return res.status(401).json({error:'invalid_credentials'})
    const ok = bcrypt.compareSync(password, row.password_hash)
    if(!ok) return res.status(401).json({error:'invalid_credentials'})
    const token = jwt.sign({uid: row.id, role: row.role, username: row.username}, process.env.JWT_SECRET||'dev-secret', {expiresIn:'2d'})
    res.json({token})
  })
})

export default r
