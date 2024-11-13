$(document).ready(function() {
    $('.showcase-img').on('click', function() {
        $(this).siblings('.carName, .description').slideToggle(300); // Toggle the description with slide effect
    });

function toggleMenu() {
    // Show/hide animation for the navigation menu
    $("#expandMenu").click(function(){
        $('.menuContent').toggle(500);
    });
    
    // Smooth scroll functionality for navigation menu sections
    $('#navigationMenu a').click(function(event) {
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
    }

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
})
})