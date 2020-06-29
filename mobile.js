var token = "";
var tuid = "";

var twitch = window.Twitch.ext;

twitch.onContext(function (context) {
    twitch.rig.log(context);
});

twitch.onAuthorized(function (auth) {
    token = auth.token;
    tuid = auth.userId;
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

function updateText() {
    loadConfig();

    if (headerContent) {
        $('#content-header').text(headerContent);
    }
    if (textContent) {
        $('#content-body').text(textContent);
    }
}

twitch.configuration.onChanged(updateText);