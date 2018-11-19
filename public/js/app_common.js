var clothesData = [
    {
        brand: 'Georgia Tech',
        type: 'hoodie',
        color: 'navy/gray',
        size: 'M',
        care: [
            'machine wash',
            'warm water',
            'do not bleach',
            'tumble dry',
            'low heat iron'
        ]
    },
    {
        brand: 'H&M',
        type: 'T-shirt',
        color: 'black',
        size: 'M',
        care: [
            'hand wash only',
            'cold water',
            'do not bleach',
            'tumble dry',
            'medium heat iron'
        ]
    },
    {
        brand: 'Uniqlo',
        type: 'long-sleeved t-shirt',
        color: 'yellow',
        size: 'L',
        care: [
            'machine wash',
            'warm water',
            'do not wring',
            'do not tumble dry',
            'no steam iron'
        ]
    }
]

var socket = io()

$(function () {
    // $(document).click(function () { launchIntoFullscreen(document.documentElement) })

    socket.on('woz_action', function (msg) {
        // alert(msg)

        if (msg.action === 'scan') {

            if (typeof onScanned === "function") {
                onScanned(clothesData[+msg.data.clothes_id])
                window.navigator.vibrate(200);
            }
        }

        // if (msg.action === 'scan') {
        //     console.log('scan')
        //     window.location.href = '/scan_result'
        // }

        if (msg.action === 'reset') {
            console.log('resetting')
            window.location.href = '/'
        }

        if (msg.action === 'hang') {
            console.log('hanged')
            if (typeof onHanged === "function") {
                onHanged(clothesData[+msg.data.clothes_id])
                window.navigator.vibrate([100, 50, 100]);
            } else {
                displayToast(
                    'We have received your striped T-shirt in the wardrobe.',
                    3000,
                    'success'
                )
            }
        }
    })


    $('.fav-toggle').each(function () {
        if ($(this).attr('aria-checked') == 'true') {
            $(this).find('.fav-toggle-on').show();
            $(this).find('.fav-toggle-off').hide();
        } else {
            $(this).find('.fav-toggle-on').hide();
            $(this).find('.fav-toggle-off').show();
        }
    })
    $('.fav-toggle').click(function () {
        console.log($(this).attr('aria-checked'))
        if ($(this).attr('aria-checked') == 'true') {
            $(this).attr('aria-checked', 'false');
            $(this).find('.fav-toggle-on').hide();
            $(this).find('.fav-toggle-off').show();
        } else {
            $(this).attr('aria-checked', 'true');
            $(this).find('.fav-toggle-on').show();
            $(this).find('.fav-toggle-off').hide();
        }
    })

    var query = getUrlParameter('q')
    $('.replace-from-query').each(function () {
        var key = $(this).data('key')
        var val = getUrlParameter(key)
        if (val !== undefined) {
            console.log($(this).is('input'))
            if ($(this).is('input'))
                $(this).val(val)
            else
                $(this).text(val)
        }
    })
    $('.query-val').val(query)

    $('.toast-trigger').click(function (e) {
        e.preventDefault()
        displayToast(
            $(this).data('toast-message'),
            $(this).data('toast-duration') || 3000,
            $(this).data('toast-style') || 'secondary'
        )
    })

    $('button.button-link').click(function () {
        if ($(this).attr('href'))
            window.location.href = $(this).attr('href')
    })
})



function clothesDataToWord(d) {
    var outString = ''
    outString += d.color + ' ' + d.type + ' from ' + d.brand + '.<br>'
    outString += 'Size: ' + d.size + '.<br>'
    outString += 'Care Instructions: ' + d.care.join(', ') + '.'
    return outString
}


function clothesDataToSummary(d) {
    var outString = 'This is a '
    outString += d.color + ' ' + d.type + ' from ' + d.brand + '.<br>'
    return outString
}


function isScanEnabled() {
    var attr = $('body').attr('enable-scan')
    return typeof attr !== typeof undefined && attr !== false
}



// Find the right method, call on correct element
function launchIntoFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen()
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen()
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen()
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen()
    }
}


function getToggleValue(callback) {
    socket.emit('woz_toggle_query')
    socket.on('woz_toggle_query_answer', function (msg) {
        callback(msg)
    })
}


function displayToast(message, duration = 3000, alertType = 'secondary') {
    var alertElem = $(`<div class="alert alert-${alertType} toast" role="alert">`)
    alertElem.text(message)
    console.log(alertElem)
    $('body').append(alertElem)
    alertElem.addClass('show')

    setTimeout(function () {
        alertElem.removeClass('show')
        setTimeout(function () {
            alertElem.remove()
        }, 1000)
    }, duration)
}

function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};