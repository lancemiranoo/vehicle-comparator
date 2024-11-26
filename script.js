// ---------------------------------------------------------
// jQuery ready() Method
//   Ensures Fully Loaded DOM (document object model)
//   before calling functions for the different sections
// ---------------------------------------------------------
$(document).ready(function() {
    navigationMenu();
    vehicleShowcase(); 
    compareVehicle();
    vehicleHistory();
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

// filter isnt fix yet



// ---------------------------------------------------------
// Function Name: vehicleShowcase
//   Handles the features for the Vehicle Showcase.
//   1. Toggles visibility of the card text
//   2. Hover effect (mouse enter and leave) on the cards
// ---------------------------------------------------------
function vehicleShowcase() {
    // Scope event handlers to showcase cards only
    $('#showcase .card').each(function () {
        // Remove any existing handlers to avoid duplication
        $(this).off();

        // Toggle visibility of card text on click
        $(this).on('click', function () {
            $(this).find('.card-text').stop().slideToggle(200);
        });

        // Add hover effects for the showcase cards
        $(this).on('mouseenter', function () {
            $(this).css({
                'transform': 'translateY(-5px)',
                'box-shadow': '0px 8px 16px rgba(0, 0, 0, 0.15)'
            });
        });

        $(this).on('mouseleave', function () {
            $(this).css({
                'transform': 'none',
                'box-shadow': 'none'
            });
        });
    });


    // Real-time Search Filter
    $('#myInput').on('keyup', function () {
        // Get the search term
        let searchTerm = $(this).val().toLowerCase(); // Convert input to lowercase for case-insensitive matching
        filterCars(searchTerm);  // Call the function to filter cars based on the search term
    });

    // Function to filter the cars based on search input
    function filterCars(searchTerm) {
        $('#showcase .card').each(function () {
            const card = $(this);
            const carName = card.find('.card-title').text().toLowerCase(); // Get the car name
            const carDescription = card.find('.card-text').text().toLowerCase(); // Get the car description

            // Check if the car name or description contains the search term
            if (carName.indexOf(searchTerm) !== -1 || carDescription.indexOf(searchTerm) !== -1) {
                card.show(); // Show the card if it matches
            } else {
                card.hide(); // Hide the card if it doesn't match
            }
        });
    }

    // Filtering cars based on category (e.g., sedan, suv, etc.)
    $(".filterBtn").off().on('click', function () {
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
}
// ---------------------------------------------------------
function compareVehicle() {
    // Define a mapping of car IDs to car names
    const carNames = {
        car1: "Honda Civic Si",
        car2: "Hyundai Sonata",
        car3: "Toyota Camry TRD",
        car4: "Mitsubishi Outlander",
        car5: "Nissan Rogue",
        car6: "Subaru Outback",
        car7: "Ford Raptor",
        car8: "Nissan Frontier",
        car9: "Toyota Tacoma"
    };

    // Define car specs for each car
    const carSpecs = {
        car1: { name: "Honda Civic Si", speed: 180, fuelEfficiency: 30, price: 27500, cargoSpace: 90, safetyFeatures: 60 },
        car2: { name: "Hyundai Sonata", speed: 170, fuelEfficiency: 28, price: 26000, cargoSpace: 90, safetyFeatures: 60 },
        car3: { name: "Toyota Camry TRD", speed: 200, fuelEfficiency: 25, price: 32000, cargoSpace: 90, safetyFeatures: 60 },
        car4: { name: "Mitsubishi Outlander", speed: 160, fuelEfficiency: 24, price: 27500, cargoSpace: 90, safetyFeatures: 60 },
        car5: { name: "Nissan Rogue", speed: 150, fuelEfficiency: 32, price: 28000, cargoSpace: 90, safetyFeatures: 60 },
        car6: { name: "Subaru Outback", speed: 170, fuelEfficiency: 22, price: 30000, cargoSpace: 90, safetyFeatures: 60 },
        car7: { name: "Ford Raptor", speed: 190, fuelEfficiency: 18, price: 52000, cargoSpace: 90, safetyFeatures: 60 },
        car8: { name: "Nissan Frontier", speed: 180, fuelEfficiency: 20, price: 29000, cargoSpace: 90, safetyFeatures: 60 },
        car9: { name: "Toyota Tacoma", speed: 185, fuelEfficiency: 22, price: 35000, cargoSpace: 90, safetyFeatures: 60 }
    };

    // Function to calculate the car rating based on specs
    function calculateRating(car) {
        const speedRating = (car.speed / 250) * 100; // Normalize speed to 100
        const fuelEfficiencyRating = (car.fuelEfficiency / 40) * 100; // Normalize to a scale of 40 mpg
        const safetyFeaturesRating = car.safetyFeatures; // Already a percentage
        const cargoSpaceRating = (car.cargoSpace / 100) * 100;
        const priceRating = (30000 / car.price) * 100;

        // Weighted average of specs (You can adjust the weightings as necessary)
        const rating = (speedRating * 0.1) + (fuelEfficiencyRating * 0.4) + (safetyFeaturesRating * 0.3) + (cargoSpaceRating * 0.1) + (priceRating * 0.1);
        return rating; // Rating will be between 0 and 100
    }

    // Remove any previously attached handlers before adding a new one
    $('.calculate').off('click').on('click', function () {
        const firstCarId = $('#firstCar').val();
        const secondCarId = $('#secondCar').val();

        if (firstCarId === secondCarId) {
            alert("Please select two different cars for comparison.");
            return;
        }

        // Empty the comparison container before adding new comparison cards
        $('#firstCarResult').empty();
        $('#secondCarResult').empty();

        // Clone the selected car cards based on the car IDs
        const firstCarCard = $(`#${firstCarId}`).clone();
        const secondCarCard = $(`#${secondCarId}`).clone();

        // Show the comparison result section
        $('#comparisonContainer').show();

        // Use the carSpecs object to get the car specs
        const firstCar = carSpecs[firstCarId];
        const secondCar = carSpecs[secondCarId];

        // Calculate ratings for both cars
        const firstCarRating = calculateRating(firstCar);
        const secondCarRating = calculateRating(secondCar);

        // Function to add individual spec progress bars
        function addSpecBars(card, car) {
            // Add speed progress bar
            const speedBar = `
                <div class="d-flex align-items-center mt-3">
                    <div class="spec-label" style="width: 150px;">Speed</div>
                    <div class="progress" style="flex-grow: 1;">
                        <div class="progress-bar" style="width: ${(car.speed / 250) * 100}%" role="progressbar"></div>
                    </div>
                </div>`;
    
            // Add fuel efficiency progress bar
            const fuelBar = `
                <div class="d-flex align-items-center mt-3">
                    <div class="spec-label" style="width: 150px;">Fuel Efficiency</div>
                    <div class="progress" style="flex-grow: 1;">
                        <div class="progress-bar" style="width: ${(car.fuelEfficiency / 40) * 100}%" role="progressbar"></div>
                    </div>
                </div>`;
    
            // Add safety features progress bar
            const safetyBar = `
                <div class="d-flex align-items-center mt-3">
                    <div class="spec-label" style="width: 150px;">Safety Features</div>
                    <div class="progress" style="flex-grow: 1;">
                        <div class="progress-bar" style="width: ${(car.safetyFeatures / 100) * 100}%" role="progressbar"></div>
                    </div>
                </div>`;
    
            // Add cargo space progress bar
            const cargoBar = `
                <div class="d-flex align-items-center mt-3">
                    <div class="spec-label" style="width: 150px;">Cargo Space</div>
                    <div class="progress" style="flex-grow: 1;">
                        <div class="progress-bar" style="width: ${(car.cargoSpace / 100) * 100}%" role="progressbar"></div>
                    </div>
                </div>`;
    
            // Add price progress bar
            const priceBar = `
                <div class="d-flex align-items-center mt-3">
                    <div class="spec-label" style="width: 150px;">Price</div>
                    <div class="progress" style="flex-grow: 1;">
                        <div class="progress-bar" style="width: ${(car.price / 50000) * 100}%" role="progressbar"></div>
                    </div>
                </div>`;
    
            // Append the spec bars and the labels to the card
            $(card).find('.card-body').append(speedBar, fuelBar, safetyBar, cargoBar, priceBar);
        }


        // Add the spec bars and total rating to both cars
        addSpecBars(firstCarCard, firstCar);
        addSpecBars(secondCarCard, secondCar);


        // Append the modified cards to the comparison container
        $('#firstCarResult').append(firstCarCard);
        $('#secondCarResult').append(secondCarCard);

        // Create a variable to store both car selections with names
        const firstCarName = carNames[firstCarId];
        const secondCarName = carNames[secondCarId];

        // Create a comparison value string for checking history
        const comparisonText = `${firstCarName} vs ${secondCarName}`;
        const comparisonValue = `${firstCarId}-${secondCarId}`;

        // Check if the history already contains this comparison
        let isHistoryExist = false;

        // Loop through each history item and check if this comparison already exists
        $('#historyList .list-group-item').each(function () {
            const historyComparison = $(this).find('button').data('comparison');
            if (historyComparison === comparisonValue) {
                isHistoryExist = true; // Set flag if history already contains the comparison
            }
        });

        // If the history item doesn't exist, append it
        if (!isHistoryExist) {
            const historyItem = `<li class="list-group-item d-flex justify-content-between align-items-center">${comparisonText}
                                        <button class="btn btn-sm btn-info restore-history" data-comparison="${comparisonValue}">Restore</button></li>`;

            // Append the new comparison history item to the list
            $('#historyList').append(historyItem); // Add new history without replacing previous entries
        }
    });

}

function vehicleHistory() {
    // Restore the selection when clicking a history item
    $('#historyList').on('click', '.restore-history', function () {
        const comparisonValue = $(this).data('comparison'); // Get the stored comparison values

        // Split the comparison value back into the first and second car IDs
        const [firstCarId, secondCarId] = comparisonValue.split('-');

        // Update the combo boxes with the restored values
        $('#firstCar').val(firstCarId);
        $('#secondCar').val(secondCarId);

        // Empty the current comparison section before re-rendering
        $('#firstCarResult').empty();
        $('#secondCarResult').empty();

        // Clone the selected car cards based on the restored car IDs
        const firstCarCard = $(`#${firstCarId}`).clone();
        const secondCarCard = $(`#${secondCarId}`).clone();

        // Add the spec bars and total rating to both restored cars
        const firstCar = carSpecs[firstCarId];
        const secondCar = carSpecs[secondCarId];

        const firstCarRating = calculateRating(firstCar);
        const secondCarRating = calculateRating(secondCar);

        addSpecBars(firstCarCard, firstCar);
        addSpecBars(secondCarCard, secondCar);
        addTotalRatingBar(firstCarCard, firstCarRating);
        addTotalRatingBar(secondCarCard, secondCarRating);

        // Append the restored cards to the comparison container
        $('#firstCarResult').append(firstCarCard);
        $('#secondCarResult').append(secondCarCard);

        // Show the comparison result section
        $('#comparisonContainer').show();
    });
    
        // Restore the selection when clicking a history item
        $('#historyList').off('click', '.restore-history').on('click', '.restore-history', function() {
            const comparisonValue = $(this).data('comparison'); // Get the stored comparison values
    
            // Split the comparison value back into the first and second car IDs
            const [firstCarId, secondCarId] = comparisonValue.split('-');
    
            // Update the combo boxes with the stored values
            $('#firstCar').val(firstCarId);
            $('#secondCar').val(secondCarId);
    
            // Trigger the "Compare" button click after restoring the values
            $('.calculate').click();
    });
}
