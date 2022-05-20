 import { getSession } from "next-auth/react"

 
 
 const Handler = async (req, res) => {
     const data = await getSession({req})
     console.log("handler")
     console.log(data)
     return res.status(200).json({message: 'Works'})
 }


 export default Handler