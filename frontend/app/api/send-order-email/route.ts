"use client"

// This is a client-side implementation since we're using static export
// In a real app with a server, you would use a server-side API route

export async function sendOrderEmail(orderData: any) {
  // In a real app, you would send this data to your email service
  // For demo purposes, we'll just log it to the console
  console.log("Sending order email with data:", orderData)

  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Email sent successfully!")
      resolve({ success: true })
    }, 1500)
  })
}

