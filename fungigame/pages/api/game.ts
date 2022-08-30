import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../utils/supabase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const fungiData = await supabase.from('random_fungi').select().limit(30)

  
  const fungi = fungiData.data?.map(async(fungi) => {
    if (fungi.name) {
      const file = supabase.storage.from("svampbilder").getPublicUrl(fungi.name)
        .data?.publicUrl;

      const RandomNamesData = await supabase.from('random_fungi').select().limit(3).neq('name', fungi.name)
   
      const randomNames = RandomNamesData.data?.map((fungi) => {return fungi.name})

      return {
        fungi,
        file,
        randomNames
      };
    }
  })

  Promise.all(fungi).then((fungi) => {
    res.status(200).json(fungi)
  });
}