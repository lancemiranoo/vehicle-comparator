// ---------------------------------------------------------
// jQuery ready() Method
//   Ensures Fully Loaded DOM (document object model)
//   before calling functions for the different sections
// ---------------------------------------------------------
$(document).ready(function() {
    navigationMenu();
    vehicleShowcase(); 
});

// ---------------------------------------------------------
// Function Name: navigationMenu
//   Handles the features for the Navigation Menu.
//   1. Smooth scroll animation with swing easing effect
//   2. Change nav link colors on hover
//   3. Update active link based on scroll position
// ---------------------------------------------------------
function navigationMenu() {
    // Smooth scroll functionality for navigation menu sections
    $('#main-nav a').click(function(event) {
        // Prevent default anchor behavior
        event.preventDefault();

        // Get the target section ID
        const target = $(this).attr('href');

        // Get the vertical position of the target
        const offsetTop = $(target).offset().top; 

        // Smoothly animate the scroll to the target section
        $('html, body').animate(
            { scrollTop: offsetTop },
            100,
            'swing' // Easing effects for swing
        ); 
    });

    // Add hover effect on nav links
    $(".nav-link").hover(
        function() {
            // Mouse enter: Apply styles
            $(this).css({
                "color": "grey",
                "text-decoration": "underline",
                "text-underline-offset": "1rem",
                "text-decoration-color": "rgb(181, 181, 181)"
            });
        },
        function() {
            // Mouse leave: Remove styles
            $(this).css({
                "color": "",
                "text-decoration": "",
                "text-underline-offset": "",
                "text-decoration-color": ""
            });
        }
    );

    // Scroll event to update active link based on scroll position
    $(window).on('scroll', function () {
        // Define the sections and offset
        const sections = ['#home', '#showcase', '#compare', '#history'];
        const scrollPos = $(document).scrollTop() + 100; // Adjust for offset (navbar height)

        sections.forEach(function (section) {
            const sectionOffset = $(section).offset().top;
            const sectionHeight = $(section).outerHeight();

            // Check if current scroll position is within this section
            if (scrollPos >= sectionOffset && scrollPos < sectionOffset + sectionHeight) {
                $('.nav-link').removeClass('active');
                $(`.nav-link[href="${section}"]`).addClass('active');
            }
        });
    });
}

// ---------------------------------------------------------
// Function Name: vehicleShowcase
//   Handles the features for the Vehicle Showcase.
//   1. Toggles visibility of the card text
//   2. Hover effect (mouse enter and leave) on the cards
// ---------------------------------------------------------
function vehicleShowcase() {
    $('.card').each(function() {
        // Click event to each card
        $(this).on('click', function() {
            // Toggle 'show' class on the card text (p.card-text)
            $(this).find('.card-text').stop().slideToggle(200);
        });
        
        // On mouse enter, add the hover styles
        $(this).on('mouseenter', function() {
            $(this).css({
                'transform': 'translateY(-5px)',
                'box-shadow': '0px 8px 16px rgba(0, 0, 0, 0.15)'
            });
        });

        // On mouse leave, remove the hover styles
        $(this).on('mouseleave', function() {
            $(this).css({
                'transform': 'none',
                'box-shadow': 'none'
            });
        });

        // Toggle visibility for filtering products based on category
        $(".filterBtn").click(function() {
            // Get the target data to filter
            const filter = $(this).attr("data-filter");

            if (filter === "all") {
            // Show all products
            $(".card").show();
            } else {
            // Hide all products and show only the filtered ones
            $(".card").hide();
            $("." + filter).show();
            }
        });
    });
}
