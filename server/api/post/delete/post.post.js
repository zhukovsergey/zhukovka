import { readFiles } from "h3-formidable";
import fs from 'fs'
export default defineEventHandler(async (event) => { 
    try {
           
        const { fields, files } = await readFiles(event, {
            includeFields: true,
            // other formidable options below
            multiples: true,
            uploadDir: "./public/uploads",
            keepExtensions: true,
          });
          console.log(fields.image[0])
          
       
             fs.unlinkSync(`public/${fields.image[0]}`);
        
         
        
       
        return 200
    } catch (error) {
        console.log(error)
       
    }
   
})