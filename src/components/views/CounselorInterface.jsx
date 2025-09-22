import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../common/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../common/Tabs";
import { Button } from "../common/Button";

/**
 * The main interface for counselors to manage their clients, sessions, and reports.
 *
 * @param {object} props - Component props.
 * @param {string} props.currentView - The currently active view/tab.
 * @param {(view: string) => void} props.onViewChange - Function to change the current view.
 */
export function CounselorInterface({ currentView, onViewChange }) {
  // Map the App's currentView to the corresponding tab value
  const getTabValue = () => {
    switch (currentView) {
      case "counselor-dashboard":
        return "dashboard";
      case "clients":
        return "clients";
      case "sessions":
        return "sessions";
      case "reports":
        return "reports";
      default:
        return "dashboard";
    }
  };

  // Map the tab value back to the App's view state
  const handleTabChange = (tabValue) => {
    switch (tabValue) {
      case "dashboard":
        onViewChange("counselor-dashboard");
        break;
      case "clients":
        onViewChange("clients");
        break;
      case "sessions":
        onViewChange("sessions");
        break;
      case "reports":
        onViewChange("reports");
        break;
      default:
        onViewChange("counselor-dashboard");
    }
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          Counselor Dashboard
        </h2>
        <div className="flex items-center space-x-2">
          <Button>Download Reports</Button>
        </div>
      </div>

      <Tabs
        value={getTabValue()}
        onValueChange={handleTabChange}
        className="space-y-4"
      >
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="clients">My Clients</TabsTrigger>
          <TabsTrigger value="sessions">Sessions</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Welcome, [Counselor Name]</CardTitle>
              <CardDescription>
                Here's a summary of your activity.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Dashboard-specific content goes here */}
              <p>Dashboard summary and charts will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="clients" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>My Clients</CardTitle>
              <CardDescription>
                Manage your client information and history.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Client list and management tools go here */}
              <p>A list of clients will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sessions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming & Past Sessions</CardTitle>
              <CardDescription>
                View your schedule and session notes.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Session calendar and list go here */}
              <p>A calendar or list of sessions will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Client Reports</CardTitle>
              <CardDescription>
                Generate and view reports on client progress.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Report generation tools and list go here */}
              <p>Reporting tools will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}