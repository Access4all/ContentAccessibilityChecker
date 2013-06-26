// Global variables
var resultList = [];
var resultListSorted = [];
var resultCounter = 0;
var itemNr = 0;

// Params
var wlDiag = [ 'Diagram', 'Organigram', 'Lageplan', 'Stadtplan', 'Wegbeschreibung' ];
var specialCharacters = '[♥¤§¨®©¬¯™ª±µ´·ºº¢·¶♀↗↑↓→←]';
var filetypes = '(.doc|.pdf|.xls|.xlsx|.doc|.docx|.ppt|.pps|.pptx|.ppsx|.mov|.mpg|.mpeg|.xvid|.avi|.flv|.swf|.mp3|.ogg|.wav|.aac|.lame)';
var videotypes = '(.swf|.flv)';
var embedVideo = '(.mpeg|.mpg|.xvid|.avi|.flv|youtube|.swf|.mov)';
var audiotypes = '(.mp3|.ogg|.wav|.aac|.lame)';
var excludedAbbreviations = 'CHF,EUR';
var shortLinks = '(hier|Hier|Weiter|weiter|klicken|Klicken|Mehr|mehr)';

// Page error-messages
var txtIntroduction = 'Der Content Accessibility Checker weist Sie auf Fehler und m&ouml;gliche Verbesserungen im HTML-Code hin. Zuerst werden allgemeine Hinweise (in orange) zur Barrierefreiheit angezeigt, danach werden spezifische Hinweise und Fehler (in pink) aufgezeigt. Weitere Informationen zu den jeweiligen Fehlern/Hinweisen gibt es in der <a href="http://www.accessibility-checklist.ch/">Accessibility-Checkliste</a>.';
var txtContrast = 'Allgemeiner Hinweis: Bei der Darstellung, vorallem bei Bildern und Textfarben, sollte auf einen ausreichenden Kontrast geachtet werden.';
var txtColors = 'Allgemeiner Hinweis: Die Informationen dieser Seite sollte nicht nur &uuml;ber Farben vermittelt werden (z.B. auch textlich erkl&auml;rt sein).';
var txtComprehend = 'Allgemeiner Hinweis: Der gesamte Inhalt sollte in m&ouml;glichst einfacher Sprache verfasst sein (Aktivformulierung, keine Schlangens&auml;tze, Fachbegriffe vermeiden). Abk&uuml;rzungen sollten erkl&auml;rt werden.';

