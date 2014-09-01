
function checkPage()
{
   
    // 2.1,2.2,2.3 Prüfung von fehlenden Alternativtexten bei <img>,<input> und <area> Tags
    $('img,input,area').each(function(){
        var alt = this.getAttribute('alt');

        switch(this.tagName){
            case 'AREA':
                if (alt == null || alt == ''){
                    var mapName = this.parentNode.name;
                    var imgNode = $('[usemap="#' + mapName + '"]');
                    if (imgNode != null && txtAreaBool==true) {
                        addError(imgNode[0], txtArea + WCAG11); 
                    }
                }
                else if (alt != null || alt != ''){
                    var mapName = this.parentNode.name;
                    var imgNode = $('[usemap="#' + mapName + '"]');
                    if (imgNode != null && txtAreaBool==true) {
                        addError(imgNode[0], txtAltArea + WCAG11); 
                    }
                }  
                break;

            case 'IMG':
                // check if parent node is <a href...></a>
                var parentTag = (this.parentNode.tagName == 'A') ? true : false;
                if (parentTag){
                    if (txtIMGBool==true && (alt == null || alt == '')){
                        addError(this, txtAltLink + WCAG11);
                    } 
		    else if (txtIMGBool==true) {
                        addError(this, txtExistingAltLink + WCAG11);
                    }
                } 
		else {
                    if (alt == null && txtIMGBool==true) {
                        addError(this, txtAlt + WCAG11);
                    } else if (alt == '' && txtIMGBool==true) {
                        addError(this, txtAltEmpty + WCAG11);
                    }
                }
                break;

            case 'INPUT':
                if (txtInputBool==true && (alt == null || alt == '')) {
                    addError(this, txtAltInput + WCAG11);
                }
 		else if (txtInputBool==true && (alt != null || alt != '')) {
                    addError(this, txtExistingAltInput + WCAG11);
                }
		
        }
    });


    // 2.4 Überprüfung, ob Videos vorhanden sind. Diese müssen über einen Alternativtext und/oder Untertitel verfügen.
    $('a').each(function(){
        var href = this.getAttribute('href') == null ? null : this.getAttribute('href').toString();
        if (txtVideoBool==true && (href != null && href.match(videotypes))) {
            addError(this, txtVideo + WCAG12);
        }
    });
    $('embed').each(function() { 
        var src = this.getAttribute('src') == null ? null : this.getAttribute('src').toString();
        if (txtVideoBool==true && (src != null && src.match(embedVideo))) {
            addError(this, txtVideo + WCAG12);
        }
    });
    $('video').each(function() {
	if (txtVideoBool==true) {
            addError(this, txtVideo + WCAG12);
	}
    });
 
   
    // 2.5 Überprüfung, ob Audio-Inhalte vorhanden sind. Diese müssen über einen Alternativtext verfügen.
    $('embed').each(function(){
        var src = this.getAttribute('src') == null ? null : this.getAttribute('src').toString();
        if (txtAudioBool==true && (src != null && src.match(audiotypes))) {
            addError(this, txtAudio + WCAG12);
        }
    });
    $('audio').each(function(){
	if (txtAudioBool==true) {
        addError(this, txtAudio + WCAG12);
	}
    });


    /* 3.1 Prüfung, ob ein erklärender Text bei Diagrammen/Lageplänen/Organigrammen/Wegbeschreibungen,etc. vorhanden ist.
     *     Die Prüfung erfolgt anhand der Stoppwortliste im Array "wlDiag"
     */
    for (var word in wlDiag) {
        $('p:contains('+ wlDiag[word] + ')').each(function() {
	    if (txtDiaRichBool==true) {
            addError(this, txtDiag1 + wlDiag[word] + 
                txtDiag2 + wlDiag[word] + " " + txtDiag3 + WCAG14);
	    }
        });
    }


    /* 4.1 Überprüfung auf fett marktierten Text in einem <p>-Tag und Prüfung, 
     *     ob die Länge des fett markierten Textes max. 10% des gesamten Textes im Tags ausmacht.
     *     Trifft dies zu, handelt es sich möglicherweise um eine Überschrift. 
     */
    $('p').each(function(){
        var html = this.innerHTML.toString();
        // check if begins with bold <b> tag
        if (html.indexOf('<b>') === 0) {
            var endPos = html.indexOf('</b>');
            if (txtHeadingBool==true && ((endPos - (0.1 * html.length)) <= html.length)) {
                addError(this, txtNoHeading + WCAG24);
            }
        }
    });

    
    /* 4.2 Überprüfung, ob die Überschriften mit der Ebene h1 beginnen +
     *     Überprüfung, ob eine Überschriftenebene übersprungen wird
     */
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
        if (txtHeadingLevelBool==true && (lastLevel == 0 && level != 1)){
            addError(this, txtHeading1 + WCAG24);
        }
        lastLevel = level;
    });
    for (h in headingList) {
	if (txtHeadingLevelBool==true) {
            addError(headingList[h].element,txtHeading2 + 
                headingList[h].lastLevel + txtHeading3 + headingList[h].level + WCAG24);
	}
    }

  
    // 4.3 Überprüfung, ob ein <p>-Tag leer ist.
    $('p:empty').each(function() {
	if (txtEmptyPBool==true) {
            addError(this, txtEmptyP + WCAG14);
	} 
    });


    // 4.4 Überprüfung, ob sich ein Text ausserhalb eines <p>-Tag befindet (Fake Tag: <textwithoup>).
    $('body').contents().filter(function() {
        return this.nodeType == 3 && $.trim(this.nodeValue) != '';
    }).wrap('<textwithoutp></textwithoutp>').end();
    $('textwithoutp').each(function() {
	if (txtParagraphBool==true) {
            addError(this, txtParagraph + WCAG14);
	}
    });


    // 4.5 Überprüfung, ob <strong>-Tags nur innerhalb eines <p>-Tags verwendet werden.
    $('strong').each(function(){
        if (txtStrongBool==true && this.parentNode.tagName != 'P') {
            addError(this, txtStrong + WCAG14);
        }
    });


    /* 4.6 Überprüfung auf Abkürzungen. 
     * Dabei wird angenommen, dass es sich bei 3-6 aufeinanderfolgenden Grossbuchstaben um eine Abkürzung handelt.
     * Allgemeinverständlich Abkürzungen (var excludedAbbreviations) werden nicht geprüft.
     */
    $('p').each(function(){
        var html = this.innerHTML.toString();
        var abbr = html.match('[A-Z][A-Z][A-Z][A-Z]?[A-Z]?');        
        if (abbr != null && abbr.length > 0) {
            if (txtAbbreviationBool==true && excludedAbbreviations.indexOf(abbr) == -1) {
                addError(this, txtAbbreviation + WCAG31);
            }
        }
    });

    // 5.1 Überprüfung, ob eine Tabelle über eine Tabellenüberschrift verfügt.
    $('table').each(function() {
        var html = this.innerHTML.toString();
        if (!html.match('<caption>') && txtTableHeadBool==true) {
            addError(this, txtTableHeader + WCAG13);
        }
	else {}
    });

    // 5.2 Überprüfung, ob Spalten- und Zeilenüberschriften in einer Tabelle vorhanden sind.
    $('table').each(function() {
        var html = this.innerHTML.toString();
        if (!html.match('<th>') && txtTableColRowBool==true) {
            addError(this, txtTableColRowHeader + WCAG13);
        }
	else {}
    });


    // 5.3 Überprüfung auf leere Tabellenzellen. 
    $('td:empty').each(function(){
	if (txtEmptyTableBool==true) {
            addError(this.parentNode.parentNode.parentNode, txtTableEmptyCell + WCAG13)
	}
    });
    $('tr:empty').each(function(){
	if (txtEmptyTableBool==true) {
            addError(this.parentNode.parentNode, txtTableEmptyCell + WCAG13);
	}
    });


    // 5.4 Überprüfung, ob Sonderzeichen in einer Tabelle vorhanden sind.
    $('table').each(function(){
        var html = this.innerHTML.toString();
        if (html.match(specialCharacters) && txtSpecialCharBool==true) {
            addError(this, txtTableSpecial + WCAG13);
        }
    });


    /* 5.5 Überprüfung auf Layout-Tabellen
     *     Als Layout-Tabelle gilt: Tabelle ohne Tabellenüberschrift. 
     */
    $('table').each(function() {
        var html = this.innerHTML.toString();
        if (!html.match('<th>') && txtTableHeadBool==true) {
            addError(this, txtLayoutTable + TableGuide + WCAG13);
        }
	else {}
    });


    /* 5.6 Überprüfung, ob eine Matrixtabelle über Spalten- und Zeilenüberschriften verfügt.
     * 	    Die Prüfung erfolgt anhand der Attribute span=, scope=, axis= und dem Element <colgroup>.
     */          
    /* $('table').each(function(){
        var html = this.innerHTML.toString();
        
        if ((html.indexOf('<colgroup>') > 0 ||
             html.indexOf('span=') > 0 ||
             html.indexOf('scope=') > 0 ||
             html.indexOf('axis=') > 0) && txtComplexTableBool==true) 
        {
            addError(this, txtComplexTable + WCAG13);
        }
    });
     */


    /* 6.1 Überprüfung, ob Aufzählungen als Liste definiert.
     *     Dabei wird überprüft, ob sich die folgenden Zeichen innerhalb eines <p>-Tags vorhanden sind: - * →
     *     Es ist von einer Liste auszugehen, wenn einmal am Anfang oder mehr als drei Mal innerhalb des Tags vorkommt.
     */
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
        
        if (hasErr && txtListBool==true) {
            addError(this, txtList + WCAG13);
        }
    });  
    
    // 6.2 Überprüfung auf korrekt verschachtelte Listen. Dabei wird bei jeweils vohandenen <ul>- oder <ol>-Tag ein Hinweis ausgegeben.
    $('ul, ol').each(function() {
	if (txtListBool==true) {
            addError(this, txtListNested + WCAG13);
	} 
    });
    
    // 7.1 Überprüfung auf unabhängig verständlichen Linktext, anhand der Strings in var shortLinks 
    $('a').each(function() {
        var html = this.innerHTML.toString();
        if (txtLinkBool==true && (html.match(shortLinks) && html.length < 8)) {
            addError(this, txtLinkDescription + WCAG24);
        }
    });


    /* 7.2 Überprüfung, ob es sich beim Link um einen Dateidownload handelt.
     *     Solche Links sollten Angaben zum Format und File-Grösse enthalten.
     */
    $('a').each(function(){
        var href = href = this.getAttribute('href') == null ? null : this.getAttribute('href').toString();
        if (txtLinkDownloadBool==true && (href != null && href.match(filetypes))) {
            addError(this, txtLinkFile + WCAG24);
        }
    });


    // 8.1 Überprüfung auf vorhandene PDF-Links
    $('a').each(function() {
        var href = this.getAttribute('href') == null ? null : this.getAttribute('href').toString();
        if (txtPDFBool==true && (href != null && href.match('.pdf'))){
            addError(this, txtPDF1 + PDFChecker + txtPDF2 + WCAG11);
        }
    });

    // Ausgabe der Fehler- und Hinweistexte im PG-Footer
    printResults();
}

