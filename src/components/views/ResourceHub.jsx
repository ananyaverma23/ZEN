import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../common/Card";
import { Input } from "../common/Input";
import { Badge } from "../common/Badge";
import { Search, BookOpen, Video, Mic, Heart } from "lucide-react";

// --- Sample Data (replace with actual data from your API) ---

const allResources = [
  {
    id: 1,
    title: "Understanding Anxiety and Panic Attacks",
    category: "Anxiety",
    type: "Article",
    icon: BookOpen,
    summary:
      "A deep dive into the symptoms of anxiety and practical steps to manage panic attacks.",
  },
  {
    id: 2,
    title: "Mindfulness Meditation for Beginners",
    category: "Stress",
    type: "Video",
    icon: Video,
    summary: "A 10-minute guided meditation video to help you find calm.",
  },
  {
    id: 3,
    title: "The Pomodoro Technique for Better Focus",
    category: "Academic",
    type: "Article",
    icon: BookOpen,
    summary: "Learn how to boost your productivity and avoid burnout.",
  },
  {
    id: 4,
    title: "Breathing Exercises for Stress Relief",
    category: "Stress",
    type: "Audio",
    icon: Mic,
    summary: "A short audio guide on diaphragmatic breathing.",
  },
  {
    id: 5,
    title: "Building Healthy Relationships in College",
    category: "Relationships",
    type: "Article",
    icon: BookOpen,
    summary:
      "Tips on communication, boundaries, and making meaningful connections.",
  },
  {
    id: 6,
    title: "Cognitive Behavioral Therapy (CBT) Explained",
    category: "Anxiety",
    type: "Video",
    icon: Video,
    summary: "An animated video explaining the core principles of CBT.",
  },
];

const categories = ["All", "Anxiety", "Stress", "Academic", "Relationships"];

/**
 * A central hub for students to access articles, videos, and other mental wellness resources.
 */
export function ResourceHub() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredResources = allResources
    .filter((resource) =>
      selectedCategory === "All"
        ? true
        : resource.category === selectedCategory
    )
    .filter((resource) =>
      resource.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Resource Hub</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Your library of tools and knowledge for mental wellness.
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm z-10 py-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search for articles, videos..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={
                selectedCategory === category ? "default" : "secondary"
              }
              className="cursor-pointer px-4 py-2 text-sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource) => (
          <Card key={resource.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge variant="outline">{resource.category}</Badge>
                <resource.icon className="h-5 w-5 text-muted-foreground" />
              </div>
              <CardTitle className="pt-4">{resource.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-muted-foreground text-sm">{resource.summary}</p>
            </CardContent>
            <CardFooter>
              <Button variant="secondary" className="w-full">
                View Resource
              </Button>
            </CardFooter>
          </Card>
        ))}
        {filteredResources.length === 0 && (
          <p className="md:col-span-2 lg:col-span-3 text-center text-muted-foreground">
            No resources found. Try adjusting your search or filters.
          </p>
        )}
      </div>
    </div>
  );
}