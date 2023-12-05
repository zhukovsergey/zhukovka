import { readFiles } from "h3-formidable";
import { serverSupabaseClient } from '#supabase/server'



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
                 
        
           const { error } = await client
          .from('categories')
           .insert({ titleofcategory: fields.titleofcategory[0],urlofcategory: fields.urlofcategory[0],descriptionofcategory: fields.descriptionofcategory[0], imgofcategory: `/uploads/${files.imgofcategory[0].newFilename}`  })
        if (error) throw error
    } catch (err) {
        console.log(err)
    }




})