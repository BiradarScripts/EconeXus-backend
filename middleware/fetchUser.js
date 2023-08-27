const jwt=require('jsonwebtoken');
const JWT_SECRET="EconeXus-Connect with people$";

exports.fetchUser=async(req,res,next)=>{
    const token=req.header('auth-token')
  try {
    if (!token) {
      return res.status(401).send({ error: "Please authenticate using a valid credentials", hi: "i am ere" });
    }
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (err) {
    res.status(401).send({ error: "Internal Server Error" });
  }
}
