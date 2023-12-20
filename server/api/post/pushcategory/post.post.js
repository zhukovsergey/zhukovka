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
        console.log(fields)
                 
        const result = await cloudinary.uploader.upload(`public/uploads/${files.imgofcategory[0].newFilename}`);
           const { error } = await client
          .from('categories')
           .insert({ titleofcategory: fields.titleofcategory[0],urlofcategory: fields.urlofcategory[0],descriptionofcategory: fields.descriptionofcategory[0], imgofcategory: `${result.secure_url}`  })
           if(result.secure_url) {

            setTimeout(() => {
              fs.unlinkSync(`public/uploads/${files.imgofcategory[0].newFilename}`);
             
              
              
              }, 2500);
           
           }
        
           if (error) throw error
    } catch (err) {
        console.log(err)
    }




})