export interface User {
  id: string;
  avatar_url: string;
  image_url: string;
  username: string;
}

export interface Post {
  id: string | number;
  image: string;
  image_url: string;
  caption: string;
  user: User;
}
