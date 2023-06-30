import { Badge, User } from "@/models";

export const getBadgeProgress = (badge: Badge, user: User) => {
  const criteria = badge.criteria.split('||');

  let progress = 0;
  for (const c of criteria) {
    const criteriaName = c.split('::')[0];
    const criteriaValue = c.split('::')[1];
  
    const data = user.daily?.filter(d => d.date >= badge.startDate && d.date <= badge.endDate);
    if (!data) continue;
  
    const value = data.reduce((accumulator, object) => accumulator + (object as any)[criteriaName], 0);
    progress += 100 * (value / Number(criteriaValue)) / criteria.length;
    // if (value < Number(criteriaValue)) return false;
  }
  
  return progress;
}