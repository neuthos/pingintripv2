"use client";

import {useState, useEffect} from "react";
import {useTranslations} from "next-intl";
import {Link, usePathname, useRouter} from "@/i18n/navigation";
import {useLocale} from "next-intl";
import {useSession, signIn, signOut} from "next-auth/react";
import {Menu, X, Globe, ChevronDown, User, LogOut, Send} from "lucide-react";
import Image from "next/image";

const navLinks = [
  {key: "destinations", href: "/destinations"},
  {key: "packages", href: "/packages"},
  {key: "about", href: "/about"},
] as const;

const localeLabels: Record<string, string> = {
  en: "EN",
  id: "ID",
  cn: "CN",
};

export default function Navbar() {
  const t = useTranslations("Navbar");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const {data: session, status} = useSession();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, {passive: true});
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLocaleChange = (newLocale: string) => {
    router.replace(pathname, {locale: newLocale as "en" | "id" | "cn"});
  };

  const handleSignIn = () => {
    signIn("google");
  };

  const handleSignOut = () => {
    signOut();
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 bg-white ${
          isScrolled
            ? "shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
            : "border-b border-gray-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <Link href="/" className="flex items-center shrink-0">
              <Image
                src="/logo/pingintrip-logo-blue.webp"
                alt="Pingintrip"
                width={120}
                height={32}
                className="h-7 w-auto"
                priority
              />
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => (
                <Link
                  key={link.key}
                  href={link.href}
                  className="text-[13px] font-medium text-gray-600 hover:text-primary transition-colors duration-150"
                >
                  {t(link.key)}
                </Link>
              ))}
            </div>

            {/* Desktop Right Section */}
            <div className="hidden lg:flex items-center gap-2">
              {/* Enquiry CTA */}
              <Link
                href="/enquiry"
                className="btn btn-primary btn-xs h-8 min-h-0 rounded-lg text-xs font-semibold px-4 gap-1.5"
              >
                <Send className="w-3 h-3" />
                {t("enquiry")}
              </Link>
              {/* Locale Switcher */}
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-xs h-8 min-h-0 gap-1 text-gray-500 hover:text-gray-700 rounded-lg"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span className="text-xs font-medium">
                    {localeLabels[locale]}
                  </span>
                  <ChevronDown className="w-2.5 h-2.5" />
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-white rounded-lg shadow-lg border border-gray-100 z-50 w-32 p-1.5 mt-1"
                >
                  {Object.entries(localeLabels).map(([loc, label]) => (
                    <li key={loc}>
                      <button
                        onClick={() => handleLocaleChange(loc)}
                        className={`text-xs rounded-md ${
                          locale === loc
                            ? "font-semibold text-primary bg-primary/5"
                            : "text-gray-600"
                        }`}
                      >
                        {label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Auth Section */}
              {status === "loading" ? (
                <div className="w-20 h-8 bg-gray-100 rounded-lg animate-pulse" />
              ) : session?.user ? (
                /* Logged In — User Menu */
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-xs h-8 min-h-0 gap-2 rounded-lg"
                  >
                    {session.user.image ? (
                      <Image
                        src={session.user.image}
                        alt={session.user.name || "User"}
                        width={24}
                        height={24}
                        className="w-6 h-6 rounded-full"
                      />
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-[10px] font-bold text-white">
                          {session.user.name?.charAt(0) || "U"}
                        </span>
                      </div>
                    )}
                    <span className="text-xs font-medium text-gray-700 max-w-[100px] truncate">
                      {session.user.name?.split(" ")[0]}
                    </span>
                    <ChevronDown className="w-2.5 h-2.5 text-gray-400" />
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-white rounded-lg shadow-lg border border-gray-100 z-50 w-44 p-1.5 mt-1"
                  >
                    <li className="menu-title px-3 py-1.5">
                      <span className="text-[11px] text-gray-400 font-normal truncate">
                        {session.user.email}
                      </span>
                    </li>
                    <li>
                      <button
                        onClick={handleSignOut}
                        className="text-xs text-red-500 hover:bg-red-50 rounded-md gap-2"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        {t("logout")}
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                /* Not Logged In */
                <>
                  <button
                    onClick={handleSignIn}
                    className="btn btn-ghost btn-xs h-8 min-h-0 gap-1.5 text-gray-600 hover:text-gray-800 rounded-lg text-xs font-medium"
                  >
                    <User className="w-3.5 h-3.5" />
                    {t("login")}
                  </button>
                  <button
                    onClick={handleSignIn}
                    className="btn btn-primary btn-xs h-8 min-h-0 rounded-lg text-xs font-semibold px-4"
                  >
                    {t("signup")}
                  </button>
                </>
              )}
            </div>

            {/* Mobile: Locale + User + Hamburger */}
            <div className="flex lg:hidden items-center gap-1">
              {/* Mobile Locale */}
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-xs btn-square h-8 w-8 min-h-0"
                >
                  <Globe className="w-4 h-4 text-gray-500" />
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-white rounded-lg shadow-lg border border-gray-100 z-50 w-28 p-1.5 mt-1"
                >
                  {Object.entries(localeLabels).map(([loc, label]) => (
                    <li key={loc}>
                      <button
                        onClick={() => handleLocaleChange(loc)}
                        className={`text-xs rounded-md ${
                          locale === loc
                            ? "font-semibold text-primary bg-primary/5"
                            : "text-gray-600"
                        }`}
                      >
                        {label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Mobile User */}
              {session?.user ? (
                <button
                  onClick={handleSignOut}
                  className="btn btn-ghost btn-xs btn-square h-8 w-8 min-h-0"
                >
                  {session.user.image ? (
                    <Image
                      src={session.user.image}
                      alt={session.user.name || "User"}
                      width={24}
                      height={24}
                      className="w-5 h-5 rounded-full"
                    />
                  ) : (
                    <User className="w-4 h-4 text-primary" />
                  )}
                </button>
              ) : (
                <button
                  onClick={handleSignIn}
                  className="btn btn-ghost btn-xs btn-square h-8 w-8 min-h-0"
                >
                  <User className="w-4 h-4 text-gray-500" />
                </button>
              )}

              {/* Hamburger */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="btn btn-ghost btn-xs btn-square h-8 w-8 min-h-0"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-4 h-4 text-gray-600" />
                ) : (
                  <Menu className="w-4 h-4 text-gray-600" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-200 ease-in-out ${
            isMobileMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-white border-t border-gray-100 px-4 py-3 space-y-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2.5 px-3 rounded-lg text-[13px] font-medium text-gray-600 hover:bg-gray-50 hover:text-primary transition-colors"
              >
                {t(link.key)}
              </Link>
            ))}
            <Link
              href="/enquiry"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2.5 px-3 rounded-lg text-[13px] font-semibold text-primary hover:bg-primary/5 transition-colors"
            >
              {t("enquiry")}
            </Link>
            <div className="pt-2">
              {session?.user ? (
                <button
                  onClick={handleSignOut}
                  className="btn btn-outline btn-error btn-sm btn-block rounded-lg text-xs font-medium gap-2"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  {t("logout")}
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={handleSignIn}
                    className="btn btn-outline btn-sm flex-1 rounded-lg text-xs font-medium"
                  >
                    {t("login")}
                  </button>
                  <button
                    onClick={handleSignIn}
                    className="btn btn-primary btn-sm flex-1 rounded-lg text-xs font-semibold"
                  >
                    {t("signup")}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer */}
      <div className="h-14" />
    </>
  );
}
