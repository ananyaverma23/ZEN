import { useState } from "react";
import { Button } from "../common/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../common/Card";
import { Input } from "../common/Input";
import { Label } from "../common/Label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../common/Tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../common/Select";
import { Eye, EyeOff, ArrowLeft, GraduationCap, UserRoundCog, Shield } from "lucide-react";
import { UserTypeSelector } from '../UserTypeSelector';

/**
 * A page component that handles both user login and registration.
 *
 * @param {object} props - Component props.
 * @param {(userType: string, userData: object) => void} props.onLogin - Callback to handle successful login/signup.
 * @param {() => void} props.onBack - Callback to return to the previous page.
 */
export function AuthPage({ onLogin, onBack }) {
  const [activeTab, setActiveTab] = useState("login");
  const [userType, setUserType] = useState("student");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    username: "",
    college: "",
    studentId: "",
    department: "",
    yearOfStudy: "",
    licenseNumber: "",
    specialization: "",
    experience: "",
  });

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError(""); // Clear error on new input
  };

  /**
   * Validates the form data based on the active tab and user type.
   * @returns {boolean} - True if the form is valid, otherwise false.
   */
  const validateForm = () => {
    const { email, password, confirmPassword, fullName, username } = formData;
    if (!email || !password) {
      setError("Email and password are required.");
      return false;
    }
    if (activeTab === "signup") {
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return false;
      }
      if (userType === "student" && !username) {
        setError("Username is required for students.");
        return false;
      }
      if (userType !== "student" && !fullName) {
        setError("Full name is required.");
        return false;
      }
    }
    return true;
  };

  /**
   * Handles form submission for both login and signup.
   * @param {React.FormEvent} e - The form event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    // In a real application, you would make an API call here.
    // For this example, we'll simulate a successful login/signup.
    console.log("Form submitted:", { activeTab, userType, formData });
    setError("");
    // Simulate creating user data and logging in
    const newUserData = {
      email: formData.email,
      userType: userType,
      ... (userType === "student"
        ? { username: formData.username }
        : { fullName: formData.fullName }),
    };
    onLogin(userType, newUserData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted via-background to-accent/20 flex items-center justify-center p-4">
      <div className="relative w-full max-w-md">
        <Button
          variant="ghost"
          size="icon"
          className="absolute -top-12 left-0"
          onClick={onBack}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          {/* LOGIN TAB */}
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Welcome Back</CardTitle>
                <CardDescription>
                  Enter your credentials to access your account.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="m@example.com"
                      required
                      value={formData.email}
                      onChange={(e) => updateFormData("email", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2 relative">
                    <Label htmlFor="login-password">Password</Label>
                    <Input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={formData.password}
                      onChange={(e) =>
                        updateFormData("password", e.target.value)
                      }
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute bottom-2 right-3 text-muted-foreground"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {error && (
                    <p className="text-sm text-destructive">{error}</p>
                  )}
                  <Button type="submit" className="w-full">
                    Login
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          {/* SIGN UP TAB */}
          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle>Create an Account</CardTitle>
                <CardDescription>
                  Choose your role and fill in the details to get started.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <UserTypeSelector
                  selectedType={userType}
                  onSelectType={setUserType}
                />
                <form onSubmit={handleSubmit} className="space-y-4">
                  {userType === "student" ? (
                    <div className="space-y-2">
                      <Label htmlFor="signup-username">Username</Label>
                      <Input
                        id="signup-username"
                        placeholder="john_doe"
                        required
                        value={formData.username}
                        onChange={(e) =>
                          updateFormData("username", e.target.value)
                        }
                      />
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Label htmlFor="signup-fullname">Full Name</Label>
                      <Input
                        id="signup-fullname"
                        placeholder="John Doe"
                        required
                        value={formData.fullName}
                        onChange={(e) =>
                          updateFormData("fullName", e.target.value)
                        }
                      />
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="m@example.com"
                      required
                      value={formData.email}
                      onChange={(e) => updateFormData("email", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2 relative">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={formData.password}
                      onChange={(e) =>
                        updateFormData("password", e.target.value)
                      }
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute bottom-2 right-3 text-muted-foreground"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-confirm-password">
                      Confirm Password
                    </Label>
                    <Input
                      id="signup-confirm-password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        updateFormData("confirmPassword", e.target.value)
                      }
                    />
                  </div>
                  {error && (
                    <p className="text-sm text-destructive">{error}</p>
                  )}
                  <Button type="submit" className="w-full">
                    Create Account
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}