"use client"
import { Header } from "@/components/Admin/Header"
import { StudentList } from "@/components/Admin/StudentList"
import { TeacherList } from "@/components/Admin/TeacherList"
import { CourseList } from "@/components/Admin/CourseList"
import { DepartmentList } from "@/components/Admin/DepartmentList"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

export default function AdminDashboard() {
  const [role, setRole] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const decodedToken = jwtDecode(token) as any;
      setRole(decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]);
    }
  }, []);

  if (role !== "Admin") {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
          <Card className="w-full max-w-md shadow-lg">
            <CardHeader className="border-b">
              <CardTitle className="text-2xl font-bold text-destructive">Access Denied</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <p className="text-gray-600">You don't have administrator privileges to access this page.</p>
              <Button 
                onClick={() => window.location.href = "/"}
                className="w-full bg-primary hover:bg-primary/90"
              >
                Return to Home
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage all system entities from this centralized panel</p>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gray-100">
            <TabsTrigger value="overview" className="data-[state=active]:bg-white">
              Overview
            </TabsTrigger>
            <TabsTrigger value="students" className="data-[state=active]:bg-white">
              Students
            </TabsTrigger>
            <TabsTrigger value="teachers" className="data-[state=active]:bg-white">
              Teachers
            </TabsTrigger>
            <TabsTrigger value="management" className="data-[state=active]:bg-white">
              Manage
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
              <DashboardCard 
                title="Total Students" 
                value="2" 
                icon={<UsersIcon className="h-6 w-6" />}
                trend="up"
              />
              <DashboardCard 
                title="Active Teachers" 
                value="3" 
                icon={<ChalkboardTeacherIcon className="h-6 w-6" />}
                trend="stable"
              />
              <DashboardCard 
                title="Courses Offered" 
                value="2" 
                icon={<BookOpenIcon className="h-6 w-6" />}
                trend="up"
              />
              <DashboardCard 
                title="Departments" 
                value="3" 
                icon={<BuildingIcon className="h-6 w-6" />}
                trend="stable"
              />
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <ActivityTimeline />
                </CardContent>
              </Card>
             
            </div>
          </TabsContent>

          <TabsContent value="students">
            <StudentList />
          </TabsContent>

          <TabsContent value="teachers">
            <TeacherList />
          </TabsContent>

          <TabsContent value="management">
            <div className="grid grid-cols-1 gap-6">
              <CourseList />
              <DepartmentList />
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

// Helper components (add these to your components folder)
function DashboardCard({ title, value, icon, trend }: { title: string, value: string, icon: React.ReactNode, trend: 'up' | 'down' | 'stable' }) {
  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
        <div className="p-2 rounded-lg bg-gray-100">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {trend === 'up' && (
          <p className="text-xs text-green-500 mt-1">↑ 12% from last month</p>
        )}
        {trend === 'down' && (
          <p className="text-xs text-red-500 mt-1">↓ 5% from last month</p>
        )}
        {trend === 'stable' && (
          <p className="text-xs text-gray-500 mt-1">↔ No change</p>
        )}
      </CardContent>
    </Card>
  )
}

function ActivityTimeline() {
  const activities = [
    { id: 1, action: 'New student registration', time: '10 minutes ago', user: 'John Doe' },
    { id: 2, action: 'Course updated', time: '1 hour ago', user: 'Jane Smith' },
    { id: 3, action: 'Grade submission', time: '2 hours ago', user: 'Robert Johnson' },
    { id: 4, action: 'System maintenance', time: '5 hours ago', user: 'System Admin' },
  ]
  
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start gap-3">
          <div className="flex-shrink-0 h-2 w-2 mt-2 rounded-full bg-primary" />
          <div>
            <p className="font-medium">{activity.action}</p>
            <p className="text-sm text-gray-500">
              {activity.time} • by {activity.user}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

// Icons (you can use lucide-react or similar)
function UsersIcon(props: any) { return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> }
function ChalkboardTeacherIcon(props: any) { return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> }
function BookOpenIcon(props: any) { return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg> }
function BuildingIcon(props: any) { return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16m14 0H3m14 0h2m-2 0h2"/></svg> }
function PlusIcon(props: any) { return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> }
function FileTextIcon(props: any) { return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg> }
function SettingsIcon(props: any) { return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg> }