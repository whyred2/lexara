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

export function isFeatureIncluded(
  plan: { type: string; features: string[] },
  feature: string,
  items?: { type: string; features: string[] }[],
): boolean {
  // Прямая проверка для текущего плана
  if (isFeatureDirectlyIncluded(plan, feature)) return true;

  // Если план PRO, проверяем наличие функции из плана PERSONAL
  if (plan.type === PLAN_TYPES.PRO && items) {
    const personalPlan = items.find((p) => p.type === PLAN_TYPES.PERSONAL);
    if (personalPlan && isFeatureDirectlyIncluded(personalPlan, feature)) {
      return true;
    }
  }

  // Если план TEAM, проверяем функции из планов PERSONAL и PRO
  if (plan.type === PLAN_TYPES.TEAM && items) {
    const personalPlan = items.find((p) => p.type === PLAN_TYPES.PERSONAL);
    const proPlan = items.find((p) => p.type === PLAN_TYPES.PRO);

    if (personalPlan && isFeatureDirectlyIncluded(personalPlan, feature)) {
      return true;
    }
    if (proPlan && isFeatureDirectlyIncluded(proPlan, feature)) {
      return true;
    }
  }

  return false;
}
