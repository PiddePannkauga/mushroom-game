import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../utils/supabase";

interface iFungiFetch {
  name: string,
  id: string,
  filename: string,
}
export interface iFungiResponse {
  fungi: {name: string,
  id: string,
  filename: string}
  file: string,
  randomNames: string[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const fungiData = await supabase.from('random_fungi').select().limit(1)

  
  const fungi = new Promise((resolve,reject) => fungiData.data?.map(async(fungi: iFungiFetch) => {
    
    if (fungi.name) {
      const file = supabase.storage.from("svampbilder").getPublicUrl(fungi.filename)
        .data?.publicUrl;

      const RandomNamesData = await supabase.from('random_fungi').select().limit(3).neq('name', fungi.name)
   
      const randomNames = RandomNamesData.data?.map((fungi) => {return fungi.name})
      
      resolve({
        fungi,
        file,
        randomNames
      })
      
    }
  }))

  fungi.then((fungi) => res.status(200).json(fungi))

}