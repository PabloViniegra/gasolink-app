import { useLocation } from "react-router";
import {
  MapPlus,
  Navigation,
  List,
  CircleQuestionMark,
  Menu,
  X,
  Github,
  Star
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../icons/Logo";
import GradientText from "./GradientText";

import type { Variants } from "framer-motion";

const navVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.3,
      ease: "easeOut",
    },
  }),
};

const mobileMenuVariants: Variants = {
  hidden: {
    opacity: 0,
    height: 0,
    overflow: "hidden",
    transition: {
      when: "afterChildren",
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
  visible: {
    opacity: 1,
    height: "auto",
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

export default function Header() {
  const { pathname } = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    {
      name: "Explora",
      href: "/",
      icon: MapPlus,
    },
    {
      name: "Cerca de mi",
      href: "/nearby",
      icon: Navigation,
    },
    {
      name: "Listado",
      href: "/list",
      icon: List,
    },
    {
      name: 'Favoritos',
      href: '/favorites',
      icon: Star
    },
    {
      name: "Ayuda",
      href: "/help",
      icon: CircleQuestionMark,
    },
  ];

  return (
    <header
      className={`border-b border-foreground fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/90 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Logo className="h-8 w-8 md:h-10 md:w-10" />
            <GradientText
              colors={["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"]}
              animationSpeed={5}
              showBorder={false}
              className="text-2xl md:text-3xl font-display font-black tracking-tighter"
            >
              GasoLink
            </GradientText>
          </div>
          <nav className="hidden md:flex items-center space-x-1">
            {links.map((item, index) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.name}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  variants={navVariants}
                  className="relative"
                >
                  <a
                    href={item.href}
                    className={`font-lexend tracking-tight flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActive
                        ? "text-foreground bg-accent/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/5"
                    }`}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {item.name}
                    {isActive && (
                      <motion.span
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                        layoutId="activeNav"
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}
                      />
                    )}
                  </a>
                </motion.div>
              );
            })}
          </nav>

          <div className="flex items-center space-x-2">
            <motion.a
              href="https://github.com/yourusername/gasolink-app"
              target="_blank"
              rel="noopener noreferrer"
              className="group hidden md:flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 bg-popover border border-border hover:border-primary/50 hover:bg-accent/30 shadow-sm"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              <Github className="h-4 w-4 mr-2 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="font-sans tracking-tight text-foreground">GitHub</span>
            </motion.a>
            <button
              className="md:hidden p-2 rounded-lg text-foreground hover:bg-accent/10 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={mobileMenuVariants}
              className="md:hidden mt-2"
            >
              <div className="flex flex-col space-y-2 py-2">
                {links.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;

                  return (
                    <motion.div
                      key={item.name}
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        visible: {
                          opacity: 1,
                          x: 0,
                          transition: { duration: 0.2 },
                        },
                        exit: { opacity: 0, x: -20 },
                      }}
                    >
                      <a
                        href={item.href}
                        className={`flex items-center px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                          isActive
                            ? "text-foreground bg-accent/10"
                            : "text-muted-foreground hover:text-foreground hover:bg-accent/5"
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Icon className="mr-3 h-5 w-5" />
                        {item.name}
                      </a>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
