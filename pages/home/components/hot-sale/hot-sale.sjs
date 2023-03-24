/* eslint-disable no-unused-expressions */
const perBuyLimit = (e) => {
  console.log('perBuyLimit', { e });
  if (e) {
    let a = e;
    a = parseInt(a, 10);
    if (Number.isNaN(a)) {
      return '--';
    }
    a >= 1e3 && a < 1e4
      ? ((a /= 1e3), (a = parseFloat(a).toLocaleString()), (a += '千'))
      : a >= 1e4 && ((a /= 1e4), (a = parseFloat(a).toLocaleString()), (a += '万'));

    return a + '元';
  }
  return '--';
};
const shouyilv = (e) => {
  if (e !== '%' && e !== 'NaN%') {
    return e;
  }
  return '--%';
};
export default {
  perBuyLimit,
  shouyilv,
};
