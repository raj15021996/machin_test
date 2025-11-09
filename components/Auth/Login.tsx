"use client";
import { useState, useRef, FormEvent, ChangeEvent } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import styles from "@/app/page.module.css";
import StudentImage from "@/assets/Icone/student.png";
import Image from "next/image";
import googleIcon from "@/assets/Icone/google.png";
import SimpleReactValidator from "simple-react-validator";
import { useRouter } from "next/navigation";
import { ToastType, useToaster } from "react-toastella";

// Types
interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface User {
  id: number;
  fullname: string;
  email: string;
  password: string;
  createdAt: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [, forceUpdate] = useState<number>(0);
  const [loginError, setLoginError] = useState<string>("");

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

  // Initialize validator
  const validator = useRef(
    new SimpleReactValidator({
      messages: {
        required: "This field is required",
        email: "Please enter a valid email address",
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
    // Clear login error when user starts typing
    if (loginError) {
      setLoginError("");
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword);
  };

  // Get users from localStorage
  const getUsers = (): User[] => {
    try {
      let usersString = null;
      if (typeof window !== "undefined") {
        usersString = localStorage.getItem("users");
      }
      return usersString ? JSON.parse(usersString) : [];
    } catch (error) {
      showNotification("Error reading users from localStorage", "error", [" #f00a0aff", "#F8FFAE"]);
      console.error("Error reading users from localStorage:", error);
      return [];
    }
  };

  // Validate credentials
  const validateCredentials = (email: string, password: string): User | null => {
    const users = getUsers();
    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    return user || null;
  };

  // Set current user in localStorage
  const setCurrentUser = (user: User): void => {
    localStorage.setItem("currentUser", JSON.stringify(user));

    // If remember me is checked, store email
    if (formData.rememberMe) {
      localStorage.setItem("rememberedEmail", user.email);
    } else {
      localStorage.removeItem("rememberedEmail");
    }
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    // Validate all fields
    if (validator.current.allValid()) {
      // Validate credentials
      const user = validateCredentials(formData.email, formData.password);

      if (user) {
        // Login successful
        setCurrentUser(user);
        showNotification(`Welcome back, ${user.fullname}!`, "success", [" #00ff00ff", "#F8FFAE"]);

        // Reset form
        setFormData({
          email: "",
          password: "",
          rememberMe: false,
        });

        validator.current.hideMessages();

        // Redirect to dashboard
        router.push("/dashboard");
      } else {
        debugger
        // Login failed
        showNotification("Invalid email or password. Please try again.", "error", [" #f00a0aff", "#F8FFAE"]);
        setLoginError("Invalid email or password. Please try again.");
      }
    } else {
      // Show validation errors
      validator.current.showMessages();
      forceUpdate(1);
    }
  };

  // Handle Google Login
  const handleGoogleLogin = (): void => {
    console.log("Google Login clicked");
    alert("Google Login - Integration required");
  };

  // Check for remembered email on component mount
  useState(() => {
    let rememberedEmail = null;
    if (typeof window !== "undefined") {
      rememberedEmail = localStorage.getItem("rememberedEmail");
    }
    if (rememberedEmail) {
      setFormData((prev) => ({
        ...prev,
        email: rememberedEmail,
        rememberMe: true,
      }));
    }
  });

  return (
    <div className={styles.page}>
      {/* Main Content */}
      <main className={styles.main}>
        <div className={styles.grid}>
          {/* Left Side - Student Login Info */}
          <div className={styles.leftSection}>
            <div className={styles.content}>
              <h1>Student Login</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur. Tempus massa eget elit
                id imperdiet et. Cras eu sit dignissim lorem nibh et. Ac cum
                eget habitant tellus feugiat senectus in.
              </p>
            </div>

            {/* Student Image */}
            <div className={styles.studentImage}>
              <Image src={StudentImage} alt="Happy students" />
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className={styles.rightSection}>
            <div className={styles.formContainer}>
              <div className={styles.formInner}>
                <div className={styles.formHeader}>
                  <h2>Login</h2>
                  <p>Welcome back! Please log in to access your account.</p>
                </div>

                <form className={styles.form} onSubmit={handleSubmit}>
                  {/* Login Error Message */}
                  {loginError && (
                    <div className={styles.errorMessage}>
                      {loginError}
                    </div>
                  )}

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
                        onBlur={() =>
                          validator.current.showMessageFor("password")
                        }
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
                      "required"
                    )}
                  </div>

                  {/* Forgot Password and Remember Me Row */}
                  <div className={styles.loginOptions}>
                    {/* Remember Me */}
                    <div className={styles.rememberMe}>
                      <label>
                        <input
                          type="checkbox"
                          id="remember"
                          name="rememberMe"
                          checked={formData.rememberMe}
                          onChange={handleChange}
                        />
                        <span>Remember Me</span>
                      </label>
                    </div>

                    {/* Forgot Password Link */}
                    <div className={styles.forgotPassword}>
                      <Link href="/forgot-password">Forgot Password?</Link>
                    </div>
                  </div>

                  {/* Login Button */}
                  <button type="submit" className={styles.buttonGradient}>
                    Login
                  </button>

                  {/* Divider */}
                  <div className={styles.divider}>
                    <span>OR</span>
                  </div>

                  {/* Google Login Button */}
                  <button
                    type="button"
                    className={styles.buttonGoogle}
                    onClick={handleGoogleLogin}
                  >
                    <div className={styles.buttonGoogleInner}>
                      <Image
                        src={googleIcon}
                        alt="Google Logo"
                        width={30}
                        height={30}
                      />
                      Login with Google
                    </div>
                  </button>

                  {/* Sign Up Link */}
                  <p className={styles.signUpLink}>
                    Don't have an account? <Link href="/sign-up">Sign Up →</Link>
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