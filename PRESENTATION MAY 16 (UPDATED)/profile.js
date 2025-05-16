document.getElementById('profileForm').addEventListener('submit', function(event) {
  event.preventDefault();
  alert('Profile updated successfully!');
  // Here you can add code to send the form data to your server
});

function toggleFAQ(faqId) {
  const faqContent = document.getElementById(faqId);
  if (faqContent.style.display === "block") {
      faqContent.style.display = "none";
  } else {
      faqContent.style.display = "block";
  }
}