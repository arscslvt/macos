interface IWifi {
  ssid: string;
  ip: string;
  password?: string;
  isHotspot: boolean;
}

const generateRandomIP = () => {
  return Array.from({ length: 4 }, () => Math.floor(Math.random() * 255)).join(
    "."
  );
};

export { generateRandomIP };
export type { IWifi };
