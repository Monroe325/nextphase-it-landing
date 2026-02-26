import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog"
import { useKV } from "@github/spark/hooks"
import { toast } from "sonner"
import { 
  UserPlus, 
  MagnifyingGlass, 
  PencilSimple, 
  Trash,
  ShieldCheck,
  User as UserIcon,
  LockKey,
  EnvelopeSimple,
  Warning,
  CheckCircle,
  XCircle
} from "@phosphor-icons/react"
import type { AuthUser } from "@/components/auth/AuthModal"
import { EmailService } from "@/lib/emailService"

export function AdminUserManagement() {
  const [users, setUsers] = useKV<AuthUser[]>("auth-users", [])
  const [searchQuery, setSearchQuery] = useState("")
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<AuthUser | null>(null)
  
  const [formName, setFormName] = useState("")
  const [formEmail, setFormEmail] = useState("")
  const [formRole, setFormRole] = useState<"admin" | "client">("client")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const filteredUsers = users?.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  ) || []

  const adminUsers = filteredUsers.filter(u => u.role === "admin")
  const clientUsers = filteredUsers.filter(u => u.role === "client")

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const existingUser = users?.find(u => u.email === formEmail.toLowerCase())
    if (existingUser) {
      toast.error("A user with this email already exists")
      setIsSubmitting(false)
      return
    }

    if (!formName.trim() || !formEmail.trim()) {
      toast.error("Please fill in all fields")
      setIsSubmitting(false)
      return
    }

    const newUser: AuthUser = {
      id: `admin-${Date.now()}`,
      email: formEmail.toLowerCase(),
      name: formName,
      role: formRole,
      createdAt: new Date().toISOString(),
      emailVerified: true
    }

    setUsers((current) => [...(current || []), newUser])
    
    await EmailService.sendAdminWelcomeEmail(newUser.email, newUser.name, formRole)
    
    toast.success(`${formRole === "admin" ? "Admin" : "User"} created successfully`, {
      description: `Welcome email sent to ${formEmail}`
    })

    setFormName("")
    setFormEmail("")
    setFormRole("client")
    setCreateModalOpen(false)
    setIsSubmitting(false)
  }

  const handleEditUser = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedUser) return
    setIsSubmitting(true)

    const emailChanged = selectedUser.email !== formEmail.toLowerCase()
    
    if (emailChanged) {
      const existingUser = users?.find(u => u.email === formEmail.toLowerCase() && u.id !== selectedUser.id)
      if (existingUser) {
        toast.error("A user with this email already exists")
        setIsSubmitting(false)
        return
      }
    }

    setUsers((current) =>
      (current || []).map(user =>
        user.id === selectedUser.id
          ? { ...user, name: formName, email: formEmail.toLowerCase(), role: formRole }
          : user
      )
    )

    toast.success("User updated successfully")
    
    setEditModalOpen(false)
    setSelectedUser(null)
    setFormName("")
    setFormEmail("")
    setFormRole("client")
    setIsSubmitting(false)
  }

  const handleDeleteUser = async () => {
    if (!selectedUser) return
    setIsSubmitting(true)

    if (selectedUser.role === "admin") {
      const adminCount = users?.filter(u => u.role === "admin").length || 0
      if (adminCount <= 1) {
        toast.error("Cannot delete the last admin user", {
          description: "At least one admin must remain in the system"
        })
        setIsSubmitting(false)
        return
      }
    }

    setUsers((current) => (current || []).filter(user => user.id !== selectedUser.id))
    
    toast.success("User deleted successfully")
    
    setDeleteModalOpen(false)
    setSelectedUser(null)
    setIsSubmitting(false)
  }

  const handleToggleRole = async (user: AuthUser) => {
    if (user.role === "admin") {
      const adminCount = users?.filter(u => u.role === "admin").length || 0
      if (adminCount <= 1) {
        toast.error("Cannot demote the last admin user", {
          description: "At least one admin must remain in the system"
        })
        return
      }
    }

    const newRole = user.role === "admin" ? "client" : "admin"
    
    setUsers((current) =>
      (current || []).map(u =>
        u.id === user.id ? { ...u, role: newRole } : u
      )
    )

    toast.success(`User ${newRole === "admin" ? "promoted to" : "demoted from"} admin`)
  }

  const openEditModal = (user: AuthUser) => {
    setSelectedUser(user)
    setFormName(user.name)
    setFormEmail(user.email)
    setFormRole(user.role)
    setEditModalOpen(true)
  }

  const openDeleteModal = (user: AuthUser) => {
    setSelectedUser(user)
    setDeleteModalOpen(true)
  }

  const resetForm = () => {
    setFormName("")
    setFormEmail("")
    setFormRole("client")
    setSelectedUser(null)
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="font-semibold text-xl">Admin User Management</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Create and manage administrator and client accounts
            </p>
          </div>
          <Button onClick={() => {
            resetForm()
            setCreateModalOpen(true)
          }}>
            <UserPlus className="mr-2" size={18} />
            Create User
          </Button>
        </div>

        <div className="relative mb-6">
          <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <Input
            placeholder="Search users by name, email, or role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-3 mb-6">
          <Card className="p-4 bg-muted/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                <UserIcon className="text-accent" size={20} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold">{users?.length || 0}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 bg-muted/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                <ShieldCheck className="text-purple-600" size={20} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Admins</p>
                <p className="text-2xl font-bold">{adminUsers.length}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 bg-muted/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                <UserIcon className="text-blue-600" size={20} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Clients</p>
                <p className="text-2xl font-bold">{clientUsers.length}</p>
              </div>
            </div>
          </Card>
        </div>

        {filteredUsers.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-border rounded-lg">
            <UserIcon className="mx-auto text-muted-foreground mb-3" size={48} />
            <p className="text-muted-foreground">
              {searchQuery ? "No users found matching your search" : "No users yet"}
            </p>
            {!searchQuery && (
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  resetForm()
                  setCreateModalOpen(true)
                }}
              >
                Create Your First User
              </Button>
            )}
          </div>
        ) : (
          <>
            {adminUsers.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <ShieldCheck className="text-purple-600" size={20} />
                  <h4 className="font-semibold">Admin Users ({adminUsers.length})</h4>
                </div>
                <div className="space-y-3">
                  {adminUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{user.name}</p>
                          <Badge variant="default" className="bg-purple-600">
                            <ShieldCheck className="mr-1" size={12} />
                            Admin
                          </Badge>
                          {user.emailVerified ? (
                            <CheckCircle className="text-green-600" size={16} weight="fill" />
                          ) : (
                            <XCircle className="text-muted-foreground" size={16} />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{user.email}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Created {new Date(user.createdAt).toLocaleDateString()} at {new Date(user.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleToggleRole(user)}
                          title="Demote to Client"
                        >
                          <UserIcon size={16} />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => openEditModal(user)}
                        >
                          <PencilSimple size={16} />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => openDeleteModal(user)}
                        >
                          <Trash size={16} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {clientUsers.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <UserIcon className="text-blue-600" size={20} />
                  <h4 className="font-semibold">Client Users ({clientUsers.length})</h4>
                </div>
                <div className="space-y-3">
                  {clientUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{user.name}</p>
                          <Badge variant="secondary">
                            Client
                          </Badge>
                          {user.emailVerified ? (
                            <CheckCircle className="text-green-600" size={16} weight="fill" />
                          ) : (
                            <XCircle className="text-muted-foreground" size={16} />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{user.email}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Created {new Date(user.createdAt).toLocaleDateString()} at {new Date(user.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleToggleRole(user)}
                          title="Promote to Admin"
                        >
                          <ShieldCheck size={16} />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => openEditModal(user)}
                        >
                          <PencilSimple size={16} />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => openDeleteModal(user)}
                        >
                          <Trash size={16} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </Card>

      <Dialog open={createModalOpen} onOpenChange={(open) => {
        setCreateModalOpen(open)
        if (!open) resetForm()
      }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create New User</DialogTitle>
            <DialogDescription>
              Add a new admin or client user to the system
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreateAdmin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="create-name">Full Name</Label>
              <Input
                id="create-name"
                type="text"
                placeholder="John Smith"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="create-email">Email Address</Label>
              <div className="relative">
                <EnvelopeSimple className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  id="create-email"
                  type="email"
                  placeholder="john@example.com"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="create-role">User Role</Label>
              <select
                id="create-role"
                value={formRole}
                onChange={(e) => setFormRole(e.target.value as "admin" | "client")}
                className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
              >
                <option value="client">Client</option>
                <option value="admin">Admin</option>
              </select>
              <p className="text-xs text-muted-foreground">
                {formRole === "admin" ? "Full system access with management capabilities" : "Access to client portal only"}
              </p>
            </div>

            <div className="bg-muted/50 border border-border rounded-lg p-3 flex items-start gap-2">
              <Warning size={20} className="text-accent mt-0.5 flex-shrink-0" weight="duotone" />
              <p className="text-xs text-muted-foreground">
                The user will receive a welcome email with their login credentials. Email is pre-verified.
              </p>
            </div>

            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
                  setCreateModalOpen(false)
                  resetForm()
                }}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create User"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={editModalOpen} onOpenChange={(open) => {
        setEditModalOpen(open)
        if (!open) {
          resetForm()
        }
      }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Update user information and role
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditUser} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Full Name</Label>
              <Input
                id="edit-name"
                type="text"
                placeholder="John Smith"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-email">Email Address</Label>
              <div className="relative">
                <EnvelopeSimple className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  id="edit-email"
                  type="email"
                  placeholder="john@example.com"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-role">User Role</Label>
              <select
                id="edit-role"
                value={formRole}
                onChange={(e) => setFormRole(e.target.value as "admin" | "client")}
                className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
              >
                <option value="client">Client</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
                  setEditModalOpen(false)
                  resetForm()
                }}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription>
              This action cannot be undone
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4 flex items-start gap-3">
              <Warning size={24} className="text-destructive flex-shrink-0" weight="duotone" />
              <div>
                <p className="text-sm font-medium text-foreground">Are you sure you want to delete this user?</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {selectedUser?.name} ({selectedUser?.email}) will be permanently removed from the system.
                </p>
              </div>
            </div>

            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
                  setDeleteModalOpen(false)
                  setSelectedUser(null)
                }}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button 
                variant="destructive"
                onClick={handleDeleteUser}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Deleting..." : "Delete User"}
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
