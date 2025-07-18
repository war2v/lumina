import { PresentationType } from "@/app/types";
import { getUser } from "@/lib/supabase/getUserServer";
import { createClient } from "@/lib/supabase/serverClient";
import { redirect } from "next/navigation";


export const getUserPresentationsById = async (id: string): Promise<PresentationType> => {
    const supabase = await createClient();

    const { user }  = await getUser()

    if (!user){
        redirect("/sign-in")
    }

    let {data, error} = await supabase
        .from('presentations')
        .select('*')
        .eq('created_by', user.id)
        .eq('id', id);
    
    if (error || !data) {
        throw new Error('Error Fetchin Data.')
    }
    
    const {created_at, title, description, is_public, created_by, active, created_by_username, current_resource_id, invite_code } = data[0];
   
       const presentation: PresentationType = {
           active: active,
           created_at: created_at,
           created_by: created_by,
           description: description,
           id: id,
           is_public: is_public,
           title: title,
           created_by_username: created_by_username,
           current_resource_id: current_resource_id,
           invite_code: invite_code
       }
       
       return presentation
   
    

    
}