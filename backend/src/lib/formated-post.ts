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
}

export default class FormatedPost {
  id!: number;
  description!: string;
  image!: string;
  user!: Poster;

  constructor({ id, description, image, posterId, poster, posterEmail }: Post) {
    this.id = id;
    this.description = description;
    this.image = image;
    this.user = {
      id: posterId,
      email: posterEmail,
      username: poster,
    };
  }
}
