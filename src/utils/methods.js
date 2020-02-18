export const age = birthday => {
  let ageDifMs = Date.now() - birthday.getTime();
  let ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};
