export const normalizePhoneNumber = (value: string | undefined) => {
  if (!value) return "";

  return value
    .replace(/[\D]/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .replace(/(-\d{4})(\d+?)/, "$1");
};

export const normalizeCepNumber = (value: string | undefined) => {
  if (!value) return "";
  return value
    .replace(/\D/g, "")
    .replace(/^(\d{5})(\d{3})+?$/, "$1-$2")
    .replace(/(-\d{3})(\d+?)/, "$1");
};

export function normalizeCPF(v: string) {
  if (!v) return "";

  v = v.replace(/\D/g, '')
  v = v.replace(/^(\d{3})(\d)/g, '$1.$2')
  v = v.replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
  v = v.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4')
  v = v.replace(/^(\d{3})\.(\d{3})\.(\d{3})\/(\d{2})(\d)/, '$1.$2.$3-$4')
  return v.substring(0, 14)
}

export function normalizeRg(v: string){
  if (!v) return "";

  v=v.replace(/\D/g,"");
  v=v.replace(/(\d{2})(\d{3})(\d{3})(\d{1})$/,"$1.$2.$3-$4");
  return v;
}

