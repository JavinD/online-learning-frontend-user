export const chooseBadgeByLevel = (level: number): string => {
  switch (level) {
    case 2:
      return "😀";
    case 3:
      return "😎";
    case 4:
      return "🤣";
    default:
      return "👶";
  }
};
