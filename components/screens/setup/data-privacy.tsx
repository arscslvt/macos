import { useSetupScreens } from "@/app/setup/page";
import Text from "@/components/typography";
import Button from "@/components/ui/button";
import Window from "@/components/windows/window";
import React from "react";
import { BsFillPeopleFill } from "react-icons/bs";

export default function DataPrivacy() {
  const { handleScreenNavigation } = useSetupScreens();

  return (
    <Window
      style={"empty"}
      size={"medium"}
      resizable={"locked"}
      className="min-w-[800px] flex flex-col"
    >
      <div className="w-full flex flex-col flex-1 items-center justify-center py-8 px-[16%]">
        <div className="flex flex-col items-center gap-4">
          <BsFillPeopleFill className="w-20 h-20 text-accent" strokeWidth={0} />
          <Text variant={"title1"}>Data & Privacy</Text>
        </div>

        <div className="pt-6 flex flex-col gap-6">
          <Text variant={"footnote"} foreground={"muted"} alignment={"left"}>
            This icon appears when an Apple feature asks to use your personal
            information.
          </Text>

          <Text variant={"footnote"} foreground={"muted"} alignment={"left"}>
            You {"won't"} see this with every feature since Apple collects this
            information
            <br /> only when needed to enable features, secure our services, or
            personalize
            <br /> your experience.
          </Text>

          <Text variant={"footnote"} foreground={"muted"} alignment={"left"}>
            Apple believes privacy is a fundamental human right, so every Apple
            <br />
            product is designed to minimize the collection and use of your data,
            use
            <br /> on-device processing whenever possible, and provide
            transparency and
            <br /> control over your information.
          </Text>

          <Button variant={"text"}>Learn More</Button>
        </div>
      </div>

      <div className="px-4 py-3 border-t flex gap-2 justify-end">
        <Button onClick={() => handleScreenNavigation({ action: "previous" })}>
          Back
        </Button>
        <Button onClick={() => handleScreenNavigation({ action: "next" })}>
          Continue
        </Button>
      </div>
    </Window>
  );
}
