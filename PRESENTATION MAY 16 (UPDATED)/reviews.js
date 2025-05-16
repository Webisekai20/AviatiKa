// // Toggle Read More
// document.querySelectorAll('.read-more').forEach(button => {
//   button.addEventListener('click', () => {
//     const moreText = button.previousElementSibling;
//     moreText.style.display = 'inline';
//     button.style.display = 'none';
//   });
// });

// // Toggle Reply Section
// document.querySelectorAll('.reply-btn').forEach(button => {
//   button.addEventListener('click', () => {
//     const replySection = button.closest('.review').querySelector('.reply-section');
//     replySection.classList.toggle('hidden');
//   });
// });

// // Toggle Report Modal
// const reportModal = document.getElementById('report-modal');
// document.querySelectorAll('.report-btn').forEach(button => {
//   button.addEventListener('click', () => {
//     reportModal.classList.remove('hidden');
//   });
// });

// document.getElementById('cancel-report').addEventListener('click', () => {
//   reportModal.classList.add('hidden');
// });

// document.getElementById('submit-report').addEventListener('click', () => {
//   alert('Report submitted!');
//   reportModal.classList.add('hidden');
// });
