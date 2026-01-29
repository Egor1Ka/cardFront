import { useLocalStorage } from "@/composables/useLocalStorage";

export const useSidebar = () => {
  const sidebarOpen = useLocalStorage("ui.sidebarOpen", true);

  return {
    sidebarOpen,
  };
};
