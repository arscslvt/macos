import Text from "@/components/typography";
import Button from "@/components/ui/button";
import ListSelector, { ListSelectorItem } from "@/components/ui/list-selector";
import Window from "@/components/windows/window";
import { useSettings } from "@/hooks/settings.hook";
import { useSetupScreens } from "@/hooks/setup.hook";
import { useSystem } from "@/hooks/system.hook";
import { IWifi, generateRandomIP } from "@/types/settings/wifi";
import React, { useMemo } from "react";
import { BiSolidLockAlt } from "react-icons/bi";
import { IoIosWifi } from "react-icons/io";

export default function SetupWifiSelector() {
  const networks: IWifi[] = useMemo(
    () => [
      {
        ip: "153.58.253.10",
        ssid: "Alice's iPhone",
        isHotspot: true,
        password: "password",
      },
      {
        ip: "1281.1.84.124",
        ssid: "Pedro's Home Network",
        isHotspot: false,
        password: "password",
      },
      {
        ip: "103.125.201.225",
        ssid: "Free Wi-Fi",
        isHotspot: false,
      },
      {
        ip: "190.104.78.237",
        ssid: "Linksys 383 - 5Ghz",
        isHotspot: false,
        password: "password",
      },
      {
        ip: "230.53.201.218",
        ssid: "Salvatore's iPhone",
        isHotspot: true,
        password: "password",
      },
      {
        ip: "77.82.247.176",
        ssid: "OpenNetwork - 2G",
        isHotspot: false,
        password: "password",
      },
    ],
    []
  );

  const { wifi, setSettings } = useSystem();
  const [selectedNetwork, setSelectedNetwork] = React.useState<IWifi | null>(
    wifi ?? null
  );

  const { handleScreenNavigation } = useSetupScreens();

  const handleNetworkChange = (networkIp: string) => {
    console.log(networkIp);

    const plainIpString = networkIp.replace("IP_", "").split("_").join(".");

    const foundNetwork = networks.find((n) => n.ip === plainIpString);
    if (!foundNetwork) return;

    setSelectedNetwork(foundNetwork);

    if (foundNetwork.password) return;
    setSettings({
      wifi: foundNetwork,
    });
  };

  const handleContinue = () => {
    if (!selectedNetwork) return;

    handleScreenNavigation({ action: "next" });
  };

  return (
    <Window
      style={"empty"}
      size={"medium"}
      resizable={"locked"}
      className="flex flex-col min-w-[800px]"
    >
      <div className="w-full flex flex-col flex-1 items-center justify-center py-8 px-[16%]">
        <div className="flex flex-col items-center gap-4">
          <IoIosWifi className="w-20 h-20 text-accent" strokeWidth={0} />
          <Text variant={"title1"} weight={"emphasized"}>
            Select Your Wi-FI Network
          </Text>
        </div>

        <div className="py-4">
          <ListSelector
            onSelect={(value) => {
              handleNetworkChange(value);
            }}
            defaultValue={
              (wifi as IWifi) ? `IP_${wifi.ip.split(".").join("_")}` : undefined
            }
          >
            {networks.map((network, i) => (
              <ListSelectorItem
                key={i}
                value={`IP_${network.ip.split(".").join("_")}`}
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
        <Button
          onClick={() => handleScreenNavigation({ action: "previous" })}
          variant={"default"}
          tint={"secondary"}
        >
          Back
        </Button>
        <Button
          onClick={handleContinue}
          disabled={selectedNetwork?.password ? true : false}
          variant={"default"}
          tint={"secondary"}
        >
          Connect and Continue
        </Button>
      </div>
    </Window>
  );
}
