$(document).ready(function() {
  $.getJSON('/api/categories', function(data) {
    var checkBoxesHTML = '';
    data.forEach(function (category) {
      var checkBox =
              `<div>
                <input type="checkbox" class="options checkbox" name="catId" value="${category.name}-${category.id}">
                <label for="electronics-div">${category.name}</label>
              </div>`;
      checkBoxesHTML += checkBox;
    });

    $('#cat-form').html(checkBoxesHTML);
  });

  $('#submit-btn').on('click', function() {
    var checkedCategories = [];
    Object.values($('.checkbox')).forEach(function(checkboxElement) {
      // console.log(checkboxElement);
      if(checkboxElement.checked) {
        checkedCategories.push($(checkboxElement).val());
      }
    });


    var searchUrl = '/searchs?cats=' + checkedCategories.join('|');

    window.location.href = searchUrl;



  });
});
