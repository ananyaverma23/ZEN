"use client";

import { useState } from "react";
import { Button } from "../common/Button";
import {
  Home,
  MessageCircle,
  Calendar,
  BookOpen,
  Users,
  BarChart3,
  Menu,
  X,
  Brain,
  Shield,
  LogOut,
  User as UserIcon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../common/Avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../common/DropdownMenu";

/**
 * The main navigation sidebar for the application.
 * It adapts its content based on the user's role and screen size.
 *
 * @param {object} props - Component props.
 * @param {string} props.currentView - The currently active view.
 * @param {(view: string) => void} props.onViewChange - Function to change the current view.
 * @param {'student'|'counselor'|'admin'} props.userType - The role of the current user.
 * @param {() => void} props.onLogout - Function to handle user logout.
 * @param {object} props.userData - The data of the currently logged-in user.
 */
export function Navigation({
  currentView,
  onViewChange,
  userType,
  onLogout,
  userData,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const getMenuItems = () => {
    switch (userType) {
      case "student":
        return [
          { id: "dashboard", label: "Dashboard", icon: Home },
          { id: "chat", label: "AI Chat", icon: MessageCircle },
          { id: "booking", label: "Booking", icon: Calendar },
          { id: "resources", label: "Resources", icon: BookOpen },
          { id: "forum", label: "Peer Forum", icon: Users },
        ];
      case "counselor":
        return [
          { id: "counselor-dashboard", label: "Dashboard", icon: BarChart3 },
          { id: "clients", label: "My Clients", icon: Users },
          { id: "sessions", label: "Sessions", icon: Calendar },
          { id: "reports", label: "Reports", icon: BookOpen },
        ];
      case "admin":
        return [
          { id: "admin-dashboard", label: "Overview", icon: BarChart3 },
          { id: "users", label: "Manage Users", icon: Users },
          { id: "content", label: "Content Hub", icon: BookOpen },
          { id: "crisis", label: "Crisis Support", icon: Shield },
          { id: "analytics", label: "Analytics", icon: BarChart3 },
          { id: "system", label: "System Health", icon: Brain },
        ];
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  const handleViewChange = (view) => {
    onViewChange(view);
    if (isOpen) {
      setIsOpen(false);
    }
  };

  const displayName =
    userData?.userType === "student" ? userData.username : userData?.fullName;
  const fallbackChar = displayName ? displayName.charAt(0).toUpperCase() : "";

  const navContent = (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <Brain className="text-primary w-8 h-8" />
          <h1 className="text-xl font-bold">MindWell</h1>
        </div>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <Button
            key={item.id}
            variant={currentView === item.id ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => handleViewChange(item.id)}
          >
            <item.icon className="mr-2 h-5 w-5" />
            {item.label}
          </Button>
        ))}
      </nav>
      <div className="p-4 border-t border-border mt-auto">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-accent">
              <Avatar>
                <AvatarImage src={userData?.avatarUrl} />
                <AvatarFallback>{fallbackChar}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-semibold text-sm">{displayName}</p>
                <p className="text-xs text-muted-foreground">
                  {userData?.email}
                </p>
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 mb-2" align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleViewChange("profile")}>
              <UserIcon className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Navigation */}
      <div className="lg:hidden p-4 fixed top-0 left-0 right-0 bg-background z-20 flex items-center justify-between border-b">
        <div className="flex items-center gap-3">
          <Brain className="text-primary w-7 h-7" />
          <h1 className="text-lg font-bold">MindWell</h1>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-10"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <div
        className={`lg:hidden fixed top-0 left-0 h-full w-64 bg-background z-20 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {navContent}
      </div>

      {/* Desktop Navigation */}
      <aside className="hidden lg:block fixed top-0 left-0 w-64 h-full border-r bg-background">
        {navContent}
      </aside>
    </>
  );
}