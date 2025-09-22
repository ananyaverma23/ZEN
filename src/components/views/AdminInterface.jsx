import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../common/Resizable";
import {
  Users,
  BookOpen,
  Shield,
  BarChart3,
  Brain,
} from "lucide-react";
import {
  Sidebar,
  SidebarNav,
  SidebarNavMain,
  SidebarNavLink,
} from "../layout/Sidebar";

/**
 * The main interface for administrators to manage the platform.
 * It features a resizable layout with a navigation sidebar.
 */
export function AdminInterface() {
  return (
    <ResizablePanelGroup direction="horizontal" className="h-full w-full">
      <ResizablePanel defaultSize={20} minSize={15} maxSize={25}>
        <Sidebar className="h-full">
          <SidebarNav>
            <SidebarNavMain>
              <SidebarNavLink href="#" active>
                <Users className="h-4 w-4" />
                Manage Users
              </SidebarNavLink>
              <SidebarNavLink href="#">
                <BookOpen className="h-4 w-4" />
                Content Hub
              </SidebarNavLink>
              <SidebarNavLink href="#">
                <Shield className="h-4 w-4" />
                Crisis Support
              </SidebarNavLink>
              <SidebarNavLink href="#">
                <BarChart3 className="h-4 w-4" />
                Analytics
              </SidebarNavLink>
              <SidebarNavLink href="#">
                <Brain className="h-4 w-4" />
                System Health
              </SidebarNavLink>
            </SidebarNavMain>
          </SidebarNav>
        </Sidebar>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={80}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">
            Select a category to view its content
          </span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}