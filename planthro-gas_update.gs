function updatePosts(){
    var api = "https://www.googleapis.com/blogger/v3/blogs/"+getBlogId()+"/posts/";
    var options = getRequestOptions();
    options.method = "PUT";
    var request = null;
    var postId = "";
    var response = "";
    var updateReponse = "";
    var payload = "";
    for (var i = 0; i < global.topics.length; i++) {
      postId = "";
      try {
        response = getPostDetails(global.topics[i].title);
        Logger.log("Post Id found..."+response.postId);
        if (response.postId != "") {
          payload = getPostData(global.topics[i].language, global.topics[i].title);
          api += response.postId;
          request = response.requestObj;
          request.content = payload.content;
          options.payload = JSON.stringify(request);
          updateReponse = makeRequest(api, options);
          Logger.log(updateReponse.title + " updated at - " + updateReponse.updated);
          Utilities.sleep(3000);
        }
      }
      catch(e) {
        Logger.log(e.stack);
      }
    }
  }
  
  function getPostDetails(title){
    var response = {
      "requestObj": "",
      "postId": ""
    };
    var mod_title = title.replace(/_/g," "); //.replace(/-/g," ")
    var posts = getMatchingPosts(mod_title);
    // loop through posts, match the title
    for(var i=0; i<posts.items.length;i++){
      if(posts.items[i].kind==="blogger#post" && posts.items[i].title.toLowerCase()===mod_title.toLowerCase()){
        response.requestObj = posts.items[i];
        response.postId = posts.items[i].id;
        break;
      }
    }
    return response;
  }
  
  function getMatchingPosts(title) {
    var api = "https://www.googleapis.com/blogger/v3/blogs/"+getBlogId()+"/posts/search";
    var url = api + "?q=" + title + "&fetchBodies=false";
    var options = getGETRequestOptions();
    var response = UrlFetchApp.fetch(url, options);
    return JSON.parse(response.getContentText());
  }
  