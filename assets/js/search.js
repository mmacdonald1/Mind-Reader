function fetchAndDisplay(url, display) {
  $.getJSON(url, function(response) {
    var searchedFor = response.query
    var numberOfResults = response.numItems
    var products = response.items;
//    var resultHeader = `<h3> ${numberOfResults} results found for ${searchedFor} </h3>`;
    console.log(display);
//    var resultMessage = !display ? resultHeader : '';
//    console.log(resultMessage);
    var displayIn = display || '#results';
    $(displayIn).empty();
    $('.tab-contents').empty();
//    $(displayIn).append(resultMessage);
    products.forEach(function(product) {
      var productHTML = '';
      var productId = product.itemId;
      var productName = product.name;
      var productPrice = product.salePrice || "0.00";
      var productImage = product.mediumImage;
      var productRatingImage = product.customerRatingImage || 'not rated';
//<img class="rating-image" id="rimg-${productId}" src=''>
      productHTML += `
        <div class="product well-md" style="float:left;">
        <img id='img-${productId}' scr=''>
        <div class="product-info">
        <h5> ${productName} </h5>
        </div>
        <h6> Price: $${productPrice} </h6>
        </div>
      `;
      $(displayIn).append(productHTML);

      $(`#img-${productId}`).attr("src", productImage);
      $(`#rimg-${productId}`).attr("src", productRatingImage);
      $(`#img-${productId}`).attr("width", '150px');
      $(`#img-${productId}`).attr("height", '150px');
    });
  });
}
function makeTabs(categories) {
  if(categories){
    categories.forEach(function(category) {
    var tabId = category.id;
    var tabName = category.name;
    var searchTerm = 'a';
    var requestUrl = `https://shielded-temple-36828.herokuapp.com/api/getproducts?query=${searchTerm}&catId=${tabId}`;
    var tabNav = `
      <a class="nav-item nav-link" id="nav-${tabId}-tab" data-catid="${tabId}" data-toggle="tab" href="#nav-${tabId}" role="tab" aria-controls="nav-${tabId}" aria-selected="false">
        ${tabName}
      </a>`;
    $('#myTab').append(tabNav);
    //console.log(`${tabId} ${tabName}`);
  });

  $('a[data-toggle="tab"]').on('click', function (e) {

    var catID = $(this).data("catid");
    console.log(catID);
    var tabContent = `
      <div class="tab-pane fade show active tab-contents" id="nav-${catID}" role="tabpanel" aria-labelledby="nav-${catID}-tab">
      </div> `;
    $('#results').empty();
    $('#nav-tabContent').html(tabContent);
    // var words = ["men", "baby", "women", "dad", "play"];
    var words = ["a", "e", "i", "o", "u"];
    var randomQuery = words[Math.floor(Math.random() * words.length)];

    var requestUrl = `https://shielded-temple-36828.herokuapp.com/api/getproducts?query=${randomQuery}&catId=${catID}`;

    fetchAndDisplay(requestUrl, `#nav-${catID}`);
});
  }


};

var urlQueryString = document.location.search;
var allCategories;
if(urlQueryString) {
  allCategories = urlQueryString.split('=')[1].split('|').map(function(category) {
    const name = decodeURI(category.split('-')[0]);
    const id = category.split('-')[1];
     return  {
        id,
        name,
      };
  });
}

$(document).ready(function() {

  if(!allCategories || !allCategories[0].id) {
    makeTabs();
  } else {
    makeTabs(allCategories)
  }

  /**
  Page Generation;
  */

  function searchNow() {
    if($('#query').val() != '') {
      var searchTerm = $('#query').val();
      // $('#results').empty();
      var url = `https://shielded-temple-36828.herokuapp.com/api/getproducts?query=${searchTerm}`;
        fetchAndDisplay(url);

    } else {
      alert('Please enter a search term')
    }
  }

  $('#submitbtn').on('click', function(event) {
    searchNow();
  });
  $('#query').on('keyup', function(event) {
    var code = event.keyCode || event.which;
    if(code == 13) {
      searchNow();
    }
  });

});
