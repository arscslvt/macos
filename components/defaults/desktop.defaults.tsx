import { FaApple } from "react-icons/fa";
import Toolbar, {
  ToolbarItem,
  ToolbarLeading,
  ToolbarTrailing,
} from "../toolbar";
import { IoBatteryHalfOutline } from "react-icons/io5";
import { MdOutlineWifi } from "react-icons/md";

export const DefaultDesktopToolbar = () => {
  return (
    <Toolbar>
      <ToolbarLeading>
        <ToolbarItem
          items={[
            {
              label: "About This computer",
            },
            "separator",
            {
              label: "System Settings...",
              badge: "1 update",
            },
            {
              label: "App Store",
            },
            "separator",
            {
              label: "Recent Items",

              subItems: [
                {
                  label: "Google Chrome",
                },
              ],
            },
            "separator",
            {
              label: "Force Quit...",
            },
            "separator",
            {
              label: "Sleep",
            },
            {
              label: "Restart...",
            },
            {
              label: "Shut Down...",
            },
            "separator",
            {
              label: "Lock Screen",
              shortcut: "⌃⌘Q",
            },
            {
              label: "Log Out...",
              shortcut: "⇧⌘Q",
            },
          ]}
        >
          <FaApple className="w-[18px] h-[18px]" />
        </ToolbarItem>
      </ToolbarLeading>

      <ToolbarTrailing>
        <ToolbarItem>
          ∞
          <IoBatteryHalfOutline className="w-[20px] h-[20px]" />
        </ToolbarItem>
        <ToolbarItem>
          <MdOutlineWifi className="w-[18px] h-[18px]" />
        </ToolbarItem>
      </ToolbarTrailing>
    </Toolbar>
  );
};
