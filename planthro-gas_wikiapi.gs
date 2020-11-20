var title="";
var language = "";
//Stores sections in an article
var article = {
  sections:{
  },
  toc: "",
  references:"",
  notes: "",
  catalog: [],
  imageInfo: [],
  title: title
};
var originalArticle = "";

function initWikiFetch(lang, topic){
  language = lang;
  title = topic;
  article.title = topic;
  var api = "https://"+language+".wikipedia.org/w/api.php?action=parse&format=json&prop=sections&page="+title;
  var wikioptions = getWikiRequestOptions();
  var sections = {};
  global.sections = makeWikiRequest(api, wikioptions);
  sections = global.sections;
  sections = sections.parse.sections;
  var section = "";
  
  fetchHtmlAndExtractCitations(language, title);
  
  // get introduction section
  section = getWikiArticleSection(0, title);
  section = extractCitationsAndReplace(section);
  section = detachUnwantedDivFromSection(section);
  article.sections["Introduction"] = section;
  
  //get other sections
  for(var i=0;i<sections.length;i++){
    if(sections[i].number.indexOf(".") == -1){
      section = getWikiArticleSection(sections[i].index, title);
//      console.log(section);
//      Logger.log(sections[i].anchor);
      section = extractCitationsAndReplace(section);
      section = detachUnwantedDivFromSection(section);
      article.sections[sections[i].anchor] = section;
    }
  }
  // Fetch references and TOC from the wiki article.
  getReferencesAndTOCAndImageInfo(title);
  return article;
}

function getWikiArticleSection(section, title){
  var api = "https://"+language+".wikipedia.org/w/api.php?action=parse&format=json&prop=text&section="+section+"&page="+title;
  var wikioptions = getWikiRequestOptions();
  var section = makeWikiRequest(api, wikioptions);
  section = JSON.parse(JSON.stringify(section));
  section = section.parse.text.*;
  return section;
}

function detachUnwantedDivFromSection(section, parsed){
  var html = "";
  if(parsed){
    html = section;
  }
  else{
    var sectionXML = XmlService.parse(section);
    html = sectionXML.getRootElement();
  }
  // Some sections include TOC in results of the api. Remove TOC div if present.
  var toc = getElementsByClassName(html, 'toc');
  if(toc && toc[0]){
    toc[0].detach();
  }
  // In api's results references related to the section are by default included. Remove them by detaching them from the root element.
  var references = getElementsByClassName(html, 'mw-references-wrap');
  if(references && references[0]){
    references[0].detach();
  }
  // Detach the Heading text as we will add it on the accordion for the section.
  var heading = getElementsByTagName(html, 'h2');
  if(heading && heading[0]){
    heading[0].detach();
  }
  
  // Detach infobox in the last section
  var infobox = getElementsByClassName(html, "infobox");
  if(infobox && infobox.length){
    for(var i = 0; i < infobox.length; i++){
      infobox[i].detach();
    }
  }
  
  // Detach navbox(catalog tables) in the last section
  var navbox = getElementsByClassName(html, "navbox");
  if(navbox && navbox.length){
    for(var i = 0; i < navbox.length; i++){
      navbox[i].detach();
    }
  }
  
  // Detach sistersitebox(external links) in the last section
  var sistersitebox = getElementsByClassName(html, "sistersitebox");
  if(sistersitebox && sistersitebox.length){
    for(var i = 0; i < sistersitebox.length; i++){
      sistersitebox[i].detach();
    }
  }
  
  // Detach more citation section(box-More_citations_needed) in introduction section
  var more_citation = getElementsByClassName(html, "box-More_citations_needed");
  if(more_citation && more_citation.length){
    for(var i = 0; i < more_citation.length; i++){
      more_citation[i].detach();
    }
  }
  
  //Detach Part of Science vertical navbox(vertical-navbox) section from introduction
  var vertical_navbox = getElementsByClassName(html, "vertical-navbox");
  if(vertical_navbox && vertical_navbox.length){
    for(var i = 0; i < vertical_navbox.length; i++){
      vertical_navbox[i].detach();
    }
  }
  
  //Detach book table metadata box(mbox-small) from sections
  var mbox_small = getElementsByClassName(html, "mbox-small");
  if(mbox_small && mbox_small.length){
    for(var i = 0; i < mbox_small.length; i++){
      mbox_small[i].detach();
    }
  }
  
  //Detach book table metadata box(mbox-small) from sections
  var ambox = getElementsByClassName(html, "ambox");
  if(ambox && ambox.length){
    for(var i = 0; i < ambox.length; i++){
      ambox[i].detach();
    }
  }

  //Detach book table metadata box(mbox-small) from sections
  var plainlist = getElementsByClassName(html, "plainlist");
  if(plainlist && plainlist.length){
    for(var i = 0; i < plainlist.length; i++){
      plainlist[i].detach();
    }
  }
  
  // Detach wikimedia commons text in external section and in general
  var medialinks = getElementsByClassName(html, "noviewer");
  var detach_elem = "";
  if(medialinks && medialinks.length){
    for(var i = 0; i < medialinks.length; i++){
      detach_elem = medialinks[i].asElement();
      detach_elem = detach_elem.getParentElement();
      if(detach_elem.getName() != "a"){
        continue;
      }
      if(detach_elem != null && detach_elem.getAttribute('href').getValue().indexOf("Commons-logo.svg") != -1) {
        detach_elem = detach_elem.getParentElement();
        if(detach_elem.getName() == "li"){
          detach_elem.detach();
        }
      }
    }
  }
  
  // Use the remaining elements as the section html
//  Logger.log(XmlService.getRawFormat().format(html));
  return XmlService.getRawFormat().format(html);
}

