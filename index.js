function getSearchResults(userName) {
    fetch (`https://api.github.com/users/${userName}/repos`)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
            $('.results').addClass('hidden');
        })
}

function displayResults(responseJson) {
    $('#results-list').empty();
    $('#results-message').empty();
    $('#js-error-message').empty();
    $('.results').removeClass('hidden');
    console.log(responseJson);
    if (responseJson.length === 0) {
        $('#results-message').append('This user does not have any public repos.')
    }
    for (let i = 0; i < responseJson.length; i++) {
        $('#results-list').append(`
            <li><a href="${responseJson[i].html_url}">${responseJson[i].name}</a></li>
        `);
    };
}

function handleSubmit() {
    $('form').submit(event => {
        event.preventDefault();
        const userName = $('#user').val();
        getSearchResults(userName);
    });
}

$(handleSubmit());