// Element error-messages
var txtEmptyP = 'Hinweis: Hier ist ein leerer &ltp&gt Tag. Es sollte entfernt werden.';
var txtAlt = 'Fehler: Der Alternativtext fehlt. Es sollte das Attribut alt="xxxxx" erg&auml;nzt werden.';
var txtArea = 'Fehler: Der Alternativtext f&uuml;r eine Area fehlt oder ist leer. Es sollte bei jeder Area das Attribut alt="xxxx" erg&auml;ntzt/ausgef&uuml;llt werden.';
var txtAltEmpty = 'Hinweis: Der Alternativtext des markierten Elementes ist leer. Hat dieses Element einen ausschliesslich dekorativem Charakter?';
var txtAltLink = 'Hinweis: Der Alternativtext sollte bei einem verlinkten Element &uuml;ber den Linkzweck informieren.';
var txtDiag1 = 'Hinweis: \"';
var txtDiag2 = '\" wurde im Text verwendet. Falls ein(e) ';
var txtDiag3 = ' auf dieser Seite angezeigt/verlinkt ist sollte ein erkl&auml;render Text dazu vorhanden sein.';
var txtHeading1 = 'Fehler: Die &Uuml;berschriften beginnen nicht mit Ebene h1.';
var txtHeading2 = 'Fehler: Es wird eine &Uuml;berschriften-Ebene &uuml;bersprungen. h';
var txtHeading3 = ' zu h';
var txtParagraph = 'Hinweis: Um diesen Text fehlt das &ltp&gt Tag. Es sollte erg&auml;nzt werden.';
var txtNoHeading = 'Hinweis: Ist dieses Element vielleicht eine &Uuml;berschrift? Falls ja sollte ein &lth&gt-Tag erg&auml;nzt werden.';
var txtStrong = 'Fehler: &ltStrong&gt-Tags sollte nur innerhalb von &ltp&gt-Tags verwendet werden. Oder handelt es sich hier um eine &Uuml;berschrift? Dann sollten die &lth1&gt bis &lth6&gt Tags verwendet werden.';
var txtAbbrevation = 'Hinweis: Handelt es sich bei dem Text in Grossbuchstaben allenfalls um eine Abk&uuml;rzung? Abk&uuml;rzungen sollten im Text erkl&auml;rt sein.';
var txtTableHeader = 'Fehler: Eine Tabelle sollte immer eine Spalten- oder Zeilen&uuml;berschrift mit dem &ltth&gt-Tag haben.';
var txtTableEmptyCol = 'Fehler: Diese Tabelle enth&auml;lt leere Spalten.';
var txtTableEmptyRow = 'Fehler: Diese Tabelle enth&auml;lt leere Zeilen.';
var txtTableSpecial = 'Hinweis: Diese Tabelle enth&auml;lt Sonderzeichen. Diese sollten weggelassen werden.';
var txtLayoutTable = 'Hinweis: Ist dies eine Tabelle f&uuml;r Layout-Zwecke? Tabellen sollten nur zur strukturierten Darstellung von Informationen verwendet werden, nicht f&uuml;r Layout-Zwecke.';
var txtComplexTable = 'Hinweis: Dies ist eine komplexe Tabelle, es sollte einen Spalten/Zeilen-Titel (&ltthead&gt Tag und &ltth&gt Tag) und eine Zusammenfassung (&ltcaption&gt Tag) vorhanden sein.';
var txtList = 'Hinweis: In diesem Text wurde ein Aufz&auml;hlungs-Zeichen gefunden. Ist dies eine Aufz&auml;hlung? Dann sollten die &ltul&gt&ltli&gt-Tags verwendet werden.';
var txtLinkFile = 'Hinweis: Bei Download-Links sollte im Linktext der Dateityp und die Dateigr&ouml;sse angegeben sein.';
var txtPDF = 'Hinweis: PDF Dateien sollten barrierefrei sein. Pr&uuml;fen k&ouml;nnen Sie dies mit dem <a href="http://www.access-for-all.ch/en/pdf-lab/pdf-accessibility-checker-pac.html">PDF Accessibility Checker PAC</a>. Falls ein barrierefreies PDF nicht m&ouml;glich sein sollte, sollte eine alternative Form vorhanden sein. z.B. HTML.';
var txtLinkDescription = 'Hinweis: Dieser Linktext ist sehr kurz. Ist der Linktext auch unabh&auml;nig vom Kontext verst&auml;ndlich?';
var txtVideo = 'Hinweis: Videos sollten &uuml;ber eine Textalternative und/oder &uuml;ber Untertitel verf&uuml;gen. Speziell dann, wenn wichtige Informationen <b>nur</b> &uuml;ber das Video vermittelt werden. Ebenfalls sollten diese nicht automatisch mit dem Abspielen beginnen.';
var txtAudio = 'Hinweis: Audioinhalte sollten &uuml;ber eine Textalternative verf&uuml;gen. Zudem sollen Audioinhalte nicht automatisch abgespielt werden.';


