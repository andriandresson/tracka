import { getSession } from "next-auth/react"
import axios from 'axios'

const BASE_URL_APP = "https://app.clickup.com/v1";




const Handler = async (req, res) => {
    res.status(200).json({ 'message': 'Hello World' })


}


export default Handler