document.addEventListener("DOMContentLoaded", () => {
    const sendOtpBtn = document.getElementById("send-otp-btn");
    const otpField = document.getElementById("otp-field");
    const otpInput = document.getElementById("otp-input");
    const emailInput = document.getElementById("signup-email");
    const signupForm = document.getElementById("signup-form");
  
    sendOtpBtn.addEventListener("click", async () => {
      const email = emailInput.value;
      if (!email) {
        alert("Please enter a valid email address.");
        return;
      }
  
      try {
        const response = await fetch("http://localhost:3000/send-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
  
        const result = await response.json();
  
        if (result.success) {
          alert("OTP sent to your email!");
          otpField.style.display = "block";
        } else {
          alert("Failed to send OTP. Please try again.");
        }
      } catch (error) {
        console.error("Error sending OTP:", error);
        alert("An error occurred.");
      }
    });
  
    signupForm.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const userEnteredOTP = otpInput.value;
  
      try {
        const response = await fetch("http://localhost:3000/verify-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ otp: userEnteredOTP }),
        });
  
        const result = await response.json();
  
        if (result.success) {
          alert("Registration successful!");
          signupForm.reset();
          otpField.style.display = "none";
        } else {
          alert("Invalid OTP.");
        }
      } catch (error) {
        console.error("OTP verification failed:", error);
        alert("Verification error.");
      }
    });
  });
  