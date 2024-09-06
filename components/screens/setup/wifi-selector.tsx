import Text from "@/components/typography";
import Button from "@/components/ui/button";
import ListSelector, { ListSelectorItem } from "@/components/ui/list-selector";
import Window from "@/components/windows/window";
import { useSettings } from "@/contexts/useSettings";
import { useSetupScreens } from "@/hooks/useSetupScreens";
import { IWifi, generateRandomIP } from "@/types/settings/wifi";
import React from "react";
import { BiSolidLockAlt } from "react-icons/bi";
import { IoIosWifi } from "react-icons/io";

export default function SetupWifiSelector() {
  const networks: IWifi[] = [
    {
      ip: generateRandomIP(),
      ssid: "Alice's iPhone",
      isHotspot: true,
      password: "password",
    },
    {
      ip: generateRandomIP(),
      ssid: "Pedro's Home Network",
      isHotspot: false,
      password: "password",
    },
    {
      ip: generateRandomIP(),
      ssid: "Free Wi-Fi",
      isHotspot: false,
    },
    {
      ip: generateRandomIP(),
      ssid: "Linksys 383 - 5Ghz",
      isHotspot: false,
      password: "password",
    },
    {
      ip: generateRandomIP(),
      ssid: "Salvatore's iPhone",
      isHotspot: true,
      password: "password",
    },
    {
      ip: generateRandomIP(),
      ssid: "OpenNetwork - 2G",
      isHotspot: false,
      password: "password",
    },
  ];

  const { wifi, setSettings } = useSettings();
  const [selectedNetwork, setSelectedNetwork] = React.useState<IWifi | null>(
    wifi ?? null
  );

  const { handleScreenNavigation } = useSetupScreens();

  const handleContinue = () => {
    if (!selectedNetwork) return;

    setSettings({
      wifi: selectedNetwork,
    });
    handleScreenNavigation({ action: "next" });
  };

  return (
    <Window
      style={"empty"}
      size={"medium"}
      resizable={"default"}
      className="flex flex-col"
    >
      <div className="w-full flex flex-col flex-1 items-center justify-center py-8 px-[16%]">
        <div className="flex flex-col items-center gap-4">
          <IoIosWifi className="w-20 h-20 text-accent" strokeWidth={0} />
          <Text variant={"title1"}>Select Your Wi-FI Network</Text>
        </div>

        <div className="py-4">
          <ListSelector
            onSelect={(value) => {
              const network = networks[parseInt(value.split("-")[1])];
              setSelectedNetwork(network);
            }}
            defaultValue={
              wifi?.ssid
                ? `network-${networks.findIndex(
                    (network) => network.ssid === wifi.ssid
                  )}`
                : "network-0"
            }
          >
            {networks.map((network, i) => (
              <ListSelectorItem
                key={i}
                value={`network-${i}`}
                trailing={
                  <>
                    {network.password && <BiSolidLockAlt className="w-4 h-4" />}
                    <IoIosWifi className="w-4 h-4" />{" "}
                  </>
                }
              >
                {network.ssid}
              </ListSelectorItem>
            ))}
          </ListSelector>
        </div>

        <div className="h-8">
          {selectedNetwork?.password && (
            <div>
              <Text variant={"callout"} foreground={"muted"}>
                This network is password protected. Select a free one.
              </Text>
            </div>
          )}
        </div>
      </div>

      <div className="px-4 py-3 border-t flex gap-2 justify-end">
        <Button onClick={() => handleScreenNavigation({ action: "previous" })}>
          Back
        </Button>
        <Button
          onClick={handleContinue}
          disabled={selectedNetwork?.password ? true : false}
        >
          Connect and Continue
        </Button>
      </div>
    </Window>
  );
}
