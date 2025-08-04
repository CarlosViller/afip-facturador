import fs from "fs";
import Afip from "@afipsdk/afip.js";
import dotenv from "dotenv";

dotenv.config();

const CUIT = 20956569592;
const PRODUCTION = true;

function getAuth() {
  const PATH = PRODUCTION ? "prod/" : "dev/";
  // Certificado (Puede estar guardado en archivos, DB, etc)
  const cert = fs.readFileSync(`./${PATH}cert.crt`, { encoding: "utf8" });

  // Key (Puede estar guardado en archivos, DB, etc)
  const key = fs.readFileSync(`./${PATH}key.key`, { encoding: "utf8" });

  return { cert, key };
}

const config = {
  CUIT,
  ...getAuth(),
  access_token: process.env.ACCESS_TOKEN,
  production: PRODUCTION,
};

const afip = new Afip(config);

// Periodo del CAEA. (yyyymm)
const periodo = 202506;

// Orden del CAEA dentro del periodo. Quincena 1, Quincena 2
const orden = 1;

const caeaInfo = await afip.ElectronicBilling.getCAEA(periodo, orden);
// const ws = afip.WebService("wsfex");

// // Obtenemos el TA
// const ta = await ws.getTokenAuthorization();

// // Preparamos los datos
// const data = {
//   Auth: {
//     Token: ta.token,
//     Sign: ta.sign,
//     Cuit: afip.CUIT,
//   },
// };

// const res = await ws.executeRequest("FEXGetLast_ID", data);

console.log(caeaInfo);
