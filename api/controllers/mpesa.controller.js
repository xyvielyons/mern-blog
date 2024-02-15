import authFetch from "../Utils/axios.js"
import axios from "axios";
import moment from "moment";
export const authorization = async(req,res,next)=>{
try {
    const apiUrl = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials';

// Define your bearer token
const bearerToken = 'cFJZcjZ6anEwaThMMXp6d1FETUxwWkIzeVBDa2hNc2M6UmYyMkJmWm9nMHFRR2xWOQ==';

// Define the headers with Authorization
const headers = {
  'Authorization': `Basic ${bearerToken}`,
  'Content-Type': 'application/json', // You can add more headers if required
};
    const response = await axios.get(apiUrl,{headers})
    //console.log(response.data.access_token)

    req.access = response.data.access_token
    next()
    
    
} catch (error) {
    next(error)
    
}
}


export const stkPush = async(req,res,next)=>{
    try {
        
        const accessToken = req.access


        const headers = {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json', // You can add more headers if required
          };

                const url ="https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";
               // const auth = "Basic " + accessToken;
                const timestamp = moment().format("YYYYMMDDHHmmss");
                const password = new Buffer.from(
                  "174379" +
                    "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919" +
                    timestamp
                ).toString("base64");
          
                
                const response = await axios.post(url,
                    {
                      BusinessShortCode: "174379",
                      Password: password,
                      Timestamp: timestamp,
                      TransactionType: "CustomerPayBillOnline",
                      Amount: "1",
                      PartyA: "254728440683", //phone number to receive the stk push
                      PartyB: "174379",
                      PhoneNumber: "254728440683",
                      CallBackURL: "https://5918-102-213-49-45.ngrok-free.app/api/daraja/stkPushCallBack",
                      AccountReference: "george kungu",
                      TransactionDesc: "Mpesa Daraja API stk push test",
                    },
                    {headers}
                  )

                  res.status(200).json({
                    status:"success",
                    message:response.data
                  })

                 
        
    } catch (error) {
        console.log(error)
    }
}
export const registerUrl= async(req,res,next)=>{
    try {
        
        const accessToken = req.access


        const headers = {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json', // You can add more headers if required
          };

        const url ="https://sandbox.safaricom.co.ke/mpesa/c2b/v1/registerurl";
              
                
          
                
                 const response = await axios.post(url,
                    {
                        ShortCode: 600000,
                        ResponseType:"Completed",
                        ConfirmationURL:"https://5918-102-213-49-45.ngrok-free.app/api/daraja/confirmation",
                        ValidationURL:"https://5918-102-213-49-45.ngrok-free.app/api/daraja/validation"
                    },
                    {headers}
                   )
                   console.log(response.data)

                  res.status(200).json({
                    status:"success",
                    
                  })

                 
        
    } catch (error) {
        console.log(error)
    }
}




export const confirmationUrl = (req,res,next)=>{

    console.log(".................confirmationUrl................")
    console.log(req.body)
}
export const validationUrl= (req,res,next)=>{
    console.log(".................validationUrl................")
    console.log(req.body)
}
export const stkPushCallBack= (req,res,next)=>{
  console.log(".................stk................")
  console.log(req.body)
}


export const simulate= async(req,res,next)=>{
    try {
        
        const accessToken = req.access


        const headers = {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json', // You can add more headers if required
          };

        const url ="https://sandbox.safaricom.co.ke/mpesa/c2b/v1/simulate";
              
                
          
                
                 const response = await axios.post(url,
                    {
                        ShortCode: 600000,
                        Amount:1,
                        CommandID:"CustomerPayBillOnline",
                        Msisdn:254708374149,
                        BillRefNumber:"TestAPI"
                    },
                    {headers}
                   )
                   
                  


                  res.status(200).json({
                    status:"success",
                    message:response.data
                  })

                 

                 
        
    } catch (error) {
        console.log(error)
    }
}
export const stkquery= async(req,res,next)=>{
  try {
      
      const accessToken = req.access

      const timestamp = moment().format("YYYYMMDDHHmmss");
      const password = new Buffer.from(
        "174379" +
          "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919" +
          timestamp
      ).toString("base64");
      const headers = {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json', // You can add more headers if required
        };

      const url ="https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query";
            
              
        
              
               const response = await axios.post(url,
                  {
                    BusinessShortCode:"174379",    
                    Password: password,    
                    Timestamp:timestamp,    
                    CheckoutRequestID: req.body.checkout,    
                  },
                  {headers}
                 )
                 
                


                res.status(200).json({
                  status:"success",
                  message:response.data
                })

               

               
      
  } catch (error) {
      console.log(error)
  }
}
