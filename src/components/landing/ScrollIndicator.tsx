import { CaretDown } from "@phosphor-icons/react"
import { motion } from "framer-motion"

interface ScrollIndicatorProps {
  targetId: string
  label?: string
  variant?: "hero" | "section"
}

export function ScrollIndicator({ targetId, label = "Explore", variant = "section" }: ScrollIndicatorProps) {
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
        className="flex flex-col items-center gap-2 text-muted-foreground hover:text-accent transition-colors duration-200 cursor-pointer mt-8"
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
      </motion.button>
    )
  }

  return (
    <motion.button
      onClick={handleScroll}
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
    </motion.button>
  )
}
