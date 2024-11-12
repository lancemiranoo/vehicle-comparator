$(document).ready(function() {
    // $('.showcase-img').on('click', function() {
    //     $(this).siblings('.carName, .description').slideToggle(300); // Toggle the description with slide effect
    // });

    // Smooth scrolling for nav links
    $('nav a').on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();

    // Animate the scroll
    $('html, body').animate({
        scrollTop: $(this.hash).offset().top
    }, 800); // 800ms animation duration
    }
        // Hover effect on the images
        $('.showcase-item').hover(
            function() {
                // On hover: enlarge the image and add a shadow for highlight effect
                $(this).stop().animate({
                    transform: 'scale(1.1)' // Slightly enlarge the image
                }, 300);
                // Add a class to apply additional styling like box-shadow and opacity
                $(this).css({
                    'box-shadow': '0 4px 8px rgba(0, 0, 0, 0.3)', // Shadow effect
                    'opacity': '0.9' // Slight opacity for highlight
                });
            },
            function() {
                // On hover out: reset the image size and remove highlight
                $(this).stop().animate({
                    transform: 'scale(1)' // Reset the image size to normal
                }, 300);
                // Remove the highlight (shadow and opacity)
                $(this).css({
                    'box-shadow': 'none', // Remove the shadow
                    'opacity': '1' // Reset opacity to normal
                });
            }
        );

    });
});