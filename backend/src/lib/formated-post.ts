interface Poster {
  id: number;
  username: string;
  email: string;
  avatar?: string;
}

interface Comment {
  id: number;
  comment: string;
  createdAt: string;
  commenter: Poster;
}

interface Constructor {
  id: number;
  description: string;
  image: string;
  posterId: number;
  poster: string;
  posterEmail: string;
  comments: Comment[];
  numberOfLikes: number;
  liked?: boolean;
  posterAvatar?: string;
}

export default class FormatedPost {
  id!: number;
  description!: string;
  image!: string;
  numberOfLikes!: number;
  user!: Poster;
  comments!: Comment[];
  liked?: boolean;

  constructor({
    id,
    description,
    image,
    posterId,
    poster,
    posterEmail,
    liked,
    posterAvatar,
    numberOfLikes,
    comments,
  }: Constructor) {
    this.id = id;
    this.description = description;
    this.image = image;
    this.liked = liked;
    this.numberOfLikes = numberOfLikes;
    this.user = {
      id: posterId,
      email: posterEmail,
      username: poster,
      avatar: posterAvatar,
    };
    this.comments = comments;
  }
}
