import { StaticImageData } from "next/image";

interface IWallpaper {
  name: string;
  path: StaticImageData;
  theme: "light" | "dark";
}

interface IDesktopWallpaper {
  wallpaper: IWallpaper | IWallpaper[];
  isDynamic: boolean;
}

export type { IWallpaper, IDesktopWallpaper };
