$(document).ready(function() {
    $('#submitbtn-amz').on('click', function() {
        var searchTerm = $('#query-amz').val();
        var requestUrl = '/api/products/amazon?query='+ searchTerm;
        $.getJSON(requestUrl, function(data) {
            console.log(data)
            data.forEach(function(item) {
                var productHtml = '';
                var itemId = item.ASIN;
                var itemName = item.ItemAttributes.Title;
                var itemImage =  item.MediumImage.URL;
                var itemPrice;

                if(item.Offers.TotalOffers == '0') {
                    // Because it is unavailable
                    itemPrice = '$0.00';
                } else {
                    itemPrice = item.ItemAttributes.ListPrice.FormattedPrice;                    
                }
                productHtml += `
                    <div class="amazon-product">
                        <img id="img-${itemId}" src="">
                        <p> Name: ${itemName} </p>
                        <p> Price: ${itemPrice} </p> 
                    </div>
                `;
                
                $('#results').append(productHtml);
                $(`#img-${itemId}`).attr('src', itemImage);
            });
        });
    });
});