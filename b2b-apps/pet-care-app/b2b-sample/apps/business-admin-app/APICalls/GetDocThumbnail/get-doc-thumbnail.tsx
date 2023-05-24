import { getPetInstance } from "../CreatePet/instance";
import { getDoctorInstance } from "../getDoctors/doctorInstance";

export async function getDocThumbnail(accessToken: string, doctorId: string) {
    const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'accept': `*/*`,
    };

    const response = await getDoctorInstance().get("/doctors/" + doctorId + "/thumbnail" , {
      headers: headers,
      responseType: 'blob',
    });
    return response;
  }