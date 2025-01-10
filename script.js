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

// ---------------------------------------------------------
// Function Name: vehicleShowcase
//   Handles the features for the Vehicle Showcase.
//   1. Toggles visibility of the car description
//   2. Hover effect (mouse enter and leave) on the cards
//   3. Toggles vehicle cards based on search filter
//   4. Toggles vehicle cards based on button filter
//   5. Slide up fade in effect animation for cards
// ---------------------------------------------------------
function vehicleShowcase() {
    // Scope event handlers to showcase cards only
    $('.card').each(function () {
        // Remove any existing handlers to avoid duplication
        $(this).off();

        // Toggle visibility of card text on click
        $(this).on('click', function () {
            // Toggle name + description
            $(this).find('.card-title').stop().slideToggle(200);
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

    // Function to filter the cars based on search input
    function filterCars(searchTerm) {
        $('#car-cards > .card').each(function () {
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

    // Real-time Search Filter
    $('#myInput').on('keyup', function () {
        // Get the search term
        let searchTerm = $(this).val().toLowerCase(); // Convert input to lowercase for case-insensitive matching
        filterCars(searchTerm);  // Call the function to filter cars based on the search term
    });

    // Filtering cars based on car category
    $(".filterBtn").off().on('click', function () {

        // Get the target data to filter
        const filter = $(this).attr("data-filter");

        if (filter === "all") {
            // For slide up fade in effect
            $("#car-cards > .card").addClass("slide");

            // For smooth slide up fade in
            $("#car-cards > .card").hide();
            // Show all products
            $("#car-cards > .card").show();

            // Move the first card to the end to smoothen the effect
            const firstCard = $("#car-cards > .card:first").detach();
            $("#car-cards").append(firstCard);

        } else {
            // Hide all products and show only the filtered ones
            $("#car-cards > .card").hide();
            
            // For slide up fade in effect
            $("." + filter).addClass("slide");

            // For smooth slide up fade in
            $("." + filter).show();

            // Move the first card to the end to smoothen the effect
            const firstFilteredCard = $("." + filter + ":first").detach();
            $("#car-cards").append(firstFilteredCard);
        }

        // Remove 'active' class from all filter buttons
        $('.filterBtn').removeClass('active');
        // Add 'active' class to the clicked button
        $(this).addClass('active');
    });
    
    // For the slide up fade in effect
    $(window).scroll(function() {
        $(".slideanim").each(function(){
            var pos = $(this).offset().top;

            var winTop = $(window).scrollTop();
            if (pos < winTop + 600) {
                $(this).addClass("slide");
            }
        });
    });
}

// ---------------------------------------------------------
// Function Name: compareVehicle
//   Handles the features for the Vehicle Comparison.
//   1. Defines the car names and specification
//   2. Defines functions for adding specification
//   3. Defines functions for calculating rating
//   4. Defines functions for animating progress bars
//   5. Calculates the better car based on specifications
//   6. Logs in history every completed car comparison
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
        car1: { 
            name: "Honda Civic Si", 
            speed: 225, // kph
            fuelEfficiency: 6.0, // L/100km
            price: 27500, // CAD
            cargoSpace: 425, // Liters
            safetyFeatures: 8, // Count
            torque: 200 // LBS
        },
        car2: { 
            name: "Hyundai Sonata", 
            speed: 217, 
            fuelEfficiency: 6.5, 
            price: 26000, 
            cargoSpace: 450, 
            safetyFeatures: 9,
            torque: 200 // LBS
        },
        car3: { 
            name: "Toyota Camry TRD", 
            speed: 233, 
            fuelEfficiency: 8.0, 
            price: 32000, 
            cargoSpace: 428, 
            safetyFeatures: 9,
            torque: 200 // LBS
        },
        car4: { 
            name: "Mitsubishi Outlander", 
            speed: 201, 
            fuelEfficiency: 8.5, 
            price: 27500, 
            cargoSpace: 880, 
            safetyFeatures: 7,
            torque: 200 // LBS
        },
        car5: { 
            name: "Nissan Rogue", 
            speed: 193, 
            fuelEfficiency: 7.3, 
            price: 28500, 
            cargoSpace: 1050, 
            safetyFeatures: 8,
            torque: 200 // LBS
        },
        car6: { 
            name: "Subaru Outback", 
            speed: 209, 
            fuelEfficiency: 9.0, 
            price: 30000, 
            cargoSpace: 1000, 
            safetyFeatures: 9,
            torque: 200 // LBS
        },
        car7: { 
            name: "Ford Raptor", 
            speed: 185, 
            fuelEfficiency: 13.4, 
            price: 52000, 
            cargoSpace: 1400, 
            safetyFeatures: 7, 
            torque: 200 // LBS
        },
        car8: { 
            name: "Nissan Frontier", 
            speed: 193, 
            fuelEfficiency: 11.2, 
            price: 29000, 
            cargoSpace: 1250, 
            safetyFeatures: 6,
            torque: 200 // LBS
        },
        car9: { 
            name: "Toyota Tacoma", 
            speed: 201, 
            fuelEfficiency: 12.8, 
            price: 35000, 
            cargoSpace: 1275, 
            safetyFeatures: 8,
            torque: 200 // LBS
        }
    };

    // Function to add animated spec progress bars
    function addSpecBars(card, car) {
        // Calculate percentage values
        const speedPercentage = ((car.speed / 250) * 100).toFixed(2);
        const fuelPercentage = ((car.fuelEfficiency / 15) * 100).toFixed(2);
        const safetyPercentage = ((car.safetyFeatures / 10) * 100).toFixed(2);
        const cargoPercentage = ((car.cargoSpace / 1500) * 100).toFixed(2);
        const pricePercentage = ((car.price / 60000) * 100).toFixed(2);
        const torquePercentage = ((car.torque/500) * 100).toFixed(2);

        // Calculate the overall rating using the provided function
        const overallRating = calculateRating(car).toFixed(2);  // This will be a number between 0 and 100


        // Add speed progress bar
        const speedBar = `
            <div class="d-flex align-items-center mt-5">
                <div class="spec-label" style="width: 150px;">Top Speed</div>
                <div class="progress" style="flex-grow: 1;">
                    <div class="progress-bar" style="width: 0%;" role="progressbar"></div>
                </div>
            </div>
            <div class="spec-value">${car.speed} km/hr</div>`;  // Add percentage below and align it to the right

        // Add fuel efficiency progress bar
        const fuelBar = `
            <div class="d-flex align-items-center mt-3">
                <div class="spec-label" style="width: 150px;">Fuel Efficiency</div>
                <div class="progress" style="flex-grow: 1;">
                    <div class="progress-bar" style="width: 0%;" role="progressbar"></div>
                </div>
            </div>
            <div class="spec-value">${car.fuelEfficiency} L/100km</div>`;  // Add percentage below and align it to the right

        // Add safety features progress bar
        const safetyBar = `
            <div class="d-flex align-items-center mt-3">
                <div class="spec-label" style="width: 150px;">Safety Features</div>
                <div class="progress" style="flex-grow: 1;">
                    <div class="progress-bar" style="width: 0%;" role="progressbar"></div>
                </div>
            </div>
            <div class="spec-value">${car.safetyFeatures} ratings</div>`;  // Add percentage below and align it to the right

        // Add cargo space progress bar
        const cargoBar = `
            <div class="d-flex align-items-center mt-3">
                <div class="spec-label" style="width: 150px;">Cargo Space</div>
                <div class="progress" style="flex-grow: 1;">
                    <div class="progress-bar" style="width: 0%;" role="progressbar"></div>
                </div>
            </div>
            <div class="spec-value">${car.cargoSpace} L</div>`;  // Add percentage below and align it to the right

        // Add torque progress bar
        const torqueBar = `
        <div class="d-flex align-items-center mt-3">
            <div class="spec-label" style="width: 150px;">Torque</div>
            <div class="progress" style="flex-grow: 1;">
                <div class="progress-bar" style="width: 0%;" role="progressbar"></div>
            </div>
        </div>
        <div class="spec-value">${car.torque.toLocaleString()} LBS</div>`;  // Add percentage below and align it to the right

        // Add price progress bar
        const priceBar = `
            <div class="d-flex align-items-center mt-3">
                <div class="spec-label" style="width: 150px;">Price</div>
                <div class="progress" style="flex-grow: 1;">
                    <div class="progress-bar" style="width: 0%;" role="progressbar"></div>
                </div>
            </div>
            <div class="spec-value">CA$${car.price.toLocaleString()}</div>`;  // Add percentage below and align it to the right

        // Add overall rating progress bar
        const overallRatingBar = `
        <div class="d-flex align-items-center mt-5 ratingDiv">
            <div class="spec-label" style="width: 150px;">Overall Rating</div>
            <div class="progress" style="flex-grow: 1;">
                <div class="progress-bar overallRating" style="width: 0%;" role="progressbar"></div>
            </div>
        </div>
        <div class="spec-value ratingDiv">${overallRating}%</div>`;

        // Append the spec bars and the labels to the card
        $(card).find('.card-body').append(speedBar, fuelBar, safetyBar, cargoBar, torqueBar, priceBar, overallRatingBar);

        // Animate the progress bars from 0% to the calculated percentage with faster animation
        $(card).find('.progress-bar').each(function(index) {
            let percentage;
            if (index === 0) percentage = speedPercentage;
            else if (index === 1) percentage = fuelPercentage;
            else if (index === 2) percentage = safetyPercentage;
            else if (index === 3) percentage = cargoPercentage;
            else if (index === 4) percentage = torquePercentage;
            else if (index === 5) percentage = pricePercentage;
            else if (index === 6) percentage = overallRating;
    
            // Animate to the desired percentage over 0.5 seconds
            $(this).animate({ width: percentage + '%' }, 500);
        });
    }

    // Function to calculate the car rating based on specs
    function calculateRating(car) {
        const speedRating = (car.speed / 250) * 100;
        const fuelEfficiencyRating = (car.fuelEfficiency / 15) * 100;
        const safetyFeaturesRating = car.safetyFeatures / 10;
        const cargoSpaceRating = (car.cargoSpace / 1500) * 100;
        const torqueRating = (car.torque / 500) * 100
        const priceRating = (60000 / car.price) * 100;

        // Weighted average of specs (You can adjust the weightings as necessary)
        const rating = (speedRating * 0.05) + (fuelEfficiencyRating * 0.4) + (safetyFeaturesRating * 0.25) + (cargoSpaceRating * 0.10) + (torqueRating * 0.10) + (priceRating * 0.10);
        
        // Rating will be between 0 and 100
        return rating; 
    }

    // Function to animate progress bars
    function animateProgressBars() {
        $(".progress-bar").each(function() {
            // Get the target width from the element's current inline style
            const targetWidth = $(this).attr("style").match(/width:\s?(\d+)%/)[1];
            
            // Reset the width to 0 for animation effect
            $(this).css("width", "0");
            
            // Animate to the target width
            setTimeout(() => {
                $(this).css("width", targetWidth + "%");
            }, 100); // Small delay to ensure the animation is visible
        });
    }

    // Code for clicking Compare button
    // Remove any previously attached handlers before adding a new one
    $('.calculate').off('click').on('click', function () {
        // Prepare for the 2 vehicles to compare -----------------
        const firstCarId = $('#firstCar').val();
        const secondCarId = $('#secondCar').val();
        const thirdCarId = $('#thirdCar').val();

        if (firstCarId === secondCarId) {
            alert("Please select another car for comparison.");
            return;
        }
        if (firstCarId === thirdCarId) {
            alert("PLease select another car for comparison.")
        }

        // Empty the comparison container before adding new comparison cards
        $('#firstCarResult').empty();
        $('#secondCarResult').empty();
        $('#thirdCarResult').empty();

        // Clone the selected car cards based on the car IDs
        const firstCarCard = $(`#${firstCarId}`).clone();
        const secondCarCard = $(`#${secondCarId}`).clone();
        const thirdCarCard = $(`#${thirdCarId}`).clone();

        // Remove class to not follow the flex behavior from showcase section
        firstCarCard.removeClass("col-md-4");
        secondCarCard.removeClass("col-md-4");
        thirdCarCard.removeClass("col-md-4");
        

        // Ensure cards are visible
        firstCarCard.css('display', 'block');
        secondCarCard.css('display', 'block');
        thirdCarCard.css('display', 'block');

        // Show the comparison result section
        $('#comparisonContainer').show();

        // Scroll to the compared vehicle
        $('html, body').animate({
            scrollTop: $("#comparisonContainer").offset().top
        }, 500); // 500 milliseconds for the animation


        // Prepare for all the car specification -----------------
        // Use the carSpecs object to get the car specs
        const firstCar = carSpecs[firstCarId];
        const secondCar = carSpecs[secondCarId];
        const thirdCar = carSpecs[thirdCarId];

        // Add the spec bars and total rating to both cars
        addSpecBars(firstCarCard, firstCar);
        addSpecBars(secondCarCard, secondCar);
        addSpecBars(thirdCarCard, thirdCar);

        // Calculate ratings for both cars
        const firstCarRating = calculateRating(firstCar);
        const secondCarRating = calculateRating(secondCar);
        const thirdCarRating = calculateRating(thirdCar);

        // Find the better car based on the overall rating
        let betterCar;
        let betterRating;
        if (firstCarRating > secondCarRating) {
            betterCar = carSpecs[firstCarId].name;
            betterRating = firstCarRating.toFixed(2);
        } 
        else if (firstCarRating > thirdCarRating) {
            betterCar = carSpecs[firstCarId].name;
            betterRating = firstCarRating.toFixed(2);
        } 
        else if (secondCarRating > thirdCarRating) {
            betterCar = carSpecs[secondCarId].name;
            betterRating = secondCarRating.toFixed(2);
        } 
        else if (thirdCarRating > firstCarRating) {
            betterCar = carSpecs[thirdCarId].name;
            betterRating = thirdCarRating.toFixed(2);
        } 
        else if (thirdCarRating > secondCarRating) {
            betterCar = carSpecs[thirdCarId].name;
            betterRating = thirdCarRating.toFixed(2);
        } else {
            betterCar = "Both cars";
            // Since both ratings are the same
            betterRating = firstCarRating.toFixed(2);
        }



        // Display the result in the result container
        const resultMessage = `
            <h3>Comparison Result:</h3>
            <p class="mt-3"><strong>${betterCar}</strong> has the better overall rating⁺ of <strong>${betterRating}%</strong>.</p>
            <p><i>⁺overallRating = (0.05 * topSpeed) + (0.40 * fuelEfficiency) + (0.25 * safetyFeatures) + (0.10 * cargoSpace) + (0.20 * price)</i></p>
            `;

        // Insert the result into the #resultMessage div
        $('#resultMessage').html(resultMessage);
        // Show the result container
        $('#resultContainer').fadeIn();

        // Append the modified cards to the comparison container
        $('#firstCarResult').append(firstCarCard);
        $('#secondCarResult').append(secondCarCard);
        $('#thirdCarResult').append(thirdCarCard);

        // Add card hover effect after adding the 2 cars
        $('#comparisonContainer .card').each(function () {
            // Remove any existing handlers to avoid duplication
            $(this).off();

            // Show visibility of card titles
            $(this).find('.card-title').show();
            // Hide visibility of card text
            $(this).find('.card-text').hide();

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

        // Prepare for storing in history -----------------
        // Remove text for empty history
        $("#histEmpty").css('display', 'none');

        // Create a variable to store both car selections with names
        const firstCarName = carNames[firstCarId];
        const secondCarName = carNames[secondCarId];
        const thirdCarName = carNames[thirdCarId];

        // Create a comparison value string for checking history
        const comparisonText = `${firstCarName} • ${secondCarName} • ${thirdCarName}`;
        const comparisonValue = `${firstCarId}-${secondCarId}-${thirdCarId}`;

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
                                        <button class="btn btn-sm btn-primary restore-history" data-comparison="${comparisonValue}">Restore</button></li>`;

            // Append the new comparison history item to the list
            $('#historyList').append(historyItem); // Add new history without replacing previous entries
        }
    });

    // Trigger animation on page load
    animateProgressBars();
}

// ---------------------------------------------------------
// Function Name: vehicleHistory
//   Handles the features for the Comparison History.
//   1. Restores the selected comparison history
// ---------------------------------------------------------
function vehicleHistory() {
    // Restore the selection when clicking a history item
    $('#historyList').off('click', '.restore-history').on('click', '.restore-history', function() {
        const comparisonValue = $(this).data('comparison'); // Get the stored comparison values

        // Split the comparison value back into the first and second car IDs
        const [firstCarId, secondCarId, thirdCarId] = comparisonValue.split('-');

        // Update the combo boxes with the stored values
        $('#firstCar').val(firstCarId);
        $('#secondCar').val(secondCarId);
        $('#thirdCar').val(thirdCarId);

        // Trigger the "Compare" button click after restoring the values
        $('.calculate').click();
    });
}
