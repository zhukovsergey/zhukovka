//import multer from 'multer'
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
        // console.log(files)
        if (!fields.token[0]) {
            throw createError({
              statusCode: 422,
              statusMessage: 'Token not provided.',
            })
          }
        
       console.log(fields)
       const { error } = await client
          .from('comments')
           .insert({ comment: fields.comment[0],name: fields.name[0],idofpost: fields.postId[0]   })
           if(error) throw error
        
       return await verifyTurnstileToken(fields.token[0])
    
        
        
    } catch (err) {
        console.log(err)
    }

})