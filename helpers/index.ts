export const upperFirst = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

export const truncateWord = (word: string, length: number) => {
  return word.length > length
    ? upperFirst(word.slice(0, length)) + " ..."
    : upperFirst(word);
};

export const generateDate = (date: Date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
