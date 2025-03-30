import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { format, addDays } from 'date-fns';
import { ScrollArea } from "@/components/ui/scroll-area";

// Available time slots (24-hour format)
const TIME_SLOTS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
  "18:00", "18:30", "19:00", "19:30", "20:00", "20:30"
];

const TIMEZONES = [
  { value: 'Asia/Kolkata', label: 'IST (UTC+5:30)' },
  { value: 'America/Los_Angeles', label: 'PST (UTC-8)' },
  { value: 'America/New_York', label: 'EST (UTC-5)' }
];

export const DemoBooking = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [level, setLevel] = useState('beginner');
  const [date, setDate] = useState<Date>();
  const [timeSlot, setTimeSlot] = useState<string>();
  const [timezone, setTimezone] = useState(TIMEZONES[0].value);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement demo booking logic
    console.log('Demo booking:', { 
      name, 
      age,
      email, 
      phone, 
      level, 
      date: date?.toISOString(),
      timeSlot,
      timezone 
    });
    setIsOpen(false);
  };

  const formatTimeSlot = (slot: string) => {
    const [hours, minutes] = slot.split(':');
    const time = new Date();
    time.setHours(parseInt(hours));
    time.setMinutes(parseInt(minutes));
    return format(time, 'hh:mm a');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-[#60A5FA] text-[#60A5FA] hover:bg-[#60A5FA] hover:text-white">
          Book Free Demo
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#111827] text-white overflow-y-auto max-h-[90vh] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-[#374151] [&::-webkit-scrollbar-thumb]:bg-[#60A5FA] [&::-webkit-scrollbar-thumb]:rounded-full">
        <DialogHeader>
          <DialogTitle>Book Your Free Demo Class</DialogTitle>
          <DialogDescription className="text-[#94A3B8]">
            Experience a personalized chess lesson with our expert coaches
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-[#1F2937] border-[#374151] text-white"
              required
            />
          </div>
          <div>
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              type="number"
              min="4"
              max="18"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="bg-[#1F2937] border-[#374151] text-white"
              required
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#1F2937] border-[#374151] text-white"
              required
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="bg-[#1F2937] border-[#374151] text-white"
              required
            />
          </div>
          <div>
            <Label htmlFor="level">Chess Level</Label>
            <Select value={level} onValueChange={setLevel}>
              <SelectTrigger className="bg-[#1F2937] border-[#374151] text-white">
                <SelectValue placeholder="Select your level" />
              </SelectTrigger>
              <SelectContent className="bg-[#1F2937] border-[#374151]">
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Preferred Date</Label>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              disabled={(date) => {
                const now = new Date();
                return date < now || date > addDays(now, 30);
              }}
              className="rounded-md border border-[#374151] bg-[#1F2937] text-white p-4"
            />
          </div>
          <div>
            <Label>Preferred Time</Label>
            <Select value={timeSlot} onValueChange={setTimeSlot}>
              <SelectTrigger className="bg-[#1F2937] border-[#374151] text-white">
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent className="bg-[#1F2937] border-[#374151] max-h-[200px] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-[#374151] [&::-webkit-scrollbar-thumb]:bg-[#60A5FA] [&::-webkit-scrollbar-thumb]:rounded-full">
                {TIME_SLOTS.map((slot) => (
                  <SelectItem 
                    key={slot} 
                    value={slot}
                    className="cursor-pointer hover:bg-[#374151] transition-colors py-2"
                  >
                    {formatTimeSlot(slot)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Timezone</Label>
            <Select value={timezone} onValueChange={setTimezone}>
              <SelectTrigger className="bg-[#1F2937] border-[#374151] text-white">
                <SelectValue placeholder="Select timezone" />
              </SelectTrigger>
              <SelectContent className="bg-[#1F2937] border-[#374151]">
                {TIMEZONES.map((tz) => (
                  <SelectItem key={tz.value} value={tz.value}>
                    {tz.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full bg-[#60A5FA] text-white hover:bg-[#3B82F6]">
            Schedule Demo
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}; 