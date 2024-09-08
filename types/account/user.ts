import { StaticImageData } from "next/image";

interface IUser {
  name: string;
  email: string;

  password?: string;
  avatar: StaticImageData;
}

export type { IUser };
