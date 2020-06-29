var token = "";
var tuid = "";

var twitch = window.Twitch.ext;

twitch.onContext(function (context) {
    twitch.rig.log(context);
});

twitch.onAuthorized(function (auth) {
    token = auth.token;
    tuid = auth.userId;

    $('#expand-button').removeAttr('disabled');
});

var headerContent = "Error";
var textContent = "An error has occured while trying to get info.";

function loadConfig() {
    if (twitch.configuration.broadcaster) {
        try {
            config = JSON.parse(twitch.configuration.broadcaster.content);
        } catch (e) {
            config = null;
        }

        headerContent = config ? config.header : null;
        textContent = config ? config.body : null;
    } else {
        headerContent = null;
        textContent = null;
    }

    if (headerContent) {
        headerContent = headerContent.trim();
    } else {
        headerContent = "Error";
    }

    if (textContent) {
        textContent = textContent.trim().replace("\n\n", "<br/>");
    } else {
        textContent = "An error has occured while trying to get info.";
    }
}

twitch.configuration.onChanged(loadConfig);

function updateText() {
    if (headerContent) {
        $('#content-header').text(headerContent);
    }
    if (textContent) {
        $('#content-body').text(textContent);
    }
}

var is_clicked = false;
$(function () {
    if (!is_clicked) {
        $('#contains-button').append('<span id="delete-on-click">Click Me!</span>');
    }
    $('#expand-button').prop('disabled', false);
    $('#expand-button').click(function () {
        loadConfig();
        updateText();
        $('#popup').addClass("show");

        if (!is_clicked) {
            is_clicked = true;
            var $notificationText = $('#delete-on-click');
            if ($notificationText) {
                $notificationText.remove();
            }
        }
    });
    $('#popup').on('click', function (event) {
        $('#popup').removeClass("show");
    });
});