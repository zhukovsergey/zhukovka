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
        console.log(files.mainfile[0].newFilename)
                 
        
          const { error } = await client
         .from('dorams')
          .insert({ text: fields.text[0],category: fields.category[0],title: fields.title[0],url: fields.url[0], shorttext: fields.shorttext[0], mainimg: `/uploads/${files.mainfile[0].newFilename}`  })
        if (error) throw error
    } catch (err) {
        console.log(err)
    }




})