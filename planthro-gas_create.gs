function init(){
  Logger.log("Setting auth values....");
  setAuthValues();
  createPost();
}

//running this function creates the post
function createPost(reqType){
  if(isAllowed()){
    var api = "https://www.googleapis.com/blogger/v3/blogs/"+PropertiesService.getScriptProperties().getProperty('BLOG_Id')+"/posts/";
    var options = getRequestOptions();
    for(var i = 0; i < global.topics.length; i++){
      options = addPostData(options, global.topics[i].language, global.topics[i].title);
      makeRequest(api, options);
      Utilities.sleep(3000);
    }
  }
}

//function canIRun() {
//  Logger.log('do nothing');
//}

function isAllowed(){
  var service = getService();
  if(!service.hasAccess()){
    var authorizationUrl = service.getAuthorizationUrl();
    Logger.log('Open the following URL and re-run the script: %s',
               authorizationUrl);
    return false;
  }
  else{
    return true; 
  }
}

function makeRequest(api, options){
  var response = UrlFetchApp.fetch(api, options);
  var json = JSON.parse(response.getContentText());
  //  Logger.log(JSON.stringify(json));
  //for (var i in json.items) {
  //  Logger.log("[%s] %s %s", json.items[i].id, json.items[i].name, json.items[i].url); 
  //}
}

function addPostData(options, language, title) {
  //    var api = "https://www.googleapis.com/blogger/v3/blogs/3016253585513797144/posts/5336309963323421833";
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
  }
  options["payload"] = JSON.stringify(postdata);
  return options;
}
