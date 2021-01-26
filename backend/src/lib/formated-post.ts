interface Poster {
  id: number;
  username: string;
  email: string;
}

interface Post {
  id: number;
  description: string;
  image: string;
  posterId: number;
  poster: string;
  posterEmail: string;
  liked?: boolean;
}

export default class FormatedPost {
  id!: number;
  description!: string;
  image!: string;
  liked?: boolean;
  user!: Poster;

  constructor({
    id,
    description,
    image,
    posterId,
    poster,
    posterEmail,
    liked,
  }: Post) {
    this.id = id;
    this.description = description;
    this.image = image;
    this.liked = liked;
    this.user = {
      id: posterId,
      email: posterEmail,
      username: poster,
    };
  }
}
