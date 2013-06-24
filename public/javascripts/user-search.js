$(document).ready(function() {
    var $search = $('#search').addClass('overlabel');
    var $searchInput = $search.find('input');
    var $searchLabel = $search.find('label');
    if ($searchInput.val()) {
        $searchLabel.hide();
    }
    $searchInput
    .focus(function() {
        $searchLabel.hide();
    })
    .blur(function() {
        if (this.value == '') {
            $searchLabel.show();
        }
    });
    $searchLabel.click(function() {
        $searchInput.trigger('focus');
    });
    var $autocomplete = $('<ul class="autocomplete"></ul>')
    .hide()
    .insertAfter('#search-text');
    var selectedItem = null;
    var setSelectedItem = function(item) {
        selectedItem = item;
        if (selectedItem === null) {
            $autocomplete.hide();
            return;
        }
        if (selectedItem < 0) {
            selectedItem = 0;
        }
        if (selectedItem >= $autocomplete.find('li').length) {
            selectedItem = $autocomplete.find('li').length - 1;
        }
        $autocomplete.find('li').removeClass('selected')
        .eq(selectedItem).addClass('selected');
        $autocomplete.show();
    };
    var populateSearchField = function() {
        $('#search-text').val($autocomplete
            .find('li').eq(selectedItem).text());
        setSelectedItem(null);
    };
    $('#search-text')
    .attr('autocomplete', 'off')
    .keyup(function(event) {
        if (event.keyCode > 40 || event.keyCode == 8) {
            // Keys with codes 40 and below are special
            // (enter, arrow keys, escape, etc.).
            // Key code 8 is backspace.
           $.ajax({
            url: '../data-base/users.txt',
            type: 'GET',
            success: function(data, textStatus, xhr) {
                var parseData = JSON.parse(data);
                var searchedText = $("#search-text").val();
                var searchedText = $("#search-text").val();
                var rgx = new RegExp(searchedText, "gi");

                $("#users").empty();
                var userContainer;
                for (var i = 0; i < parseData.games.length; i++) {
                    var username = parseData.games[i].username;
                    var firstName = parseData.games[i].first_name;
                    var lastName = parseData.games[i].last_name;
                    var picture = parseData.games[i].picture;
                        console.log(searchedText);
                        if((username.match(rgx) != null) || searchedText.length == 0) {
                            userContainer = document.createElement("div");
                            userContainer.className = "user-container";

                            $("#users").append(userContainer);


                            $(".user-container:last-child").append("<div>" + "<a href='#'>" + username + "</a>" + "</div>");
                            $(".user-container:last-child").append("<div>" + "<a href='#'> Name: " + firstName + " " + lastName + "</a>" + "</div>");
                            $(".user-container:last-child").append("<img src='../images/" + picture + "' width='120px' height='100px'>");
                        }
                    


                }
                $("#users").css("display", "block");
            },
            error: function(xhr, textStatus, errorThrown) {
                console.log(textStatus);
            }
        });
        }
        else if (event.keyCode == 38 &&
            selectedItem !== null) {
            // User pressed up arrow.
            setSelectedItem(selectedItem - 1);
            event.preventDefault();
        }
        else if (event.keyCode == 40 &&
            selectedItem !== null) {
            // User pressed down arrow.
            setSelectedItem(selectedItem + 1);
            event.preventDefault();
        }
        else if (event.keyCode == 27 && selectedItem !== null) {
            // User pressed escape key.
            setSelectedItem(null);
        }
    }).keypress(function(event) {
        if (event.keyCode == 13 && selectedItem !== null) {
            // User pressed enter key.
            populateSearchField();
            event.preventDefault();
        }
    }).blur(function(event) {
        setTimeout(function() {
            setSelectedItem(null);
        }, 250);
    })
});