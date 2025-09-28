"use client";

import { Bell, Search } from "lucide-react";
import { MobileNav } from "./mobile-nav";

export function Header() {
  return (
    <header className="flex h-16 items-center gap-4 border-b bg-card px-4 md:px-6">
      <MobileNav />
      <div className="w-full flex-1">
        <form>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-8 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Search..."
              type="search"
            />
          </div>
        </form>
      </div>
      <div className="flex items-center gap-4">
        <button className="relative rounded-full p-1 text-muted-foreground hover:text-foreground">
          <Bell className="h-5 w-5" />
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-xs text-destructive-foreground">
            3
          </span>
        </button>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-primary"></div>
          <span className="text-sm font-medium">John Doe</span>
        </div>
      </div>
    </header>
  );
}