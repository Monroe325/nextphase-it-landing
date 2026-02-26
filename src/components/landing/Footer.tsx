export function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-border bg-muted">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-foreground mb-2">NextPhase IT</h3>
            <p className="text-secondary text-sm">Business Systems & Automation Consultancy</p>
            <p className="text-secondary text-sm mt-1">Founder: Lewes</p>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-secondary text-sm mb-1">
              <a 
                href="mailto:info@nextphaseit.co.uk" 
                className="hover:text-accent transition-colors duration-200"
              >
                info@nextphaseit.co.uk
              </a>
            </p>
            <p className="text-muted-foreground text-sm">
              © 2026 NextPhase IT. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
