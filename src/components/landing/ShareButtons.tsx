import { LinkedinLogo, XLogo } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"

interface ShareButtonsProps {
  url: string
  title: string
  description?: string
}

export function ShareButtons({ url, title, description }: ShareButtonsProps) {
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)
  const encodedDescription = description ? encodeURIComponent(description) : ""

  const shareOnLinkedIn = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
    window.open(linkedInUrl, '_blank', 'width=600,height=600')
  }

  const shareOnTwitter = () => {
    const text = description ? `${title} - ${description}` : title
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodeURIComponent(text)}`
    window.open(twitterUrl, '_blank', 'width=600,height=600')
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        onClick={shareOnLinkedIn}
        variant="outline"
        size="sm"
        className="gap-2 hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] transition-all duration-200"
        title="Share on LinkedIn"
      >
        <LinkedinLogo size={18} weight="fill" />
        <span className="hidden sm:inline">LinkedIn</span>
      </Button>
      
      <Button
        onClick={shareOnTwitter}
        variant="outline"
        size="sm"
        className="gap-2 hover:bg-[#000000] hover:text-white hover:border-[#000000] transition-all duration-200"
        title="Share on Twitter"
      >
        <XLogo size={18} weight="fill" />
        <span className="hidden sm:inline">Twitter</span>
      </Button>
    </div>
  )
}
