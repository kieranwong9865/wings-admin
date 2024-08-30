/**
 * @name colorMix
 * @param color1
 * @param color2
 * @param weight
 * @description 颜色混合
 * @return hex color
 */
export const colorMix = (
  color1: string,
  color2: string,
  weight: number
): string => {
  weight = Math.max(Math.min(Number(weight), 1), 0);
  const r1 = parseInt(color1.substring(1, 3), 16);
  const g1 = parseInt(color1.substring(3, 5), 16);
  const b1 = parseInt(color1.substring(5, 7), 16);
  const r2 = parseInt(color2.substring(1, 3), 16);
  const g2 = parseInt(color2.substring(3, 5), 16);
  const b2 = parseInt(color2.substring(5, 7), 16);
  const r = Math.round(r1 * (1 - weight) + r2 * weight);
  const g = Math.round(g1 * (1 - weight) + g2 * weight);
  const b = Math.round(b1 * (1 - weight) + b2 * weight);
  const _r = ('0' + (r || 0).toString(16)).slice(-2);
  const _g = ('0' + (g || 0).toString(16)).slice(-2);
  const _b = ('0' + (b || 0).toString(16)).slice(-2);
  return '#' + _r + _g + _b;
};

/**
 * @name setEpThemeColor
 * @description 切换 Element Plus 主题颜色
 * @param color
 */
export const setEpThemeColor = (color?: string): void => {
  if (!color) return;
  const element = document.documentElement;
  element.style.setProperty('--el-color-primary', color);
  for (let i = 1; i < 10; i += 1) {
    element.style.setProperty(
      `--el-color-primary-light-${i}`,
      colorMix(color, '#ffffff', i * 0.1)
    );
  }
  const dark = colorMix(color, '#000000', 0.2);
  element.style.setProperty(`--el-color-primary-dark-2`, dark);
};
