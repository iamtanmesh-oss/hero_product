import { Link } from "@tanstack/react-router";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link to="/" className="font-display text-lg font-bold tracking-tight">
          Index<span className="text-primary">Baazaar</span>
        </Link>
        <nav className="flex items-center gap-5 text-sm text-muted-foreground">
          <Link to="/" activeOptions={{ exact: true }} activeProps={{ className: "text-foreground" }} className="hover:text-foreground">
            Home
          </Link>
          <Link to="/about" activeProps={{ className: "text-foreground" }} className="hover:text-foreground">
            About Us
          </Link>
        </nav>
      </div>
    </header>
  );
}
