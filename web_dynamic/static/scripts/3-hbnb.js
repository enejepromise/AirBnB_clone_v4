$('document').ready(function () {
  // Check API status
  const url = 'http://0.0.0.0:5001/api/v1/status/';
  $.get(url, function (response) {
    if (response.status === 'OK') {
      $('DIV#api_status').addClass('available');
    } else {
      $('DIV#api_status').removeClass('available');
    }
  }).fail(function (jqXHR) {
  // This will handle network errors or no response issues;
    $('DIV#api_status').removeClass('available');
  });

  // Fetch places
  const placesRoute = 'http://0.0.0.0:5001/api/v1/places_search/';
  $.ajax({
    url: placesRoute,
    type: 'POST',
    data: '{}',
    dataType: 'json',
    contentType: 'application/json',
    success: function (data) {
      $('section.places').append(data.map(place => {
        return `
          <article>
            <div class="title_box">
              <h2>${place.name}</h2>
              <div class="price_by_night">$${place.price_by_night}</div>
            </div>
            <div class="information">
              <div class="max_guest">${place.max_guest} Guest </div>
              <div class="number_rooms">${place.number_rooms} Bedroom </div>
              <div class="number_bathrooms">
                ${place.number_bathrooms} Bathroom
              </div>
            </div>
            <div class="description">${place.description || 'None'}</div>
          </article>
        `;
      }));
    }
  });

  const amenities = {};
  $('INPUT[type="checkbox"]').change(function () {
    if ($(this).is(':checked')) {
      amenities[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete amenities[$(this).attr('data-id')];
    }
    $('.amenities H4').text(Object.values(amenities).join(', '));
  });
});
