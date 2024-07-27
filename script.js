// Event listener for selecting a story
document.addEventListener('DOMContentLoaded', function(){
    // DOM elements
    const $selectedStory = document.getElementById('selectedStory');
    const $lunchRoomForm = document.getElementById('lunchRoom');
    const $weatherReportForm = document.getElementById('weatherReport');
    const $dialog = document.getElementById('dialog');
    const $closebutton = document.getElementById('close');

    // Array of form elements
    const $Forms = [$lunchRoomForm, $weatherReportForm];

    // Event listener for changing story selection
    $selectedStory.addEventListener('change', function(){
        const selectedStory = $selectedStory.value;
        $lunchRoomForm.style.display = 'none';
        $weatherReportForm.style.display = 'none';

        if (selectedStory === 'Lunch Room') {
            $lunchRoomForm.style.display = 'block';
            $weatherReportForm.style.display = 'none';
        } else if (selectedStory === 'Weather Report') {
            $weatherReportForm.style.display = 'block';
            $lunchRoomForm.style.display = 'none';
        }
    });

    // Function to validate form inputs
    function validateForm(form) {
        const inputs = form.querySelectorAll('input');
        let isValid = true;

        inputs.forEach(input => {
            if (!input.checkValidity()) {
                isValid = false;
                input.classList.add('is-invalid');
                input.nextElementSibling.textContent = 'This field must be filled';
            } else {
                input.classList.remove('is-invalid');
                input.nextElementSibling.textContent = '';
            }
        });

        return isValid;
    }

    // Function to display the completed story
    function displayStory(form) {
        const inputs = form.querySelectorAll('input');
        const storyOutput = document.getElementById('story');
        let storyText = '';

        // Logic to generate story based on form inputs
        if (form.id === 'lunchRoom') {
            storyText = `Make sure your lunch ${inputs[0].value} is filled with ${inputs[1].value} food. Do not go to 
the ${inputs[3].value} food stand across the street from the school. The hamburgers 
they serve are fried in ${inputs[2].value} and are made of ${inputs[6].value} meat. So take a sandwich 
made of ${inputs[4].value} or ${inputs[5].value}. It's much healthier!`;
        } else if (form.id === 'weatherReport') {
            storyText = `Early tomorrow, a ${inputs[2].value} front will collide with a mass of hot 
${inputs[0].value} moving from the north. This means we can expect ${inputs[3].value} 
winds and occasional ${inputs[1].value} by late afternoon. Wind velocity will be 
${inputs[4].value} miles an hour, and the high temperature should be around ${inputs[5].value} 
degrees. So, if you're going out, you had better plan on wearing your 
${inputs[6].value}.`;
        }

        // Display the completed story in the dialog modal
        storyOutput.textContent = storyText;
        $dialog.showModal();
    }

    // Function to reset forms and story selection
    function playAgain() {
        $dialog.close();
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.reset();
        });
        $selectedStory.value = 'Select a Story';
    }

    // Event listener for play again button
    $closebutton.addEventListener('click', playAgain);

    // Event listener for form submission
    document.addEventListener('submit', function(e) {
        e.preventDefault();
        const form = e.target;

        if (validateForm(form)) {
            displayStory(form);
        }
    });
});
