import { App } from "@/types/app/app.type";

export const exampleApps: App[] = [
  {
    package: "com.apple.safari.app",
    details: {
      icon: "Safari",
      name: "Safari",
      description: "Safari",
      version: "1.0.0",
    },
    repo: "",
    website: "",
  },
  {
    package: "com.apple.mail.app",
    details: {
      icon: "Mail",
      name: "Mail",
      description: "Mail",
      version: "1.0.0",
    },
    repo: "",
    website: "",
  },
  {
    package: "com.apple.calculator.app",
    details: {
      icon: "Calculator",
      name: "Calculator",
      description: "Calculator",
      version: "1.0.0",
    },
    repo: "",
    website: "",
  },
  {
    package: "com.apple.settings.app",
    details: {
      icon: "Settings",
      name: "Settings",
      description: "Settings",
      version: "1.0.0",
    },
    repo: "",
    website: "",
  },
  {
    package: "com.apple.music.app",
    details: {
      icon: "Music",
      name: "Music",
      description: "Music",
      version: "1.0.0",
    },
    repo: "",
    website: "",
  },
  {
    package: "com.apple.photos.app",
    details: {
      icon: "Photos",
      name: "Photos",
      description: "Photos",
      version: "1.0.0",
    },
    repo: "",
    website: "",
  },
  {
    package: "com.apple.maps.app",
    details: {
      icon: "Maps",
      name: "Maps",
      description: "Maps",
      version: "1.0.0",
    },
    repo: "",
    website: "",
  },
  {
    package: "com.apple.weather.app",
    details: {
      icon: "Weather",
      name: "Weather",
      description: "Weather",
      version: "1.0.0",
    },
    repo: "",
    website: "",
  },
  {
    package: "com.apple.notes.app",
    details: {
      icon: "Notes",
      name: "Notes",
      description: "Notes",
      version: "1.0.0",
    },
    repo: "",
    website: "",
  },
];

export const exampleAppsPackages = exampleApps.map((app) => app.package);
