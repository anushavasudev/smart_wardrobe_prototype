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

$(function () {
    // $(document).click(function () { launchIntoFullscreen(document.documentElement) })

    var socket = io()

    socket.on('woz_action', function (msg) {
        // alert(msg)
        
        if (msg.action === 'scan' && isScanEnabled()) {
            window.navigator.vibrate(200);
            console.log(clothesDataToWord(clothesData[+msg.data.clothes_id]))

            $('#scan-modal .scan-result').html(clothesDataToSummary(clothesData[+msg.data.clothes_id]))
            $('#info-modal .scan-result').html(clothesDataToWord(clothesData[+msg.data.clothes_id]))
            $('#scan-modal').modal('show')

            // swal( 
            //     'Tag Scanned!',
            //     clothesDataToWord(clothesData[+msg.data.clothes_id]),
            //     'success'
            // );
            // var elem = $('<div role="alert">')
            // elem.text('Clothes scanned:' + )
            // $('#content').append(elem)
        }
    
        if (msg.action === 'reset') {
            console.log('resetting')
            window.location.href = '/'
        }
    })
})



function clothesDataToWord (d) {
    var outString = ''
    outString += d.color + ' ' + d.type + ' from ' + d.brand + '.<br>'
    outString += 'Size: ' + d.size + '.<br>'
    outString += 'Care Instructions: ' + d.care.join(', ') + '.'
    return outString
}


function clothesDataToSummary (d) {
    var outString = 'This is a '
    outString += d.color + ' ' + d.type + ' from ' + d.brand + '.<br>'
    return outString
}


function isScanEnabled () {
    var attr = $('body').attr('enable-scan')
    return typeof attr !== typeof undefined && attr !== false
}



// Find the right method, call on correct element
function launchIntoFullscreen (element) {
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