// Unterstützungsfunktionen
// --------------------------------------------------------------------------------------------

//Hinweis- und Fehlermeldung werden zwischengespeichert.
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
    
    // Überprüfung auf Duplikate (z.B. areas in der image-map)
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


//Funktion zur ausgabe der Fehler- und Hinweistexte
function printResults() 
{
    // Sortiert Listen entsprechend der Position in der aufgerufenen Webseite und Kombiniert die Nachrichten für jedes Element.
    var sortedCounter = 0;
    for (u in resultList) {      
        var presentPos = -1;
        // Nachrichten innerhalb des pg_result_general werden nicht Kombiniert
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
            // Erstellt einen neuen Eintrag
            resultListSorted[sortedCounter] = {
                'elementID': resultList[u].elementID,
                'elementPos': resultList[u].elementPos,
                'elementMessage': resultList[u].elementMessage
            };
            sortedCounter++;
        } else {
            // Fügt die Nachricht zum aktuellen Element hinzu
            resultListSorted[s].elementMessage = resultListSorted[s].elementMessage + ' ' + resultList[u].elementMessage;
        }
    }
    
    // Sortiert die Liste
    resultListSorted.sort(function(a,b){
        return a.elementPos - b.elementPos
    });
    
    // Ausgabe der Resultate
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
    
    // Pageguide wird gestartet
    tl.pg.init();
}


// Pageguide-Code
// --------------------------------------------------------------------------------------------


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
checkPage();
