export interface Authenticate {
  name?: string;
  username: string;
  password: string;
}

export interface User {
  id: number;
  email: string;
  provider: string;
  uid: string;
  name: string;
  nickname: string | null;
  image: string | null;
  role: string;
}