function checkPage()
{
    // ## 0. Introduction
    addError(null, txtIntroduction);
    
    // ## 1. General info messages ##
    
    // 1.1 General info about comprehensability
    addError(null, txtComprehend);
    
    // 1.2 Message for images to have a good contrast
    addError(null, txtContrast);

    // 1.3 Color info in body
    addError(null, txtColors);
    
    // 2. ## Element checks ##
    
    // 2.1 Check for missing alt="" statements (img,input,area)
    $('img,input,area').each(function(){
        var alt = this.getAttribute('alt');

        switch(this.tagName){
            case 'AREA':
                if (alt == null || alt == ''){
                    var mapName = this.parentNode.name;
                    var imgNode = $('[usemap="#' + mapName + '"]');
                    if (imgNode != null) {
                        addError(imgNode[0], txtArea); 
                    }
                } 
                break;

            case 'IMG':
                // check if parent node is <a href...></a>
                var parentTag = (this.parentNode.tagName == 'A') ? true : false;
                if (parentTag){
                    if (alt == null || alt == ''){
                        addError(this, txtAlt);
                    } else {
                        addError(this, txtAltLink);
                    }
                } else {
                    if (alt == null) {
                        addError(this, txtAlt);
                    } else if (alt == '') {
                        addError(this, txtAltEmpty);
                    }
                }
                break;

            case 'INPUT':
                if (alt == null || alt == '') {
                    addError(this, txtAlt);
                }
                break;
        }
    });

    // 2.2 Diagramm/Lageplan/Organigramm/Wegbeschreibung usw.
    // Check for the words and add info-message
    for (var word in wlDiag) {
        $('p:contains('+ wlDiag[word] + ')').each(function() { 
            addError(this, txtDiag1 + wlDiag[word] + 
                txtDiag2 + wlDiag[word] + txtDiag3);
        });
    }
    
    // 2.3 Headings
    // Create a map of the headings, check if 1>2>3 and not 1>3 etc
    var headingList = [];
    var headingCounter = 0;
    var lastLevel = 0;
    $('h1,h2,h3,h4,h5,h6').each(function(){
        var level = parseInt(this.tagName.toString().substring(1, 2));

        if (lastLevel != 0) {
            if (level > lastLevel + 1)
            {
                headingList[headingCounter] = {
                    'element': this,
                    'lastLevel': lastLevel , 
                    'level': level
                };
                headingCounter++;
            }
        }
        if (lastLevel == 0 && level != 1){
            addError(this, txtHeading1);
        }
        lastLevel = level;
    });
    for (h in headingList)
    {
        addError(headingList[h].element,txtHeading2 + 
            headingList[h].lastLevel + txtHeading3 + headingList[h].level);
    }

    // 2.4 Headings without h1,h2,h3. check if a heading is within a <p> tag 
    $('p').each(function(){
        var html = this.innerHTML.toString();
        // check if begins with bold <b> tag
        if (html.indexOf('<b>') === 0) {
            var endPos = html.indexOf('</b>');
            if ((endPos - (0.1 * html.length)) <= html.length) {
                // there is at least 10% of the <p>-length not bold
                // so it could be a heading
                addError(this, txtNoHeading);
            }
        }
    });

    // 2.5 <p> without content
    $('p:empty').each(function() {
        addError(this, txtEmptyP); 
    });

    // 2.6. Text outside of <p> use own fake Tag <textWithOutP> for identification
    $('body').contents().filter(function() {
        return this.nodeType == 3 && $.trim(this.nodeValue) != '';
    }).wrap('<textwithoutp></textwithoutp>').end();
    $('textwithoutp').each(function() {
        addError(this, txtParagraph);
    });

    // 2.7 <strong> tags are only used within <p> tags
    $('strong').each(function(){
        if (this.parentNode.tagName != 'P') {
            addError(this, txtStrong);
        }
    });

    // 2.8 Check for abbreviations
    // assuming they consist of CAP letters, with length maximum 5
    // abbreviations from the excludedAbbreviations string, should be ignored
    $('p').each(function(){
        var html = this.innerHTML.toString();
        var abbr = html.match('[A-Z][A-Z][A-Z][A-Z]?[A-Z]?');        
        if (abbr != null && abbr.length > 0) {
            if (excludedAbbreviations.indexOf(abbr) == -1) {
                addError(this, txtAbbrevation);
            }
        }
    });

    // 2.9 Tables, no header <th> Tag
    $('table').each(function() {
        var html = this.innerHTML.toString();
        if (!html.match('<th>')) {
            addError(this, txtTableHeader);
        }
    });

    // 2.10 Tables, emtpy rows or columns
    $('td:empty').each(function(){
        addError(this.parentNode.parentNode.parentNode, txtTableEmptyCol)
    });
    $('tr:empty').each(function(){
        addError(this.parentNode.parentNode, txtTableEmptyRow);
    });

    // 2.11 Tables with special characters
    $('table').each(function(){
        var html = this.innerHTML.toString();
        if (html.match(specialCharacters)) {
            addError(this, txtTableSpecial);
        }
    });

    // 2.12 Layout-Tables = no <th>, no content, more than 50% of cells without content
    $('table > tbody').each(function() {
        var emptyCells = 0;
        $(this).children('tr').each(function() {
            $(this).children('td:empty').each(function() {
                $(this).css({
                   'border-width': '1px',
                   'border-style': 'solid',
                   'border-color': 'black'
                });
                emptyCells++;
            });
        });
        if (emptyCells > ($(this).children().children('td').length / 2) && $(this).children('th').length == 0) {
            addError(this.parentNode, txtLayoutTable);
        }
    });

    // 2.13 Complex tables conditions:
    // - has <colgroup>
    // - has span=
    // - has scope=
    // - has axis=           
    $('table').each(function(){
        var html = this.innerHTML.toString();
        
        if (html.indexOf('<colgroup>') > 0 ||
            html.indexOf('span=') > 0 ||
            html.indexOf('scope=') > 0 ||
            html.indexOf('axis=') > 0) 
        {
            addError(this, txtComplexTable);
        }
    });

    // 2.14 Check for lists with - * and → within <p> Tags or at the beginning of a <p>
    $('p').each(function() {
        var hasErr = false;
        var html = this.innerHTML.toString();
        
        if (html.substring(0,1) == '-' ||
            html.substring(0,1) == '*' ||
            html.substring(0,1) == '→') {
                hasErr = true;
        }
        
        var matches = html.match(/-[A-Za-z0-9]*/g);   
        if (matches != null && matches.length > 3) {
            hasErr = true;
        }
        matches = html.match(/\*[A-Za-z0-9]*/g);   
        if (matches != null && matches.length > 3) {
            hasErr = true;
        }
        matches = html.match(/→[A-Za-z0-9]*/g);   
        if (matches != null && matches.length > 3) {
            hasErr = true;
        }
        
        if (hasErr) {
            addError(this, txtList);
        }
    });  
    
    
    // 2.15 Video-content
    $('a').each(function(){
        var href = this.getAttribute('href') == null ? null : this.getAttribute('href').toString();
        if (href != null && href.match(videotypes)) {
            addError(this, txtVideo);
        }
    });
    $('embed').each(function() { 
        var src = this.getAttribute('src') == null ? null : this.getAttribute('src').toString();
        if (src != null && src.match(embedVideo)) {
            addError(this, txtVideo);
        }
    });
    $('video').each(function() {
        addError(this, txtVideo);
    });
    
    // 2.16 Audio-content
    $('embed').each(function(){
        var src = this.getAttribute('src') == null ? null : this.getAttribute('src').toString();
        if (src != null && src.match(audiotypes)) {
            addError(this, txtAudio);
        }
    });
    $('audio').each(function(){
        addError(this, txtAudio);
    });
    
    // 2.17 Link naming
    $('a').each(function() {
        var html = this.innerHTML.toString();
        if (html.match(shortLinks) && html.length < 8) {
            addError(this, txtLinkDescription);
        }
    });

    // 2.18 Links with file-downloads
    $('a').each(function(){
        var href = href = this.getAttribute('href') == null ? null : this.getAttribute('href').toString();
        if (href != null && href.match(filetypes)) {
            addError(this, txtLinkFile);
        }
    });

    // 2.19 PDF info
    $('a').each(function() {
        var href = this.getAttribute('href') == null ? null : this.getAttribute('href').toString();
        if (href != null && href.match('.pdf')){
            addError(this, txtPDF);
        }
    });

    // Print the results to the pg-footer
    printResults();
}

