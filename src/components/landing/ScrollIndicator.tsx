import { CaretDown } from "@phosphor-icons/react"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

interface ScrollIndicatorProps {
  targetId: string
  label?: string
  variant?: "hero" | "section"
  previewTitle?: string
  previewDescription?: string
  previewIcon?: React.ReactNode
}

export function ScrollIndicator({ 
  targetId, 
  label = "Explore", 
  variant = "section",
  previewTitle,
  previewDescription,
  previewIcon
}: ScrollIndicatorProps) {
  const [showPreview, setShowPreview] = useState(false)

  const handleScroll = () => {
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  if (variant === "hero") {
    return (
      <motion.button
        onClick={handleScroll}
        onMouseEnter={() => setShowPreview(true)}
        onMouseLeave={() => setShowPreview(false)}
        className="flex flex-col items-center gap-2 text-muted-foreground hover:text-accent transition-colors duration-200 cursor-pointer mt-8 relative"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <span className="text-sm font-medium">{label}</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <CaretDown size={24} weight="bold" />
        </motion.div>

        <AnimatePresence>
          {showPreview && previewTitle && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full mt-4 bg-card border-2 border-accent/30 rounded-lg shadow-xl p-4 w-64 z-50 pointer-events-none"
            >
              <div className="flex items-start gap-3">
                {previewIcon && (
                  <div className="text-accent flex-shrink-0 mt-0.5">
                    {previewIcon}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm text-foreground mb-1 leading-tight">
                    {previewTitle}
                  </h4>
                  {previewDescription && (
                    <p className="text-xs text-muted-foreground leading-snug">
                      {previewDescription}
                    </p>
                  )}
                </div>
              </div>
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-card border-t-2 border-l-2 border-accent/30 rotate-45"></div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    )
  }

  return (
    <motion.button
      onClick={handleScroll}
      onMouseEnter={() => setShowPreview(true)}
      onMouseLeave={() => setShowPreview(false)}
      className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground hover:text-accent transition-colors duration-200 cursor-pointer z-10"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <CaretDown size={20} weight="bold" />
      </motion.div>

      <AnimatePresence>
        {showPreview && previewTitle && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-3 bg-card border-2 border-accent/30 rounded-lg shadow-xl p-4 w-64 pointer-events-none"
          >
            <div className="flex items-start gap-3">
              {previewIcon && (
                <div className="text-accent flex-shrink-0 mt-0.5">
                  {previewIcon}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-sm text-foreground mb-1 leading-tight">
                  {previewTitle}
                </h4>
                {previewDescription && (
                  <p className="text-xs text-muted-foreground leading-snug">
                    {previewDescription}
                  </p>
                )}
              </div>
            </div>
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-card border-t-2 border-l-2 border-accent/30 rotate-45"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  )
}
