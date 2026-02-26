import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EmailService, type EmailNotification } from "@/lib/emailService"
import { Envelope, Clock, User } from "@phosphor-icons/react"

export function EmailNotificationsView() {
  const [emails, setEmails] = useState<EmailNotification[]>([])
  const [selectedType, setSelectedType] = useState<string>("all")

  useEffect(() => {
    const loadEmails = async () => {
      const allEmails = await EmailService.getEmailHistory()
      setEmails(allEmails.sort((a, b) => new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime()))
    }
    loadEmails()
  }, [])

  const filteredEmails = selectedType === "all" 
    ? emails 
    : emails.filter(e => e.type === selectedType)

  const getTypeBadgeColor = (type: EmailNotification['type']) => {
    switch (type) {
      case 'welcome':
        return 'bg-green-100 text-green-800 border-green-300'
      case 'password-reset':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'password-changed':
        return 'bg-blue-100 text-blue-800 border-blue-300'
      case 'login-alert':
        return 'bg-purple-100 text-purple-800 border-purple-300'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  const formatType = (type: string) => {
    return type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString('en-GB', {
      dateStyle: 'medium',
      timeStyle: 'short'
    })
  }

  const emailCounts = {
    all: emails.length,
    welcome: emails.filter(e => e.type === 'welcome').length,
    'password-reset': emails.filter(e => e.type === 'password-reset').length,
    'password-changed': emails.filter(e => e.type === 'password-changed').length,
    'login-alert': emails.filter(e => e.type === 'login-alert').length,
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Email Notifications</h2>
        <p className="text-muted-foreground">View all automated email notifications sent by the system</p>
      </div>

      <Tabs value={selectedType} onValueChange={setSelectedType}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">
            All ({emailCounts.all})
          </TabsTrigger>
          <TabsTrigger value="welcome">
            Welcome ({emailCounts.welcome})
          </TabsTrigger>
          <TabsTrigger value="password-reset">
            Reset ({emailCounts['password-reset']})
          </TabsTrigger>
          <TabsTrigger value="password-changed">
            Changed ({emailCounts['password-changed']})
          </TabsTrigger>
          <TabsTrigger value="login-alert">
            Alerts ({emailCounts['login-alert']})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={selectedType} className="mt-6">
          <ScrollArea className="h-[600px] pr-4">
            {filteredEmails.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Envelope size={48} className="text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No emails sent yet</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredEmails.map((email) => (
                  <Card key={email.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <CardTitle className="text-lg">{email.subject}</CardTitle>
                          <CardDescription className="flex items-center gap-4 mt-2">
                            <span className="flex items-center gap-1">
                              <User size={16} />
                              {email.to}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock size={16} />
                              {formatDate(email.sentAt)}
                            </span>
                          </CardDescription>
                        </div>
                        <Badge variant="outline" className={getTypeBadgeColor(email.type)}>
                          {formatType(email.type)}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <pre className="whitespace-pre-wrap text-sm text-muted-foreground font-sans bg-muted p-4 rounded-md">
                        {email.body}
                      </pre>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  )
}
