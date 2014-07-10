CAC - The Content Accessibility Checker
=======================================

The Content Accessibility Checker 
checks web site content with respect to accessibility criteria according to an automatic provable subset of WCAG 2.0 criteria
and highlights possible accessibility issues directly in the web browser.
CAC is realized as Firefox plugin (version >=30).
It was initiated by the Swiss based A4A foundation («Access-for-all»),
and was developed by students (Reto Lehmann, Jan Portner) from the Bern University of Applied Sciences BUAS.
More information you will find here:
https://github.com/Access4all/ContentAccessibilityChecker/raw/master/Files/CAC-paper_camera-ready-version_ICCHP.pdf

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
1. start Firefox and drag the .xpi file into the browser window. The plugin should self-install automatically. 
2. check the installation in FF under the menu entry "Extra/Add-ons". 
   If installed correctly, the CAC icon
   ![CAC icon](https://github.com/Access4all/ContentAccessibilityChecker/raw/master/Files/icon.png "CAC icon")
   should be visible in the FF toolbar.
3. load a web page to be inspected and push the CAC icon, which opens the CAC start menu.
4. available CAC menu/message languages are English and German in the current version, which are selected based on the FF language settings.
   In order to change the language settings insert "about:config" in the FF URL box, then select "general.useragent.locale", and chose "de" or "en".

Implementation:
---------------
CAC is written in JavaScript, using the jQuery (www.jquery.com) and the pageguide libraries(http://tracelytics.github.com/pageguide/).
jQuery is used to select HTML elements (tags, attributes) in order to execute checking criteria on it.
pageguide is used for rendering the results.

==========================
Last changed:
Eduard Klein, July 10, 2014
eduard.klein@bfh.ch