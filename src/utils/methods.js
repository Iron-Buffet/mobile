export const age = birthday => {
  let ageDifMs = Date.now() - birthday.getTime();
  let ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

export const sortArrayByDate = (arr, direction = 'asc') => {
  if (direction === 'asc') {
    return arr.sort((a, b) => {
      return b.created_at < a.created_at
        ? 1
        : b.created_at > a.created_at
        ? -1
        : 0;
    });
  }
  return arr.sort((a, b) => {
    return b.created_at > a.created_at
      ? 1
      : b.created_at < a.created_at
      ? -1
      : 0;
  });
};

export const getShortMonth = () => {
  return [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
};

export const getShortDay = () => {
  return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
};

export const getUtcTimestamp = () => {
  return new Date().getTime();
};

/**
 *
 * @param ts | timestamp
 * @returns {number}
 */
export const getLocalTime = ts => {
  const x = new Date(ts);
  return x.getTime() - x.getTimezoneOffset() * 60 * 1000;
};

/**
 *
 * @param ts
 * @returns {string}
 */
export const formatAMPM = ts => {
  const date = new Date(ts);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0'+minutes : minutes;
  return hours + ':' + minutes + ' ' + ampm;
}
