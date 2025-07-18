export const PLAN_TYPES = {
  PERSONAL: "personal",
  PRO: "pro",
  TEAM: "team",
};

export function isFeatureDirectlyIncluded(
  plan: { features: string[] },
  feature: string,
): boolean {
  return plan.features.some(
    (f) =>
      f.toLowerCase().includes(feature.toLowerCase()) ||
      feature.toLowerCase().includes(f.toLowerCase()),
  );
}

// Упрощённая логика: для PRO план включаются возможности из PERSONAL, а для TEAM – из PRO.
export function isFeatureIncluded(
  plan: { title: string; features: string[] },
  feature: string,
  items?: { title: string; features: string[] }[],
): boolean {
  // Прямая проверка для текущего плана
  if (isFeatureDirectlyIncluded(plan, feature)) return true;

  const title = plan.title.toLowerCase();

  // Если план PRO, проверяем наличие функции из плана PERSONAL
  if (title === PLAN_TYPES.PRO && items) {
    const personalPlan = items.find(
      (p) => p.title.toLowerCase() === PLAN_TYPES.PERSONAL,
    );
    if (personalPlan && isFeatureDirectlyIncluded(personalPlan, feature)) {
      return true;
    }
  }

  // Если план TEAM, дополнительно проверяем PRO план
  if (title === PLAN_TYPES.TEAM && items) {
    const proPlan = items.find((p) => p.title.toLowerCase() === PLAN_TYPES.PRO);
    if (proPlan && isFeatureDirectlyIncluded(proPlan, feature)) {
      return true;
    }
  }

  return false;
}
