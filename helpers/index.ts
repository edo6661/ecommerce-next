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

export const generatePagination = (totalPages: number, currentPage: number) => {
  if (totalPages < 6) {
    // If the total number of pages is 6 or less,
    // display all pages without dot dot dot asek
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }
  // If the current page is among the last 3 pages,
  // show the first 2, an dot dot dot, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }
  // Otherwise, show the current page, the previous page, the next page,
  // and the two pages before and after the current page.
  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [1, "...", currentPage - 1, currentPage + 1, "...", totalPages];
};
