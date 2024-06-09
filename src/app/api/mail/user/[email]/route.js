import axios from "axios";
import {createConfig} from '../../../../utils';
import { google } from "googleapis";

const oAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.REDIRECT_URI
)





oAuth2Client.setCredentials({refresh_token: process.env.REFRESH_TOKEN});



export async function GET(Request, { params }) {
    try {
        const url = `http://gmail.googleapis.com/gmail/v1/users/${params.email}/profile`;
        const {token} = await oAuth2Client.getAccessToken();
        const config = createConfig(url, token);
        const response = await axios(config);
       return new Response(response.data);        
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ message: error.message }), { status: 500 });

    }

  }