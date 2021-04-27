/*
  Please add all Javascript code to this file.
*/
$(function () {
  console.log('loaded');
  const newsApiKey = '14b523f96bc84606a018eae0c1724678';
  const GnewsApiKey = '45ef2b1892db8df815fccc5c91ae02ae';
  const GuardianApiKey = '8a5d6161-2b2c-4867-995c-01e7d6a0e38f'
  let GnewsArticlesArray = [];
  let GuardianArticlesArray = [];
  let newsApiArticlesArray = [];
  let source = '';

  let $mainContainer = $('#main');
  let $popUp = $('#popUp');
  let $newsSourceDropdown = $('li > ul');
  let $closePopUpButton = $('.closePopUp');

  function getNewsApiData() {
    $popUp.removeClass('hidden');
    $mainContainer.empty();
    $.get(
      `https://accesscontrolalloworiginall.herokuapp.com/https://newsapi.org/v2/top-headlines?country=au&apiKey=14b523f96bc84606a018eae0c1724678`
    ).then((response) => {
      newsApiArticlesArray = response.articles;

      $.each(newsApiArticlesArray, function (index) {
        let title = this.title;
        let source = this.source.name;
        let publishedAt = this.publishedAt;
        let imageUrl = this.urlToImage;
        let url = this.url;
        let content = this.content;

        let $newArticle = $(`
          <article data-id=${index} class="article">
            <section class="featuredImage">
              <img src=${
                imageUrl || 'images/article_placeholder_1.jpg'
              } alt="" />
            </section>
            <section class="articleContent">
              <a href='#'>
                <h3>${title}</h3>
              </a>
              <h6>${source}</h6>
            </section>
            <section class="impressions">${publishedAt}</section>
            <div class="clearfix"></div>
          </article>;
        `);

        $newArticle.on('click', showPopUpNewsApi);
        $mainContainer.append($newArticle);
      });

      $popUp.addClass('hidden');
    });
  }

  function showPopUpNewsApi() {
    let index = $(this).attr('data-id');

    let title = newsApiArticlesArray[index].title;
    let url = newsApiArticlesArray[index].url;
    let content = newsApiArticlesArray[index].content;

    console.log(title, url, content);
    $popUpContainerChildren = $('div.container');
    $popUpContainerChildren.html(`
      <h1>${title}</h1>
      <p>${content}.</p>
      <a href=${url} class="popUpAction" target="_blank">Read more from source</a>

    `);

    $popUp.removeClass('loader hidden');
    $closePopUpButton.on('click', function () {
      $popUp.addClass('loader hidden');
    });

    $popUpContainer.children();
  }

  function getGuardianData() {
    $popUp.removeClass('hidden');
    $mainContainer.empty();
    $.get(
      `https://content.guardianapis.com/search?api-key=8a5d6161-2b2c-4867-995c-01e7d6a0e38f&q=Melbourne&format=json&show-fields=starRating,headline,thumbnail,short-url&show-refinements=all&order-by=relevance`
    ).then((response) => {
      GuardianArticlesArray = response.results;

      $.each(GuardianArticlesArray, function (index) {
        let title = this.webtitle;
        let source = this.sectionName;
        let publishedAt = this.webPublicationDate;
        let imageUrl = this.thumbnail;
        let url = this.url;
        let content = this.content;

        let $newArticle = $(`
          <article data-id=${index} class="article">
            <section class="featuredImage">
              <img src=${
                imageUrl || 'images/article_placeholder_1.jpg'
              } alt="" />
            </section>
            <section class="articleContent">
              <a href='#'>
                <h3>${title}</h3>
              </a>
              <h6>${source}</h6>
            </section>
            <section class="impressions">${publishedAt}</section>
            <div class="clearfix"></div>
          </article>;
        `);

        $newArticle.on('click', showPopUpNewsApi);
        $mainContainer.append($newArticle);
      });

      $popUp.addClass('hidden');
    });
  }

  function showPopUpNewsApi() {
    let index = $(this).attr('data-id');

    let title = GuardianArticlesArray[index].title;
    let url = GuardianArticlesArray[index].url;
    let content = GuardianArticlesArray[index].content;

    console.log(title, url, content);
    $popUpContainerChildren = $('div.container');
    $popUpContainerChildren.html(`
      <h1>${title}</h1>
      <p>${content}.</p>
      <a href=${url} class="popUpAction" target="_blank">Read more from source</a>

    `);

    $popUp.removeClass('loader hidden');
    $closePopUpButton.on('click', function () {
      $popUp.addClass('loader hidden');
    });

    $popUpContainer.children();
  }

/*
*/
function getGnewsData() {
  $popUp.removeClass('hidden');
  $mainContainer.empty();
  $.get(
    `https://accesscontrolalloworiginall.herokuapp.com/https://gnews.io/api/v4/search?q=example&token=45ef2b1892db8df815fccc5c91ae02ae&lang=en`
  ).then((response) => {
    GnewsArticlesArray = response.articles;

    $.each(GnewsArticlesArray, function (index) {
      let title = this.title;
      let source = this.source.name;
      let publishedAt = this.publishedAt;
      let imageUrl = this.image;
      let url = this.url;
      let content = this.content;

      let $newArticle = $(`
        <article data-id=${index} class="article">
          <section class="featuredImage">
            <img src=${
              imageUrl || 'images/article_placeholder_1.jpg'
            } alt="" />
          </section>
          <section class="articleContent">
            <a href='#'>
              <h3>${title}</h3>
            </a>
            <h6>${source}</h6>
          </section>
          <section class="impressions">${publishedAt}</section>
          <div class="clearfix"></div>
        </article>;
      `);

      $newArticle.on('click', showPopUpGnews);
      $mainContainer.append($newArticle);
    });

    $popUp.addClass('hidden');
  });
}

function showPopUpGnews() {
  let index = $(this).attr('data-id');

  let title = GnewsArticlesArray[index].title;
  let url = GnewsArticlesArray[index].url;
  let content = GnewsArticlesArray[index].content;

  console.log(title, url, content);
  $popUpContainerChildren = $('div.container');
  $popUpContainerChildren.html(`
    <h1>${title}</h1>
    <p>${content}.</p>
    <a href=${url} class="popUpAction" target="_blank">Read more from source</a>

  `);

  $popUp.removeClass('loader hidden');
  $closePopUpButton.on('click', function () {
    $popUp.addClass('loader hidden');
  });

  $popUpContainer.children();
}

  function createNewsSourceDropdownMenu() {
    $newsSourceDropdown.children().each(function () {
      $(this).on('click', function () {
        source = $(this).children().text();
        switch (source) {
          case 'News API':
            getNewsApiData();
            break;
          case 'Guardian':
            getGuardianData();
            break;
          case 'Gnews':
            getGnewsData();
            break;
          default:
            console.log('error');
        }
      });
    });
  }

  $popUp.removeClass('hidden');
  createNewsSourceDropdownMenu();
  getNewsApiData();
});
