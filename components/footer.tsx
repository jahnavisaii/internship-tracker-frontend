import Image from "next/image"

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-card">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 py-6 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Image
            src="/images/vitap-logo.png"
            alt="VIT-AP University Logo"
            width={120}
            height={36}
            className="h-6 w-auto opacity-80 sm:h-7"
          />
          <div className="h-4 w-px bg-border" />
          <span className="text-xs text-muted-foreground">
            Smart Internship Tracker
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} VIT-AP University. Built for
          academic purposes.
        </p>
      </div>
    </footer>
  )
}
