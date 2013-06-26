Content Accessibility Checker CAC
=================================

Der Content Accessibility Checker von Access4all

Licence:
--------
/*
 * Access4all, Zugang für alle, Schweizerische Stiftung zur behindertengerechten Technologienutzung
 *
 * Copyright 2013 Access4all
 * Free to use under Creative Commons License: Access4all 3.0 Schweiz (CC BY 3.0 CH)
 * http://creativecommons.org/licenses/by/3.0/ch/legalcode.de
 *
 * Contributing Author: Access4all Team, Reto Lehmann bfh
 */


Documentation:
--------------
### Einleitung ######
Dieses Dokument beschreibt den Aufbau und die Funktionsweise des Content Accessibility Checker. Der CAC ist ein in Javascript geschriebenes Skript zur Überprüfung von HTML-Code bezüglich der Barrierefreiheit (Accessibility).Der CAC prüft verschiedene Kriterien der Publisher Accessibility Checklist (erhältlich bei Access4all) und stellt diese direkt auf der Zielwebseite dar:

![My image](Access4all.github.com/repository/Images/Website.png)

Der Content Accessibility Checker besteht aus einem Menü zum ein- und ausblenden der Ergebnisse (A), den Hinweisen im unteren Bereich (B), sowie der Navigation (C) um durch die Hinweise zu blättern. Beim Blättern durch die Hinweise wird das betroffene HTML-Element hervorgehoben (D):

![My image](Access4all.github.com/repository/Images/Website2.png)

