"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const events = [
    { date: new Date(currentYear, currentMonth, 5), title: "Sunday Service", time: "9:00 AM & 11:00 AM" },
    { date: new Date(currentYear, currentMonth, 12), title: "Sunday Service", time: "9:00 AM & 11:00 AM" },
    { date: new Date(currentYear, currentMonth, 19), title: "Sunday Service", time: "9:00 AM & 11:00 AM" },
    { date: new Date(currentYear, currentMonth, 26), title: "Sunday Service", time: "9:00 AM & 11:00 AM" },
    { date: new Date(currentYear, currentMonth, 7), title: "Bible Study", time: "7:00 PM" },
    { date: new Date(currentYear, currentMonth, 14), title: "Bible Study", time: "7:00 PM" },
    { date: new Date(currentYear, currentMonth, 21), title: "Bible Study", time: "7:00 PM" },
    { date: new Date(currentYear, currentMonth, 28), title: "Bible Study", time: "7:00 PM" },
    { date: new Date(currentYear, currentMonth, 15), title: "Community Outreach", time: "10:00 AM" },
    { date: new Date(currentYear, currentMonth, 22), title: "Youth Group", time: "6:00 PM" },
  ]

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth)
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth)

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-12 border border-muted bg-muted/20"></div>)
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day)
      const dayEvents = events.filter(
        (event) =>
          event.date.getDate() === day &&
          event.date.getMonth() === currentMonth &&
          event.date.getFullYear() === currentYear,
      )

      days.push(
        <div
          key={`day-${day}`}
          className={`min-h-12 border border-muted p-1 ${dayEvents.length > 0 ? "bg-primary/5" : "bg-background"}`}
        >
          <div className="flex justify-between items-start">
            <span className="text-sm font-medium">{day}</span>
            {dayEvents.length > 0 && (
              <span className="inline-flex items-center rounded-full bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">
                {dayEvents.length}
              </span>
            )}
          </div>
          {dayEvents.length > 0 && dayEvents.length <= 2 && (
            <div className="mt-1 space-y-1">
              {dayEvents.map((event, index) => (
                <div key={index} className="text-xs truncate">
                  {event.title}
                </div>
              ))}
            </div>
          )}
          {dayEvents.length > 2 && (
            <div className="mt-1">
              <div className="text-xs truncate">{dayEvents[0].title}</div>
              <div className="text-xs text-muted-foreground">+{dayEvents.length - 1} more</div>
            </div>
          )}
        </div>,
      )
    }

    return days
  }

  const renderEventsList = () => {
    const filteredEvents = events
      .filter((event) => event.date.getMonth() === currentMonth && event.date.getFullYear() === currentYear)
      .sort((a, b) => a.date.getTime() - b.date.getTime())

    return (
      <div className="space-y-4 mt-8">
        <h3 className="text-xl font-bold">Upcoming Events</h3>
        {filteredEvents.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                  <CardDescription>
                    {event.date.toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{event.time}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No events scheduled for this month.</p>
        )}
      </div>
    )
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold">
          {months[currentMonth]} {currentYear}
        </h3>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={handlePrevMonth}>
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous month</span>
          </Button>
          <Button variant="outline" size="icon" onClick={handleNextMonth}>
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next month</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-px">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="h-10 flex items-center justify-center bg-muted font-medium">
            {day}
          </div>
        ))}
        {renderCalendar()}
      </div>

      {renderEventsList()}
    </div>
  )
}

