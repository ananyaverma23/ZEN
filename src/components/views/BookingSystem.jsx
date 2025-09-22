import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../common/Card";
import { Button } from "../common/Button";
import { Calendar } from "../common/Calendar";
import { Avatar, AvatarFallback, AvatarImage } from "../common/Avatar";
import { Badge } from "../common/Badge";
import { ArrowLeft, CheckCircle } from "lucide-react";

// --- Sample Data (replace with actual data from your API) ---

const services = [
  { id: 1, name: "Academic Stress Counseling", duration: 50 },
  { id: 2, name: "Anxiety & Depression Support", duration: 50 },
  { id: 3, name: "Relationship Guidance", duration: 50 },
  { id: 4, name: "General Check-in", duration: 30 },
];

const counselors = [
  {
    id: "c1",
    name: "Dr. Anya Sharma",
    specialization: "Cognitive Behavioral Therapy",
    avatarUrl: "/avatars/01.png",
  },
  {
    id: "c2",
    name: "Mr. Rohan Verma",
    specialization: "Stress Management",
    avatarUrl: "/avatars/02.png",
  },
  {
    id: "c3",
    name: "Ms. Priya Singh",
    specialization: "Mindfulness & Anxiety",
    avatarUrl: "/avatars/03.png",
  },
  {
    id: "c4",
    name: "Dr. Arshi Verma",
    specialization: "Post Traumatic Stress Disorder",
    avatarUrl: "/avatars/02.png",
  },
];

const availableTimes = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
];

/**
 * A multi-step interface for students to book appointments with counselors.
 */
export function BookingSystem() {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedCounselor, setSelectedCounselor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);

  const handleNextStep = () => setStep((s) => s + 1);
  const handlePrevStep = () => setStep((s) => s - 1);

  const selectService = (service) => {
    setSelectedService(service);
    handleNextStep();
  };

  const selectCounselor = (counselor) => {
    setSelectedCounselor(counselor);
    handleNextStep();
  };

  const selectTime = (time) => {
    setSelectedTime(time);
  };

  const confirmBooking = () => {
    // API call to confirm booking would go here
    console.log("Booking Confirmed:", {
      service: selectedService,
      counselor: selectedCounselor,
      date: selectedDate,
      time: selectedTime,
    });
    handleNextStep();
  };
  
  const resetFlow = () => {
    setStep(1);
    setSelectedService(null);
    setSelectedCounselor(null);
    setSelectedDate(new Date());
    setSelectedTime(null);
  };

  // --- Render Logic for Each Step ---

  const renderStep1_Services = () => (
    <Card>
      <CardHeader>
        <CardTitle>Step 1: Choose a Service</CardTitle>
        <CardDescription>
          Select the type of support you're looking for.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {services.map((service) => (
          <Button
            key={service.id}
            variant="outline"
            className="h-auto justify-start text-left"
            onClick={() => selectService(service)}
          >
            <div>
              <p className="font-semibold">{service.name}</p>
              <p className="text-sm text-muted-foreground">
                {service.duration} minutes
              </p>
            </div>
          </Button>
        ))}
      </CardContent>
    </Card>
  );

  const renderStep2_Counselors = () => (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={handlePrevStep}>
            <ArrowLeft />
          </Button>
          <div>
            <CardTitle>Step 2: Choose a Counselor</CardTitle>
            <CardDescription>
              Select a counselor who fits your needs.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        {counselors.map((counselor) => (
          <div
            key={counselor.id}
            className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent cursor-pointer"
            onClick={() => selectCounselor(counselor)}
          >
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src={counselor.avatarUrl} />
                <AvatarFallback>{counselor.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{counselor.name}</p>
                <p className="text-sm text-muted-foreground">
                  {counselor.specialization}
                </p>
              </div>
            </div>
            <Button variant="secondary">Select</Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );

  const renderStep3_DateTime = () => (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={handlePrevStep}>
            <ArrowLeft />
          </Button>
          <div>
            <CardTitle>Step 3: Pick a Date & Time</CardTitle>
            <CardDescription>
              Booking with{" "}
              <span className="font-semibold">{selectedCounselor.name}</span>
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="grid md:grid-cols-2 gap-8">
        <div>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border"
          />
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-lg">Available Times</h3>
          <div className="grid grid-cols-2 gap-2">
            {availableTimes.map((time) => (
              <Button
                key={time}
                variant={selectedTime === time ? "default" : "outline"}
                onClick={() => selectTime(time)}
              >
                {time}
              </Button>
            ))}
          </div>
          <Button
            className="mt-auto"
            disabled={!selectedTime}
            onClick={confirmBooking}
          >
            Confirm Booking
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderStep4_Confirmation = () => (
    <Card>
      <CardHeader className="text-center">
        <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
        <CardTitle className="text-2xl">Booking Confirmed!</CardTitle>
        <CardDescription>
          Your appointment has been successfully scheduled.
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <div className="p-4 bg-muted rounded-lg">
          <p>
            <strong>Service:</strong> {selectedService.name}
          </p>
          <p>
            <strong>Counselor:</strong> {selectedCounselor.name}
          </p>
          <p>
            <strong>Date:</strong> {selectedDate.toLocaleDateString()}
          </p>
          <p>
            <strong>Time:</strong> {selectedTime}
          </p>
        </div>
        <Button onClick={resetFlow}>Book Another Appointment</Button>
      </CardContent>
    </Card>
  );

  const renderStep = () => {
    switch (step) {
      case 1:
        return renderStep1_Services();
      case 2:
        return renderStep2_Counselors();
      case 3:
        return renderStep3_DateTime();
      case 4:
        return renderStep4_Confirmation();
      default:
        return renderStep1_Services();
    }
  };

  return <div className="max-w-4xl mx-auto p-6">{renderStep()}</div>;
}