### Technische Funktionsweise ######
Der CAC basiert auf zwei Open-Source Javascript-Bibliotheken. Der jQuery-Library (www.jquery.com) und dem pageguide (http://tracelytics.github.com/pageguide/). jQuery wird verwendet um im HTML-Code die entsprechenden Elemente (Tags, Attribute) zu selektieren und die Prüffunktionen darauf anzuwenden. Pageguide wird verwendet um die Ergebnisse darzustellen.Der CAC besteht aus folgenden Dateien:![My image](Access4all.github.com/repository/Images/Contents.png)

Die .css Datei enthält die Stiele für die DarstellungDie .js Datei ist die Hauptanwendung CACDie jquery Datei enthält die jQuery-BibliothekeDazu noch die Bilder für den CAC (Pfeile, Icon)Damit der CAC funktionieren kann muss zuerst die jQuery-Bibliothek und das CSS in der HTML-Seite geladen werden. Anschliessend kann die contentaccessibilitychecker.js geladen werden. Siehe nächstes Kapitel.

### Installation ######
**1. Den CAC direkt in eine bestehende Webseite einbinden:**Direkt im HTML-Head Tag die entsprechenden Verweise hinzufügen:

```html
<!DOCTYPE html><html><head><title>Testseite für den Accessibility-Checker</title><link href="PFAD/contentaccessibilitychecker.css" type="text/css" /><script type="text/javascript" src="PFAD/jquery-1.7.2.min.js"></script><script type="text/javascript" src="PFAD/contentaccessibilitychecker.js"></script></head><body>
 ```

Zusätzlich benötigt der CAC jeweils ein DIV-Element direkt nach dem Header-Tag und ein DIV-Element vor dem schliessenden Body-Tag. In diese DIV-Elemente werden später per Javascript die Hinweismeldungen geschrieben.

```html
<body><div id="pg_result_general"></div>INHALT

<div id="pg_result_footer"></div></body></html>
 ```

**2. Den CAC per Javascript installieren**Bei dieser Möglichkeit wird der CAC über Javascript in die Webseite eingefügt. Diese Methode wird beim Firefox-Plugin und bei der MediaWiki Implementation verwendet. Auch hier wird zuerst jeweils zwei DIV-Elemente erstellt und anschliessend die Scripts und die CSS-Datei in die Seite indiziert:

```javascript
// add result-header to pagevar body = content.document.getElementsByTagName('body')[0];var header = content.document.createElement('div');header.id = 'pg_result_general';body.insertBefore(header, body.firstChild);       // add result-footer to pagevar foot = content.document.createElement('div');foot.id = "pg_result_footer";body.appendChild(foot);       // add scripts to pageinjectJs('PFAD/jquery-1.7.2.js');injectCss('PFAD/checker.css');injectJs('PFAD/checker.js');       // support function for script injectionfunction injectJs(link) {    var src = content.document.createElement('script');    src.type = 'text/javascript';    src.src = link;    content.document.getElementsByTagName('head')[0].appendChild(src);}function injectCss(link) {    var src = content.document.createElement('link');    src.type = 'text/css';    src.rel = 'stylesheet';    src.href = link;    content.document.getElementsByTagName('head')[0].appendChild(src);  }
```
Dies führt schlussendlich zum selben HTML-Code, wie Variante 1.


### Den CAC starten ######
Ist der CAC installiert kann er auf zwei Arten gestartet werden. Wichtig ist, dass die jQuery-Library bereits geladen ist. Dies kann über eine jQuery-Funktion ($(document).ready()) gemacht werden. 

**1. Den CAC direkt aus einer Webseite starten**
Ist der CAC direkt in der Webseite eingebettet, muss nur folgendes Script-Stück hinzugefügt werden:

```javascript
// In der HTML-Webseite<script type="text/javascript">   $(document).ready(function() {      checkPage();   })</script>
```

Sobald die Webseite und jQuery vollständig geladen sind, wird die Funktion checkPage() ausgeführt, welche die Prüfung durchführt.**2. CAC automatisch starten**Bei der zweiten Variante ist der Ladezustand der Webseite nicht bekannt. Deshalb wird der CAC automatisch aus dem Hauptscript gestartet, sobald dieses geladen ist. Dazu wird dieselbe Funktion wie bei 1 verwendet:

```javascript
// In der contentaccessibilitychecker.js Datei$(document).ready(function() {  checkPage();})
```


### CAC Funktionen / CAC Anpassen ######
Alle Funktionen und auch Texte / Parameter können im Hauptscript contentaccessibilitychecker.js angepasst und verändert werden. Der CAC verfügt über folgende AbschnitteGlobale Variablen 	= 	Hier werden die Hinweise zwischengespeichert.Parameter 	= 	Hier werden z.B. die Dateiformate, Abkürzungen usw. definiertAllgemeine Hinweise 	= 	Texte für die allgemeinen HinweiseElement Hinweise 	= 	Texte für die elementbezogenen HinweisecheckPage()  	= 	Die Prüffunktion**Detailerklärung Parameter** 
Folgende Parameter sind definiert und können angepasst werden:

```javascript
// ParamswlDiag = Erkannte Wörter für Abbildungen wie Lagepläne, Diagramme usw.specialCharacters = Liste der erkannten Sonderzeichen in Tabellen.filetypes = Dateitypen die z.B. bei Downloadlinks erkannt werden.videotypes = Dateitypen für Videos.embedVideo = Dateitypen für eingebettete Videos.audiotypes = Dateitypen für Audio.excludedAbbreviations = Liste ignorierter Abkürzungen.shortLinks = Liste ignorierter Linktexte
```


**Detailerklärung checkPage()**

Die Funktion checkPage ist mit Kommentaren versehen, die die jeweilige Prüffunktion beschreiben. Über die Methode addError() wird ein Hinweis geschrieben. addError nimmt zwei Werte an, das spezifische HTML-Element mit dem Fehler und der Fehlertext. Für allgemeine Hinweise muss beim ersten Parameter ‚null‘ verwendet werden. **Beispiel allgemeine Hinweise**

```javascript// ## 0. Introduction    addError(null, txtIntroduction);        // ## 1. General info messages ##        // 1.1 General info about comprehensability    addError(null, txtComprehend);        // 1.2 Message for images to have a good contrast    addError(null, txtContrast);    // 1.3 Color info in body    addError(null, txtColors);```

**Beispiel spezifischer Hinweis**
```javascript
// 2.2 Diagramm/Lageplan/Organigramm/Wegbeschreibung usw.    // Check for the words and add info-message    for (var word in wlDiag) {        $('p:contains('+ wlDiag[word] + ')').each(function() {             addError(this, txtDiag1 + wlDiag[word] +                 txtDiag2 + wlDiag[word] + txtDiag3);        });    }
```

Die Methode addError prüft zudem auf Duplikate, sortiert die Hinweise gemäss ihrer Position auf der Webseite und schreibt die Meldungen in eine Liste in den globalen Variablen. Zum Schluss werden die Hinweise mit der Methode printResults() aus dem Zwischenspeicher in die Platzhalter-DIVs auf der Webseite geschrieben und der pageguide wird gestartet. Dieser formatiert anschliessend die Hinweise in einer schönen visuellen Form und ermöglicht die Navigation.

### Integration MediaWiki ######Der CAC wurde in das MediaWiki der Stiftung Access4all integriert. Durch den einfachen Aufbau des CAC ist die Integration sehr einfach zu bewerkstelligen:Die CAC Dateien wurden in einen neuen Ordner „extensions/ContentAccessibilityChecker“ auf dem Server kopiert. Anschliessend wurde die Datei „includes/EditPage.php“ angepasst. Diese PHP-Seite wird geladen, wenn ein Benutzer im Wiki auf „Bearbeiten“ drückt.In der PHP-Seite gibt es eine Funktion die ausgelöst wird, wenn der Knopf „Vorschau anzeigen“ gedrückt wird. Das MediaWiki stellt dann eine Vorschau des Artikels dar. Zum normalen Benutzertext wird neu auch ein Stück Javascript von einer Datei (mediaWiki_CAC.js) angefügt, welches anschliessend vom Browser ausgeführt wird. Am MediaWiki CMS wurde somit nur eine Codezeile in der Datei EditPage.php eingefügt:```php
// In der Methode getPreviewText() direkt vor der Rückgabe:
// RLE CAC - 15.01.2013$previewHTML .= file_get_contents($_SERVER["DOCUMENT_ROOT"] . ' /extensions/ContentAccessibilityChecker/mediaWiki_CAC.js');// RLE CAC - 15.01.2013        return $previewhead . $previewHTML . $this>previewTextAfterContent;
```

In der mediaWiki_CAC.js Datei ist ein Skript hinterlegt, welches ein spezielles DIV-Element (wikiPreview, darin steht der HTML-Code der Vorschau) aus der Artikelseite ausliest. Der HTML-Code dieses Elementes wird dann in ein neues leeres Fenster kopiert und der CAC wie unter Installation beschrieben indiziert und gestartet. Ebenfalls werden dem neuen Fenster noch einige CSS-Informationen übergeben, damit die Seite dem MediaWiki CMS möglichst ähnlich sieht:

```javascript
<script type="text/javascript">    // RLE - 15.01.2013    // Script to run open preview in another window and run CAC    // support function for script injection    function injectJs(link) {        var src = printDocument.createElement('script');        src.type = 'text/javascript';        src.src = link;        printDocument.getElementsByTagName('head')[0].appendChild(src);    }    function injectCss(link) {        var src = printDocument.createElement('link');        src.type = 'text/css';        src.rel = 'stylesheet';        src.href = link;        printDocument.getElementsByTagName('head')[0].appendChild(src);      }    // create new window with preview-content    var printPreview = window.open('', 'print_preview');    var printDocument = printPreview.document;    var wikiContent = document.getElementById('wikiPreview');    var headContent = document.getElementsByTagName('head')[0];    printDocument.open();    printDocument.write("<!DOCTYPE html><html><head><meta charset='UTF-8'>"      + '<link rel="stylesheet" href="/sagWiki/load.php?debug=false&amp;lang=de&amp;modules=mediawiki.legacy.commonPrint%2Cshared%7Cskins.vector&amp;only=styles&amp;skin=vector&amp;*" />'      + '<link rel="stylesheet" href="/sagWiki/load.php?debug=false&amp;lang=de&amp;modules=site&amp;only=styles&amp;skin=vector&amp;*" />'      + "</head><body><div id='pg_result_general'></div><div id='content' style='margin-left: 1em;'>"      + wikiContent.innerHTML + "</div><div id='pg_result_footer'></div></body></html>");    // remove preview-note    var notediv = printDocument.getElementsByClassName('previewnote')[0];    var wikidiv = printDocument.getElementById('content');    wikidiv.removeChild(notediv);          // inject CAC Scripts + CSS     injectJs("/sagWiki/extensions/ContentAccessibilityChecker/jquery-1.7.2.min.js");    injectCss("/sagWiki/extensions/ContentAccessibilityChecker/contentaccessibilitychecker.css");    injectJs("/sagWiki/extensions/ContentAccessibilityChecker/contentaccessibilitychecker.js");    printDocument.close();</script>```

**Ergebnis CAC im MediaWiki von Access4all**
![My image](Access4all.github.com/repository/Images/CACBrowser.png)


