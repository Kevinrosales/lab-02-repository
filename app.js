'use strict';

const allHorns = [];
const uniqueNames = [];

function Horn (hornObject) {
  this.image_url = hornObject.image_url;
  this.title = hornObject.title;
  this.description = hornObject.description;
  this.keyword = hornObject.keyword;
  this.horns = hornObject.horns;

  allHorns.push(this);
}

Horn.prototype.render = function(){
  let photoSource = $('#photo-handlebars').html();
  let photoTemplate = Handlebars.compile(photoSource);
  let photoHTML = photoTemplate(this);

  $('main').append(photoHTML);
  $(`p`).hide();
  // $('main').append('<div class = "newAnimal"></div>');
  // let $hornContainer = $('div[class = "newAnimal"]');
  // console.log($hornContainer);

  // let $templateHTML = $('#photo-template').html();
  // // console.log($templateHTML);
  // $hornContainer.html($templateHTML);

  // $hornContainer.find('h2').text(this.title);
  // $hornContainer.find('img').attr('src', this.image_url);
  // $hornContainer.find('img').attr('alt', this.keyword);
  // $hornContainer.find('p').text(this.description);


  // $hornContainer.attr('class', '');


}

const readJSON = function(){
  const json1 = './page-1.json'
  const json2 = './page-2.json';
  if(top.location.pathname === '/index.html'){
    $.get(json1, data => {
      data.forEach(animal => {

        new Horn(animal);

      })
      //   filterAllHorns();
      findUnique();
      filter();
      //   clickHandler();
    }).then(renderAllHorns);
  } else if (top.location.pathname === '/gallery-page2.html'){
    $.get(json2, data => {
      data.forEach(animal => {

        new Horn(animal);

      })
      //   filterAllHorns();
      findUnique();
      filter();
    //   clickHandler();
    }).then(renderAllHorns);
  }

}

function filter() {
  uniqueNames.forEach(value =>{
    $('select').append('<option class = newItem></option>');
    let $newOption = $('option[class = "newItem"]');

    $newOption.text(value);

    $newOption.attr('class', '');
  })
}

function renderAllHorns () {
  allHorns.forEach(animal => {
    animal.render();
  })
}

function findUnique(){
  console.log('we mad it in to the function')
  console.log(allHorns.length);
  for(let i = 0; i < allHorns.length; i++){
    console.log('we made it into the for loop')
    if (!uniqueNames.includes (allHorns[i].keyword)){
      uniqueNames.push(allHorns[i].keyword);
    }
  }
  console.log('these are the ', uniqueNames);
}

$('select').change(function() {
  let $keyWord = $('select option:selected').text();
  // selecting all images that do not have that keyword
  $(`img:not([alt=${$keyWord}])`).parent('div').hide();
});

// $('nav').on('click', 'button', function() {
//   $(`div`).hide();
//   const json1 = './page-1.json'
//   const json2 = './page-2.json';
//   (this.value === 'page1') ? readJSON(json1) : readJSON(json2);
//   console.log(this.value);
// });

readJSON();
