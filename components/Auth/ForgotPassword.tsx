import Link from "next/link"
import styles from "@/app/page.module.css"
import Image from "next/image"
import googleIcon from '@/assets/Icone/google.png'
import StudentImage from '@/assets/Icone/student.png'

export default function ForgotPasswordPage() {
  return (
    <div className={styles.page}>
      {/* Main Content */}
      <main className={styles.main}>
        <div className={styles.grid}>
          {/* Left Side - Info */}
          <div className={styles.leftSection}>
            <div className={styles.content}>
              <h1>Forget password</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur. Tempus tincidunt etiam eget elit id imperdiet et. Cras eu sit
                dignissim lorem nibh et. Ac cum eget habitasse in velit fringilla feugiat senectus in.
              </p>
            </div>

            <div className={styles.studentImage}>
              <Image src={StudentImage} alt="Happy students" />
            </div>
          </div>

          {/* Right Side - Forgot Password Form */}
          <div className={styles.rightSection}>
            <div className={styles.formContainer}>
              <div className={styles.formInner}>
                <div className={styles.formHeader}>
                  <h2>Forget Password</h2>
                  <p>Enter the email address you use on Open all tech. We'll send you a link to reset your password.</p>
                </div>

                <form className={styles.form}>
                  {/* Email Field */}
                  <div className={styles.formField}>
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" placeholder="Enter your Email" className={styles.input} />
                  </div>

                  {/* Terms Agreement */}
                  <div className={styles.termsAgreement}>
                     <input type="checkbox" id="remember" className={styles.checkbox} />
                    <p>
                      I agree with <Link href="#">Terms of Use</Link> and <Link href="#">Privacy Policy</Link>
                    </p>
                  </div>

                  {/* Reset Password Button */}
                  <button type="submit" className={styles.buttonGradient}>
                    Reset Password
                  </button>

                  {/* Divider */}
                  <div className={styles.divider}>
                    <span>OR</span>
                  </div>

                  {/* Email Login Link Button */}
                  <button type="button" className={styles.buttonSecondary}>
                    Email me a login link
                  </button>

                  {/* Back to Login Link */}
                  <p className={styles.signUpLink}>
                    Back to <span>{" "}</span><Link href="/">Login →</Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
