import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import { esES } from "@clerk/localizations";
import { Toaster } from "sonner";

import "./index.css";
import { App } from "./App";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      afterSignOutUrl='/'
      signInForceRedirectUrl={"/onboarding"}
      localization={esES}
      appearance={{
        elements: {
          rootBox: "!w-full",
          userButtonAvatarBox: "h-5 w-5",
          userButtonAvatarImage: "h-5 w-5",
          userButtonTrigger:
            "!h-10 !p-0 !w-full flex !justify-start !bg-primary/5 !border border-input hover:!bg-sidebar-accent !shadow-none  group-data-[collapsible=icon]:hover:!bg-transparent !px-2 group-data-[collapsible=icon]:!px-0 group-data-[collapsible=icon]:!bg-transparent group-data-[collapsible=icon]:!border-none transition-colors",

          userButtonBox:
            "!text-foreground !flex-row-reverse !gap-2 items-center",
          userButtonOuterIdentifier:
            "text-sm font-medium truncate group-data-[collapsible=icon]:!hidden",
          //userButtonPopoverMain: "!bg-primary/5 !text-card-foreground",
          //userButtonPopoverCard: "!bg-primary/5 !text-card-foreground",
          //userButtonPopoverFooter: "!hidden",
          userButtonPopoverActionButton:
            "!bg-primary/5 hover:!bg-sidebar-accent border-t !border-input !text-muted-foreground ",
          //userButtonPopoverActions: "!border-t !border-input",
        },
      }}>
      <App />
      <Toaster />
    </ClerkProvider>
  </StrictMode>
);
