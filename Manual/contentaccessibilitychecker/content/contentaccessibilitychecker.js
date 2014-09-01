
// Start with the code
var contentAccessibilityChecker = {
    	onLoad: function() {
        	this.initialized = true;
    	},


	/*
	* Fügt die von den einzelnen Checkboxen(Button-Popups) erstellten Werte("true" falls markiert, "false" falls entmarkiert) als Javascript Variablen in die aufgerufene Webseite ein.
	* Die eingefügten Variablen dienen für die if-Abfragen bei den einzelnen Prüfkriterien (if Varible ==true, gib den Text aus).
	*/    
	configMenu: function injectStatus () {
				var txtAreaBool = document.getElementById("txtAreaBool");
				var txtIMGBool = document.getElementById("txtIMGBool");
				var txtInputBool = document.getElementById("txtInputBool");
				var txtVideoBool = document.getElementById("txtVideoBool");
				var txtAudioBool = document.getElementById("txtAudioBool");
				var txtDiaRichBool = document.getElementById("txtDiaRichBool");
				var txtHeadingBool = document.getElementById("txtHeadingBool");
				var txtHeadingLevelBool = document.getElementById("txtHeadingLevelBool");
				var txtEmptyPBool = document.getElementById("txtEmptyPBool");
				var txtParagraphBool = document.getElementById("txtParagraphBool");
				var txtStrongBool = document.getElementById("txtStrongBool");
				var txtAbbreviationBool = document.getElementById("txtAbbreviationBool");
				var txtTableHeadBool = document.getElementById("txtTableHeadBool");
				var txtTableColRowBool = document.getElementById("txtTableColRowBool");
				var txtEmptyTableBool = document.getElementById("txtEmptyTableBool");
				var txtSpecialCharBool = document.getElementById("txtSpecialCharBool");
				var txtLayoutTableBool = document.getElementById("txtLayoutTableBool");
				var txtComplexTableBool = document.getElementById("txtComplexTableBool");
				var txtListBool = document.getElementById("txtListBool");
				var txtLinkBool = document.getElementById("txtLinkBool");
				var txtLinkDownloadBool = document.getElementById("txtLinkDownloadBool");
				var txtPDFBool = document.getElementById("txtPDFBool");
				
								
				var menuArray = [
					"var txtAreaBool = " + txtAreaBool.hasAttribute("checked"),
					"var txtIMGBool = " + txtIMGBool.hasAttribute("checked"),
					"var txtInputBool = " + txtInputBool.hasAttribute("checked"),
					"var txtVideoBool = " + txtVideoBool.hasAttribute("checked"),
					"var txtAudioBool = " + txtAudioBool.hasAttribute("checked"),
					"var txtDiaRichBool = " + txtDiaRichBool.hasAttribute("checked"),
					"var txtHeadingBool = " + txtHeadingBool.hasAttribute("checked"),
					"var txtHeadingLevelBool = " + txtHeadingLevelBool.hasAttribute("checked"),
					"var txtEmptyPBool = " + txtEmptyPBool.hasAttribute("checked"),
					"var txtParagraphBool = " + txtParagraphBool.hasAttribute("checked"),
					"var txtStrongBool = " + txtStrongBool.hasAttribute("checked"),
					"var txtAbbreviationBool = " + txtAbbreviationBool.hasAttribute("checked"),
					"var txtTableHeadBool = " + txtTableHeadBool.hasAttribute("checked"),
					"var txtTableColRowBool = " + txtTableColRowBool.hasAttribute("checked"),
					"var txtEmptyTableBool = " + txtEmptyTableBool.hasAttribute("checked"),
					"var txtSpecialCharBool = " + txtSpecialCharBool.hasAttribute("checked"),
					"var txtLayoutTableBool = " + txtLayoutTableBool.hasAttribute("checked"),
					"var txtListBool = " + txtListBool.hasAttribute("checked"),
					"var txtLinkBool = " + txtLinkBool.hasAttribute("checked"),
					"var txtLinkDownloadBool = " + txtLinkDownloadBool.hasAttribute("checked"),
					"var txtPDFBool = " + txtPDFBool.hasAttribute("checked"),
				];
								
				for (var i = 0; i < menuArray.length; i++) {
					var menuAdd = content.document.createElement('script');
					menuAdd.type = 'text/javascript';
					content.document.getElementsByTagName('head')[0].appendChild(menuAdd);
					var menuVal = content.document.createTextNode(menuArray[i]);
					menuAdd.appendChild(menuVal);
				}
				
	},
	
	/*
	* Fügt die in den .properties-Dateien erstellten Werte (Texte) als Javascript Variablen in die aufgerufene Webseite ein.
	* Die erstellten Werte sind jedoch nur im Hauptscript (contentaccessibilitychecker.js) in der jeweiligen Sprache aufrufbar und nicht in den Scripts, 
	* welche in eine Webseite hinzugefügt wurden. Deshalb werden mit der substr()-Methode zuerst die einzelnen Werte in einfache Strings konvertiert.
	*/
	textStrings: function injectStrings () {
				//Zugriff auf das Stringbundle
				var str = document.getElementById("strings");

				//Konvertierung in einfachen String
				var propStringArray = [
					"var txtIntroduction = \"" + str.getString("txtIntroduction").substr(0) + " \"",      
					"var txtContrast = \"" + str.getString("txtContrast").substr(0) + "\"",
					"var txtColors = \"" + str.getString("txtColors").substr(0) + "\"",
					"var txtComprehend = \"" + str.getString("txtComprehend").substr(0) + "\"",
					"var txtEmptyP = \"" + str.getString("txtEmptyP").substr(0) + "\"",
					"var txtArea = \"" + str.getString("txtArea").substr(0) + "\"",
					"var txtAltArea = \"" + str.getString("txtAltArea").substr(0) + "\"",
					"var txtAlt = \"" + str.getString("txtAlt").substr(0) + "\"",
					"var txtAltInput = \"" + str.getString("txtAltInput").substr(0) + "\"",
					"var txtExistingAltInput = \"" + str.getString("txtExistingAltInput").substr(0) + "\"",
					"var txtAltEmpty = \"" + str.getString("txtAltEmpty").substr(0) + "\"",
					"var txtAltLink = \"" + str.getString("txtAltLink").substr(0) + "\"", 
					"var txtExistingAltLink = \"" + str.getString("txtExistingAltLink").substr(0) + "\"",
					"var txtDiag1 = \"" + str.getString("txtDiag1").substr(0) + "\"",
					"var txtDiag2 = \"" + str.getString("txtDiag2").substr(0) + " \"",
					"var txtDiag3 = \"" + str.getString("txtDiag3").substr(0) + "\"",
					"var txtHeading1 = \"" + str.getString("txtHeading1").substr(0) + "\"",
					"var txtHeading2 = \"" + str.getString("txtHeading2").substr(0) + "\"",
					"var txtHeading3 = \" " + str.getString("txtHeading3").substr(0) + "\"",
					"var txtParagraph = \"" + str.getString("txtParagraph").substr(0) + "\"",
					"var txtNoHeading = \"" + str.getString("txtNoHeading").substr(0) + "\"",
					"var txtStrong = \"" + str.getString("txtStrong").substr(0) + "\"",
					"var txtAbbreviation = \"" + str.getString("txtAbbreviation").substr(0) + "\"",
					"var txtTableHeader = \"" + str.getString("txtTableHeader").substr(0) + "\"", 
					"var txtTableColRowHeader = \"" + str.getString("txtTableColRowHeader").substr(0) + "\"",
					"var txtTableEmptyCell = \"" + str.getString("txtTableEmptyCell").substr(0) + "\"",
					"var txtTableSpecial = \"" + str.getString("txtTableSpecial").substr(0) + "\"",
					"var txtLayoutTable = \"" + str.getString("txtLayoutTable").substr(0) + "\"",
					"var txtComplexTable = \"" + str.getString("txtComplexTable").substr(0) + "\"",
					"var txtList = \"" + str.getString("txtList").substr(0) + "\"",
					"var txtListNested = \"" + str.getString("txtListNested").substr(0) + "\"",
					"var txtLinkFile = \"" + str.getString("txtLinkFile").substr(0) + "\"",
					"var txtPDF1 = \"" + str.getString("txtPDF1").substr(0) + " \"", 
					"var txtPDF2 = \"" + str.getString("txtPDF2").substr(0) + "\"",
					"var txtLinkDescription = \"" + str.getString("txtLinkDescription").substr(0) + "\"",
					"var txtVideo = \"" + str.getString("txtVideo").substr(0) + "\"",
					"var txtAudio = \"" + str.getString("txtAudio").substr(0) + "\""
				];
				
				for (var i = 0; i < propStringArray.length; i++) {
					var propAdd = content.document.createElement('script');
					propAdd.type = 'text/javascript';
					content.document.getElementsByTagName('head')[0].appendChild(propAdd);
					var propText = content.document.createTextNode(propStringArray[i]);
					propAdd.appendChild(propText);
				}	
				 
	},
	    	
	//Fügt den result-header und den result-footer des CAC innerhalb eines <div>-Tags in die aufgerufene Webseite ein.
	result: function injectResult() {
				var body = content.document.getElementsByTagName('body')[0];
				var header = content.document.createElement('div');
				header.id = 'pg_result_general';
				body.insertBefore(header, body.firstChild);
				
				var foot = content.document.createElement('div');
				foot.id = "pg_result_footer";
				body.appendChild(foot);

	},
	
	/*
	* Fügt die Javascript- und Css-Dateien in die aufgerufene Webseite ein.
	* Dabei wird wird auf die Unterstützungsfunktionen InjectJs(link) und InjectJs(link) referenziert. 
	*/
	scriptInjection: function injectScripts() {
				injectJs('chrome://contentaccessibilitychecker/content/checkerstrings.js');
				injectJs('chrome://contentaccessibilitychecker/content/jquery-1.7.2.js');
				injectCss('chrome://contentaccessibilitychecker/skin/checker.css');
				injectJs('chrome://contentaccessibilitychecker/content/checker.js');
				injectJs('chrome://contentaccessibilitychecker/content/contentaccessibilitychecker.js'); 
	},

	closeClick: function closePanel () {
				document.getElementById("mainPanel").hidePopup();
	}
};

/*
* Fügt ein EventListener hinzu, welcher überprüft, ob alle Dateien geladen wurden.
* Erst nach vollständigem Laden wird der Code der Scripts ausgeführt.
*/
window.addEventListener("load", function(e) { contentAccessibilityChecker.onLoad(e); }, false);

// Unterstützungsfunktionen von injectStripts(), welche die entsprechden Elemente in der HTML-Datei der geladenen Webseite generiert.
function injectJs(link) {
    var src = content.document.createElement('script');
    src.type = 'text/javascript';
    src.src = link;
    content.document.getElementsByTagName('head')[0].appendChild(src);
}

function injectCss(link) {
    var src = content.document.createElement('link');
    src.type = 'text/css';
    src.rel = 'stylesheet';
    src.href = link;
    content.document.getElementsByTagName('head')[0].appendChild(src);  
}