// Support functions
// --------------------------------------------------------------------------------------------

function addError(element, message)
{
    var id = 'pg_result_general';   
    var offset = 0;
    
    if (element != null)        
    {     
        id = element.getAttribute('id');
        if (id == null || id == '')
        {
            element.setAttribute('id', 'element' + itemNr);
            id = 'element' + itemNr;
            itemNr++;
        }

        offset = element.offsetTop;
        if (offset == null || offset == '') {
            offset = 0;
        }
    } 
    
    // check for duplicates (for example areas in image-map)
    var duplicate = false;
    for (var e in resultList){
        if (resultList[e].elementID == id &&
            resultList[e].elementMessage == message){
            duplicate = true;
            break;
        }
    }
    
    if (!duplicate){
        resultList[resultCounter] = {
            'elementID': id, 
            'elementPos': offset,
            'elementMessage': message
        };
        resultCounter++;
    }
}

function printResults() 
{
    // Sort lists according to their position within the page
    // and combine messages for each element   
    var sortedCounter = 0;
    for (u in resultList) {      
        var presentPos = -1;
        // dont combine messages within pg_result_general
        if (resultList[u].elementID != 'pg_result_general') {
            for (s in resultListSorted)
            {   
                if (resultListSorted[s].elementID == resultList[u].elementID) {
                    presentPos = s;
                    break;
                }
            }
        }
        
        if (presentPos == -1) {
            // add new entry
            resultListSorted[sortedCounter] = {
                'elementID': resultList[u].elementID,
                'elementPos': resultList[u].elementPos,
                'elementMessage': resultList[u].elementMessage
            };
            sortedCounter++;
        } else {
            // add message to present element
            resultListSorted[s].elementMessage = resultListSorted[s].elementMessage + ' ' + resultList[u].elementMessage;
        }
    }
    
    // sort the sortedList
    resultListSorted.sort(function(a,b){
        return a.elementPos - b.elementPos
    });
    
    // print results
    var resultHtml = '<ul id="tlyPageGuide" data-tourtitle="Fehler/Hinweisliste">';
    for (m in resultListSorted)
    {
        resultHtml += '<li class="tlypageguide_bottom" data-tourtarget="#';
        resultHtml += resultListSorted[m].elementID;
        resultHtml += '"><div>';
        resultHtml += resultListSorted[m].elementMessage;
        resultHtml += '</div></li>';
    }
    resultHtml += '</ul>'    
    $('#pg_result_footer').html(resultHtml);
    
    // Run pageguide
    tl.pg.init();
}


