<script type="text/javascript">
	// RLE - 15.01.2013
	// Script to run open preview in another window and run CAC

	// support function for script injection
	function injectJs(link) {
		var src = printDocument.createElement('script');
		src.type = 'text/javascript';
		src.src = link;
		printDocument.getElementsByTagName('head')[0].appendChild(src);
	}
	function injectCss(link) {
		var src = printDocument.createElement('link');
		src.type = 'text/css';
		src.rel = 'stylesheet';
		src.href = link;
		printDocument.getElementsByTagName('head')[0].appendChild(src);  
	}

	if (navigator.userAgent.search("MSIE") < 0) {
	// create new window with preview-content
	var printPreview = window.open('', 'print_preview');
	var printDocument = printPreview.document;
	var wikiContent = document.getElementById('wikiPreview');
	var headContent = document.getElementsByTagName('head')[0];

	printDocument.open();
	printDocument.write("<!DOCTYPE html><html><head><meta charset='UTF-8'>"
	  + '<link rel="stylesheet" href="/sagWiki/load.php?debug=false&amp;lang=de&amp;modules=mediawiki.legacy.commonPrint%2Cshared%7Cskins.vector&amp;only=styles&amp;skin=vector&amp;*" />'
	  + '<link rel="stylesheet" href="/sagWiki/load.php?debug=false&amp;lang=de&amp;modules=site&amp;only=styles&amp;skin=vector&amp;*" />'
	  + "</head><body><div id='pg_result_general'></div><div id='content' style='margin-left: 1em;'>"
	  + wikiContent.innerHTML + "</div><div id='pg_result_footer'></div></body></html>");

	// remove preview-note
	var notediv = printDocument.getElementsByClassName('previewnote')[0];
	var wikidiv = printDocument.getElementById('content');
	wikidiv.removeChild(notediv);
	  
	// inject CAC Scripts + CSS 
	injectJs("/sagWiki/extensions/ContentAccessibilityChecker/jquery-1.7.2.min.js");
	injectCss("/sagWiki/extensions/ContentAccessibilityChecker/contentaccessibilitychecker.css");
	injectJs("/sagWiki/extensions/ContentAccessibilityChecker/contentaccessibilitychecker.js");

	printDocument.close();
}
</script>