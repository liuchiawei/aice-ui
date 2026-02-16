"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function SheetDemo() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="cursor-pointer">
          Open Sheet
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Sheet title</SheetTitle>
          <SheetDescription>
            Optional description for the sheet content.
          </SheetDescription>
        </SheetHeader>
        <div className="py-4 text-sm text-muted-foreground">
          Sheet content goes here.
        </div>
      </SheetContent>
    </Sheet>
  );
}