// Extension-Code
// --------------------------------------------------------------------------------------------

// ## Pageguide ##
tl = window.tl || {};
tl.pg = tl.pg || {};

tl.pg.default_prefs = {
    'auto_show_first': true,
    'loading_selector' : '#loading',
    'track_events_cb': function() {
        return;
    }
};

tl.pg.init = function(preferences) {
    /* page guide object, for pages that have one */
    if (jQuery("#tlyPageGuide").length === 0) {
        return;
    }

    var guide   = jQuery("#tlyPageGuide"),
    wrapper = jQuery('<div>', {
        id: 'tlyPageGuideWrapper'
    }),
    message = jQuery('<div>', {
        id: 'tlyPageGuideMessages'
    });

    message.append('<a href="#" class="tlypageguide_close" title="Schliesse CAC">Ende</a>')
    .append('<span></span>')
    .append('<div></div>')
    .append('<a href="#" class="tlypageguide_back" title="Next">Letztes</a>')
    .append('<a href="#" class="tlypageguide_fwd" title="Next">N&auml;chstes</a>');

    jQuery('<div/>', {
        'title': 'CAC starten',
        'class': 'tlypageguide_toggle'
    }).append('Checker')
    .append('<div><span>' + guide.data('tourtitle') + '</span></div>')
    .append('<a href="javascript:void(0);" title="Schliesse CAC">CAC schliessen &raquo;</a>').appendTo(wrapper);

    wrapper.append(guide);
    wrapper.append(message);
    jQuery('body').append(wrapper);

    var pg = new tl.pg.PageGuide(jQuery('#tlyPageGuideWrapper'), preferences);
    pg.ready(function() {
        pg.setup_handlers();
        pg.$base.children(".tlypageguide_toggle").animate({
            "right": "-120px"
        }, 250);
        // RLE: auto-open pageguide at start
        pg.open();
        // RLE
    });
    return pg;
};

