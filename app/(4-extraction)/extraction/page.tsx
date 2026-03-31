"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CalendarAppointment } from "./calendar-appointment";
import { extractAppointment } from './actions';
import { type AppointmentDetails } from './schemas';

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [appointment, setAppointment] = useState<AppointmentDetails | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setAppointment(null); // Clear previous results
    setError(null);

    const formData = new FormData(e.target as HTMLFormElement);
    const input = formData.get('appointment') as string;

    try {
      const result = await extractAppointment(input);
      setAppointment(result);
    } catch (error) {
      console.error('Extraction failed:', error);
      setError("Extraction failed, try again...");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Extract Appointment</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                name="appointment"
                placeholder="Enter appointment details..."
                className="w-full"
              />
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Extracting..." : "Extract Appointment"}
              </Button>
            </form>
          </CardContent>
        </Card>
        <CalendarAppointment appointment={appointment} />
        {error && <p className="text-sm text-destructive mt-2">{error}</p>}
      </div>
    </div>
  );
}