function getReferencesAndTOCAndImageInfo(title){
  var api = "https://"+language+".wikipedia.org/w/api.php?action=parse&format=json&prop=text&page="+title;
  var wikioptions = getWikiRequestOptions();
  var articleHtml = makeWikiRequest(api, wikioptions);
  var section = articleHtml.parse.text.*;
  var sectionXML = XmlService.parse(section);
  var html = sectionXML.getRootElement();
  var htmlcopy = sectionXML.getRootElement();
  //Extract TOC from the html received in api
  var toc = getElementsByClassName(html, 'toc');
  if(toc && toc[0]){
    var list = getElementsByTagName(toc[0], 'ul');
    if(list && list[0]){
      article.toc = XmlService.getRawFormat().format(list[0]);
    }
  }
  //Extract References and Notes from the html received in api. References and notes are not completely available in the api.
  var references = getElementsByClassName(html, 'reflist');
  var hasNotes = false, hasRefs = false;
  hasNotes = article.toc.indexOf("#Notes")==-1 ? false : true;
  hasRefs = article.toc.indexOf("#References")==-1 ? false : true;
  if(references && references.length){
    if(hasNotes && hasRefs){
      if(references[0]){
        article.notes = XmlService.getRawFormat().format(references[0]);
      }
      if(references[1]){
        article.references = XmlService.getRawFormat().format(references[1]);
      }
    }
    else if(hasNotes && !hasRefs){
      article.notes = XmlService.getRawFormat().format(references[0]);
    }
    else{
      article.references = XmlService.getRawFormat().format(references[0]);
    }
  }
  
  // Get all the cite links for replacing it later.
//  extractCiteLinks(htmlcopy);
  
  // Extract catalog tables from the last section of the article.
  extractCatalogTables(html);
  extractImagesAndInfo(html);
}

function extractCitationsAndReplace(html){
//  html = XmlService.getRawFormat().format(html);
//  Logger.log(html);
  var sup_regx = /<\s*sup[^>]*>(.*?)<\s*\/\s*sup>/g;
//  var match = sup_regx.exec(html);
  var citelinks = html.match(sup_regx);
  var matches = [];
  if(citelinks==null){
    return html;
  }
  for(var i = 0; i < citelinks.length; i++){
//    Logger.log(citelinks[i]);
    if(citelinks[i].indexOf("<b>")==-1 && citelinks[i].indexOf("<a")!=-1 && citelinks[i].indexOf("Wikipedia:")==-1 
    && citelinks[i].indexOf("noprint")==-1){
        matches.push(citelinks[i]);
//        Logger.log(citelinks[i]);
//        Logger.log(citations_from_html_copy[matches.length-1]);
    }
  }
//  var sub_citations_list = citations_from_html_copy.splice(0, matches.length-1);
//  Logger.log("Lengths: " +matches.length);
  for(var i = 0; i < matches.length; i++){
    html = html.replace(matches[i], citations_from_html_copy[i]);
  }
  citations_from_html_copy.splice(0, matches.length);
//  Logger.log("Reduced Citations Lengths: " +citations_from_html_copy.length);
//  Logger.log(html);
  return html;
}

