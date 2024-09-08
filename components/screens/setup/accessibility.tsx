import Text from "@/components/typography";
import Button from "@/components/ui/button";
import Window from "@/components/windows/window";
import { useSetupScreens } from "@/hooks/setup.hook";
import React from "react";
import { BsEar } from "react-icons/bs";
import { LuEye } from "react-icons/lu";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { PiBrain, PiHandPointingLight } from "react-icons/pi";
import { RxAccessibility } from "react-icons/rx";

export default function SetupAccessibilityScreen() {
  const { handleScreenNavigation } = useSetupScreens();

  const handleContinue = () => {
    // Save the selected accessibility options to the database
    // and navigate to the next screen
    handleScreenNavigation({ action: "next" });
  };

  return (
    <Window
      style={"empty"}
      size={"medium"}
      resizable={"locked"}
      className="min-w-[800px] flex flex-col"
    >
      <div className="w-full flex flex-col flex-1 items-center justify-center py-8 px-[16%]">
        <div className="flex flex-col items-center gap-4">
          <RxAccessibility className="w-20 h-20 text-accent" strokeWidth={0} />
          <Text variant={"title1"} weight={"emphasized"}>
            Accessibility
          </Text>
        </div>

        <div className="py-4 pb-8 flex flex-col items-center w-full">
          <Text variant={"body"} foreground={"muted"} alignment={"center"}>
            Accessibilty features adapt your Mac to your individial needs. You
            can turn them on now to help you finish setting up, and further
            customize them later in System Preferences. See {"what's"} available
            in each of the categories below.
          </Text>
        </div>

        <div className="flex items-center gap-4  pb-16">
          <Button
            variant={"default"}
            tint={"secondary"}
            className="!h-32 !w-32 flex flex-col gap-3 items-center justify-center text-muted-foreground"
          >
            <div className="w-12 h-12 flex items-center justify-center">
              <LuEye className="w-12 h-12" strokeWidth={1.3} />
            </div>

            <Text variant={"subheadline"} foreground={"muted"}>
              Vision
            </Text>
          </Button>

          <Button
            variant={"default"}
            tint={"secondary"}
            className="!h-32 !w-32 flex flex-col gap-3 items-center justify-center text-muted-foreground"
          >
            <div className="w-12 h-12 flex items-center justify-center">
              <PiHandPointingLight
                className="w-10 h-10 -rotate-12"
                strokeWidth={1.3}
              />
            </div>

            <Text variant={"subheadline"} foreground={"muted"}>
              Motor
            </Text>
          </Button>

          <Button
            variant={"default"}
            tint={"secondary"}
            className="!h-32 !w-32 flex flex-col gap-3 items-center justify-center text-muted-foreground"
          >
            <div className="w-12 h-12 flex items-center justify-center">
              <BsEar className="w-8 h-8 -rotate-12" strokeWidth={0.1} />
            </div>

            <Text variant={"subheadline"} foreground={"muted"}>
              Hearing
            </Text>
          </Button>

          <Button
            variant={"default"}
            tint={"secondary"}
            className="!h-32 !w-32 flex flex-col gap-3 items-center justify-center text-muted-foreground"
          >
            <div className="w-12 h-12 flex items-center justify-center">
              <PiBrain className="w-10 h-10" strokeWidth={0} />
            </div>

            <Text variant={"subheadline"} foreground={"muted"}>
              Cognitive
            </Text>
          </Button>
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
        <Button variant={"default"} tint={"secondary"} onClick={handleContinue}>
          Not Now
        </Button>
      </div>
    </Window>
  );
}
