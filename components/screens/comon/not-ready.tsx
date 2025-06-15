import Text from "@/components/typography";
import Wallpaper from "@/components/wallpaper";
import React from "react";

interface NotReadyScreenProps {
  title: string;
  description?: string;
}

export default function NotReadyScreen({
  title,
  description,
}: NotReadyScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center h-dvh w-dvw">
      <div className="relative z-10 flex flex-col items-center justify-center gap-4 bg-muted/80 backdrop-blur-lg rounded border-background/80 px-12 py-8">
        <Text variant="headline">{title}</Text>
        {description && (
          <Text variant="subheadline" foreground="muted">
            {description}
          </Text>
        )}
      </div>

      <Wallpaper />
    </div>
  );
}
