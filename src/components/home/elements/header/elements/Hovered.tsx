import { useEffect } from "react";
import { useSectionContext } from "@src/context/SectionContext";
import { $, $$ } from "@src/functions/dom-selector";

export default function Hovered() {
  const { activeSection } = useSectionContext();

  useEffect(() => {
    const containers = $$<HTMLElement>("[data-container-linkers]");
    if (!containers.length) return;

    containers.forEach((container) => {
      const menu = $<HTMLElement>("[data-hover-menu]", container);
      if (!menu) return;

      const getLabelByKey = (key: string) => {
        switch (key) {
          case "citas":
            return "Mis Citas";
          case "agenda":
            return "Mi Agenda";
          case "recetas":
            return "Recetas";
          case "reservar":
            return "Reservar";
          default:
            return "";
        }
      };

      const getActiveButton = (): HTMLElement | null => {
        return (
          Array.from(
            $$<HTMLElement>("[data-list-linkers] > button", container)
          ).find(
            (btn) => btn.textContent?.trim() === getLabelByKey(activeSection)
          ) ?? null
        );
      };

      const moveHoverMenuTo = (target: HTMLElement) => {
        const rect = target.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        const left = rect.left - containerRect.left;
        const top = rect.top - containerRect.top;

        menu.style.setProperty("--left", `${left}px`);
        menu.style.setProperty("--top", `${top}px`);
        menu.style.setProperty("--width", `${rect.width}px`);
        menu.style.setProperty("--height", `${rect.height}px`);

        menu.style.opacity = "1";
        menu.style.visibility = "visible";
      };

      const initial = getActiveButton();
      if (initial) moveHoverMenuTo(initial);

      const handleMouseHover = (e: MouseEvent) => {
        const target = (e.target as HTMLElement).closest("[data-list-linkers]");

        if (target && container.contains(target)) {
          const button = target.querySelector("button");
          if (button) moveHoverMenuTo(button);
        }
      };

      const handleMouseOut = (e: MouseEvent) => {
        const related = e.relatedTarget as HTMLElement;
        const stillInside = related && container.contains(related);
        const hoveringAnother = related?.closest("[data-list-linkers]");

        if (!stillInside || !hoveringAnother) {
          const selected = getActiveButton();
          if (selected) moveHoverMenuTo(selected);
        }
      };

      container.addEventListener("mouseover", handleMouseHover);
      container.addEventListener("mouseout", handleMouseOut);

      return () => {
        container.addEventListener("mouseover", handleMouseHover);
        container.addEventListener("mouseout", handleMouseOut);
      };
    });
  }, [activeSection]);

  return (
    <div
      data-hover-menu
      className="absolute border-b-4 border-pink-600 left-[var(--left)] top-[var(--top)] w-[var(--width)] h-[var(--height)] transition-all duration-200 ease-in-out opacity-0 -z-10"
    ></div>
  );
}
