import { SPFI, spfi, SPFx } from '@pnp/sp';
import '@pnp/sp/webs';
import '@pnp/sp/lists';
import '@pnp/sp/items';

let _sp: SPFI | undefined;

export const initSP = (context: any): SPFI => {
  if (!_sp) _sp = spfi().using(SPFx(context));
  return _sp!;
};

export const getSP = (): SPFI => {
  if (!_sp) throw new Error('SP no inicializado');
  return _sp!;
};

