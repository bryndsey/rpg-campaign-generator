/**
 * v0 by Vercel.
 * @see https://v0.dev/t/U29mX9t9Jt5
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button";
import {
  DrawerTrigger,
  DrawerTitle,
  DrawerDescription,
  DrawerHeader,
  DrawerContent,
  Drawer,
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import type { SVGProps } from "react";
import type { JSX } from "react/jsx-runtime";
import { characterClasses, characterRaces } from "./characterData";

export default function Component() {
  return (
    <div key="1" className="grid h-screen w-full">
      <div className="flex flex-col">
        <header className="bg-background sticky top-0 z-10 flex h-[53px] items-center gap-1 border-b px-4">
          <h1 className="text-xl font-semibold">Character Creator</h1>
          <Drawer>
            <DrawerTrigger asChild>
              <Button className="md:hidden" size="icon" variant="ghost">
                <SettingsIcon className="size-4" />
                <span className="sr-only">Settings</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent className="max-h-[80vh]">
              <DrawerHeader>
                <DrawerTitle>Character Settings</DrawerTitle>
                {/* <DrawerDescription>
                  Configure the settings for the model and messages.
                </DrawerDescription> */}
              </DrawerHeader>
              <div className="w-full overflow-auto p-4 pt-0">
                <InputControls />
              </div>
            </DrawerContent>
          </Drawer>
          <Button
            className="ml-auto gap-1.5 text-sm"
            size="sm"
            variant="outline"
          >
            <ShareIcon className="size-3.5" />
            Share
          </Button>
        </header>
        <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="relative hidden flex-col items-start gap-8 md:flex">
            <InputControls />
          </div>
          <div className="bg-muted/50 relative flex h-full min-h-[50vh] flex-col rounded-xl p-4 lg:col-span-2">
            <Badge className="absolute right-3 top-3" variant="outline">
              Output
            </Badge>
            <div className="flex-1" />
            <form>
              <Button type="submit">Submit</Button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

function InputControls() {
  return (
    <form className="grid w-full items-start gap-6">
      <fieldset className="grid gap-6 rounded-lg border p-4">
        <legend className="-ml-1 px-1 text-sm font-medium">Settings</legend>
        <div className="grid gap-3">
          <Label htmlFor="characterName">Name</Label>
          <Input id="characterName" placeholder="Enter a name" />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="genre">Race</Label>
          <Select>
            <SelectTrigger
              className="items-start [&_[data-description]]:hidden"
              id="genre"
            >
              <SelectValue placeholder="Select a race" />
            </SelectTrigger>
            <SelectContent>
              {characterRaces.map((race) => (
                <SelectItem key={race} value={race}>
                  {race}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-3">
          <Label htmlFor="tone">Class</Label>
          <Select>
            <SelectTrigger
              className="items-start [&_[data-description]]:hidden"
              id="tone"
            >
              <SelectValue placeholder="Select a class" />
            </SelectTrigger>
            <SelectContent>
              {characterClasses.map((classType) => (
                <SelectItem key={classType} value={classType}>
                  {classType}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-3">
          <Label htmlFor="characterDescription">Description</Label>
          <Input
            id="characterDescription"
            placeholder="Enter a brief description"
          />
        </div>
      </fieldset>
    </form>
  );
}

function SettingsIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>,
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function ShareIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" x2="12" y1="2" y2="15" />
    </svg>
  );
}
