import {
  Palette,
  Settings,
  Bot,
  Wrench,
  Theater,
  Briefcase,
  Zap,
  Rocket,
  Hand,
  Calendar,
  Package,
  Star,
  GitMerge,
  Trophy,
  Fish,
  Mail,
  MapPin,
  Github,
  Linkedin,
  Globe,
  Code,
  Tent,
  MessageSquare,
  BookOpen,
  GitBranch,
  Binary,
  Lightbulb,
  MessageCircle,
  TrendingUp,
  Users,
  FileText,
  Headphones,
  Gamepad2,
} from "lucide";

export const icons = {
  // Skills categories
  frontend: Palette,
  backend: Settings,
  ai: Bot,
  tools: Wrench,
  design: Theater,

  // Sections
  work: Briefcase,
  skills: Zap,
  projects: Rocket,
  about: Hand,
  info: Tent,

  // Stats
  calendar: Calendar,
  package: Package,
  star: Star,
  gitMerge: GitMerge,
  trophy: Trophy,
  shark: Fish,

  // Contact
  mail: Mail,
  mapPin: MapPin,
  github: Github,
  linkedin: Linkedin,

  // Other
  globe: Globe,
  code: Code,
  gamepad: Gamepad2,

  // Interests
  messageSquare: MessageSquare,
  bookOpen: BookOpen,
  gitBranch: GitBranch,
  binary: Binary,

  // Soft skills
  lightbulb: Lightbulb,
  messageCircle: MessageCircle,
  trendingUp: TrendingUp,
  users: Users,
  fileText: FileText,
  headphones: Headphones,
};

export function createIcon(iconName, options = {}) {
  const iconData = icons[iconName];
  if (!iconData) {
    console.warn(`Icon "${iconName}" not found`);
    return "";
  }

  const size = options.size || "20";
  const color = options.color || "#8b5a2b";
  const strokeWidth = options.strokeWidth || "2";
  const fill = options.fill || "none";

  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");

  svg.setAttribute("width", size);
  svg.setAttribute("height", size);
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("fill", fill);
  svg.setAttribute("stroke", color);
  svg.setAttribute("stroke-width", strokeWidth);
  svg.setAttribute("stroke-linecap", "round");
  svg.setAttribute("stroke-linejoin", "round");
  svg.style.display = "inline-block";
  svg.style.verticalAlign = "middle";

  if (options.className) {
    svg.classList.add(options.className);
  }

  iconData.forEach(([tag, attrs]) => {
    const element = document.createElementNS(svgNS, tag);
    Object.entries(attrs).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });
    svg.appendChild(element);
  });

  return svg.outerHTML;
}
