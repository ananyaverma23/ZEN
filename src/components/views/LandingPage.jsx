import { Button } from "../common/Button";
import { Brain, ShieldCheck, Users, MessageCircle } from "lucide-react";

/**
 * The landing page for the application, designed to attract and inform new users.
 *
 * @param {object} props - Component props.
 * @param {() => void} props.onGetStarted - Callback function for the "Get Started" button.
 * @param {() => void} props.onLogin - Callback function for the "Login" button.
 */
export function LandingPage({ onGetStarted, onLogin }) {
  const features = [
    {
      icon: MessageCircle,
      title: "AI-Powered Chat",
      description:
        "Get instant, confidential support from our AI companion, available 24/7.",
    },
    {
      icon: Users,
      title: "Professional Counselors",
      description:
        "Book sessions with licensed and experienced mental health professionals.",
    },
    {
      icon: ShieldCheck,
      title: "Safe & Secure",
      description:
        "Your privacy is our top priority. All conversations are encrypted and confidential.",
    },
  ];

  const testimonials = [
    {
      quote:
        "This platform helped me through a really tough semester. The AI chat was surprisingly helpful for late-night anxiety.",
      author: "Priya K., 2nd Year Engineering",
    },
    {
      quote:
        "Booking a session was so much easier than I thought. I found a counselor who really understands the pressure of university life.",
      author: "Rohan M., 4th Year Arts",
    },
  ];

  return (
    <div className="bg-background text-foreground">
      {/* Header */}
      <header className="py-4 px-8 flex justify-between items-center border-b">
        <div className="flex items-center gap-3">
          <Brain className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold">MindWell</h1>
        </div>
        <nav>
          <Button variant="ghost" onClick={onLogin}>
            Login
          </Button>
          <Button onClick={onGetStarted}>Get Started</Button>
        </nav>
      </header>

      {/* Hero Section */}
      <main>
        <section className="text-center py-20 px-8">
          <h2 className="text-5xl font-bold tracking-tight">
            Your Mental Wellness, Prioritized.
          </h2>
          <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">
            A safe and supportive space for students to navigate the challenges
            of university life. Confidential, accessible, and designed for you.
          </p>
          <div className="mt-8">
            <Button size="lg" onClick={onGetStarted}>
              Get Started for Free
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-8 bg-muted">
          <div className="max-w-5xl mx-auto">
            <h3 className="text-3xl font-bold text-center mb-12">
              How We Support You
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-primary/10 rounded-full">
                      <feature.icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <h4 className="text-xl font-semibold">{feature.title}</h4>
                  <p className="mt-2 text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 px-8">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-center mb-12">
              What Students Are Saying
            </h3>
            <div className="space-y-8">
              {testimonials.map((testimonial, index) => (
                <blockquote
                  key={index}
                  className="p-6 border-l-4 border-primary bg-muted"
                >
                  <p className="italic text-lg">"{testimonial.quote}"</p>
                  <footer className="mt-4 font-semibold">
                    - {testimonial.author}
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 px-8 border-t bg-muted">
        <div className="max-w-5xl mx-auto text-center text-muted-foreground">
          <p>&copy; 2025 MindWell. All rights reserved.</p>
          <nav className="mt-4 flex justify-center gap-4">
            <a href="#" className="hover:text-primary">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary">
              Terms of Service
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
}