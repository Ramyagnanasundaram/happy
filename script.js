// Mythium Archive: https://archive.org/details/mythium/

jQuery(function ($) {
    'use strict'
    var supportsAudio = !!document.createElement('audio').canPlayType;
    if (supportsAudio) {
        // initialize plyr
        var player = new Plyr('#audio1', {
            controls: [
                'restart',
                'play',
                'progress',
                'current-time',
                'duration',
                'mute',
                'volume',
                'download'
            ]
        });
        // initialize playlist and controls
        var index = 0,
            playing = false,
            mediaPath = 'https://archive.org/download/everything_202211/happy/',
            extension = '',
            tracks = [{
                "track": 1,
                "name": "Shake-That",
                "duration": "2:46",
                "file": "Shake-That"
            }, {
                "track": 2,
                "name": "Single-Pasanga",
                "duration": "8:30",
                "file": "Single-Pasanga-MassTamilan.org"
            }, {
                "track": 3,
                "name": "Summa-Surrunu",
                "duration": "5:01",
                "file": "Summa-Surrunu-MassTamilan.so"
            }, {
                "track": 4,
                "name": "Surviva",
                "duration": "8:31",
                "file": "Surviva-MassTamilan.com"
            }, {
                "track": 5,
                "name": "Top-Tucker",
                "duration": "5:05",
                "file": "Top-Tucker-MassTamilan.io"
            }, {
                "track": 6,
                "name": "Two-Two-Two",
                "duration": "2:48",
                "file": "Two-Two-Two-MassTamilan.so"
            }, {
                "track": 7,
                "name": "Vengamavan",
                "duration": "5:44",
                "file": "Vengamavan-MassTamilan.org."
            }, {
                "track": 8,
                "name": "What-a-Karavaad",
                "duration": "5:26",
                "file": "What-a-Karavaad"
            }, {
                "track": 9,
                "name": "Yaaro-En-Nenjai",
                "duration": "5:46",
                "file": "Yaaro-En-Nenjai"
            }, {
                "track": 10,
                "name": "Yaathi-Yaathi",
                "duration": "5:25",
                "file": "Yaathi-Yaathi-MassTamilan.fm"
            
            }],
            buildPlaylist = $.each(tracks, function(key, value) {
                var trackNumber = value.track,
                    trackName = value.name,
                    trackDuration = value.duration;
                if (trackNumber.toString().length === 1) {
                    trackNumber = '0' + trackNumber;
                }
                $('#plList').append('<li> \
                    <div class="plItem"> \
                        <span class="plNum">' + trackNumber + '.</span> \
                        <span class="plTitle">' + trackName + '</span> \
                        <span class="plLength">' + trackDuration + '</span> \
                    </div> \
                </li>');
            }),
            trackCount = tracks.length,
            npAction = $('#npAction'),
            npTitle = $('#npTitle'),
            audio = $('#audio1').on('play', function () {
                playing = true;
                npAction.text('Now Playing...');
            }).on('pause', function () {
                playing = false;
                npAction.text('Paused...');
            }).on('ended', function () {
                npAction.text('Paused...');
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    audio.play();
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }).get(0),
            btnPrev = $('#btnPrev').on('click', function () {
                if ((index - 1) > -1) {
                    index--;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            btnNext = $('#btnNext').on('click', function () {
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            li = $('#plList li').on('click', function () {
                var id = parseInt($(this).index());
                if (id !== index) {
                    playTrack(id);
                }
            }),
            loadTrack = function (id) {
                $('.plSel').removeClass('plSel');
                $('#plList li:eq(' + id + ')').addClass('plSel');
                npTitle.text(tracks[id].name);
                index = id;
                audio.src = mediaPath + tracks[id].file + extension;
                updateDownload(id, audio.src);
            },
            updateDownload = function (id, source) {
                player.on('loadedmetadata', function () {
                    $('a[data-plyr="download"]').attr('href', source);
                });
            },
            playTrack = function (id) {
                loadTrack(id);
                audio.play();
            };
        extension = audio.canPlayType('audio/mpeg') ? '.mp3' : audio.canPlayType('audio/ogg') ? '.ogg' : '';
        loadTrack(index);
    } else {
        // no audio support
        $('.column').addClass('hidden');
        var noSupport = $('#audio1').text();
        $('.container').append('<p class="no-support">' + noSupport + '</p>');
    }
});