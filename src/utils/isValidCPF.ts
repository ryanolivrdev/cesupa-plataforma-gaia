export function isValidCPF(cpf: string): boolean {
  if (typeof cpf !== 'string') return false;
  const cpfArray: number[] = cpf.replace(/[^\d]+/g, '').split('').map(el => +el);
  if (cpfArray.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false;
  const rest = (count: number): number => (cpfArray.slice(0, count-12)
      .reduce((soma: number, el: number, index: number) => (soma + el * (count-index)), 0) * 10) % 11 % 10;
  return rest(10) === cpfArray[9] && rest(11) === cpfArray[10];
}
