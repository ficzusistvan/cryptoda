const formatterEuro = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' });
export const formatEuro = function(text) {
  return formatterEuro.format(text);
}
const formatterRon = new Intl.NumberFormat('ro-RO', { style: 'currency', currency: 'RON' });
export const formatRon = function(text) {
  return formatterRon.format(text);
}
const formatterNumber = new Intl.NumberFormat('ro-RO');
export const formatNumber = function(text) {
  return formatterNumber.format(text);
}
const formatterPercent = new Intl.NumberFormat('ro-RO', { style: 'unit', unit: 'percent' });
export const formatPercent = function(text) {
  return formatterPercent.format(text);
}
