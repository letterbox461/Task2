import Hapi from "@hapi/hapi";
import pdfService from "../service/pdf-service";


export interface Ipayload {
  payload: string[];

}

type Decorate<T> = T & Hapi.Request;
 type pdfRequest = { payload: Decorate<Ipayload> };



class pdfController {
  public async pdf(request: pdfRequest, res: any) {
    const { payload } = request.payload;
    const pathToFile=await pdfService.createPDF(payload);
    return res.file(pathToFile,{mode:"attachment"});
  }
}

export default new pdfController();
