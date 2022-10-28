export const getInitial = (name?: string) => {
  if (!name) {
    return null;
  }

  const splitedName = name.split(' ');

  return `${splitedName[0][0]}${splitedName[1][0]}`;
};
