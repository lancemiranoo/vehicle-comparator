$(document).ready(function() {               

    // Select all cards
    const cards = document.querySelectorAll(".card");

    // Add click event to each card
    cards.forEach(card => {
        card.addEventListener("click", function() {
            // Toggle 'show' class on the card body to show/hide it
            const cardBody = this.querySelector(".card-body");
            cardBody.classList.toggle("show");
        });
    });

    // Smooth scroll functionality for navigation menu sections
    $('#desktop-nav a').click(function(event) {
        // Prevent default anchor behavior
        event.preventDefault();

        // Get the target section ID
        const target = $(this).attr('href');

        // Get the vertical position of the target
        const offsetTop = $(target).offset().top; 

        // Smoothly animate the scroll to the target section
        $('html, body').animate(
            { scrollTop: offsetTop },
            1000,
            'swing' // Easing effects for swing
        ); 
    });

    // Click event for nav links to set active class
    $('.nav-links a').on('click', function() {
        // Remove active class from all links
        $('.nav-links a').removeClass('active');
        // Add active class to the clicked link
        $(this).addClass('active');
    });

    // Scroll event to update active class based on the visible section
    $(window).on('scroll', function() {
        let currentScroll = $(window).scrollTop();

        $('section').each(function() {
            let sectionTop = $(this).offset().top - 60; // Adjust for navbar height
            let sectionBottom = sectionTop + $(this).outerHeight();

            if (currentScroll >= sectionTop && currentScroll < sectionBottom) {
                let sectionId = $(this).attr('id');

                // Update active link based on scroll position
                $('.nav-links a').removeClass('active');
                $('.nav-links a[href="#' + sectionId + '"]').addClass('active');
            }
        });
    });
});