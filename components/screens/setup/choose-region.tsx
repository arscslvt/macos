"use client";

import { useSetupScreens } from "@/app/setup/page";
import Text from "@/components/typography";
import Button from "@/components/ui/button";
import ListSelector, { ListSelectorItem } from "@/components/ui/list-selector";
import Window from "@/components/windows/window";
import { useSystem } from "@/contexts/useSystem";
import countries from "@/utils/countries";
import { GlobeEuropeAfricaIcon } from "@heroicons/react/24/outline";
import React from "react";

export default function SetupChooseRegionScreen() {
  const { region, setSettings } = useSystem();

  const { handleScreenNavigation } = useSetupScreens();

  const handleContinue = () => {
    // Save the selected country to the database
    // and navigate to the next screen
    handleScreenNavigation({ action: "next" });
  };

  const handleListSelectorChange = (value: string) => {
    setSettings({ region: value });
  };

  return (
    <Window
      style={"empty"}
      size={"medium"}
      resizable={"locked"}
      className="min-w-[800px] flex flex-col"
    >
      <div className="w-full flex flex-col flex-1 items-center justify-center py-8">
        <div className="flex flex-col items-center gap-4">
          <GlobeEuropeAfricaIcon
            className="w-20 h-20 text-accent"
            strokeWidth={1.2}
          />
          <Text variant={"title1"}>Select Your Country or Region</Text>
        </div>

        <div className="pt-8 pb-4">
          <ListSelector
            onSelect={handleListSelectorChange}
            defaultValue={region}
            isSearchable={{
              placeholder: "Search for a country",
            }}
          >
            {countries.map((country) => (
              <ListSelectorItem key={country.code} value={country.code}>
                {country.name}
              </ListSelectorItem>
            ))}
          </ListSelector>
        </div>
      </div>

      <div className="px-4 py-3 border-t flex justify-end">
        <Button disabled={!region} onClick={handleContinue}>
          Continue
        </Button>
      </div>
    </Window>
  );
}
