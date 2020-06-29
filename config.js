var token, userId;

var twitch = window.Twitch.ext;

twitch.onContext(function (context) {
    twitch.rig.log(context);
});

function loadConfig() {
    if (twitch.configuration.broadcaster) {
        var config;
        try {
            config = JSON.parse(twitch.configuration.broadcaster.content);
        } catch (e) {
            config = null;
        }

        twitch.rig.log(config);
        $('#content-header').val(config && config.header ? config.header : "");
        $('#content-body').val(config && config.body ? config.body : "");
    } else {
        $('#content-header').val("");
        $('#content-body').val("");
    }
}

twitch.configuration.onChanged(loadConfig);

twitch.onAuthorized(function (auth) {
    token = auth.token;
    userId = auth.userId;

    $('#save-button').prop('disabled', false);
});

$(function () {
    $('#save-button').click(function () {
        twitch.configuration.set('broadcaster', '0.0.1', JSON.stringify({
            "header": $('#content-header').val(),
            "body": $('#content-body').val()
        }));
    });
});