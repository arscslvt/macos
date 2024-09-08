import React from "react";

import Text from "@/components/typography";
import Window from "@/components/windows/window";
import Button from "@/components/ui/button";

import { HiMiniCloud } from "react-icons/hi2";
import { Input } from "@/components/ui/input";
import { useSetupScreens } from "@/hooks/setup.hook";
import { useAccount } from "@/hooks/account.hook";

export default function CloudAccount() {
  const { handleScreenNavigation } = useSetupScreens();

  const { user } = useAccount();

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
          <Text variant={"title1"} weight={"emphasized"}>
            Sign In with Your Cloud ID
          </Text>
        </div>

        <Text variant={"body"} foreground={"muted"} alignment={"center"}>
          Sign in to use Cloud, App Store, and other services.
        </Text>

        <div className="flex flex-col gap-4 items-center">
          <span>
            <Text variant={"body"} className="mr-2">
              Cloud ID
            </Text>
            <Input
              type="email"
              variant={"default"}
              placeholder="E-mail"
              className="w-60"
            />
          </span>

          {user && (
            <div className="flex flex-col gap-2 my-4">
              <Text
                variant={"body"}
                weight={"emphasized"}
                foreground={"muted"}
                alignment={"left"}
              >
                Continue with
              </Text>
              <Button
                className="flex gap-3 items-center py-2 h-max"
                tint={"secondary"}
              >
                <div className="w-12 h-12 rounded-full bg-zinc-300" />
                <div className="flex flex-col">
                  <Text alignment={"left"}>
                    {user?.firstName} {user?.lastName}
                  </Text>
                  <Text
                    variant={"body"}
                    alignment={"left"}
                    foreground={"muted"}
                  >
                    {user?.email}
                  </Text>
                </div>
              </Button>
            </div>
          )}

          <div className="flex flex-col">
            <Button
              variant={"text"}
              type="button"
              onClick={() => handleScreenNavigation({ action: "next" })}
            >
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
            variant={"default"}
            tint={"secondary"}
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
            variant={"default"}
            tint={"secondary"}
            onClick={() =>
              handleScreenNavigation({ action: "page", id: "cloud-otp" })
            }
          >
            Continue
          </Button>
        </div>
      </div>
    </Window>
  );
}
