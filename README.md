Content Accessibility Checker CAC
=================================

Der Content Accessibility Checker von Access4all

Licence:
--------

 * Access4all, Zugang für alle, Schweizerische Stiftung zur behindertengerechten Technologienutzung
 *
 * Copyright 2013 Access4all
 * Free to use under Creative Commons License: Access4all 3.0 Schweiz (CC BY 3.0 CH)
 * http://creativecommons.org/licenses/by/3.0/ch/legalcode.de
 *
 * Contributing Author: Access4all Team, Reto Lehmann bfh



Documentation:
--------------
### Einleitung ######
Dieses Dokument beschreibt den Aufbau und die Funktionsweise des Content Accessibility Checker. Der CAC ist ein in Javascript geschriebenes Skript zur Überprüfung von HTML-Code bezüglich der Barrierefreiheit (Accessibility).

![alt text](https://github.com/Access4all/ContentAccessibilityChecker/raw/master/Images/Website.png "Website")

Der Content Accessibility Checker besteht aus einem Menü zum ein- und ausblenden der Ergebnisse (A), den Hinweisen im unteren Bereich (B), sowie der Navigation (C) um durch die Hinweise zu blättern. Beim Blättern durch die Hinweise wird das betroffene HTML-Element hervorgehoben (D):

![My image](Access4all.github.com/ContentAccessibilityChecker/Images/Website2.png)

### Technische Funktionsweise ######
Der CAC basiert auf zwei Open-Source Javascript-Bibliotheken. Der jQuery-Library (www.jquery.com) und dem pageguide (http://tracelytics.github.com/pageguide/). jQuery wird verwendet um im HTML-Code die entsprechenden Elemente (Tags, Attribute) zu selektieren und die Prüffunktionen darauf anzuwenden. Pageguide wird verwendet um die Ergebnisse darzustellen.

Die .css Datei enthält die Stiele für die Darstellung


**1. Den CAC direkt in eine bestehende Webseite einbinden:**

```html
<!DOCTYPE html>
 ```

Zusätzlich benötigt der CAC jeweils ein DIV-Element direkt nach dem Header-Tag und ein DIV-Element vor dem schliessenden Body-Tag. In diese DIV-Elemente werden später per Javascript die Hinweismeldungen geschrieben.

```html
<body>

<div id="pg_result_footer"></div>
 ```

**2. Den CAC per Javascript installieren**

```javascript
// add result-header to page
```
Dies führt schlussendlich zum selben HTML-Code, wie Variante 1.


### Den CAC starten ######
Ist der CAC installiert kann er auf zwei Arten gestartet werden. Wichtig ist, dass die jQuery-Library bereits geladen ist. Dies kann über eine jQuery-Funktion ($(document).ready()) gemacht werden. 

**1. Den CAC direkt aus einer Webseite starten**
Ist der CAC direkt in der Webseite eingebettet, muss nur folgendes Script-Stück hinzugefügt werden:

```javascript
// In der HTML-Webseite
```

Sobald die Webseite und jQuery vollständig geladen sind, wird die Funktion checkPage() ausgeführt, welche die Prüfung durchführt.

```javascript
// In der contentaccessibilitychecker.js Datei
```


### CAC Funktionen / CAC Anpassen ######
Alle Funktionen und auch Texte / Parameter können im Hauptscript contentaccessibilitychecker.js angepasst und verändert werden. Der CAC verfügt über folgende Abschnitte
Folgende Parameter sind definiert und können angepasst werden:

```javascript
// Params
```


**Detailerklärung checkPage()**

Die Funktion checkPage ist mit Kommentaren versehen, die die jeweilige Prüffunktion beschreiben. Über die Methode addError() wird ein Hinweis geschrieben. addError nimmt zwei Werte an, das spezifische HTML-Element mit dem Fehler und der Fehlertext. Für allgemeine Hinweise muss beim ersten Parameter ‚null‘ verwendet werden. 

```javascript

**Beispiel spezifischer Hinweis**
```javascript
// 2.2 Diagramm/Lageplan/Organigramm/Wegbeschreibung usw.
```

Die Methode addError prüft zudem auf Duplikate, sortiert die Hinweise gemäss ihrer Position auf der Webseite und schreibt die Meldungen in eine Liste in den globalen Variablen. 

### Integration MediaWiki ######
// In der Methode getPreviewText() direkt vor der Rückgabe:

```

In der mediaWiki_CAC.js Datei ist ein Skript hinterlegt, welches ein spezielles DIV-Element (wikiPreview, darin steht der HTML-Code der Vorschau) aus der Artikelseite ausliest. Der HTML-Code dieses Elementes wird dann in ein neues leeres Fenster kopiert und der CAC wie unter Installation beschrieben indiziert und gestartet. Ebenfalls werden dem neuen Fenster noch einige CSS-Informationen übergeben, damit die Seite dem MediaWiki CMS möglichst ähnlich sieht:

```javascript
<script type="text/javascript">

**Ergebnis CAC im MediaWiki von Access4all**
![My image](Access4all.github.com/ContentAccessibilityChecker/Images/CACBrowser.png)

