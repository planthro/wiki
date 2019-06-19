var PostTemplate = {
  generatePost: function(article){
    var post = '<div class="wikipost">';
    if(article.imageInfo.length){
      post+= article.imageInfo[0].imageTag;// Add image on top to show up on index page, styled as display none. Allows jumpbreak much earlier.
    }
    post+= this.generateIntroductionSection(article.sections["Introduction"]);
    post+= this.generateAllSections(article);
    post+= '</div>';
    //get javascript
    post+= this.getJavascript();
    return post;
  },
  generateAllSections: function(article){
    //generate all sections with accordion
    var sections = article.sections;
    var sectionsTitles = Object.keys(sections);
    var sectionsHtml = '<div class="row"><div class="col-12">';
    var references = article['references'];
    var notes = article['notes'];
    for(var i=1; i<sectionsTitles.length;i++){ // index starts at 1 as 0th key is Introduction
      if(sectionsTitles[i].toLowerCase() === 'references'){
        //        references = XmlService.parse(references);
        sectionsHtml+= this.generateSection('References', references, i);
      }
      else if(sectionsTitles[i].toLowerCase() === "notes"){
        sectionsHtml+= this.generateSection('Notes', notes, i);
      }
      else{
//        sections[sectionsTitles[i]] = extractCiteLinksFromPost(sections[sectionsTitles[i]]);
        
        sectionsHtml+= this.generateSection(sectionsTitles[i], sections[sectionsTitles[i]], i);
        // Extract citations individually from each section
//        extractCiteLinksFromPost(sections[sectionsTitles[i]]);
      }
    }
    
    // Temporarily here for debuggin purposes
//    console.log("Post Citelinks: "+global.filter_citelinks);
    
    sectionsHtml+= '</div></div>';
    //generate popups
    sectionsHtml+= this.generatePopups(article);
    //generate image gallery
    sectionsHtml+= this.generateImageInfo(article.imageInfo);
    return sectionsHtml;
  },
  generateIntroductionSection: function(introSection) {
    var introduction = '<div class="row no-gutters"><div class="col-12"><div class="section" id="Introduction">';
    introduction+= introSection;
    introduction+= '</div></div></div>';
    introduction+= '<!--more-->';// add jump break after introduction section
//    introduction = extractCiteLinksFromPost(introduction);
    return introduction;
  },
  generateSection: function(title, text, index){
    var sectionHtml = '<div class="accordion" id="'+title+'"><div class="card">'+
      '<div aria-controls="collapse'+index+'" class="card-header collapsed" data-target="#collapse'+index+'" data-toggle="collapse"><h5 class="mb-0">';
    title = title.split("_").join(" ");
    sectionHtml+= title;
    sectionHtml+= '</h5></div><div aria-labelledby="'+title+'" class="collapse" id="collapse'+index+'"><div class="card-body">';
    if(title.toLowerCase() === 'references'){
      sectionHtml+= text;
    }
    else{
      sectionHtml+= text;
    }
    sectionHtml+= '</div></div></div></div>';
    console.log("Payload: "+ sectionHtml);
    return sectionHtml;
  },
  generatePopups: function(article){
    var popups = '<div id="popups">';
    //generate toc
    popups+= this.generateTOCPopup(article.toc, article.title);
    //generate Media
    popups+= this.generateMediaPopup("", article.title);
    //generate catalog
    popups+= this.generateCatalogPopup(article.catalog, article.title);
    popups+= '</div>';
    return popups;
  },
  generateTOCPopup: function(toc, articleTitle){
    var tocpopup = '<div class="custom-popup" id="toc-popup"><h2>'+articleTitle.split("_").join(" ")+'</h2><h3>Content</h3><div class="" id="toc">';
    tocpopup+= toc;
    tocpopup+='</div></div>';
    return tocpopup;
  },
  generateMediaPopup: function(media, articleTitle){
    var mediapopup='<div class="custom-popup" id="media-popup"><h2>'+articleTitle.split("_").join(" ")+'</h2><h3>External Media</h3><div class="" id="media">Content here</div></div>';
    return mediapopup;
  },
  generateCatalogPopup: function(catalog, articleTitle){
    var catalogHtml = '<div class="custom-popup" id="catalog-popup"><h2>'+articleTitle.split("_").join(" ")+'</h2><h3>Cataloging</h3><div class="" id="catalog">';
    for(var i=0; i<catalog.length;i++){
      catalogHtml+= '<div class="accordion" id="'+catalog[i].title.split(" ").join("_")+'"><div class="card">'+
        '<div aria-controls="collapse1'+i+'" aria-expanded="false" class="card-header collapsed" data-target="#collapse1'+i+'" data-toggle="collapse">'+
          '<h5 class="mb-0"><a href="/wiki/'+catalog[i].title.split(" ").join("_")+'" style="background: none rgb(204, 204, 255); color: #0b0080; font-family: sans-serif; font-size: 14.0448px; text-align: center; text-decoration-line: none; white-space: nowrap;" title="">'+
            catalog[i].title + '</a></h5></div><div aria-labelledby="heading1'+i+'" class="collapse" id="collapse1'+i+'">'+
              '<div class="card-body">'+ catalog[i].table + '</div></div></div></div>';
    }
    catalogHtml+= '</div></div>';
    return catalogHtml;
  },
  generateImageInfo: function(imageInfo){
    var galleryInfo = '<div id="gallery-info-container">';
    for(var i = 0; i < imageInfo.length; i++){
      galleryInfo+= '<div class="custom-gallery-info" data-wikiimage="image'+i+'" id="gallery-info">';
      galleryInfo+= imageInfo[i].imageTag;
      galleryInfo+= '<div class="row no-gutters info-container"><div class="col-lg-12 title"><div class="mw-mmv-title-para mw-mmv-ttf-container mw-mmv-ttf-normal">';
      galleryInfo+= imageInfo[i].imageTitle;
      galleryInfo+= '</div></div>';
      galleryInfo+= '<div class="col-lg-8 col-xs-12 col-sm-4"><div class="author-links"><div class="mw-mmv-credit mw-mmv-ttf-container mw-mmv-ttf-normal">'+
        '<span class="mw-mmv-source-author" original-title=""><span class="mw-mmv-author">'+
          imageInfo[i].imageArtist+'</span> - ';
      galleryInfo+= '<span class="mw-mmv-source">'+imageInfo[i].imageCredit+'</span></span></div>';
      galleryInfo+= '<div class="mw-mmv-image-desc">'+imageInfo[i].imageDesc+'</div></div>';
      if(imageInfo[i].imagePermission){
        galleryInfo+= '<div class="permission-details"><h6>Permission details</h6><div class="mw-mmv-permission-html">'+imageInfo[i].imagePermission+
          '</div></div>';
      }
      galleryInfo+= '</div>';
      galleryInfo+= '<div class="col-lg-4 col-xs-12 col-sm-4"><div class="side-text"><div class="mw-mmv-image-links-div">'+
        imageInfo[i].imageMetadataLinks+ '</div></div></div></div></div>';
    }
    galleryInfo+= '</div>';
    return galleryInfo;
  },
  getJavascript: function(){
    return '<script type="text/javascript">$("#toc ul li a").on("click",function(e){console.log("Target======"+e.target.getAttribute("href")),window.location.href+=e.target.getAttribute("href");var i=e.target.getAttribute("href");$(i).find(".card-header").trigger("click")}),$(document).ready(function(){var e={closeOnBgClick:!1,closeOnContentClick:!1,items:[],gallery:{enabled:!0},type:"image",callbacks:{}};$("#gallery-info-container .custom-gallery-info img.mw-mmv-final-image").each(function(){var i=$(this).attr("src"),t=$(this).attr("data-wikiimage");e.items.push({src:i,wikiimage:t})}),e.callbacks.imageLoadComplete=function(){var e=$(this)[0].currItem.data.wikiimage;$("body").css("overflow","hidden"),$(".mfp-gallery .mfp-content").css({width:"90%",height:"100%"}),-1==$(".mfp-gallery .mfp-content img.mfp-img").attr("src").indexOf("png")&&-1==$(".mfp-gallery .mfp-content img.mfp-img").attr("src").indexOf("svg")||$(".mfp-gallery .mfp-content img.mfp-img").css({background:"url(https://en.wikipedia.org/w/extensions/MultimediaViewer/resources/mmv/ui/checker.png?bdcf5) repeat"}),$(".mfp-wrap #gallery-info").remove(),$("#gallery-info-container").find("div[data-wikiimage="+e+"]").clone().appendTo(".mfp-wrap"),$(".mfp-wrap #gallery-info").show(),$(".mfp-container").css({position:"fixed","max-height":"86vh"}),$(".mfp-wrap").css({"max-height":"100vh",overflow:"hidden auto"})},e.callbacks.beforeClose=function(){$("body").css("overflow","initial"),$(".mfp-gallery .mfp-content").css({width:"",height:""}),$(".mfp-wrap #gallery-info").remove(),$(".mfp-container").css({position:"absolute","max-height":""}),$(".mfp-wrap").css({"max-height":""})},console.log(e),$("#main .post a.image img, .navbox-image img").each(function(){$(this).hasClass("noviewer")||$(this).magnificPopup(e),console.log("Image initialized.....")}),window.addEventListener("hashchange",function(){window.scrollTo(window.scrollX,window.scrollY-$("#myHeader").height()/2),console.log(window.scrollX+" - "+window.scrollY)}),$("#toc a").on("click",function(){$(".mfp-close").trigger("click");var e=$(this).attr("href");$(e+" .card-header").trigger("click")})});</script>';
  }
}