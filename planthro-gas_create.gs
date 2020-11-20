function init(){
    if (global.RUN_MODE==="CREATE") {
      createPosts();
    }
    else if (global.RUN_MODE==="UPDATE") {
      updatePosts();
    }
  }
  
  function createPosts(reqType){
      var api = "https://www.googleapis.com/blogger/v3/blogs/"+getBlogId()+"/posts/";
      var payload = "";
      var options = getRequestOptions();
      for(var i = 0; i < global.topics.length; i++){
        try {
          payload = getPostData(global.topics[i].language, global.topics[i].title);
          options.payload = JSON.stringify(payload);
          makeRequest(api, options);
          Utilities.sleep(3000);
        }
        catch(e) {
          Logger.log(e.stack);
        }
      }
  }
  
  function makeRequest(api, options){
    var response = UrlFetchApp.fetch(api, options);
    var json = JSON.parse(response.getContentText());
    return json;
  }
  
  function getPostData(language, title) {
    article = emptyArticle();
    var wikiData = initWikiFetch(language, title);
    var payload = PostTemplate.generatePost(article);
    payload = fixSelfClosingTags(payload); // Fix for elements that are not self closing, but are being converted to self closing in process.
    payload = replaceHyperlinks(payload); // Replace wiki article hyperlinks with the hyperlinks of articles available on #planthroWIKI
    //payload = fixCommaPeriodSpacing(payload); not required now. used getRawFormat() of XMLService instead.
  //  payload = fixCitationNumbering(payload) // Fix citation numbering
  
    var postdata = {
      "title": wikiData.title.split("_").join(" "),
      "content": payload
    };
    return postdata;
  }
  