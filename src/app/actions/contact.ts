"use server";

export async function contactSubmit(formData: FormData) {
  try {
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      description: formData.get("description"),
      budget: formData.get("budget"),
    };
    
    console.log("Server action form data:", data);
    
    // Basic validation
    if (!data.name || !data.email || !data.description) {
      return {
        success: false,
        message: "Please fill in all required fields."
      };
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email as string)) {
      return {
        success: false,
        message: "Please enter a valid email address."
      };
    }
    
    // Simulate API call delay (remove this in production)
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Here you would typically:
    // - Send email via service like Nodemailer, SendGrid, etc.
    // - Save to database
    // - Call external API
    
    // For now, we'll just simulate success
    console.log("Message would be sent to:", data.email);
    
    return {
      success: true,
      message: "Thank you for your message! We'll get back to you soon."
    };
    
  } catch (error) {
    console.error("Contact form error:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again later."
    };
  }
}
