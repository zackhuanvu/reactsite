export const genres = [
  { _id: "5b21ca3eeb7f6fbccd471818", name: "Straight" },
  { _id: "5b21ca3eeb7f6fbccd471814", name: "Tiered" },
  { _id: "5b21ca3eeb7f6fbccd471820", name: "Rotating" }
];

export function getGenres() {
  return genres.filter(g => g);
}