tl.pg.PageGuide = function (pg_elem, preferences) {
    this.preferences = jQuery.extend({}, tl.pg.default_prefs, preferences);
    this.$base = pg_elem;
    this.$all_items = jQuery('#tlyPageGuide > li', this.$base);
    this.$items = jQuery([]); /* fill me with visible elements on pg expand */
    this.$message = jQuery('#tlyPageGuideMessages');
    this.$fwd = jQuery('a.tlypageguide_fwd', this.$base);
    this.$back = jQuery('a.tlypageguide_back', this.$base);
    this.cur_idx = 0;
    this.track_event = this.preferences.track_events_cb;
};

tl.pg.isScrolledIntoView = function(elem) {
    var dvtop = jQuery(window).scrollTop(),
    dvbtm = dvtop + jQuery(window).height(),
    eltop = jQuery(elem).offset().top,
    elbtm = eltop + jQuery(elem).height();

    return (elbtm >= dvtop) && (eltop <= dvbtm - 100);
};

tl.pg.PageGuide.prototype.ready = function(callback) {
    var that = this,
    interval = window.setInterval(function() {
        if (!jQuery(that.preferences.loading_selector).is(':visible')) {
            callback();
            clearInterval(interval);
        }
    }, 250);
    return this;
};

/* to be executed on pg expand */
tl.pg.PageGuide.prototype._on_expand = function () {
    var that = this,
    $d = document,
    $w = window;

    /* set up initial state */
    this.position_tour();
    this.cur_idx = 0;

    // create a new stylesheet:
    var ns = $d.createElement('style');
    $d.getElementsByTagName('head')[0].appendChild(ns);

    // keep Safari happy
    if (!$w.createPopup) {
        ns.appendChild($d.createTextNode(''));
        ns.setAttribute("type", "text/css");
    }

    // get a pointer to the stylesheet you just created
    var sh = $d.styleSheets[$d.styleSheets.length - 1];

    // space for IE rule set
    var ie = "";

    /* add number tags and PG shading elements */
    this.$items.each(function(i) {
        var $p = jQuery(jQuery(this).data('tourtarget') + ":visible:first");
        $p.addClass("tlypageguide_shadow tlypageguide_shadow" + i);

        var node_text = '.tlypageguide_shadow' + i + ':after { height: ' +
        $p.outerHeight() + 'px; width: ' + $p.outerWidth(false) + 'px; }';

        if (!$w.createPopup) {
            // modern browsers
            var k = $d.createTextNode(node_text, 0);
            ns.appendChild(k);
        } else {
            // for IE
            ie += node_text;
        }

        jQuery(this).prepend('<ins>' + (i + 1) + '</ins>');
        jQuery(this).data('idx', i);
    });

    // is IE? slam styles in all at once:
    if ($w.createPopup) {
        sh.cssText = ie;
    }

    /* decide to show first? */
    if (this.preferences.auto_show_first && this.$items.length > 0) {
        this.show_message(0);
    }
};

tl.pg.PageGuide.prototype.open = function() {
    this.track_event('PG.open');

    this._on_expand();
    this.$items.toggleClass('expanded');
    jQuery('body').addClass('tlypageguide-open');
};

tl.pg.PageGuide.prototype.close = function() {
    this.track_event('PG.close');

    this.$items.toggleClass('expanded');
    this.$message.animate({
        height: "0"
    }, 500, function() {
        jQuery(this).hide();
    });
    /* clear number tags and shading elements */
    jQuery('ins').remove();
    jQuery('body').removeClass('tlypageguide-open');
};

