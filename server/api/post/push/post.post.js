import { readFiles } from "h3-formidable";
import { serverSupabaseClient } from '#supabase/server'
import fs from 'fs'
import { v2 as cloudinary } from 'cloudinary';


 cloudinary.config({
   cloud_name: 'dj28przdb',
   api_key: '513975774264369', // Store in .env.local
   api_secret: 'ZEqV2pXSYZIRGoOua-15-RBseCk', // Store in .env.local
   secure: true
 });


export default defineEventHandler(async(event) => {
    const client = await serverSupabaseClient(event)
  
    try {
      const { fields, files } = await readFiles(event, {
          includeFields: true,
          // other formidable options below
          multiples: true,
          uploadDir: "./public/uploads",
          keepExtensions: true,
        });
        console.log(files.mainfile[0].newFilename)
                 
        const result = await cloudinary.uploader.upload(`public/uploads/${files.mainfile[0].newFilename}`);
          const { error } = await client
         .from('dorams')
          .insert({ text: fields.text[0],category: fields.category[0],title: fields.title[0],url: fields.url[0], shorttext: fields.shorttext[0], mainimg: `${result.secure_url}`  })
       
          if(result.secure_url) {

            setTimeout(() => {
              fs.unlinkSync(`public/uploads/${files.mainfile[0].newFilename}`);
             
              
              
              }, 2500);
           
           }
          if (error) throw error
    } catch (err) {
        console.log(err)
    }




})