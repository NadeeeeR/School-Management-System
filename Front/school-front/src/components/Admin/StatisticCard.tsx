"use client"

import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export function StatisticCard() {
  const [statistics, setStatistics] = useState({
    totalStudents: 0,
    totalTeachers: 0,
    totalCourses: 0,
    totalDepartments: 0,
    totalSalaryPaid: 0,
    averageSalary: 0,
    averageStudentMarks: 0,
    totalHomeworkAssignments: 0,
  })

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("api/Admin/statistics", {
      headers: new Headers({
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      })
    })
      .then(res => {
        if (!res.ok) throw new Error("Network response was not ok")
        return res.json()
      })
      .then(data => {
        // Fallback to 0 if any field is missing or not a number
        setStatistics({
          totalStudents: data.totalStudents ?? 0,
          totalTeachers: data.totalTeachers ?? 0,
          totalCourses: data.totalCourses ?? 0,
          totalDepartments: data.totalDepartments ?? 0,
          totalSalaryPaid: data.totalSalaryPaid ?? 0,
          averageSalary: data.averageSalary ?? 0,
          averageStudentMarks: parseFloat(data.averageStudentMarks) || 0,
          totalHomeworkAssignments: data.totalHomeworkAssignments ?? 0,
        })
        setLoading(false)
      })
      .catch(error => {
        console.error("Error fetching statistics:", error)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <p className="text-muted-foreground">Loading statistics...</p>
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
      <CardItem title="Total Students" value={statistics.totalStudents} />
      <CardItem title="Total Teachers" value={statistics.totalTeachers} />
      <CardItem title="Total Courses" value={statistics.totalCourses} />
      <CardItem title="Total Departments" value={statistics.totalDepartments} />
      <CardItem title="Total Salary Paid" value={`$${statistics.totalSalaryPaid.toLocaleString()}`} />
      <CardItem title="Average Salary" value={`$${statistics.averageSalary.toLocaleString()}`} />
      <CardItem title="Average Student Marks" value={Math.round(statistics.averageStudentMarks)} />
      <CardItem title="Total Homework Assignments" value={statistics.totalHomeworkAssignments} />
    </div>
  )
}

// Minimal sub-component for clarity
function CardItem({ title, value }: { title: string, value: string | number }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="text-2xl font-bold">{value}</div>
      </CardHeader>
      <CardContent>
        <p className="text-xs text-muted-foreground">{title}</p>
      </CardContent>
    </Card>
  )
}

