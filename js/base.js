function getSearchTerm() {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == 'q') {
            return sParameterName[1];
        }
    }
}

$(document).ready(function() {
    /**
     * ------------------------------------------------------------------------
     * Taken from themes/mkdocs/js/base.js
     * ------------------------------------------------------------------------
     */
    var search_term = getSearchTerm(),
        $search_modal = $('#mkdocs_search_modal'),
        $keyboard_modal = $('#mkdocs_keyboard_modal');

    if (search_term) {
        $search_modal.modal();
    }

    // make sure search input gets autofocus everytime modal opens.
    $search_modal.on('shown.bs.modal', function() {
        $search_modal.find('#mkdocs-search-query').focus();
    });

    // Close search modal when result is selected
    // The links get added later so listen to parent
    $('#mkdocs-search-results').click(function(e) {
        if ($(e.target).is('a')) {
            $search_modal.modal('hide');
        }
    });

    if (typeof shortcuts !== 'undefined') {
        // Populate keyboard modal with proper Keys
        $keyboard_modal.find('.help.shortcut kbd')[0].innerHTML = keyCodes[shortcuts.help];
        $keyboard_modal.find('.prev.shortcut kbd')[0].innerHTML = keyCodes[shortcuts.previous];
        $keyboard_modal.find('.next.shortcut kbd')[0].innerHTML = keyCodes[shortcuts.next];
        $keyboard_modal.find('.search.shortcut kbd')[0].innerHTML = keyCodes[shortcuts.search];

        // Keyboard navigation
        document.addEventListener("keydown", function(e) {
            if ($(e.target).is(':input')) return true;
            var key = e.which || e.key || window.event && window.event.key;
            var page;
            switch (key) {
                case shortcuts.next:
                    page = $('.navbar a[rel="next"]:first').prop('href');
                    break;
                case shortcuts.previous:
                    page = $('.navbar a[rel="prev"]:first').prop('href');
                    break;
                case shortcuts.search:
                    e.preventDefault();
                    $keyboard_modal.modal('hide');
                    $search_modal.modal('show');
                    $search_modal.find('#mkdocs-search-query').focus();
                    break;
                case shortcuts.help:
                    $search_modal.modal('hide');
                    $keyboard_modal.modal('show');
                    break;
                default:
                    break;
            }
            if (page) {
                $keyboard_modal.modal('hide');
                window.location.href = page;
            }
        });
    }

    $('table').addClass('table table-striped table-hover');

    // Improve the scrollspy behaviour when users click on a TOC item.
    $(".bs-sidenav a").on("click", function() {
        var clicked = this;
        setTimeout(function() {
            var active = $('.nav li.active a');
            active = active[active.length - 1];
            if (clicked !== active) {
                $(active).parent().removeClass("active");
                $(clicked).parent().addClass("active");
            }
        }, 50);
    });
});


/**
 * ------------------------------------------------------------------------
 * Taken from themes/mkdocs/js/base.js
 * ------------------------------------------------------------------------
 */
if(document.querySelector(".bs-sidebar")) {
    $('body').scrollspy({
        target: '.bs-sidebar',
        offset: 100
    });
}

/* Prevent disabled links from causing a page reload */
$("li.disabled a").click(function() {
    event.preventDefault();
});

