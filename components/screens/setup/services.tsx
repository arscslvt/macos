import Text from "@/components/typography";
import Button from "@/components/ui/button";
import Window from "@/components/windows/window";
import { useSetupScreens } from "@/hooks/setup.hook";
import Image from "next/image";
import React from "react";
import { FaChartColumn, FaLocationArrow } from "react-icons/fa6";

import DevaIcon from "@/assets/images/symbols/deva-icon.png";
import { cx } from "class-variance-authority";

type Service = {
  title: string;
  description: string;
  icon?: React.ReactNode;
  transparentIcon?: boolean;
  enabled: boolean;
};
const _services: Service[] = [
  {
    title: "Location Services",
    description:
      "Allow Maps and other apps and services like Find My to gather and use data indicating your approximate location.",
    icon: <FaLocationArrow />,
    enabled: true,
  },
  {
    title: "Device Analytics",
    description:
      "Help Sierra Corp. improve its products and services by allowing analytics of usage and data from this computer.",
    icon: <FaChartColumn />,
    enabled: true,
  },
  {
    title: "App Analytics",
    description:
      "Help developers improve their apps by choosing to share app activity and crash data with them through Sierra.",
    icon: <FaLocationArrow />,
    enabled: true,
  },
  {
    title: "Deva",
    description:
      "Allow Deva to use your voice input, contacts and location to process your requests.",
    icon: (
      <Image
        src={DevaIcon}
        priority
        quality={60}
        alt="Deva"
        className="w-8 h-8"
      />
    ),
    transparentIcon: true,
    enabled: true,
  },
];

export default function Services() {
  const { handleScreenNavigation } = useSetupScreens();
  const [services, setServices] = React.useState<Service[]>(_services);

  const handleServiceToggle = (service: Service) => {
    setServices((prev) =>
      prev.map((s) =>
        s.title === service.title ? { ...s, enabled: !s.enabled } : s
      )
    );
  };

  return (
    <Window
      style={"empty"}
      size={"medium"}
      resizable={"locked"}
      className="min-w-[800px] flex flex-col"
    >
      <div className="w-full overflow-y-auto flex flex-col flex-1 items-center justify-center px-[16%] py-8">
        <div className="flex flex-col items-center gap-4 pt-22">
          <Text variant={"title1"} weight={"emphasized"}>
            Make This Your New Computer
          </Text>
          <Text variant={"subheadline"} foreground={"muted"} alignment={"left"}>
            Here's everything set up by default
          </Text>
        </div>

        <div className="pt-6 flex flex-col gap-6">
          {services.map((item, k) => {
            return (
              <div
                className="flex items-center gap-4 px-3 py-3 rounded bg-background"
                key={k}
              >
                <div>
                  <div
                    className={cx(
                      "w-8 h-8 rounded grid place-items-center text-accent-foreground",
                      item.transparentIcon ? "bg-transparent" : "bg-accent"
                    )}
                  >
                    {item.icon}
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-2 items-start">
                  <Text variant={"body"} weight={"emphasized"}>
                    {item.title}
                  </Text>
                  <Text alignment={"left"} foreground={"muted"}>
                    {item.description}
                  </Text>
                </div>
                <Button
                  variant={"text"}
                  onClick={() => handleServiceToggle(item)}
                >
                  <span
                    className={
                      item.enabled ? "!text-accent" : "!text-muted-foreground"
                    }
                  >
                    {item.enabled ? "On" : "Off"}
                  </span>
                </Button>
              </div>
            );
          })}
          <Button variant={"text"}>Learn More</Button>
        </div>
      </div>

      <div className="px-4 py-3 border-t flex gap-2 justify-end">
        <Button
          variant={"default"}
          tint={"secondary"}
          onClick={() => handleScreenNavigation({ action: "previous" })}
        >
          Back
        </Button>
        <Button
          variant={"default"}
          tint={"secondary"}
          onClick={() => handleScreenNavigation({ action: "next" })}
        >
          Continue
        </Button>
      </div>
    </Window>
  );
}
