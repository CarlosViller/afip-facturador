import Afip from '@afipsdk/afip.js';

const afip = new Afip({ CUIT: 20409378472 });

const voucherTypes = await afip.ElectronicBilling.getVoucherTypes();

console.log(voucherTypes);