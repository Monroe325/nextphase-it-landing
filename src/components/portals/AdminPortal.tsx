import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { useKV } from "@github/spark/hooks"
import { toast } from "sonner"
import { 
  Users, 
  Chat, 
  Calendar, 
  FolderOpen, 
  ChartLine, 
  CurrencyDollar, 
  Bell,
  House,
  MagnifyingGlass,
  CheckCircle,
  XCircle,
  Clock,
  TrendUp
} from "@phosphor-icons/react"
import type { AuthUser } from "@/components/auth/AuthModal"

interface AdminPortalProps {
  onBackToHome: () => void
}

interface Lead {
  id: string
  name: string
  email: string
  company: string
  stage: "New" | "Contacted" | "Qualified" | "Proposal" | "Won" | "Lost"
  value: number
  createdAt: string
}

export function AdminPortal({ onBackToHome }: AdminPortalProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchQuery, setSearchQuery] = useState("")
  const [users] = useKV<AuthUser[]>("auth-users", [])
  const [leads, setLeads] = useKV<Lead[]>("admin-leads", [
    {
      id: "1",
      name: "John Smith",
      email: "john@example.com",
      company: "Smith Construction Ltd",
      stage: "Qualified",
      value: 15000,
      createdAt: "2026-02-15"
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah@example.com",
      company: "Johnson Plumbing",
      stage: "Proposal",
      value: 8500,
      createdAt: "2026-02-20"
    },
    {
      id: "3",
      name: "Mike Williams",
      email: "mike@example.com",
      company: "Williams Electrical",
      stage: "New",
      value: 12000,
      createdAt: "2026-02-28"
    }
  ])

  const notifications = [
    { id: "1", type: "signup", message: "New user registered: Emma Davis", time: "5 minutes ago" },
    { id: "2", type: "booking", message: "New booking from John Smith", time: "1 hour ago" },
    { id: "3", type: "message", message: "New message in client portal", time: "2 hours ago" },
    { id: "4", type: "payment", message: "Payment received: £5,000", time: "3 hours ago" }
  ]

  const projects = [
    { id: "1", client: "Smith Construction", name: "CRM Implementation", status: "In Progress", progress: 65 },
    { id: "2", client: "Johnson Plumbing", name: "Workflow Automation", status: "Planning", progress: 20 },
    { id: "3", client: "Williams Electrical", name: "Dashboard Development", status: "Testing", progress: 85 }
  ]

  const bookings = [
    { id: "1", client: "John Smith", type: "Systems Audit", date: "2026-03-05", time: "2:00 PM", status: "confirmed" },
    { id: "2", client: "Sarah Johnson", type: "Follow-up Call", date: "2026-03-08", time: "10:00 AM", status: "pending" },
    { id: "3", client: "Mike Williams", type: "Demo Session", date: "2026-03-10", time: "3:00 PM", status: "confirmed" }
  ]

  const invoices = [
    { id: "1", client: "Smith Construction", amount: 5000, status: "paid", dueDate: "2026-02-15" },
    { id: "2", client: "Johnson Plumbing", amount: 3500, status: "overdue", dueDate: "2026-02-20" },
    { id: "3", client: "Williams Electrical", amount: 7500, status: "pending", dueDate: "2026-03-05" }
  ]

  const analytics = {
    totalVisitors: 2847,
    conversionRate: 3.2,
    totalBookings: 28,
    revenue: 45000
  }

  const handleSuspendUser = (userId: string) => {
    toast.success("User account suspended")
  }

  const handleActivateUser = (userId: string) => {
    toast.success("User account activated")
  }

  const handleUpdateLeadStage = (leadId: string, newStage: Lead["stage"]) => {
    setLeads((current) => 
      (current || []).map(lead => 
        lead.id === leadId ? { ...lead, stage: newStage } : lead
      )
    )
    toast.success(`Lead moved to ${newStage}`)
  }

  const filteredUsers = users?.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  ) || []

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-bold text-foreground">Admin Portal</h1>
          <Button variant="outline" size="sm" onClick={onBackToHome}>
            <House className="mr-2" size={18} />
            Back to Home
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground">System Overview</h2>
          <p className="text-muted-foreground mt-1">Complete control and monitoring of NextPhase IT</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 lg:w-auto lg:inline-grid">
            <TabsTrigger value="overview">
              <ChartLine className="mr-2" size={18} />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="users">
              <Users className="mr-2" size={18} />
              <span className="hidden sm:inline">Users</span>
            </TabsTrigger>
            <TabsTrigger value="conversations">
              <Chat className="mr-2" size={18} />
              <span className="hidden sm:inline">Messages</span>
            </TabsTrigger>
            <TabsTrigger value="bookings">
              <Calendar className="mr-2" size={18} />
              <span className="hidden sm:inline">Bookings</span>
            </TabsTrigger>
            <TabsTrigger value="projects">
              <FolderOpen className="mr-2" size={18} />
              <span className="hidden sm:inline">Projects</span>
            </TabsTrigger>
            <TabsTrigger value="leads">
              <TrendUp className="mr-2" size={18} />
              <span className="hidden sm:inline">Leads</span>
            </TabsTrigger>
            <TabsTrigger value="invoices">
              <CurrencyDollar className="mr-2" size={18} />
              <span className="hidden sm:inline">Invoices</span>
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="mr-2" size={18} />
              <span className="hidden sm:inline">Alerts</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-4">
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Visitors</p>
                    <p className="text-2xl font-bold mt-1">{analytics.totalVisitors.toLocaleString()}</p>
                  </div>
                  <ChartLine className="text-accent" size={32} />
                </div>
                <p className="text-xs text-muted-foreground mt-4">Last 30 days</p>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Conversion Rate</p>
                    <p className="text-2xl font-bold mt-1">{analytics.conversionRate}%</p>
                  </div>
                  <TrendUp className="text-green-600" size={32} />
                </div>
                <p className="text-xs text-green-600 mt-4">+0.5% from last month</p>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Bookings</p>
                    <p className="text-2xl font-bold mt-1">{analytics.totalBookings}</p>
                  </div>
                  <Calendar className="text-accent" size={32} />
                </div>
                <p className="text-xs text-muted-foreground mt-4">This month</p>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Revenue</p>
                    <p className="text-2xl font-bold mt-1">£{analytics.revenue.toLocaleString()}</p>
                  </div>
                  <CurrencyDollar className="text-green-600" size={32} />
                </div>
                <p className="text-xs text-muted-foreground mt-4">This quarter</p>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {notifications.slice(0, 5).map((notif) => (
                    <div key={notif.id} className="flex items-start gap-3 pb-3 border-b last:border-0">
                      <div className="flex-1">
                        <p className="text-sm">{notif.message}</p>
                        <p className="text-xs text-muted-foreground">{notif.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-4">Lead Pipeline</h3>
                <div className="space-y-3">
                  {["New", "Contacted", "Qualified", "Proposal", "Won"].map((stage) => {
                    const count = leads?.filter(l => l.stage === stage).length || 0
                    return (
                      <div key={stage} className="flex items-center justify-between">
                        <span className="text-sm">{stage}</span>
                        <Badge variant="secondary">{count}</Badge>
                      </div>
                    )
                  })}
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">User Management</h3>
                <div className="relative w-64">
                  <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <Input
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-3">
                {filteredUsers.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No users found. Create a new account to get started.</p>
                ) : (
                  filteredUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant={user.role === "admin" ? "default" : "secondary"}>
                            {user.role}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            Joined {new Date(user.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleSuspendUser(user.id)}
                        >
                          Suspend
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="conversations" className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-4">All Conversations</h3>
              <div className="space-y-3">
                {users?.slice(0, 5).map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="flex-1">
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">Last message: 2 hours ago</p>
                    </div>
                    <Badge variant="secondary">3 messages</Badge>
                  </div>
                )) || (
                  <p className="text-center text-muted-foreground py-8">No conversations yet</p>
                )}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="bookings" className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-4">All Bookings</h3>
              <div className="space-y-3">
                {bookings.map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium">{booking.client}</p>
                      <p className="text-sm text-muted-foreground">{booking.type}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {booking.date} at {booking.time}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={booking.status === "confirmed" ? "default" : "secondary"}>
                        {booking.status}
                      </Badge>
                      <Button variant="outline" size="sm">Manage</Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-4">All Projects</h3>
              <div className="space-y-4">
                {projects.map((project) => (
                  <div key={project.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-medium">{project.name}</p>
                        <p className="text-sm text-muted-foreground">{project.client}</p>
                      </div>
                      <Badge>{project.status}</Badge>
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{project.progress}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-accent transition-all"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="leads" className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-4">Lead Pipeline</h3>
              <div className="space-y-3">
                {leads?.map((lead) => (
                  <div key={lead.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-medium">{lead.name}</p>
                        <p className="text-sm text-muted-foreground">{lead.company}</p>
                        <p className="text-sm text-muted-foreground">{lead.email}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">£{lead.value.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">{lead.createdAt}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <select 
                        value={lead.stage}
                        onChange={(e) => handleUpdateLeadStage(lead.id, e.target.value as Lead["stage"])}
                        className="text-sm border rounded px-2 py-1"
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Qualified">Qualified</option>
                        <option value="Proposal">Proposal</option>
                        <option value="Won">Won</option>
                        <option value="Lost">Lost</option>
                      </select>
                      <Button variant="outline" size="sm">View Details</Button>
                    </div>
                  </div>
                )) || <p className="text-center text-muted-foreground py-8">No leads yet</p>}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="invoices" className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-4">Invoice Management</h3>
              <div className="space-y-3">
                {invoices.map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium">{invoice.client}</p>
                      <p className="text-sm text-muted-foreground">Due: {invoice.dueDate}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="font-semibold">£{invoice.amount.toLocaleString()}</p>
                      <Badge variant={
                        invoice.status === "paid" ? "default" :
                        invoice.status === "overdue" ? "destructive" :
                        "secondary"
                      }>
                        {invoice.status === "paid" && <CheckCircle className="mr-1" size={14} />}
                        {invoice.status === "overdue" && <XCircle className="mr-1" size={14} />}
                        {invoice.status === "pending" && <Clock className="mr-1" size={14} />}
                        {invoice.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-4">System Notifications</h3>
              <div className="space-y-3">
                {notifications.map((notif) => (
                  <div key={notif.id} className="flex items-start gap-3 p-4 border rounded-lg">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      notif.type === "signup" ? "bg-blue-100 text-blue-700" :
                      notif.type === "booking" ? "bg-green-100 text-green-700" :
                      notif.type === "message" ? "bg-purple-100 text-purple-700" :
                      "bg-yellow-100 text-yellow-700"
                    }`}>
                      {notif.type === "signup" && <Users size={18} />}
                      {notif.type === "booking" && <Calendar size={18} />}
                      {notif.type === "message" && <Chat size={18} />}
                      {notif.type === "payment" && <CurrencyDollar size={18} />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{notif.message}</p>
                      <p className="text-xs text-muted-foreground">{notif.time}</p>
                    </div>
                    <Button variant="ghost" size="sm">Dismiss</Button>
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
