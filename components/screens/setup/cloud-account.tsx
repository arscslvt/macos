import React from "react";

import Text from "@/components/typography";
import Window from "@/components/windows/window";
import Button from "@/components/ui/button";

import { HiMiniCloud } from "react-icons/hi2";
import { Input } from "@/components/ui/input";
import { useSetupScreens } from "@/hooks/useSetupScreens";

export default function CloudAccount() {
  const { handleScreenNavigation } = useSetupScreens();

  return (
    <Window
      style={"empty"}
      size={"medium"}
      resizable={"locked"}
      className="min-w-[800px] flex flex-col"
    >
      <form className="w-full flex flex-col flex-1 items-center py-8 px-[16%] gap-6">
        <div className="flex flex-col items-center gap-4">
          <HiMiniCloud className="w-20 h-20 text-accent" strokeWidth={0} />
          <Text variant={"title1"}>Sign In with Your Cloud ID</Text>
        </div>

        <Text variant={"footnote"} foreground={"muted"} alignment={"center"}>
          Sign in to use Cloud, App Store, and other services.
        </Text>

        <div className="flex flex-col gap-4 items-center">
          <span>
            <Text variant={"body"} className="mr-2">
              Cloud ID
            </Text>
            <Input type="email" placeholder="E-mail" className="w-60" />
          </span>

          <div className="flex flex-col">
            <Button variant={"text"} type="button">
              Create new Cloud ID
            </Button>
            <Button variant={"text"} type="button">
              Forgot Cloud ID or password?
            </Button>
            <Button variant={"text"} type="button">
              Use different Cloud IDs for Cloud and Store media purchases?
            </Button>
          </div>
        </div>
      </form>

      <div className="px-4 py-3 border-t flex gap-2 justify-between">
        <Button
          variant={"text"}
          onClick={() => handleScreenNavigation({ action: "next" })}
        >
          Not now
        </Button>
        <div className="flex gap-2">
          <Button
            onClick={() =>
              handleScreenNavigation({
                action: "page",
                id: "migration-assistant",
              })
            }
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
