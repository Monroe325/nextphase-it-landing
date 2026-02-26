import { Button } from "@/components/ui/button"
import { Calendar, UserCircle, ShieldCheck } from "@phosphor-icons/react"
import logo from "@/assets/images/NextPhase IT logo image.png"

interface HeaderProps {
  onAuthClick?: () => void
  onAdminClick?: () => void
  onLogout?: () => void
  currentUser?: { name: string; role: string } | null
}

export function Header({ onAuthClick, onAdminClick, onLogout, currentUser }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img 
            src={logo}
            alt="NextPhase IT"
            style={{
              height: '85px',
              width: 'auto',
              maxWidth: '320px',
              objectFit: 'contain'
            }}
          />
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
                variant="ghost"
                size="sm" 
                className="hidden md:flex transition-all duration-200 text-muted-foreground hover:text-foreground"
                onClick={onAdminClick}
              >
                <ShieldCheck className="mr-1.5" size={18} />
                <span>Admin</span>
              </Button>
              
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
