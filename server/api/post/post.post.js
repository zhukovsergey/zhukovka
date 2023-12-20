
import { readFiles } from "h3-formidable";
import fs from 'fs'

import { v2 as cloudinary } from 'cloudinary';

 cloudinary.config({
   cloud_name: 'dj28przdb',
   api_key: '513975774264369', // Store in .env.local
   api_secret: 'ZEqV2pXSYZIRGoOua-15-RBseCk', // Store in .env.local
   secure: true
 });

export default defineEventHandler(async(event) => {
  
  
    try {
      const { fields, files } = await readFiles(event, {
          includeFields: true,
          
          multiples: true,
          uploadDir: "./public/uploads",
          keepExtensions: true,
        });
        
      
        const body_files= files.image;
        let imagesArray = [];
        if (body_files && body_files.length > 0) {
          body_files.forEach((img) => {
            imagesArray.push({
              path: img.newFilename,
              mimetype: img.mimetype,
             // test_case: body._id,
            });
          });
        }
        
        const result = await cloudinary.uploader.upload(`public/uploads/${imagesArray[0].path}`);
       console.log(result)
       if(result.secure_url) {

        setTimeout(() => {
          fs.unlinkSync(`public/uploads/${imagesArray[0].path}`);
         
          
          
          }, 2500);
       
       }
        
       
        return result.secure_url
        
    } catch (err) {
        console.log(err)
    }




})