// See https://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes
// We only list common keys below. Obscure keys are omited and their use is discouraged.
var keyCodes = {
    8: 'backspace',
    9: 'tab',
    13: 'enter',
    16: 'shift',
    17: 'ctrl',
    18: 'alt',
    19: 'pause/break',
    20: 'caps lock',
    27: 'escape',
    32: 'spacebar',
    33: 'page up',
    34: 'page down',
    35: 'end',
    36: 'home',
    37: '&larr;',
    38: '&uarr;',
    39: '&rarr;',
    40: '&darr;',
    45: 'insert',
    46: 'delete',
    48: '0',
    49: '1',
    50: '2',
    51: '3',
    52: '4',
    53: '5',
    54: '6',
    55: '7',
    56: '8',
    57: '9',
    65: 'a',
    66: 'b',
    67: 'c',
    68: 'd',
    69: 'e',
    70: 'f',
    71: 'g',
    72: 'h',
    73: 'i',
    74: 'j',
    75: 'k',
    76: 'l',
    77: 'm',
    78: 'n',
    79: 'o',
    80: 'p',
    81: 'q',
    82: 'r',
    83: 's',
    84: 't',
    85: 'u',
    86: 'v',
    87: 'w',
    88: 'x',
    89: 'y',
    90: 'z',
    91: 'Left Windows Key / Left ⌘',
    92: 'Right Windows Key',
    93: 'Windows Menu / Right ⌘',
    96: 'numpad 0',
    97: 'numpad 1',
    98: 'numpad 2',
    99: 'numpad 3',
    100: 'numpad 4',
    101: 'numpad 5',
    102: 'numpad 6',
    103: 'numpad 7',
    104: 'numpad 8',
    105: 'numpad 9',
    106: 'multiply',
    107: 'add',
    109: 'subtract',
    110: 'decimal point',
    111: 'divide',
    112: 'f1',
    113: 'f2',
    114: 'f3',
    115: 'f4',
    116: 'f5',
    117: 'f6',
    118: 'f7',
    119: 'f8',
    120: 'f9',
    121: 'f10',
    122: 'f11',
    123: 'f12',
    124: 'f13',
    125: 'f14',
    126: 'f15',
    127: 'f16',
    128: 'f17',
    129: 'f18',
    130: 'f19',
    131: 'f20',
    132: 'f21',
    133: 'f22',
    134: 'f23',
    135: 'f24',
    144: 'num lock',
    145: 'scroll lock',
    186: '&semi;',
    187: '&equals;',
    188: '&comma;',
    189: '&hyphen;',
    190: '&period;',
    191: '&quest;',
    192: '&grave;',
    219: '&lsqb;',
    220: '&bsol;',
    221: '&rsqb;',
    222: '&apos;',
};

const checkScroll = () => {
    const stickyBar = document.querySelector("#sticky");

    if(stickyBar.classList.contains("small")) {
        if(window.scrollY > 110) {
            stickyBar.classList.add("scrolled");
        } else {
            stickyBar.classList.remove("scrolled");
        }
    } else {
        if(window.scrollY > 20) {
            stickyBar.classList.add("scrolled");
        } else {
            stickyBar.classList.remove("scrolled");
        }
    }
}

checkScroll()

window.addEventListener("scroll", _ => {
    checkScroll()
})

/*
const sectionEls = document.querySelectorAll('.section');
const navLinkEls = document.querySelectorAll('.nav-link');
const popoverEl = document.querySelector('.popover');
const contentEl = document.querySelector('.content');
const arrowEl = document.querySelector('.arrow');
const backgroundEl = document.querySelector('.background');

const sections = ['products', 'developers', 'company'];

// TODO: generate on the fly
const dimensions = {
    products: { width: 490, height: 280, x: 0 },
    developers: { width: 390, height: 266, x: 100 },
    company: { width: 260, height: 296, x: 200 }
}

const popoverLeft = popoverEl.getBoundingClientRect().x;

navLinkEls.forEach((navLink) => {
    let section =  navLink.getAttribute('data-nav');
    let rect = navLink.getBoundingClientRect();
    dimensions[section].arrowX = rect.left + (rect.width / 2) - popoverLeft;
});

// Set initial arrow position
arrowEl.style.transform = `
  translateX(${dimensions.products.arrowX}px)
  rotate(45deg)`;

function showSection(section) {
    popoverEl.classList.add('open');
    sectionEls.forEach(el => el.classList.remove('active'));
    document.querySelector(`.section-${section}`).classList.add('active');

    // Position arrow
    arrowEl.style.transform = `
    translateX(${dimensions[section].arrowX}px)
    rotate(45deg)`;

    // Resize and position background
    backgroundEl.style.transform = `
    translateX(${ dimensions[section].x }px)
    scaleX(${ dimensions[section].width / dimensions['products'].width })
    scaleY(${ dimensions[section].height / dimensions['products'].height })
  `;

    // Resize and position content
    contentEl.style.width = dimensions[section].width + 'px';
    contentEl.style.height = dimensions[section].height + 'px';

    contentEl.style.transform = `translateX(${ dimensions[section].x }px)`

    // size container? If we remove from CSS and do everything dynamically.
}


navLinkEls.forEach((navLink) => {
    navLink.addEventListener('mouseenter', (event) => {
        let targetPopover = event.target.getAttribute('data-nav');
        showSection(targetPopover);
    });
});*/

