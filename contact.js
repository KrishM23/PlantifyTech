document.addEventListener('DOMContentLoaded', () => {
    emailjs.init("ZbpzfJjlgBvlrhlyav"); // Your EmailJS public key

    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();

        // Generate the email template parameters
        const templateParams = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value,
        };

        // Send the email using EmailJS
        emailjs.send('service_axotygq', 'template_uoq2ua1', templateParams)
            .then(response => {
                console.log('SUCCESS!', response.status, response.text);
                alert('Message sent successfully!');
            }, error => {
                console.log('FAILED...', error);
                alert('Failed to send message. Please try again later.');
            });

        // Reset the form after submission
        document.getElementById('contact-form').reset();
    });
});
