//import multer from 'multer'
import { readFiles } from "h3-formidable";
import fs from 'fs'




export default defineEventHandler(async(event) => {
  
  
    try {
      const { fields, files } = await readFiles(event, {
          includeFields: true,
          // other formidable options below
          multiples: true,
          uploadDir: "./public/uploads",
          keepExtensions: true,
        });
        // console.log(files)
        
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
       console.log(imagesArray)
        return imagesArray[0].path
        
    } catch (err) {
        console.log(err)
    }




})