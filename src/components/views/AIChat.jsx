import { useState, useRef, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../common/Card";
import { Button } from "../common/Button";
import { Input } from "../common/Input";
import { ScrollArea } from "../common/ScrollArea";
import { Badge } from "../common/Badge";
import {
  Send,
  Bot,
  User,
  AlertTriangle,
  Heart,
  Lightbulb,
  Clock,
  Shield,
  Mic,
  StopCircle,
} from "lucide-react";

/**
 * An AI-powered chat interface for users to get immediate support and guidance.
 */
export function AIChat() {
  const [messages, setMessages] = useState([
    {
      id: "1",
      type: "bot",
      content:
        "Hey there! I'm your friendly AI companion, here to listen whenever you need it. Think of me as a safe space to explore your feelings. So, how are you doing today? No pressure to say you're 'fine' if you're not.",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const scrollAreaRef = useRef(null);

  const quickResponses = [
    "Exams are stressing me out",
    "I can't seem to sleep well",
    "Everything feels like too much right now",
    "Feeling a bit lonely lately",
    "Can we talk about managing stress?",
  ];

  /**
   * Generates a bot response based on the user's message.
   * This is a placeholder and should be replaced with a real AI service.
   * @param {string} userMessage - The message from the user.
   * @returns {{content: string, urgency?: 'low' | 'medium' | 'high'}}
   */
  const generateBotResponse = (userMessage) => {
    const lowerCaseMessage = userMessage.toLowerCase();
    let urgency = "low";
    let response =
      "Thank you for sharing that with me. Could you tell me a bit more about what's on your mind?";

    if (lowerCaseMessage.includes("stress")) {
      response =
        "It sounds like you're dealing with a lot of stress. A great technique for managing stress is the 4-7-8 breathing exercise. Would you like to try it together?";
    } else if (lowerCaseMessage.includes("sleep")) {
      response =
        "Sleep issues can be really tough. Sometimes, creating a wind-down routine before bed, like reading a book or listening to calm music, can make a big difference. Have you tried anything like that?";
    } else if (
      lowerCaseMessage.includes("suicide") ||
      lowerCaseMessage.includes("kill myself") ||
      lowerCaseMessage.includes("hopeless")
    ) {
      urgency = "high";
      response =
        "It sounds like you are in a lot of pain right now. It's incredibly brave of you to share this. Please know that help is available. I am connecting you with a crisis support specialist immediately.";
    }

    return { content: response, urgency };
  };

  /**
   * Handles sending a message from the user and triggering a bot response.
   * @param {string} content - The content of the user's message.
   */
  const sendMessage = (content) => {
    if (!content.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      type: "user",
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = generateBotResponse(content);
      const newBotMessage = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: botResponse.content,
        timestamp: new Date(),
        urgency: botResponse.urgency,
      };
      setMessages((prev) => [...prev, newBotMessage]);
      setIsTyping(false);
    }, 1500 + Math.random() * 500);
  };

  const handleToggleRecording = () => {
    setIsRecording(!isRecording);
    // Placeholder for speech-to-text functionality
    if (!isRecording) {
      console.log("Started recording...");
    } else {
      console.log("Stopped recording.");
    }
  };

  // Effect to scroll to the bottom of the chat on new messages
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="h-[calc(100vh-3rem)] flex flex-col">
        <CardHeader className="flex-row items-center justify-between border-b">
          <div className="flex items-center gap-3">
            <Bot className="h-6 w-6 text-primary" />
            <CardTitle>AI Wellness Companion</CardTitle>
          </div>
          <Badge variant="secondary" className="gap-1.5 pl-2">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
            Online
          </Badge>
        </CardHeader>
        <CardContent className="flex-1 p-0">
          <ScrollArea
            ref={scrollAreaRef}
            className="h-[calc(100vh-18rem)] p-6"
          >
            <div className="space-y-6">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${
                    msg.type === "user" ? "justify-end" : ""
                  }`}
                >
                  {msg.type === "bot" && (
                    <Bot className="h-6 w-6 text-primary flex-shrink-0" />
                  )}
                  <div
                    className={`max-w-md p-3 rounded-lg ${
                      msg.type === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    } ${
                      msg.urgency === "high"
                        ? "bg-destructive/20 border border-destructive"
                        : ""
                    }`}
                  >
                    {msg.urgency === "high" && (
                      <div className="flex items-center gap-2 mb-2 font-bold text-destructive">
                        <AlertTriangle className="h-4 w-4" />
                        <span>Urgent Support Alert</span>
                      </div>
                    )}
                    <p className="text-sm">{msg.content}</p>
                    <p className="text-xs opacity-60 mt-2 text-right">
                      {msg.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  {msg.type === "user" && (
                    <User className="h-6 w-6 text-muted-foreground flex-shrink-0" />
                  )}
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-3">
                  <Bot className="h-6 w-6 text-primary" />
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-1">
                      <span className="h-2 w-2 bg-primary rounded-full animate-bounce delay-0"></span>
                      <span className="h-2 w-2 bg-primary rounded-full animate-bounce delay-150"></span>
                      <span className="h-2 w-2 bg-primary rounded-full animate-bounce delay-300"></span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
        <div className="p-4 border-t bg-background">
          <div className="flex gap-2 mb-2 flex-wrap">
            {quickResponses.map((text) => (
              <Button
                key={text}
                variant="outline"
                size="sm"
                onClick={() => sendMessage(text)}
              >
                {text}
              </Button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage(inputValue)}
              placeholder="Type your message..."
              className="flex-1"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={handleToggleRecording}
            >
              {isRecording ? (
                <StopCircle className="text-destructive" />
              ) : (
                <Mic />
              )}
            </Button>
            <Button onClick={() => sendMessage(inputValue)}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}