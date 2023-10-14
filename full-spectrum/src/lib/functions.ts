import { createClient } from "contentful";

const getContentfulClient = () => {
    //checks to see if environment variables are loaded
    if (!process.env.SPACE_ID) {
      throw new Error('contentful SPACE_ID is missing');
    }
    if (!process.env.ACCESS_TOKEN) {
      throw new Error('contentful ACCESS_TOKEN is missing');
    }
  
    //create new instance of contentful client using api key data (see .env.local file)
    const client = createClient({
      space: process.env.SPACE_ID,
      accessToken: process.env.ACCESS_TOKEN,
    });
    return client;
  };
  
  export const contentfulClient = getContentfulClient();
