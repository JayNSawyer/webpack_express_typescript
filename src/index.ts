import * as _ from "lodash";
import * as $ from "jquery";

function component() {
    var element = document.createElement('div');
  
    // Lodash, currently included via a script, is required for this line to work
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  
    return element;
}
  
document.body.appendChild(component());

$(function(){

  $.get('./articles', appendToList);

  $('form').on('submit', function(event) {
    event.preventDefault();
    var form = $(this);
    var articleData = form.serialize();

    $.ajax({
      type: 'POST', url: '/articles', data: articleData
    }).done(function(article){
      appendToList([article]);
      form.trigger('reset');
    });
  });

  function appendToList(articles) {
    var list = [];

    articles.forEach((article) => {
      list.push($('<li>', { html: article.name }));
    })

    $('.article-list').append(list);
  }
  
});

 
