export const recommendationFees = [
  { category: 'ライフル', name: 'ライフル銃 (小口径)', amount: 6000 },
  { category: 'ライフル', name: 'ライフル銃 (大口径)', amount: 10000 },
  { category: 'けん銃', name: 'けん銃', amount: 10000 },
  { category: 'けん銃', name: '空気けん銃', amount: 6000 },
  { category: '低年者', name: '低年者空気銃', amount: 0 },
  { category: '低年者', name: '低年者空気けん銃', amount: 4000, note: '※2025年10月度推薦より' },
  { category: '低年者', name: '低年者ライフル銃 (小口径)', amount: 6000 },
  { category: 'その他', name: '技能講習免除', amount: 6000 },
  { category: 'その他', name: '再発行', amount: 2000 },
] as const;

export const recommendationBulletins = [57, 56, 55, 51, 49] as const;