function extractCiteLinks(html){
  var references = getElementsByClassName(html, 'reflist');
  if(references && references[0]){
    for(var i = 0; i < references.length; i++){
      references[i].detach();
//      Logger.log("Detached: "+i);
    }
  }
  
//  var citelinks = getElementsByClassName(html, 'reference');
//  var citelinktext = "";
//
//  if(citelinks && citelinks.length){
//  
////    Logger.log("Wiki Citelinks: ");
//    for(var i = 0; i < citelinks.length; i++){
//      if(citelinks[i].getName() == "sup"){
//        citelinktext = XmlService.getRawFormat().format(citelinks[i]);
//        if(citelinktext.indexOf("<a")!=-1 && citelinktext.indexOf("Wikipedia:")==-1){
//          global.citelinks.push(citelinktext);
////          Logger.log(citelinktext);
//        }
//      }
//    }
    
    var rawhtml = XmlService.getRawFormat().format(html);
    var sup_regx = /<\s*sup[^>]*>(.*?)<\s*\/\s*sup>/g;
    var match = sup_regx.exec(rawhtml);
    var count = 0;
    var citelinks = rawhtml.match(sup_regx);
    for(var i = 0; i < citelinks.length; i++){
      if(citelinks[i].indexOf("sup")!=-1){
        if(citelinks[i].indexOf("<a")!=-1 && citelinks[i].indexOf("Wikipedia:")==-1){
          global.citelinks.push(citelinks[i]);
        }
      }
    }
    
    global.citelinks_copy = global.citelinks.slice();
//    console.log(global.citelinks_copy);
    // Logger.log(global.citelinks[0] + " , " + global.citelinks[10]);
//  }
//  Logger.log("global.citelinks.length: "+global.citelinks.length);
}

function extractCatalogTables(html){
  var catalogContainers = getImmediateChildrenByClass(html, 'navbox');
  var catalog = "";
  var cat_title = "";
  if(catalogContainers && catalogContainers.length){
    var table = {};
    for(var i in catalogContainers){
      catalog = getElementsByTagName(catalogContainers[i], "table");
      if(catalog && catalog.length){
        table = {"table": XmlService.getRawFormat().format(catalog[0]), "title": ""};
        cat_title = getElementsByClassName(catalog[0], "navbox-title");
        if(cat_title && cat_title[0]){
          cat_title = cat_title[0];
          cat_title = cat_title.getAllContent();
          table.title = cat_title[cat_title.length-1].getValue();
          article.catalog.push(table);
        }
      }
    }
  }
}

function extractImagesAndInfo(html){
  var imagehtml = detachUnwantedDivFromSection(html, true);
  imagehtml =  XmlService.parse(imagehtml);
  imagehtml = imagehtml.getRootElement();
  var imagelinks = getElementsByClassName(imagehtml, 'image');
  var image = "";
  var parent = "";
  var href = "";
  var filename = "";
  var wikioptions = getWikiRequestOptions();
  var imageData = "";
  var imageInfo = {};
  var title = "";
  var classes = "";
  for(var i=0; i<imagelinks.length; i++){
    var image = getElementsByTagName(imagelinks[i], 'img')[0];
    classes = image.getAttribute('class');
    if(classes != null){
      classes=classes.getValue()
    }
    else{
      classes = "";
    }
    if(classes.indexOf("noviewer")!=-1){
      continue;
    }
    title = image.getAttribute('alt').getValue();
    if(title.length==0){
      parent = image.getParentElement();
      parent = parent.getParentElement();
      title = getElementsByClassName(parent, 'thumbcaption');
      if(title && title[0]){
        title = XmlService.getRawFormat().format(title[0]);
      }
    }
    // get alt of the a tag if available. If not, get parent element and find class thumbcaption and get the inner content
    parent = image.getParentElement();
    href = parent.getAttribute('href').getValue();
    href = href.split(":");
    href = href[href.length-1];
    filename = href;
    href = "https://"+language+".wikipedia.org/w/api.php?action=query&format=json&prop=imageinfo&titles=File:&iiprop=timestamp|url|size|mime|mediatype|extmetadata|canonicaltitle&iiextmetadatafilter=DateTime|DateTimeOriginal|ObjectName|ImageDescription|License|LicenseShortName|UsageTerms|LicenseUrl|Credit|Artist|AuthorCount|GPSLatitude|GPSLongitude|Permission|Attribution|AttributionRequired|NonFree|Restrictions|DeletionReason&iiextmetadatalanguage=en&uselang=content&smaxage=300&maxage=300";
    href = encodeURI(href);
    href = href.split("File:");
    href = href.join("File:"+filename);
    wikioptions['escaping'] = false;
    imageData = makeWikiRequest(href, wikioptions);
    imageInfo = extractImageInfo(imageData, i);
    imageInfo.imageTitle = title;
    article.imageInfo.push(imageInfo);
  }
}

