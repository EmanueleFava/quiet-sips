export interface Book {
  id?: string;
  title: string;
  authorId: string;
  releaseYear: number;
  imgUrl: string;
  plot: string;
  reviewsIds: number[];
  averageRating: number;
}
