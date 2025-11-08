"use client";
import { useState, useRef, FormEvent, ChangeEvent, useEffect } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import styles from "@/app/page.module.css";
import Image from "next/image";
import googleIcon from "@/assets/Icone/google.png";
import StudentImage from "@/assets/Icone/student.png";
import SimpleReactValidator from "simple-react-validator";
import { ToastType, useToaster } from 'react-toastella';
import { useRouter } from "next/navigation";

// Types
interface FormData {
  fullname: string;
  email: string;
  password: string;
  agreeToTerms: boolean;
}

interface User {
  id: number;
  fullname: string;
  email: string;
  password: string;
  createdAt: string;
}

export default function SignUpPage() {
  const [formData, setFormData] = useState<FormData>({
    fullname: "",
    email: "",
    password: "",
    agreeToTerms: false,
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [, forceUpdate] = useState<number>(0);
  const router = useRouter();
  const { addToast } = useToaster();

  const showNotification = (message: string, types: ToastType, gradient?: any) => {
    addToast({
      message: message,
      type: types,
      animation: "slide",
      duration: 3000,
      progressBar: true,
      gradient: gradient,
      customStyles: {
        width: "400px",
        height: "auto",
        borderRadius: "8px",
        padding: "16px",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        iconColor: "#fff",
        textColor: "#fff",
        fontWeight: "bold" ,
      },
    });
  };

  useEffect(() => {
    let usersString = null;
    if (typeof window !== "undefined") {
      usersString = localStorage.getItem("currentUser");
    }
    if (usersString) {
      router.push("/dashboard")
      return
    }
  }, [])

  // Initialize validator
  const validator = useRef(
    new SimpleReactValidator({
      messages: {
        required: "This field is required",
        email: "Please enter a valid email address",
        min: "Password must be at least 6 characters",
      },
      validators: {
        password: {
          message: "Password must contain at least one uppercase, one lowercase, and one number",
          rule: (val: string): boolean => {
            return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(val);
          },
        },
      },
    })
  );

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Toggle password visibility
  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword);
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    // Validate all fields
    if (validator.current.allValid()) {
      // Check if terms are agreed
      if (!formData.agreeToTerms) {
        showNotification("Please agree to terms and conditions", "error", [" #f00a0aff", "#F8FFAE"]);
        return;
      }

      // Save to localStorage
      try {
        // Get existing users or initialize empty array
        const existingUsersString = localStorage.getItem("users");
        const existingUsers: User[] = existingUsersString
          ? JSON.parse(existingUsersString)
          : [];

        // Check if email already exists
        const emailExists = existingUsers.some(
          (user: User) => user.email === formData.email
        );

        if (emailExists) {
          showNotification("Email already exists. Please use a different email.", "error", [" #f00a0aff", "#F8FFAE"]);
          // alert("Email already exists. Please use a different email.");
          return;
        }

        // Add new user
        const newUser: User = {
          id: Date.now(),
          fullname: formData.fullname,
          email: formData.email,
          password: formData.password, // In production, never store plain passwords!
          createdAt: new Date().toISOString(),
        };

        existingUsers.push(newUser);
        localStorage.setItem("users", JSON.stringify(existingUsers));


        // Reset form
        setFormData({
          fullname: "",
          email: "",
          password: "",
          agreeToTerms: false,
        });

        validator.current.hideMessages();
        showNotification("Sign up successful! Redirecting...", "success", [" #01846aff", "#606903ff"]);
        router.push("/")
        // Redirect to dashboard or login
        // window.location.href = "/dashboard";

      } catch (error) {
        showNotification("An error occurred. Please try again.", "error", [" #f00a0aff", "#F8FFAE"]);
        console.error("Error saving to localStorage:", error);
      }
    } else {
      // Show validation errors
      validator.current.showMessages();
      forceUpdate(1);
    }
  };

  // Handle Google Sign Up
  const handleGoogleSignUp = (): void => {
    // Implement Google OAuth logic here
    console.log("Google Sign Up clicked");
    alert("Google Sign Up - Integration required");
  };

  return (
    <div className={styles.page}>
      {/* Main Content */}
      <main className={styles.main}>
        <div className={styles.grid}>
          {/* Left Side - Info */}
          <div className={styles.leftSection}>
            <div className={styles.content}>
              <h1>Student Sign Up</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur. Tempus tincidunt etiam
                eget elit id imperdiet et. Cras eu sit dignissim lorem nibh et.
                Ac cum eget habitasse in velit fringilla feugiat senectus in.
              </p>
            </div>

            <div className={styles.studentImage}>
              <Image src={StudentImage} alt="Happy students" />
            </div>
          </div>

          {/* Right Side - Sign Up Form */}
          <div className={styles.rightSection}>
            <div className={styles.formContainer}>
              <div className={styles.formInner}>
                <div className={styles.formHeader}>
                  <h2>Sign Up</h2>
                  <p>Create an account to unlock exclusive features.</p>
                </div>

                <form className={styles.form} onSubmit={handleSubmit}>
                  {/* Full Name Field */}
                  <div className={styles.formField}>
                    <label htmlFor="fullname">Full Name</label>
                    <input
                      id="fullname"
                      name="fullname"
                      type="text"
                      placeholder="Enter your Name"
                      className={styles.input}
                      value={formData.fullname}
                      onChange={handleChange}
                      onBlur={() => validator.current.showMessageFor("fullname")}
                    />
                    {validator.current.message(
                      "fullname",
                      formData.fullname,
                      "required|min:3|max:50"
                    )}
                  </div>

                  {/* Email Field */}
                  <div className={styles.formField}>
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your Email"
                      className={styles.input}
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={() => validator.current.showMessageFor("email")}
                    />
                    {validator.current.message(
                      "email",
                      formData.email,
                      "required|email"
                    )}
                  </div>

                  {/* Password Field */}
                  <div className={styles.formField}>
                    <label htmlFor="password">Password</label>
                    <div className={styles.passwordWrapper}>
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your Password"
                        className={styles.input}
                        value={formData.password}
                        onChange={handleChange}
                        onBlur={() => validator.current.showMessageFor("password")}
                      />
                      <button
                        type="button"
                        className={styles.togglePassword}
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        <span className="sr-only">
                          Toggle password visibility
                        </span>
                      </button>
                    </div>
                    {validator.current.message(
                      "password",
                      formData.password,
                      "required|min:6|password"
                    )}
                  </div>

                  {/* Terms Agreement */}
                  <div className={styles.termsAgreement}>
                    <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <input
                        type="checkbox"
                        name="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onChange={handleChange}
                        style={{ width: "auto", margin: 0 }}
                      />
                      <span>
                        I agree with <Link href="#">Terms of Use</Link> and{" "}
                        <Link href="#">Privacy Policy</Link>
                      </span>
                    </label>
                  </div>

                  {/* Sign Up Button */}
                  <button type="submit" className={styles.buttonGradient}>
                    Sign Up
                  </button>

                  {/* Divider */}
                  <div className={styles.divider}>
                    <span>OR</span>
                  </div>

                  {/* Google Sign Up Button */}
                  <button
                    type="button"
                    className={styles.buttonGoogle}
                    onClick={handleGoogleSignUp}
                  >
                    <div className={styles.buttonGoogleInner}>
                      <Image
                        src={googleIcon}
                        alt="Google Logo"
                        width={30}
                        height={30}
                      />
                      Sign Up with Google
                    </div>
                  </button>

                  {/* Login Link */}
                  <p className={styles.signUpLink}>
                    Already have an account? <Link href="/">Login →</Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}