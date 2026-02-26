import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useKV } from "@github/spark/hooks"
import { toast } from "sonner"
import { 
  ChartLine, 
  Calendar as CalendarIcon, 
  FileText, 
  Chat, 
  CheckCircle,
  Clock,
  Download,
  PaperPlaneTilt,
  House
} from "@phosphor-icons/react"
import type { AuthUser } from "@/components/auth/AuthModal"

interface ClientPortalProps {
  user: AuthUser
  onBackToHome: () => void
}

interface Message {
  id: string
  text: string
  sender: "client" | "team"
  timestamp: string
}

interface Document {
  id: string
  name: string
  type: "proposal" | "invoice" | "contract"
  date: string
  url: string
}

export function ClientPortal({ user, onBackToHome }: ClientPortalProps) {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [messages, setMessages] = useKV<Message[]>(`client-messages-${user.id}`, [
    {
      id: "1",
      text: "Welcome to NextPhase IT! We're excited to work with you. Feel free to reach out with any questions.",
      sender: "team",
      timestamp: new Date().toISOString()
    }
  ])
  const [newMessage, setNewMessage] = useState("")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  
  const [documents] = useKV<Document[]>(`client-documents-${user.id}`, [
    {
      id: "1",
      name: "Systems Audit Proposal",
      type: "proposal",
      date: "2026-01-15",
      url: "#"
    },
    {
      id: "2",
      name: "Initial Invoice - Systems Audit",
      type: "invoice",
      date: "2026-01-20",
      url: "#"
    },
    {
      id: "3",
      name: "Service Agreement",
      type: "contract",
      date: "2026-01-10",
      url: "#"
    }
  ])

  const project = {
    name: "CRM System Implementation",
    status: "In Progress",
    progress: 65,
    currentPhase: "Build & Deploy",
    nextMilestone: "Phase 2 Testing",
    dueDate: "2026-03-15",
    deliverables: [
      { name: "Requirements Gathering", status: "completed", dueDate: "2026-01-31" },
      { name: "System Design", status: "completed", dueDate: "2026-02-15" },
      { name: "Core Development", status: "in-progress", dueDate: "2026-03-01" },
      { name: "Testing & QA", status: "pending", dueDate: "2026-03-10" },
      { name: "Deployment", status: "pending", dueDate: "2026-03-15" }
    ]
  }

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const message: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: "client",
      timestamp: new Date().toISOString()
    }

    setMessages((current) => [...(current || []), message])
    setNewMessage("")
    toast.success("Message sent!")
    
    setTimeout(() => {
      const autoReply: Message = {
        id: (Date.now() + 1).toString(),
        text: "Thank you for your message! Our team will respond within 24 hours.",
        sender: "team",
        timestamp: new Date().toISOString()
      }
      setMessages((current) => [...(current || []), autoReply])
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-bold text-foreground">Client Portal</h1>
          <Button variant="outline" size="sm" onClick={onBackToHome}>
            <House className="mr-2" size={18} />
            Back to Home
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground">Welcome back, {user.name}!</h2>
          <p className="text-muted-foreground mt-1">Track your project progress and manage your account</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-grid">
            <TabsTrigger value="dashboard">
              <ChartLine className="mr-2" size={18} />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="bookings">
              <CalendarIcon className="mr-2" size={18} />
              <span className="hidden sm:inline">Bookings</span>
            </TabsTrigger>
            <TabsTrigger value="documents">
              <FileText className="mr-2" size={18} />
              <span className="hidden sm:inline">Documents</span>
            </TabsTrigger>
            <TabsTrigger value="messages">
              <Chat className="mr-2" size={18} />
              <span className="hidden sm:inline">Messages</span>
            </TabsTrigger>
            <TabsTrigger value="tracker">
              <CheckCircle className="mr-2" size={18} />
              <span className="hidden sm:inline">Tracker</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-4">Project Overview</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Current Project</p>
                    <p className="text-xl font-semibold">{project.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Progress</p>
                    <Progress value={project.progress} className="h-2" />
                    <p className="text-sm text-muted-foreground mt-1">{project.progress}% Complete</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Current Phase</p>
                    <Badge className="mt-1">{project.currentPhase}</Badge>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-4">Next Steps</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-accent mt-1" size={20} />
                    <div>
                      <p className="font-medium">{project.nextMilestone}</p>
                      <p className="text-sm text-muted-foreground">Due: {project.dueDate}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="text-muted-foreground mt-1" size={20} />
                    <div>
                      <p className="font-medium">Review Wireframes</p>
                      <p className="text-sm text-muted-foreground">Action required</p>
                    </div>
                  </div>
                  <Button className="w-full mt-4">View Full Project</Button>
                </div>
              </Card>
            </div>

            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 pb-3 border-b">
                  <CheckCircle className="text-green-600 mt-1" size={18} />
                  <div className="flex-1">
                    <p className="text-sm">System Design phase completed</p>
                    <p className="text-xs text-muted-foreground">2 days ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 pb-3 border-b">
                  <FileText className="text-accent mt-1" size={18} />
                  <div className="flex-1">
                    <p className="text-sm">New invoice uploaded</p>
                    <p className="text-xs text-muted-foreground">5 days ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Chat className="text-accent mt-1" size={18} />
                  <div className="flex-1">
                    <p className="text-sm">Message from NextPhase IT team</p>
                    <p className="text-xs text-muted-foreground">1 week ago</p>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="bookings" className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-4">Schedule a Call</h3>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                  />
                </div>
                <div className="space-y-4">
                  <div>
                    <Label>Select Time</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {["9:00 AM", "10:00 AM", "2:00 PM", "3:00 PM"].map((time) => (
                        <Button key={time} variant="outline" size="sm">
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="booking-notes">Notes (Optional)</Label>
                    <Textarea
                      id="booking-notes"
                      placeholder="Any specific topics you'd like to discuss..."
                      className="mt-2"
                    />
                  </div>
                  <Button className="w-full" onClick={() => toast.success("Booking request sent!")}>
                    Schedule Call
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-4">Upcoming Bookings</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Project Review Meeting</p>
                    <p className="text-sm text-muted-foreground">March 5, 2026 at 2:00 PM</p>
                  </div>
                  <Button variant="outline" size="sm">Reschedule</Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-4">Your Documents</h3>
              <div className="space-y-3">
                {documents?.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <FileText className="text-accent" size={24} />
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {doc.type.charAt(0).toUpperCase() + doc.type.slice(1)} • {doc.date}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2" size={16} />
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="messages" className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-4">Messages</h3>
              <div className="space-y-4">
                <div className="h-96 overflow-y-auto space-y-3 p-4 border rounded-lg bg-muted/20">
                  {messages?.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "client" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[70%] p-3 rounded-lg ${
                          message.sender === "client"
                            ? "bg-accent text-accent-foreground"
                            : "bg-card border"
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {new Date(message.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  />
                  <Button onClick={handleSendMessage}>
                    <PaperPlaneTilt size={18} />
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="tracker" className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-4">Project Tracker</h3>
              <div className="space-y-4">
                {project.deliverables.map((deliverable, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          deliverable.status === "completed" ? "bg-green-100 text-green-700" :
                          deliverable.status === "in-progress" ? "bg-blue-100 text-blue-700" :
                          "bg-gray-100 text-gray-500"
                        }`}>
                          {deliverable.status === "completed" ? <CheckCircle size={20} weight="fill" /> :
                           deliverable.status === "in-progress" ? <Clock size={20} /> :
                           <span className="text-sm font-semibold">{index + 1}</span>}
                        </div>
                        <div>
                          <p className="font-medium">{deliverable.name}</p>
                          <p className="text-sm text-muted-foreground">Due: {deliverable.dueDate}</p>
                        </div>
                      </div>
                      <Badge variant={
                        deliverable.status === "completed" ? "default" :
                        deliverable.status === "in-progress" ? "secondary" :
                        "outline"
                      }>
                        {deliverable.status === "completed" ? "Completed" :
                         deliverable.status === "in-progress" ? "In Progress" :
                         "Pending"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
