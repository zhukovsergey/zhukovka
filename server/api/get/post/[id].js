import { serverSupabaseClient } from '#supabase/server'

export default eventHandler(async (event) => {
   
  const client = await serverSupabaseClient(event)

  const { data, error } = await client.from('dorams').select('*')
  .order("id", { ascending: true })
  .eq("url", event.context.params.id);
  if(data == 0) {
    throw createError({ statusCode: 404, statusMessage: "Page Not Found", fatal: true })
  } else {
    return {  data }
  }
  

   // throw createError({ statusCode: 404, statusMessage: "Page Not Found", fatal: true })
 
  
})