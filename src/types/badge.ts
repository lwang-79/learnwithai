import { Badge, User } from "@/models";

export const isClaimable = (badge: Badge, user: User) => {
  const criteriaName = badge.criteria.split('::')[0];
  const criteriaValue = badge.criteria.split('::')[1];

  const data = user.daily?.filter(d => d.date >= badge.startDate && d.date <= badge.endDate);
  if (!data) return false;

  const value = data.reduce((accumulator, object) => accumulator + (object as any)[criteriaName], 0);
  
  return value >= Number(criteriaValue);
}