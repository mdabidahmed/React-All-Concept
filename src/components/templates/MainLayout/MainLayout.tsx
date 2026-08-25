import type { ReactNode } from "react";
import { Navbar } from "../../organisms/Navbar/Navbar";
import { Sidebar } from "../../organisms/Sidebar/Sidebar";
import styles from "./MainLayout.module.css";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className={styles.shell}>
      <Navbar />
      <div className={styles.body}>
        <Sidebar />
        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
}
