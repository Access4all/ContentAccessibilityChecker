CAC - The Content Accessibility Checker
=======================================

The Content Accessibility Checker from the swiss based «Access4all» foundation (in german: «Zugang für alle»)
checks web site content with respect to accessibility criteria according to important WCAG 2.0 criteria
and highlights possible accessibility issues directly in the web browser.
CAC is realized as Firefox plugin (version >=30).
More information you will find here:

![CAC paper, published in LNCS 8547](https://github.com/Access4all/ContentAccessibilityChecker/raw/master/Files/CAC-paper_camera-ready-version_ICCHP.pdf "CACpaper")

Licence:
--------
 * Access4all, Zugang für alle, Schweizerische Stiftung zur behindertengerechten Technologienutzung
 *
 * Copyright 2013, 2014 Access4all
 * Free to use under Creative Commons License: Access4all 3.0 Schweiz (CC BY 3.0 CH)
 * http://creativecommons.org/licenses/by/3.0/ch/legalcode.de
 *
 * Contributing Authors: Access4all Team, Reto Lehmann (2013, wirtschaft.bfh.ch), Jan Portner (2014, wirtschaft.bfh.ch)

Installation:
-------------
1. start Firefox, and drag the .xpi file into the browser window. The plugin should self-install automatically. 
2. check the installation in FF under the menu entry "Extra/Add-ons".
3. load a web page to be inspected and push the (now new) blue button showing a white person, which opens the CAC start menu.
4. available CAC menu/message languages are English and German in the current version, which are selected based on the FF language settings.
   In order to change the language settings insert "about:config" in the FF URL box, then select "general.useragent.locale", and chose "de" or "en".

Implementation:
---------------
CAC is written in JavaScript, using the jQuery (www.jquery.com) and the pageguide libraries(http://tracelytics.github.com/pageguide/).
jQuery is used to select HTML elements (tags, attributes) in order to execute checking criteria on it.
pageguide is used for rendering the results.

==========================
Last changed:
Eduard Klein, July 1, 2014
eduard.klein@bfh.ch