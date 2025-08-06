
import jwt from 'jsonwebtoken'
export function auth(req,res,next){
  const hdr = req.headers.authorization||''
  const token = hdr.startsWith('Bearer ') ? hdr.slice(7) : null
  if(!token) return res.status(401).json({error:'no_token'})
  try{
    const payload = jwt.verify(token, process.env.JWT_SECRET||'dev-secret')
    req.user = payload
    next()
  }catch(e){
    return res.status(401).json({error:'invalid_token'})
  }
}
