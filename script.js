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
})