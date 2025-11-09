"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./dashboard.module.css";
import Arrow from "@/assets/Icone/Group 3.svg";
import Student from "@/assets/Icone/stud.png";
import Avatar from "@/assets/Icone/avtar.jpg";
import EyeIcon from "@/assets/Icone/Eye-Show-Visible.svg";
import mobileIcon from "@/assets/Icone/Mobile.svg";
import gamePadIcon from "@/assets/Icone/Game Controller.svg";
import Vector from "@/assets/Icone/Vector2.svg";
import Laptop from "@/assets/Icone/Laptop.svg";
import PcIcon from "@/assets/Icone/Icon Container.svg";
import graphIcon from "@/assets/Icone/Group 16.svg";
import Slider from "react-slick";
import moment from "moment";

import { useRouter } from "next/navigation";
import Sidebar from "../HOC/LayoutComponents/Sidebar/Sidebar";

export default function DashboardPage() {
  const [user, setUser] = useState<any>({});
  const [windowWidth, setWindowWidth] = useState(0); // Track window width

  useEffect(() => {
    let usersString = localStorage.getItem("currentUser");
    usersString = usersString ? JSON.parse(usersString) : {};
    setUser(usersString);
  }, []);

  // Track window width
  useEffect(() => {
    // Set initial width
    setWindowWidth(window.innerWidth);

    // Update width on resize
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const recentCourses = [
    {
      name: "Mobile app Devolvement",
      progress: 40,
      current: 4,
      total: 10,
      icon: mobileIcon,
      color: "#D4F5E9",
    },
    {
      name: "Game Development",
      progress: 50,
      current: 4,
      total: 20,
      icon: gamePadIcon,
      color: "#D9F7DC",
    },
  ];

  const dailyProgress = [
    { name: "Game Development", icon: gamePadIcon },
    { name: "UI/Ux", icon: Vector },
    { name: "Web Development", icon: Laptop },
  ];

  const enrolledCourses = [
    { id: 1, name: "Object oriented programming", icon: PcIcon },
    { id: 2, name: "Object oriented programming", icon: graphIcon },
    { id: 3, name: "Object oriented programming", icon: PcIcon },
    { id: 4, name: "Object oriented programming", icon: graphIcon },
    { id: 5, name: "Object oriented programming", icon: PcIcon },
    { id: 6, name: "Object oriented programming", icon: graphIcon },
  ];

  // Updated slider settings
  // Dynamically determine slides to show based on window width
  const getSlidesToShow = () => {
    if (windowWidth === 0) return 1; // Default to 1 during SSR
    if (windowWidth < 768) return 1;
    if (windowWidth < 1024) return 2;
    return 3;
  };

  const settings = {
    dots: true,
    infinite: enrolledCourses.length > getSlidesToShow(),
    speed: 500,
    slidesToShow: getSlidesToShow(),
    slidesToScroll: 1,
    autoplay: true,
    arrows: windowWidth >= 768,
    centerMode: false,
    variableWidth: false,
    adaptiveHeight: true,
    
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: enrolledCourses.length > 2,
          arrows: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: enrolledCourses.length > 1,
          arrows: false,
          dots: true,
        },
      },
    ],
  };

  // Don't render carousel until we know the window width
  if (windowWidth === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.page}>
      <div className={styles.dashboardLayout}>
        {/* Main Content */}
        <main className={styles.mainContent}>
          <div className={styles.heroBanner}>
            <div className={styles.heroContent}>
              <div>
                <p className={styles.heroDate}>{moment().format('MMMM D, YYYY')}</p>
                <h1 className={styles.heroTitle}>
                  <span className={styles.waveEmoji}>👋</span> Welcome back, {user?.fullname ?? ""}!
                </h1>
                <p className={styles.heroSubtitle}>
                  Always stay updated in your student portal
                </p>
              </div>
              <Image src={Arrow} alt="Avatar" className={styles.heroNewArrow} />
            </div>
            <div className={styles.heroImage}>
              <Image
                src={Student}
                alt="Student"
                width={300}
                height={300}
                className={styles.studentImg}
              />
            </div>
            <div className={styles.heroCircle1}></div>
            <div className={styles.heroCircle2}></div>
            <div className={styles.heroCircle3}></div>
          </div>

          <div className={styles.dashboardGrid}>
            {/* Sidebar */}
            <Sidebar />
            <div className={styles.dashboardContent}>
              {/* Welcome Section */}
              <div className={styles.welcomeSection}>
                <div className={styles.welcomeHeader}>
                  <div className={styles.avatarWrapper}>
                    <Image
                      src={Avatar}
                      alt="Avatar"
                      width={79}
                      height={79}
                      className={styles.avatar}
                    />
                  </div>
                  <div>
                    <h2 className={styles.welcomeTitle}>
                      Welcome Back {user?.fullname ?? ""}!
                    </h2>
                    <p className={styles.welcomeSubtitle}>
                      Here overview of your course
                    </p>
                  </div>
                </div>

                {/* Stats Cards */}
                <div className={styles.statsGrid}>
                  <div className={styles.statCard}>
                    <div className={styles.statContent}>
                      <p className={styles.statLabel}>Total Enrolled</p>
                      <div className={styles.statIcon}>
                        <Image src={EyeIcon} alt="Eye Icon" width={36} height={36} />
                      </div>
                    </div>
                    <p className={styles.statValue}>5000</p>
                  </div>
                  <div className={styles.statCard}>
                    <div className={styles.statContent}>
                      <p className={styles.statLabel}>Active Courses</p>
                      <div className={styles.statIcon}>
                        <Image src={EyeIcon} alt="Eye Icon" width={36} height={36} />
                      </div>
                    </div>
                    <p className={styles.statValue}>100</p>
                  </div>
                  <div className={styles.statCard}>
                    <div className={styles.statContent}>
                      <p className={styles.statLabel}>Completed Courses</p>
                      <div className={styles.statIcon}>
                        <Image src={EyeIcon} alt="Eye Icon" width={36} height={36} />
                      </div>
                    </div>
                    <p className={styles.statValue}>20</p>
                  </div>
                </div>
              </div>

              {/* Content Grid */}
              <div className={styles.contentGrid}>
                {/* Recent Enrolled Courses */}
                <div className={styles.recentSection}>
                  <h3 className={styles.sectionTitle}>
                    Recent enrolled course
                  </h3>
                  <div className={styles.courseGrid}>
                    {recentCourses.map((course, index) => {
                      const Icon = course.icon;
                      return (
                        <div key={index} className={styles.courseCard}>
                          <div
                            className={styles.courseIcon}
                            style={{ backgroundColor: course.color }}
                          >
                            <Image src={Icon} alt={course.name} />
                          </div>
                          <h4 className={styles.courseTitle}>{course.name}</h4>
                          <div className={styles.progressContainer}>
                            <div className={styles.progressBar}>
                              <div
                                className={styles.progressFill}
                                style={{ width: `${course.progress}%` }}
                              ></div>
                            </div>
                            <p className={styles.lessonCount}>
                              {course.current}/{course.total} Lesion
                            </p>
                          </div>
                        </div>
                      );
                    })}
                    <div className={styles.dailySection}>
                      <h3 className={styles.sectionTitle}>Daily progress</h3>
                      <div className={styles.progressList}>
                        {dailyProgress.map((item, index) => {
                          const Icon = item.icon;
                          return (
                            <div key={index} className={styles.progressItem}>
                              <div className={styles.progressIconWrapper}>
                                <Image src={Icon} alt={item.name} />
                              </div>
                              <span className={styles.progressName}>
                                {item.name}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enrolled Courses */}
              <div className={styles.enrolledSection}>
                <div className={styles.sectionHeader}>
                  <h3 className={styles.sectionTitle}>Enrolled Courses</h3>
                  <button className={styles.seeAllButton}>See all</button>
                </div>
                <div className={styles.courseCarouselContainer}>
                  <Slider {...settings}>
                    {enrolledCourses.map((course) => (
                      <div key={course.id} className={styles.sliderItem}>
                        <div className={styles.enrolledCourseCard}>
                          <div className={styles.courseCardContent}>
                            <h4 className={styles.enrolledCourseTitle}>
                              {course.name}
                            </h4>
                            <button className={styles.viewButton}>View</button>
                          </div>
                          <div className={styles.courseGraphic}>
                            <Image src={course.icon} alt={course.name} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}