tl.pg.PageGuide.prototype.setup_handlers = function () {
    var that = this;

    /* interaction: open/close PG interface */
    jQuery('.tlypageguide_toggle', this.$base).live('click', function() {
        if (jQuery('body').is('.tlypageguide-open')) {
            that.close();
        } else {
            that.open();
        }
        return false;
    });

    jQuery('.tlypageguide_close', this.$message).live('click', function() {
        that.close();
        return false;
    });

    /* interaction: item click */
    this.$all_items.live('click', function() {
        var new_index = jQuery(this).data('idx');

        that.track_event('PG.specific_elt');
        that.show_message(new_index);
    });

    /* interaction: fwd/back click */
    this.$fwd.live('click', function() {
        var new_index = (that.cur_idx + 1) % that.$items.length;

        that.track_event('PG.fwd');
        that.show_message(new_index);
        return false;
    });

    this.$back.live('click', function() {
        /*
         * If -n < x < 0, then the result of x % n will be x, which is
         * negative. To get a positive remainder, compute (x + n) % n.
         */
        var new_index = (that.cur_idx + that.$items.length - 1) % that.$items.length;

        that.track_event('PG.back');
        that.show_message(new_index, true);
        return false;
    });

    /* register resize callback */
    jQuery(window).resize(function() {
        that.position_tour();
    });
};

tl.pg.PageGuide.prototype.show_message = function (new_index, left) {
    var old_idx = this.cur_idx,
    old_item = this.$items[old_idx],
    new_item = this.$items[new_index];

    this.cur_idx = new_index;

    jQuery('div', this.$message).html(jQuery(new_item).children('div').html());
    this.$items.removeClass("tlypageguide-active");
    jQuery(new_item).addClass("tlypageguide-active");
    
    // RLE
    var general = jQuery(new_item).attr('data-tourtarget').toString().indexOf('pg_result_general') > 0;
    // RLE

    if (!tl.pg.isScrolledIntoView(jQuery(new_item))) {
        jQuery('html,body').animate({
            scrollTop: jQuery(new_item).offset().top - 50
            }, 500);
    }

    this.$message.not(':visible').show().animate({
        'height': '100px'
    }, 500);
    
    // RLE added param general
    this.roll_number(jQuery('span', this.$message), jQuery(new_item).children('ins').html(), left, general);
};

// Added param general
tl.pg.PageGuide.prototype.roll_number = function (num_wrapper, new_text, left, general) {
    num_wrapper.animate({
        'text-indent': (left ? '' : '-') + '50px'
    }, 'fast', function() {
        num_wrapper.html(new_text);
        
        // RLE
        if (general) {
            num_wrapper.css({
               'background': 'rgba(255, 140, 0, 0.95)'
            });
        } else {
            num_wrapper.css({
               'background': 'rgba(247, 0, 119, 0.95)'
            });
        }
        // RLE
        
        num_wrapper.css({
            'text-indent': (left ? '-' : '') + '50px'
        }, 'fast').animate({
            'text-indent': "0"
        }, 'fast');
    });
};

tl.pg.PageGuide.prototype.position_tour = function () {    
    /* set PG element positions for visible tourtargets */
    this.$items = this.$all_items.filter(function () {
        return jQuery(jQuery(this).data('tourtarget')).is(':visible');
    });

    this.$items.each(function() {
        var arrow   = jQuery(this),
        target  = jQuery(arrow.data('tourtarget')).filter(':visible:first'),
        setLeft = target.offset().left,
        setTop  = target.offset().top;

        if (arrow.hasClass("tlypageguide_top")) {
            setTop -= 60;
        } else if (arrow.hasClass("tlypageguide_bottom")) {
            setTop += target.outerHeight() + 15;
        } else {
            setTop += 5;
        }

        if (arrow.hasClass("tlypageguide_right")) {
            setLeft += target.outerWidth(false) + 15;
        } else if (arrow.hasClass("tlypageguide_left")) {
            setLeft -= 65;
        } else {
            setLeft += 5;
        }

        arrow.css({
            "left": setLeft + "px", 
            "top": setTop + "px"
        });
        
        // RLE hide elements with target-id 'pg_result_general'
        if (target[0].id == 'pg_result_general') {
            arrow.css({
                visibility:"hidden"
            });
        }
    });
};
