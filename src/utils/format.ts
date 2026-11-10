export const money = (value: number) =>
  `Rp${value.toLocaleString("id-ID", { maximumFractionDigits: 0 })}`;
