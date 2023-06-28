import { Badge, User } from "@/models";

export const isClaimable = (badge: Badge, user: User) => {
  const criteria = badge.criteria.split('||');

  for (const c of criteria) {
    const criteriaName = c.split('::')[0];
    const criteriaValue = c.split('::')[1];
  
    const data = user.daily?.filter(d => d.date >= badge.startDate && d.date <= badge.endDate);
    if (!data) return false;
  
    const value = data.reduce((accumulator, object) => accumulator + (object as any)[criteriaName], 0);
    if (value < Number(criteriaValue)) return false;
  }
  
  return true;
}