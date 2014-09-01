// Global variables
var resultList = [];
var resultListSorted = [];
var resultCounter = 0;
var itemNr = 0;

// Params
var wlDiag = [ 
'Diagramm', 'Organigramm', 'Lageplan', 'Stadtplan', 'Wegbeschreibung', 'Stadtkarte', 'Programmablaufplan', 
'Punktediagramm', 'Blasendiagramm', 'Liniendiagramm', 'Balkendiagramm', 'Kreisdiagramm', 'Tortendiagramm',
'Kuchendiagramm', 'Ringdiagramm', 'Netzdiagramm', 'Zeigerdiagramm', 'Smith-Diagramm', 'Gantt-Diagramm',
'Pareto-Diagramm', 'Dreiecksdiagramm', 'Kurvenschar', '3D Diagramm', 'diagram', 'organigram', 'site plan', 'city plan', 'site map', 'city map', 'plan of site', 'location plan', 
'location map', 'directions', 'flowchart', 'scatter plot', 'heatmap', 'tree diagram', 'network diagram', 
'Venn diagram', 'existential graph', 'histogram', 'bar chart', 'pie chart', 'function graph', 'train diagram',
'exploded view', 'population density map', 'Pioneer plaque', 'Three-dimensional diagram',
 ];


var specialCharacters = 	'[?¤§¨®©¬¯™ª±µ´·ºº¢·¶??????]';
var filetypes = 		'(.doc|.pdf|.xls|.xlsx|.doc|.docx|.ppt|.pps|.pptx|.ppsx|.mov|.mpg|.mpeg|.xvid|.avi|.flv|.swf|.mp3|.ogg|.wav|.aac|.lame)';
var videotypes = 		'(.swf|.flv)';
var embedVideo = 		'(.mpeg|.mpg|.xvid|.avi|.flv|youtube|.swf|.mov)';
var audiotypes = 		'(.mp3|.ogg|.wav|.aac|.lame)';
var excludedAbbreviations = 	'CHF,EUR,USD,GBP,CAD';
var shortLinks = 		'(hier|Hier|Weiter|weiter|klicken|Klicken|Mehr|mehr|here|Here|Next|next|click|Click|More|more)';

// Hyperlinks
var WCAG11 = 		'<a href="http://www.w3.org/TR/UNDERSTANDING-WCAG20/text-equiv.html"> (WCAG 2.0 1.1) </a>';
var WCAG12 = 		'<a href="http://www.w3.org/TR/UNDERSTANDING-WCAG20/media-equiv.html"> (WCAG 2.0 1.2) </a>';
var WCAG13 = 		'<a href="http://www.w3.org/TR/UNDERSTANDING-WCAG20/content-structure-separation.html"> (WCAG 2.0 1.3) </a>';
var WCAG14 = 		'<a href="http://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast.html"> (WCAG 2.0 1.4) </a>';
var WCAG21 = 		'<a href="http://www.w3.org/TR/UNDERSTANDING-WCAG20/keyboard-operation.html"> (WCAG 2.0 2.1) </a>';
var WCAG22 = 		'<a href="http://www.w3.org/TR/UNDERSTANDING-WCAG20/time-limits.html"> (WCAG 2.0 2.2) </a>';
var WCAG23 = 		'<a href="http://www.w3.org/TR/UNDERSTANDING-WCAG20/seizure.html"> (WCAG 2.0 2.3) </a>';
var WCAG24 = 		'<a href="http://www.w3.org/TR/UNDERSTANDING-WCAG20/navigation-mechanisms.html"> (WCAG 2.0 2.4) </a>';
var WCAG31 = 		'<a href="http://www.w3.org/TR/UNDERSTANDING-WCAG20/meaning.html"> (WCAG 2.0 3.1) </a>';
var WCAG32 = 		'<a href="http://www.w3.org/TR/UNDERSTANDING-WCAG20/consistent-behavior.html"> (WCAG 2.0 3.2) </a>';
var WCAG33 = 		'<a href="http://www.w3.org/TR/UNDERSTANDING-WCAG20/minimize-error.html"> (WCAG 2.0 3.3) </a>';
var WCAG41 = 		'<a href="http://www.w3.org/TR/UNDERSTANDING-WCAG20/ensure-compat.html"> (WCAG 2.0 4.1) </a>';

var PDFChecker = 	'<a href="http://www.access-for-all.ch/en/pdf-lab/pdf-accessibility-checker-pac.html">PDF Accessibility Checker PAC</a>';

var TableGuide =	'<a href="http://webaim.org/techniques/tables/data"> Creating Accessible Tables </a>';