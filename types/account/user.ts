import { StaticImageData } from "next/image";

interface IUser {
  firstName: string;
  lastName: string;

  email?: string;

  avatar?: StaticImageData;
}

export type { IUser };
