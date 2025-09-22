export const isHighTension = (text: string) => {
  const bad = /(白痴|垃圾|去死|敗類|低能|廢物)/i;
  const multiBang = /[!?]{3,}/;
  const allCaps = /[A-Z]{6,}/;
  const blame = /^(你(們)?就是|明明就是|根本就是)/;
  return (
    bad.test(text) ||
    multiBang.test(text) ||
    allCaps.test(text) ||
    blame.test(text.trim())
  );
};
