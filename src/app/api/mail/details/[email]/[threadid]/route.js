import axios from "axios";
import {createConfig} from '../../../../../libs/utils';
import { google } from "googleapis";

const oAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.REDIRECT_URI
)





oAuth2Client.setCredentials({refresh_token: process.env.REFRESH_TOKEN});


// function base64Decode(input) {
//     const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
//     let output = '';
//     let i = 0;
  
//     input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');
  
//     while (i < input.length) {
//       const index1 = chars.indexOf(input.charAt(i++));
//       const index2 = chars.indexOf(input.charAt(i++));
//       const index3 = chars.indexOf(input.charAt(i++));
//       const index4 = chars.indexOf(input.charAt(i++));
//       const a = (index1 << 2) | (index2 >> 4);
//       const b = ((index2 & 15) << 4) | (index3 >> 2);
//       const c = ((index3 & 3) << 6) | index4;
  
//       output += String.fromCharCode(a);
//       if (index3 !== 64) output += String.fromCharCode(b);
//       if (index4 !== 64) output += String.fromCharCode(c);
//     }
  
//     return output;
//   }

  function base64Decode(input) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    let output = '';
    let i = 0;
  
    // Skip any characters that are not in the base64 character set
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');
  
    while (i < input.length) {
      // Try-catch block to handle potential errors during character decoding
      try {
        const index1 = chars.indexOf(input.charAt(i++));
        const index2 = chars.indexOf(input.charAt(i++));
        const index3 = chars.indexOf(input.charAt(i++));
        const index4 = chars.indexOf(input.charAt(i++));
        const a = (index1 << 2) | (index2 >> 4);
        const b = ((index2 & 15) << 4) | (index3 >> 2);
        const c = ((index3 & 3) << 6) | index4;
  
        output += String.fromCharCode(a);
        if (index3 !== 64) output += String.fromCharCode(b);
        if (index4 !== 64) output += String.fromCharCode(c);
      } catch (error) {
        console.warn("Error decoding character at index", i, error);
        // You can optionally skip the problematic character here (i++)
      }
    }
  
    return output;
  }
  
  

export async function GET(Request, { params }) {
    try {
        const url = `https://gmail.googleapis.com/gmail/v1/users/${params.email}/messages/${params.threadid}`;
        const {token} = await oAuth2Client.getAccessToken();
        const config = createConfig(url, token);
        const response = await axios(config);
        // const decodedContent = atob(messagePartBody.data);
        const res = atob( response.data.payload.parts[0].body.data.replace(/-/g, '+').replace(/_/g, '/')); 
        // const res = ((JSON.stringify(atob(response.data.payload.parts[0].body.data))));
       
       return new Response(res);
    //    return new Response(response.data.messages[0].payload.headers.find(header => header.name === "From")?.value);        
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ message: error.message }), { status: 500 });

    }

  }