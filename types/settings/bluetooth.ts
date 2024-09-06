interface IBluetooth {
  name: string;
  deviceType: "device" | "earpods" | "controller" | "audio" | "generic";
  battery?: number;
  isConnected: boolean;
  isPaired: boolean;
}

export type { IBluetooth };
