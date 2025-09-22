import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../common/Card";
import { Button } from "../common/Button";
import { ImageWithFallback } from "../common/ImageWithFallback";
import { MessageCircle, Calendar, BookOpen, Users } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../common/Carousel";

/**
 * The main dashboard for students, providing a personalized and engaging overview.
 *
 * @param {object} props - Component props.
 * @param {(view: string) => void} props.onViewChange - Function to navigate to other views.
 */
export function Dashboard({ onViewChange }) {
  const [selectedMood, setSelectedMood] = useState(null);

  // --- Sample Data ---

  const quickActions = [
    {
      label: "Chat with AI",
      icon: MessageCircle,
      view: "chat",
      color: "bg-sky-100 text-sky-700",
    },
    {
      label: "Book a Session",
      icon: Calendar,
      view: "booking",
      color: "bg-green-100 text-green-700",
    },
    {
      label: "Resource Hub",
      icon: BookOpen,
      view: "resources",
      color: "bg-orange-100 text-orange-700",
    },
    {
      label: "Peer Forum",
      icon: Users,
      view: "forum",
      color: "bg-purple-100 text-purple-700",
    },
  ];

  const moods = [
    { mood: "😄", label: "Happy" },
    { mood: "😊", label: "Content" },
    { mood: "😐", label: "Neutral" },
    { mood: "😟", label: "Worried" },
    { mood: "😢", label: "Sad" },
  ];

  const positiveQuotes = [
    "The sun is a daily reminder that we too can rise again from the darkness, that we too can shine our own light.",
    "Believe you can and you're halfway there.",
    "The only way out of the labyrinth of suffering is to forgive.",
  ];

  // --- Render ---

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Welcome Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8">
        <div className="relative z-10">
          <h1 className="text-4xl font-bold">Welcome back, [Student Name]!</h1>
          <p className="mt-2 text-lg opacity-90">
            We're glad to see you. Remember, taking care of your mind is a sign
            of strength.
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Card
              key={action.view}
              className="hover:shadow-lg transition-shadow cursor-pointer text-center"
              onClick={() => onViewChange(action.view)}
            >
              <CardContent className="p-6 flex flex-col items-center gap-4">
                <div
                  className={`p-4 rounded-full ${action.color}`}
                >
                  <action.icon className="h-8 w-8" />
                </div>
                <p className="font-semibold">{action.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Mood Check-in */}
      <div>
        <Card>
          <CardHeader>
            <CardTitle>How are you feeling today?</CardTitle>
            <CardDescription>
              Checking in with yourself is a great first step.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap items-center gap-4">
            {moods.map(({ mood, label }) => (
              <button
                key={label}
                onClick={() => setSelectedMood(label)}
                className={`flex flex-col items-center gap-2 p-3 rounded-lg transition-all ${
                  selectedMood === label
                    ? "bg-primary/20 scale-110"
                    : "hover:bg-accent"
                }`}
              >
                <span className="text-4xl">{mood}</span>
                <span className="text-sm font-medium">{label}</span>
              </button>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Featured Content */}
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Featured Article</CardTitle>
            <CardDescription>
              Techniques for managing academic pressure.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <p className="text-muted-foreground">
              Discover effective strategies to handle exam stress, manage your
              time better, and maintain a healthy work-life balance during the
              semester...
            </p>
          </CardContent>
          <div className="p-6 pt-0">
            <Button onClick={() => onViewChange("resources")}>Read More</Button>
          </div>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Quote of the Day</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex items-center justify-center">
            <Carousel className="w-full max-w-xs">
              <CarouselContent>
                {positiveQuotes.map((quote, index) => (
                  <CarouselItem key={index}>
                    <p className="text-center text-lg italic text-muted-foreground">
                      "{quote}"
                    </p>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}