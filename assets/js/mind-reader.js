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
      

      //Hides loader after success icon appears
    const hideLoader = (loaderEl) => {
      Velocity(loaderEl, 'transition.fadeOut', 1000);
    };

    //hides form after successful submission
    const hideForm = (formEl, iconEl, loaderEl) => {
      Velocity(formEl,'transition.bounceUpOut', 500);
      Velocity(loaderEl, 'transition.fadeIn');
      //Simulate the time it takes to process the form
      const timer = setTimeout( () => {
       Velocity(iconEl, 'transition.bounceDownIn', 500);
      }, 2000);
      hideLoader(loaderEl);
    };

    //Caching reference to elements
    const signButton = document.querySelector('#submit-btn'),
          signForm = document.querySelector('.optionsList'),
          success = document.querySelector('.sign-up__success'),
          loader = document.querySelector('.sign-up__loader');

    //Handler for sign up button
    signButton.addEventListener('click', (e) => {
      e.preventDefault();
      hideForm(signForm, success, loader); 
    });
      
      setTimeout(function(){
                
        var checkedCategories = [];
        Object.values($('.checkbox')).forEach(function(checkboxElement) {
          // console.log(checkboxElement);
          if(checkboxElement.checked) {
            checkedCategories.push($(checkboxElement).val());
          }
        });


        var searchUrl = '/searchs?cats=' + checkedCategories.join('|');

        window.location.href = searchUrl;
      },2800)
  });
});
