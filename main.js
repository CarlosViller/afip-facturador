import fs from "fs";
import Afip from "@afipsdk/afip.js";
import { config } from "process";

const CUIT = 20956569592;
const PRODUCTION = false;

function getAuth() {
  const PATH = PRODUCTION ? "prod/" : "dev/";
  // Certificado (Puede estar guardado en archivos, DB, etc)
  const cert = fs.readFileSync(`${PATH}cert.crt`, { encoding: "utf8" });

  // Key (Puede estar guardado en archivos, DB, etc)
  const key = fs.readFileSync(`${AUTH}afip.key`, { encoding: "utf8" });

  return { cert, key };
}

const config = {
  CUIT,
  ...getAuth(),
};

const afip = new Afip(config);
const ws = afip.WebService("wsfex");

// Obtenemos el TA
const ta = await ws.getTokenAuthorization();

// Preparamos los datos
const data = {
  Auth: {
    Token: ta.token,
    Sign: ta.sign,
    Cuit: afip.CUIT,
  },
};

const res = await ws.executeRequest("FEXGetLast_ID", data);

console.log(res);
