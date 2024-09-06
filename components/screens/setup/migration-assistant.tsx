import React from "react";

import { useSetupScreens } from "@/app/setup/page";

import Text from "@/components/typography";
import Button from "@/components/ui/button";
import Window from "@/components/windows/window";

import { HiMiniArrowDownOnSquareStack } from "react-icons/hi2";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function MigrationAssistant() {
  const { handleScreenNavigation } = useSetupScreens();

  return (
    <Window
      style={"empty"}
      size={"medium"}
      resizable={"locked"}
      className="min-w-[800px] flex flex-col"
    >
      <div className="w-full flex flex-col flex-1 items-center py-8 px-[16%]">
        <div className="flex flex-col items-center gap-4">
          <HiMiniArrowDownOnSquareStack
            className="w-20 h-20 text-accent"
            strokeWidth={0}
          />
          <Text variant={"title1"}>Migration Assistant</Text>
        </div>

        <div className="pt-6 pb-8 flex-1 flex flex-col gap-8">
          <Text variant={"footnote"} foreground={"muted"} alignment={"center"}>
            If you have information on another macOS Emulator installed on other
            browsers, you can <br />
            transfer it to this one. You can also transfer information from your
            xCloud.
          </Text>

          <div className="flex flex-col items-center gap-4">
            <Text variant={"callout"} foreground={"muted"}>
              How do you want to transfer your information?
            </Text>
            <RadioGroup direction="vertical" defaultValue="emulator">
              <RadioGroupItem value="emulator">
                From a macOS Emulator
              </RadioGroupItem>
              <RadioGroupItem value="xcloud">From xCloud</RadioGroupItem>
            </RadioGroup>
          </div>
        </div>

        <Text variant={"caption2"} foreground={"muted"}>
          This feature is not available yet. Check back in the next versions.
        </Text>
      </div>

      <div className="px-4 py-3 border-t flex gap-2 justify-between">
        <Button
          variant={"text"}
          onClick={() =>
            handleScreenNavigation({ action: "page", id: "cloud-account" })
          }
        >
          Not now
        </Button>
        <div className="flex gap-2">
          <Button
            onClick={() => handleScreenNavigation({ action: "previous" })}
          >
            Back
          </Button>
          <Button
            disabled
            onClick={() => handleScreenNavigation({ action: "next" })}
          >
            Continue
          </Button>
        </div>
      </div>
    </Window>
  );
}