function extractImageInfo(imageData, i){
  var classes = "";
  var pageKeys = Object.keys(imageData.query.pages);
  var imageInfo = imageData.query.pages[pageKeys[0]].imageinfo[0];
  var imageTag = '<img crossorigin="anonymous" data-wikiimage="image'+article.imageInfo.length+'" src="'+imageInfo.url+'" class="mw-mmv-final-image" />';
  var imageArtist = imageInfo.extmetadata.Artist ? imageInfo.extmetadata.Artist.value : "";
  var imageCredit = imageInfo.extmetadata.Credit ? imageInfo.extmetadata.Credit.value : "";
  var imageDesc = imageInfo.extmetadata.ImageDescription ? imageInfo.extmetadata.ImageDescription.value : "";
  var imagePermission = "";
  if(imageInfo.extmetadata.Permission){
    imagePermission = imageInfo.extmetadata.Permission.value;
  }
  var imageCreatedDate = "";
  if(imageInfo.extmetadata.DateTimeOriginal){
    imageCreatedDate = imageInfo.extmetadata.DateTimeOriginal.value;
  }
  var imageLicenseShortName = "";
  if(imageInfo.extmetadata.LicenseShortName){
    imageLicenseShortName = imageInfo.extmetadata.LicenseShortName.value;
  }
  var imageFileName = imageInfo.canonicaltitle;
  var imageLat = "";
  if(imageInfo.extmetadata.GPSLatitude) {
    imageLat = convertDecDeg(imageInfo.extmetadata.GPSLatitude.value);
  }
  var imageLong = "";
  if(imageInfo.extmetadata.GPSLongitude){
    imageLong = convertDecDeg(imageInfo.extmetadata.GPSLongitude.value);
  }
  var imageLatLong = "";
  if(imageLat){
    imageLatLong = imageLat.deg+"&deg;"+imageLat.min+"'"+imageLat.sec+"\","+imageLong.deg+"&deg;"+imageLong.min+"'"+imageLong.sec;
  }
  var imageMetadataLinks = getImageMetadataLinksTogether(imageCreatedDate, imageLicenseShortName, imageFileName, imageLatLong); //merge all the metadata links as string as in the image gallery
  if(!imagePermission){
    imagePermission = "";
  }
  return {imageTag: imageTag, imageTitle: "", imageArtist: imageArtist, imageCredit: imageCredit, imageDesc: imageDesc, imagePermission: imagePermission, imageMetadataLinks: imageMetadataLinks};
}

function getImageMetadataLinksTogether(createdDate, license, filename, imageLatLong){
  var list = '<ul class="mw-mmv-image-links">';
  list+= '<li class="mw-mmv-license-li pd-license"> '+ license +' </li>';
  list+='<li class="mw-mmv-filename-li"><span class="mw-mmv-filename-prefix">File:</span><span class="mw-mmv-filename"> '+ filename + ' </span></li>';
  if(createdDate){
    list+='<li class="mw-mmv-datetime-li"><span class="mw-mmv-datetime">Created: '+ getHumaReadableDate(createdDate) +' </span></li>';
  }
  if(imageLatLong){
    list+='<li class="mw-mmv-location-li">Location: '+ imageLatLong +'</li>';
  }
  list+='</ul>';
  return list;
}

function makeWikiRequest(api, options){
  var response = UrlFetchApp.fetch(api, options).getContentText();
  var sections = JSON.parse(response);
  return sections;
}

function makeWikiHtmlRequest(api, options){
  var response = UrlFetchApp.fetch(api, options).getContentText();
  var resposeXML = XmlService.parse(response);
  var html = resposeXML.getRootElement();
  return html;
}