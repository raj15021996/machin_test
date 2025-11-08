"use client";
import React, { useEffect, useState } from "react";
import styles from "./Sidebar.module.css";
import Image from "next/image";
import GraduationCap from "@/assets/Icone/Graduation_Cap.svg";
import Dashboard from '@/assets/Icone/dashboard.svg'
import Case from '@/assets/Icone/cash.svg'
import Pencil from '@/assets/Icone/pencil.svg'
import logout from '@/assets/Icone/logout.svg'
import Notebook from '@/assets/Icone/notebook.svg'
import Doc from '@/assets/Icone/document-x.svg'
import Vector from '@/assets/Icone/Vector.svg'
import Annotation from '@/assets/Icone/annotation.svg'
import Schedule from '@/assets/Icone/contacts-alt.svg'
import { useRouter } from "next/navigation";


function Sidebar() {
  const [activeNav, setActiveNav] = useState("Dashboard")
  const router = useRouter();
  const navItems = [
    { name: "Dashboard", icon: Dashboard },
    { name: "Payment info", icon: Case },
    { name: "Registration", icon: Pencil },
    { name: "Courses", icon: Notebook },
    { name: "Drop Semester", icon: Doc },
    { name: "Result", icon: Vector },
    { name: "Notice", icon: Annotation },
    { name: "Schedule", icon: Schedule },
  ];

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    router.push("/");
  }

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarTop}>
        <div className={styles.sidebarLogo}>
          <Image src={GraduationCap} alt="Graduation Cap" />
        </div>
        <nav className={styles.sidebarNav}>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.name}
                onClick={() => setActiveNav(item.name)}
                className={`${styles.sidebarItem} ${activeNav === item.name ? styles.sidebarItemActive : ""
                  }`}
              >
                <Image src={item.icon} alt={item.name} width={20} height={20} />
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>
        <div className={styles.logoutWrapper}>
          <button className={styles.logoutButton} onClick={handleLogout}>
            <Image src={logout} alt="Logout" width={20} height={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
