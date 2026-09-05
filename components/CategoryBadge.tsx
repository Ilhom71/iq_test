import { Category, CATEGORY_LABELS } from "@/data/questions";
import { CATEGORY_THEME } from "@/lib/theme";
import { IconLogical, IconMath, IconPattern, IconVerbal } from "./icons";

const CATEGORY_ICON: Record<Category, React.ComponentType<{ className?: string }>> = {
  pattern: IconPattern,
  math: IconMath,
  logical: IconLogical,
  verbal: IconVerbal,
};

interface CategoryBadgeProps {
  category: Category;
  size?: "sm" | "md";
}

export default function CategoryBadge({ category, size = "md" }: CategoryBadgeProps) {
  const theme = CATEGORY_THEME[category];
  const Icon = CATEGORY_ICON[category];
  const box = size === "sm" ? "h-7 w-7 p-1.5" : "h-10 w-10 p-2";
  const text = size === "sm" ? "text-xs" : "text-sm";

  return (
    <span className="inline-flex items-center gap-2">
      <span
        className={`inline-flex shrink-0 items-center justify-center rounded-xl text-white ${theme.solidBg} ${box}`}
      >
        <Icon className="h-full w-full" />
      </span>
      <span className={`font-semibold ${theme.text} ${text}`}>
        {CATEGORY_LABELS[category]}
      </span>
    </span>
  );
}
