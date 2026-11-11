import { LuInstagram } from "react-icons/lu"
import { FaXTwitter, FaWhatsapp, FaGithub } from "react-icons/fa6"

export function SiteFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="text-foreground w-full px-4 py-6 text-sm lg:px-8 border-t border-gray-200 dark:border-gray-800">
      {/* Desktop Layout */}
      <div className="hidden sm:flex flex-row items-center justify-between">
        {/* Copyright - Left side */}
        <p className="text-sm text-left">
          &copy; {currentYear}{" "}
          <a
            title="Medinotes"
            aria-label="Medinotes"
            className="hover:text-foreground transition-colors font-medium"
            href="https://medinotes.in"
            target="_blank"
            rel="noopener noreferrer"
          >
            Medinotes
          </a>
          .
        </p>

        {/* Navigation & Social Links */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <a href="https://medinotes.in/founders" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
              Founders
            </a>
            <a href="https://medinotes.in/about" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
              About
            </a>
            <a href="https://medinotes.in/medicaps" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
              Campus
            </a>
            <a href="https://medinotes.in/contact" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
              Contact
            </a>
            <a href="https://medinotes.in/privacy" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
              Privacy
            </a>
          </div>

          {/* Divider */}
          <span className="text-muted-foreground/30">|</span>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <a
              href="https://chat.whatsapp.com/GBQDwuYcmJdA6xKOy3BpLe"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors hover:scale-110 transition-transform"
              aria-label="WhatsApp"
            >
              <FaWhatsapp className="h-[18px] w-[18px]" />
            </a>
            <a
              href="https://instagram.com/medinotes.in"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors hover:scale-110 transition-transform"
              aria-label="Instagram"
            >
              <LuInstagram className="h-[18px] w-[18px]" />
            </a>
            <a
              href="https://x.com/medinotess"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors hover:scale-110 transition-transform"
              aria-label="X (Twitter)"
            >
              <FaXTwitter className="h-[18px] w-[18px]" />
            </a>
            <a
              href="https://github.com/t4zn/medinotes"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors hover:scale-110 transition-transform"
              aria-label="GitHub"
            >
              <FaGithub className="h-[18px] w-[18px]" />
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="flex sm:hidden flex-col items-center gap-3">
        {/* Page Links */}
        <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap justify-center">
          <a href="https://medinotes.in/founders" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
            Founders
          </a>
          <a href="https://medinotes.in/about" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
            About
          </a>
          <a href="https://medinotes.in/medicaps" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
            Campus
          </a>
          <a href="https://medinotes.in/contact" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
            Contact
          </a>
          <a href="https://medinotes.in/privacy" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
            Privacy
          </a>
        </div>

        {/* Social Icons & Copyright */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-4">
            <a
              href="https://chat.whatsapp.com/GBQDwuYcmJdA6xKOy3BpLe"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors hover:scale-110 transition-transform"
              aria-label="WhatsApp"
            >
              <FaWhatsapp className="h-[18px] w-[18px]" />
            </a>
            <a
              href="https://instagram.com/medinotes.in"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors hover:scale-110 transition-transform"
              aria-label="Instagram"
            >
              <LuInstagram className="h-[18px] w-[18px]" />
            </a>
            <a
              href="https://x.com/medinotess"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors hover:scale-110 transition-transform"
              aria-label="X (Twitter)"
            >
              <FaXTwitter className="h-[18px] w-[18px]" />
            </a>
            <a
              href="https://github.com/t4zn/medinotes"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors hover:scale-110 transition-transform"
              aria-label="GitHub"
            >
              <FaGithub className="h-[18px] w-[18px]" />
            </a>
          </div>
          <span className="text-muted-foreground/30">|</span>
          <p className="text-xs text-center">
            &copy; {currentYear}{" "}
            <a
              title="Medinotes"
              aria-label="Medinotes"
              className="hover:text-foreground transition-colors font-medium"
              href="https://medinotes.in"
              target="_blank"
              rel="noopener noreferrer"
            >
              Medinotes
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  )
}

export default SiteFooter
