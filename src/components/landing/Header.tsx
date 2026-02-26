import { Button } from "@/components/ui/button"
import { Calendar, UserCircle } from "@phosphor-icons/react"

interface HeaderProps {
  onAuthClick?: () => void
  onLogout?: () => void
  currentUser?: { name: string; role: string } | null
}

export function Header({ onAuthClick, onLogout, currentUser }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-xl md:text-2xl font-bold text-foreground">NextPhase IT</h1>
        </div>
        
        <div className="flex items-center gap-2">
          {currentUser ? (
            <>
              <span className="hidden sm:block text-sm text-muted-foreground mr-2">
                {currentUser.name}
              </span>
              <Button 
                variant="outline"
                size="sm" 
                onClick={onLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="outline"
                size="sm" 
                className="transition-all duration-200"
                onClick={onAuthClick}
              >
                <UserCircle className="mr-2" size={20} />
                <span className="hidden sm:inline">Sign Up / Login</span>
                <span className="sm:hidden">Login</span>
              </Button>
              
              <Button 
                size="sm" 
                className="bg-accent hover:bg-accent/90 text-accent-foreground transition-all duration-200"
                onClick={() => window.open('https://cal.com/nextphaseit', '_blank')}
              >
                <Calendar className="mr-2" size={20} />
                <span className="hidden sm:inline">Book Free Audit</span>
                <span className="sm:hidden">Book</span>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
