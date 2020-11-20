var headers = {
    "Authorization": "Bearer " + ScriptApp.getOAuthToken()
  };
  
  var options = {
    "headers": headers,
    "method" : "POST",
    "muteHttpExceptions": true,
    "payload": "",
    'contentType': 'application/json',
  };
  var options_get = {
    "headers": headers,
    "method" : "GET",
    "muteHttpExceptions": true,
    'contentType': 'application/json',
  };
  var wikioptions = {
    "method" : "GET",
    "muteHttpExceptions": true,
    'contentType': 'application/json',
  };
  
  var wikioptionshtml = {
    "method" : "GET",
    "muteHttpExceptions": true,
    'contentType': 'text/html',
  };
  
  function getRequestOptions(){
    return options;
  }
  
  function getGETRequestOptions(){
    return options_get;
  }
  function getWikiRequestOptions(){
    return wikioptions;
  }
  
  function getWikiHtmlRequestOptions(){
    return wikioptionshtml;
  }
  
  function logout() {
    var service = getService();
    service.reset();
  }
  
  // XML parsing functions
  function getElementById(element, idToFind) {
    var descendants = element.getDescendants();  
    for(i in descendants) {
      var elt = descendants[i].asElement();
      if( elt !=null) {
        var id = elt.getAttribute('id');
        if( id !=null && id.getValue()== idToFind) {
          return elt;
        }
      }
    }
  }
  
  function getElementsByClassName(element, classToFind) {
    var data = [];
    var descendants = element.getDescendants();
    descendants.push(element);  
    for(i in descendants) {
      var elt = descendants[i].asElement();
      if(elt != null) {
        var classes = elt.getAttribute('class');
        if(classes != null) {
          classes = classes.getValue();
          if(classes == classToFind) data.push(elt);
          else {
            classes = classes.split(' ');
            for(j in classes) {
              if(classes[j] == classToFind) {
                data.push(elt);
                break;
              }
            }
          }
        }
      }
    }
    return data;
  }
  
  function getImmediateChildrenByClass(element, classToFind){
    var data = [];
    var imm_nodes = element.getAllContent();
    for(i in imm_nodes){
      var elt = imm_nodes[i].asElement();
      if(elt != null) {
        var classes = elt.getAttribute('class');
        if(classes != null) {
          classes = classes.getValue();
          if(classes == classToFind) data.push(elt);
          else {
            classes = classes.split(' ');
            for(j in classes) {
              if(classes[j] == classToFind) {
                data.push(elt);
                break;
              }
            }
          }
        }
      }
    }
    return data;
  }
  
  function getElementsByTagName(element, tagName) {  
    var data = [];
    var descendants = element.getDescendants();  
    for(i in descendants) {
      var elt = descendants[i].asElement();     
      if( elt !=null && elt.getName()== tagName) data.push(elt);      
    }
    return data;
  }
  
  function convertDecDeg(inDecDeg){
    var deg = 0, min, sec;
    deg = inDecDeg;
    var gpsdeg = parseInt(deg);
    var remainder = deg - (gpsdeg * 1.0);
    var gpsmin = remainder * 60.0;
    deg = gpsdeg;
    min= parseInt(gpsmin);
    var remainder2 = gpsmin - (parseInt(gpsmin)*1.0);
    sec = parseInt(remainder2*60.0);
    return {deg: deg, min: min, sec: sec};
  }
  
  function getHumaReadableDate(dateData){
    var dateStr = dateData.split(" ");
    var dateObject = new Date(Date.parse(dateStr[0]));
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var dateReadable = dateObject.getDate() + " " + months[dateObject.getMonth()] + " " + dateObject.getFullYear();
    return dateReadable;
  }
  
  function fixSelfClosingTags(html){
    var selfclosingregex = /<[^>]+?\/[]*>/g;
    var tagregex = /<([^\s>]+)(\s|>)+/;
    var match = selfclosingregex.exec(html);
    var matchuse = "";
    var selfclosing = ["area" ,"base" ,"br" , "col", "embed", "hr", "img", "input", "link","meta", "param", "source", "track", "wbr"];
    while(match){
      var tag = tagregex.exec(match.toString())[0].toString().trim().replace("<", "");
      if(selfclosing.indexOf(tag) == -1){
        matchuse = match.toString().replace("/>", "></"+tag+">");
        html = html.replace(match.toString(), matchuse);
      }
      match = selfclosingregex.exec(html);
    };
    return html;
  }
  
  function replaceHyperlinks(html){
    var links = [];
    var href = "";
    var hrefs = [];
    var i = 0, j = 0;
    for(i = 0; i < global.links.length; i++){
      html = html.replace(new RegExp("\""+global.links[i].link+"\"", 'g'), "\""+global.links[i].replacement+"\"");
      links.push(global.links[i].replacement);
    }
    
    // Get all the hyperlinks in the article and create a list of them
    var hrefRegex = /href\s*=\s*(['"])(.+?)\1/ig;
    var hyperlinks = html.match(hrefRegex);
    for(i = 0;i < hyperlinks.length; i++){
      href = hyperlinks[i].replace('href=','').trim();
      //hrefs.indexOf(href)==-1 &&  - removed condition which ensured uniqueness of link
      if(href.indexOf('planthro')==-1 && (href.indexOf('wikipedia')!=-1 || href.indexOf('/wiki')!=-1)){
        hrefs.push(href);
      }
    }
    
    // Replace the hrefs in hyperlinks with javascript:void(0) to remove the links for those which do not exist on #planthroWIKI
    for(i = 0;i < hrefs.length; i++){
        if(hrefs[i].indexOf("(")!=-1){
          html = html.replace(hrefs[i], '"javascript:void(0)"');
        }
        else{
          html = html.replace(new RegExp(hrefs[i]), '"javascript:void(0)"');
        }
    }
    return html;
  }
  
  function fixCitationNumbering(html){
  //  Replace these citelinks with the article.citelinks serially.
    if(global.citelinks.length == global.filter_citelinks.length){
      for(var i = 0; i < global.citelinks.length; i++){
  //      Logger.log(global.filter_citelinks[i]+ " ---- " + global.citelinks[i]);
        html = html.replace(global.filter_citelinks[i], global.citelinks[i]);
      }
    }
    else{
  //    Logger.log("Citations array lengths are unequal on wiki and post.\n" + "Wiki count: "+global.citelinks.length+", Post count:"+ global.filter_citelinks.length);
    }
  //  console.log(html);
    return html;
  }
  
  //function extractCiteLinksFromPost(html){
  //  var sup_regx = /<\s*sup[^>]*>(.*?)<\s*\/\s*sup>/g;
  ////  var citeNumRegex = /\[[0-9]*\]/g;
  //  var citelinks = html.match(sup_regx);
  //  var filter_citelinks = [];
  //  if(citelinks && citelinks.length){
  //    for(var i = 0; i < citelinks.length; i++){
  //      if(citelinks[i].indexOf("<a")!=-1 && citelinks[i].indexOf("Wikipedia:Citation")==-1){
  //        global.filter_citelinks.push(citelinks[i]);
  ////        Logger.log(citelinks[i]);
  //      }
  //    }
  //  }
  //// Logger.log("Wiki citelinks count: "+global.citelinks.length+", post citelinks count:"+ global.filter_citelinks.length);
  //}
  
  function extractCiteLinksFromPost(html){
    var sup_regx = /<\s*sup[^>]*>(.*?)<\s*\/\s*sup>/g;
    var match = sup_regx.exec(html);
    var count = 0;
    var citelinks = html.match(sup_regx);
    var filteredLinks = [];
    if(citelinks && citelinks.length){
  //    Logger.log("citelinks: "+ citelinks.length);
      for(var i = 0; i < citelinks.length; i++){
        if(citelinks[i].indexOf("<a")!=-1 && citelinks[i].indexOf("Wikipedia:")==-1){
  //      if(citelinks[i].indexOf("reference")!=-1){
          filteredLinks.push(citelinks[i]);
  //      }
        }
      }
  //    console.log(filteredLinks);
  //    Logger.log("filteredLinks: "+ filteredLinks.length);
      var filterLength = filteredLinks.length;
      var reduced_citelinks = global.citelinks_copy.slice(0, filteredLinks.length+1);
      for(var i = 0; i < filteredLinks.length; i++){
        if(filteredLinks[i]){
          html = html.replace(filteredLinks[i], reduced_citelinks[i]);
    //      Logger.log(filteredLinks[i] +"--->"+ reduced_citelinks[i]);
          count++;
        }
        else{
          Logger.log("A blank......");
        }
      }
      global.citelinks_copy.splice(0, filterLength);
  //    Logger.log("global.citelinks_copy: "+global.citelinks_copy.length);
    }
  //  Logger.log("Count replaced: "+ count);
    return html;
  }
  
  var citations_from_html = [];
  var citations_from_html_copy = [];
  function fetchHtmlAndExtractCitations(language, title){
    var api = "https://"+language+".wikipedia.org/wiki/"+title;
    var html = UrlFetchApp.fetch(api, getWikiHtmlRequestOptions());
    html = html.getContentText();
    var sup_regx = /<\s*sup[^>]*>(.*?)<\s*\/\s*sup>/g;
  //  var match = sup_regx.exec(html);
    var citelinks = html.match(sup_regx);
    var filtered = [];
    if(citelinks && citelinks.length){
      for(var i=0; i < citelinks.length; i++){
        if(citelinks[i].indexOf("<b>")==-1 && citelinks[i].indexOf("<a")!=-1 && citelinks[i].indexOf("Wikipedia:")==-1 
        && citelinks[i].indexOf("noprint")==-1){
          citations_from_html.push(citelinks[i].replace('class="reference"', 'class="reference planthro-ref"'));
        }
      }
      console.log(citations_from_html);
  //    Logger.log("Count: "+citations_from_html.length);
      citations_from_html_copy = citations_from_html.slice(0);
    }
  //  citations_from_html
  }
  
  function emptyArticle(){
    return {
      sections:{
      },
      toc: "",
      references:"",
      catalog: [],
      imageInfo: [],
      title: title
  };
  }
  